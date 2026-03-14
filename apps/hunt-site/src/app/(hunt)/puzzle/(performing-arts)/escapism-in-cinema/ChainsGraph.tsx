"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";

export type ChainGameProps = {
  chains: ChainConfig[];
  gridSize?: number;
  cellSize?: number;
};

type GridPos = { col: number; row: number };

type ChainEntry = {
  chainIndex: number;
  nodeIndex: number;
  id: string;
  type: "big" | "small";
  text: string;
};

// Each chain is a sequence of alternating big and small nodes
export type ChainNodeConfig = {
  type: "big" | "small";
  text?: string;
};

export type ChainConfig = {
  nodes: ChainNodeConfig[];
};

const DEFAULT_GRID_SIZE = 6;
const DEFAULT_CELL_SIZE = 100;

// Size of big nodes
const BIG_NODE_SIZE = 80;

// Drag past this distance (px) to dislodge whole chain from grid
const DISLODGE_THRESHOLD_PX = 225;
// Spacing between nodes when chain is dragged in a straight line
const DISLODGED_CHAIN_SPACING = BIG_NODE_SIZE + 24;

// Height of bottom strip where dislodged nodes are laid out
const BOTTOM_STRIP_HEIGHT = 10 * (BIG_NODE_SIZE + 20);
// Space above the grid
const TOP_PADDING = 32;
// Gap between bottom of grid and top of bottom strip
const GRID_BOTTOM_PADDING = 24;
// Gap between chains
const BOTTOM_STRIP_CHAIN_GAP = 16;

// From film puzzle map.svg: cells that are pink (#f4cccc)
const PINK_CELLS = new Set<string>([
  "0,1",
  "1,0",
  "1,2",
  "1,5",
  "2,3",
  "3,2",
  "4,2",
  "4,4",
  "4,5",
  "5,0",
  "5,2",
  "5,4",
]);

// From film puzzle map.svg: cells that show a number (col,row -> number 1–14)
const CELL_CONTENTS: Record<string, string> = {
  "0,0": "13",
  "0,2": "10",
  "0,5": "?",
  "1,4": "9",
  "2,0": "12",
  "2,1": "11",
  "2,2": "8",
  "3,0": "4",
  "3,3": "7",
  "3,5": "1",
  "4,1": "5",
  "4,2": "6",
  "5,1": "3",
  "5,3": "2",
};

function getOccupiedCells(
  positions: Record<string, GridPos>,
  excludeId: string | null,
): Set<string> {
  const out = new Set<string>();
  for (const [id, pos] of Object.entries(positions)) {
    if (id === excludeId) continue;
    out.add(`${pos.col},${pos.row}`);
  }
  return out;
}

// Get valid drop cells for a big node: any unoccupied cell on the grid
function getValidDropCells(
  nodeId: string,
  _chainIndex: number,
  _nodeIndexInChain: number,
  _bigNodeIndicesInChain: number[],
  positions: Record<string, GridPos>,
  gridSize: number,
): GridPos[] {
  const occupied = getOccupiedCells(positions, nodeId);
  const valid: GridPos[] = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (!occupied.has(`${col},${row}`)) valid.push({ col, row });
    }
  }
  return valid;
}

// Nearest valid cell to (col, row) by Manhattan distance
// If none, return current
function nearestValidCell(
  col: number,
  row: number,
  validCells: GridPos[],
): GridPos {
  if (validCells.length === 0) return { col, row };
  let best = validCells[0]!;
  let bestDist = Infinity;
  for (const c of validCells) {
    const d = Math.abs(c.col - col) + Math.abs(c.row - row);
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return best;
}

// Build flat list of chain entries and per-chain list of node indices that are big
function buildChainEntries(chains: ChainConfig[]): {
  entries: ChainEntry[];
  bigIndicesByChain: number[][];
} {
  const entries: ChainEntry[] = [];
  const bigIndicesByChain: number[][] = [];
  chains.forEach((chain, chainIndex) => {
    const bigIndices: number[] = [];
    chain.nodes.forEach((cfg: ChainNodeConfig, nodeIndex) => {
      const id = `${chainIndex}-${nodeIndex}`;
      entries.push({
        chainIndex,
        nodeIndex,
        id,
        type: cfg.type,
        text: cfg.text ?? "",
      });
      if (cfg.type === "big") bigIndices.push(nodeIndex);
    });
    bigIndicesByChain.push(bigIndices);
  });
  return { entries, bigIndicesByChain };
}

function cellToPixel(
  col: number,
  row: number,
  cellSize: number,
  originX: number,
  originY: number,
): { x: number; y: number } {
  return {
    x: originX + (col + 0.5) * cellSize,
    y: originY + (row + 0.5) * cellSize,
  };
}

function pixelToCell(
  x: number,
  y: number,
  cellSize: number,
  originX: number,
  originY: number,
  gridSize: number,
): GridPos | null {
  const col = Math.floor((x - originX) / cellSize);
  const row = Math.floor((y - originY) / cellSize);
  if (col < 0 || col >= gridSize || row < 0 || row >= gridSize) return null;
  return { col, row };
}

export default function ChainsGraph({
  chains,
  gridSize = DEFAULT_GRID_SIZE,
  cellSize = DEFAULT_CELL_SIZE,
}: ChainGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 640,
    height:
      TOP_PADDING +
      DEFAULT_GRID_SIZE * DEFAULT_CELL_SIZE +
      GRID_BOTTOM_PADDING +
      BOTTOM_STRIP_HEIGHT,
  });
  const { entries, bigIndicesByChain } = useMemo(
    () => buildChainEntries(chains),
    [chains],
  );
  const [positions, setPositions] = useState<Record<string, GridPos>>({});
  const [dislodgedPositions, setDislodgedPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [bottomDislodgedNodeIds, setBottomDislodgedNodeIds] = useState<
    string[]
  >([]);
  const [bottomDislodgedChainOrder, setBottomDislodgedChainOrder] = useState<
    number[]
  >([]);
  const [textOverrides, setTextOverrides] = useState<Record<string, string>>(
    {},
  );
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const lastClickRef = useRef<{ id: string; time: number } | null>(null);
  const DOUBLE_CLICK_MS = 400;

  // Drag state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragPixel, setDragPixel] = useState<{ x: number; y: number } | null>(
    null,
  );
  const dragStartRef = useRef<{
    nodeX: number;
    nodeY: number;
    clientX: number;
    clientY: number;
    containerLeft: number;
    containerTop: number;
    wasDislodgedAtStart: boolean;
    dislodgedThisDrag: boolean;
    chainIndex: number;
    chainStartPixels: Record<string, { x: number; y: number }>;
    chainNodeIds: string[];
    gridLeft: number;
    gridTop: number;
    gridRight: number;
    gridBottom: number;
  } | null>(null);

  // When chains or grid change: start all chains in bottom strip (one row per chain)
  useEffect(() => {
    const allBigIds = chains.flatMap((_, ci) =>
      (bigIndicesByChain[ci] ?? []).map((ni) => `${ci}-${ni}`),
    );
    setPositions({});
    setDislodgedPositions({});
    setBottomDislodgedNodeIds(allBigIds);
    setBottomDislodgedChainOrder(chains.map((_, i) => i));
  }, [chains, gridSize, bigIndicesByChain]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const contentHeight =
      TOP_PADDING +
      gridSize * cellSize +
      GRID_BOTTOM_PADDING +
      BOTTOM_STRIP_HEIGHT;
    const update = () => {
      const w = el.offsetWidth || 640;
      setDimensions((prev) =>
        prev.width !== w || prev.height !== contentHeight
          ? { width: w, height: contentHeight }
          : prev,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [gridSize, cellSize]);

  const totalGridPx = gridSize * cellSize;
  const stripTop = TOP_PADDING + totalGridPx + GRID_BOTTOM_PADDING;
  const originX = (dimensions.width - totalGridPx) / 2;
  const originY = TOP_PADDING;

  const getDropZone = useCallback(
    (_containerX: number, containerY: number): "bottom" | null => {
      if (containerY >= stripTop) return "bottom";
      return null;
    },
    [stripTop],
  );

  const BOTTOM_STRIP_PADDING = 16;
  const BOTTOM_STRIP_GAP_X = 20;
  const BOTTOM_STRIP_GAP_Y = 20;
  const bottomStripRowHeight = BIG_NODE_SIZE + BOTTOM_STRIP_GAP_Y;
  const cellWidth = BIG_NODE_SIZE + BOTTOM_STRIP_GAP_X;

  const bottomStripChainLayout = useMemo(() => {
    const usableWidth = dimensions.width - 2 * BOTTOM_STRIP_PADDING;
    const rightEdge = BOTTOM_STRIP_PADDING + usableWidth;
    const layout: Record<number, { row: number; startX: number }> = {};
    let currentRow = 0;
    let currentX = BOTTOM_STRIP_PADDING + cellWidth / 2;
    let placedOnThisRow = false;
    for (const chainIndex of bottomDislodgedChainOrder) {
      const chainNodeIdsInBottom = (bigIndicesByChain[chainIndex] ?? [])
        .map((ni) => `${chainIndex}-${ni}`)
        .filter((id) => bottomDislodgedNodeIds.includes(id));
      const n = chainNodeIdsInBottom.length;
      if (n === 0) continue;
      const chainWidth = n * cellWidth;
      const chainRight = currentX + chainWidth - cellWidth / 2;
      if (placedOnThisRow && chainRight > rightEdge) {
        currentRow++;
        currentX = BOTTOM_STRIP_PADDING + cellWidth / 2;
        placedOnThisRow = false;
      }
      layout[chainIndex] = { row: currentRow, startX: currentX };
      currentX += chainWidth + BOTTOM_STRIP_CHAIN_GAP;
      placedOnThisRow = true;
    }
    return layout;
  }, [
    bottomDislodgedChainOrder,
    bottomDislodgedNodeIds,
    bigIndicesByChain,
    dimensions.width,
  ]);

  const getBottomStripPosition = useCallback(
    (nodeId: string): { x: number; y: number } | null => {
      if (!bottomDislodgedNodeIds.includes(nodeId)) return null;
      const chainIndex = parseInt(nodeId.split("-")[0]!, 10);
      const layout = bottomStripChainLayout[chainIndex];
      if (!layout) return null;
      const chainNodeIdsInBottom = (bigIndicesByChain[chainIndex] ?? [])
        .map((ni) => `${chainIndex}-${ni}`)
        .filter((id) => bottomDislodgedNodeIds.includes(id));
      const col = chainNodeIdsInBottom.indexOf(nodeId);
      if (col < 0) return null;
      const x = layout.startX + col * cellWidth;
      const y =
        stripTop +
        BOTTOM_STRIP_PADDING +
        layout.row * bottomStripRowHeight +
        bottomStripRowHeight / 2;
      return { x, y };
    },
    [
      bottomDislodgedNodeIds,
      bigIndicesByChain,
      bottomStripChainLayout,
      stripTop,
    ],
  );

  const commitEdit = useCallback(() => {
    if (editingNodeId === null) return;
    setTextOverrides((prev) => ({ ...prev, [editingNodeId]: editText }));
    setEditingNodeId(null);
  }, [editingNodeId, editText]);

  const handleNodeClick = useCallback(
    (id: string, currentText: string) => {
      const now = Date.now();
      const last = lastClickRef.current;
      const isDouble = last?.id === id && now - last.time < DOUBLE_CLICK_MS;
      lastClickRef.current = { id, time: now };
      if (isDouble) {
        setEditingNodeId(id);
        setEditText(textOverrides[id] ?? currentText);
      }
    },
    [textOverrides],
  );

  const placeChainOnGrid = useCallback(
    (
      chainIndex: number,
      dropCol: number,
      dropRow: number,
      draggedNodeId: string,
      positionsSnapshot: Record<string, GridPos>,
    ): Record<string, GridPos> | null => {
      const bigIndices = bigIndicesByChain[chainIndex];
      if (!bigIndices?.length) return null;
      const chainNodeIds = bigIndices.map((ni) => `${chainIndex}-${ni}`);
      const dragIdx = chainNodeIds.indexOf(draggedNodeId);
      if (dragIdx < 0) return null;
      const occupied = new Set<string>();
      for (const [id, pos] of Object.entries(positionsSnapshot)) {
        if (!chainNodeIds.includes(id)) occupied.add(`${pos.col},${pos.row}`);
      }
      const result: Record<string, GridPos> = {};
      const tryPlace = (col: number, row: number): boolean => {
        if (col < 0 || col >= gridSize || row < 0 || row >= gridSize)
          return false;
        if (occupied.has(`${col},${row}`)) return false;
        return true;
      };
      const place = (id: string, col: number, row: number) => {
        result[id] = { col, row };
        occupied.add(`${col},${row}`);
      };
      if (!tryPlace(dropCol, dropRow)) return null;
      place(draggedNodeId, dropCol, dropRow);
      for (let i = dragIdx - 1; i >= 0; i--) {
        const id = chainNodeIds[i]!;
        const nextPos = result[chainNodeIds[i + 1]!]!;
        const { col: nc, row: nr } = nextPos;
        const candidates: GridPos[] = [
          { col: nc - 1, row: nr },
          { col: nc + 1, row: nr },
        ];
        const cell = candidates.find((c) => tryPlace(c.col, c.row));
        if (!cell) break;
        place(id, cell.col, cell.row);
      }
      for (let i = dragIdx + 1; i < chainNodeIds.length; i++) {
        const id = chainNodeIds[i]!;
        const prevPos = result[chainNodeIds[i - 1]!]!;
        const { col: nc, row: nr } = prevPos;
        const candidates: GridPos[] = [
          { col: nc - 1, row: nr },
          { col: nc + 1, row: nr },
        ];
        const cell = candidates.find((c) => tryPlace(c.col, c.row));
        if (!cell) break;
        place(id, cell.col, cell.row);
      }
      return result;
    },
    [bigIndicesByChain, gridSize],
  );

  const getValidCellsForNode = useCallback(
    (nodeId: string): GridPos[] => {
      const parts = nodeId.split("-").map(Number);
      const ci = parts[0];
      const ni = parts[1];
      if (
        ci === undefined ||
        ni === undefined ||
        Number.isNaN(ci) ||
        Number.isNaN(ni)
      )
        return [];
      const entry = entries.find((e) => e.id === nodeId);
      if (!entry || entry.type !== "big") return [];
      const bigIndices = bigIndicesByChain[ci] ?? [];
      const nodeIndexInChain = bigIndices.indexOf(ni);
      if (nodeIndexInChain < 0) return [];
      return getValidDropCells(
        nodeId,
        ci,
        nodeIndexInChain,
        bigIndices,
        positions,
        gridSize,
      );
    },
    [entries, bigIndicesByChain, positions, gridSize],
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      if (e.detail === 2) return; // Allow double-click to edit instead of drag
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const chainIndex = parseInt(nodeId.split("-")[0]!, 10);
      const bigIndices = bigIndicesByChain[chainIndex];
      if (!bigIndices?.length) return;
      const chainNodeIds = bigIndices.map((ni) => `${chainIndex}-${ni}`);
      const chainStartPixels: Record<string, { x: number; y: number }> = {};
      let wasDislodgedAtStart = false;
      for (let i = 0; i < chainNodeIds.length; i++) {
        const id = chainNodeIds[i]!;
        let p: { x: number; y: number };
        if (bottomDislodgedNodeIds.includes(id)) {
          const bottomPos = getBottomStripPosition(id);
          if (!bottomPos) return;
          p = bottomPos;
          wasDislodgedAtStart = true;
        } else if (dislodgedPositions[id]) {
          p = dislodgedPositions[id]!;
          wasDislodgedAtStart = true;
        } else {
          const pos = positions[id];
          if (!pos) return;
          p = cellToPixel(pos.col, pos.row, cellSize, originX, originY);
        }
        chainStartPixels[id] = p;
      }
      const nodeX = chainStartPixels[nodeId]!.x;
      const nodeY = chainStartPixels[nodeId]!.y;
      const totalGridPxForRef = gridSize * cellSize;
      setDraggingId(nodeId);
      setDragPixel({ x: nodeX, y: nodeY });
      dragStartRef.current = {
        nodeX,
        nodeY,
        clientX: e.clientX,
        clientY: e.clientY,
        containerLeft: rect.left,
        containerTop: rect.top,
        wasDislodgedAtStart,
        dislodgedThisDrag: false,
        chainIndex,
        chainStartPixels,
        chainNodeIds,
        gridLeft: originX,
        gridTop: originY,
        gridRight: originX + totalGridPxForRef,
        gridBottom: originY + totalGridPxForRef,
      };
    },
    [
      positions,
      dislodgedPositions,
      bottomDislodgedNodeIds,
      bigIndicesByChain,
      cellSize,
      gridSize,
      originX,
      originY,
      getBottomStripPosition,
    ],
  );

  const handleDragMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingId || !dragStartRef.current) return;
      const ref = dragStartRef.current;
      const containerX = e.clientX - ref.containerLeft;
      const containerY = e.clientY - ref.containerTop;
      let minDist = Infinity;
      for (const id of ref.chainNodeIds) {
        const p = ref.chainStartPixels[id]!;
        const d = Math.hypot(containerX - p.x, containerY - p.y);
        if (d < minDist) minDist = d;
      }
      const outsideBoard =
        containerX < ref.gridLeft ||
        containerX >= ref.gridRight ||
        containerY < ref.gridTop ||
        containerY >= ref.gridBottom;
      if (
        !ref.dislodgedThisDrag &&
        outsideBoard &&
        minDist >= DISLODGE_THRESHOLD_PX
      ) {
        ref.dislodgedThisDrag = true;
      }
      if (ref.dislodgedThisDrag) {
        setDragPixel({ x: containerX, y: containerY });
      } else {
        const dx = e.clientX - ref.clientX;
        const dy = e.clientY - ref.clientY;
        setDragPixel({
          x: ref.nodeX + dx,
          y: ref.nodeY + dy,
        });
      }
    },
    [draggingId],
  );

  const handleDragEnd = useCallback(
    (e: MouseEvent) => {
      if (!draggingId) return;
      const ref = dragStartRef.current;
      const dropX = dragPixel?.x ?? 0;
      const dropY = dragPixel?.y ?? 0;
      const wasChainDrag =
        (ref?.wasDislodgedAtStart ?? false) ||
        (ref?.dislodgedThisDrag ?? false);

      if (wasChainDrag && ref?.chainNodeIds) {
        const { chainIndex, chainNodeIds } = ref;
        const dragIdx = chainNodeIds.indexOf(draggingId);
        const currentPositions: Record<string, { x: number; y: number }> = {};
        for (let i = 0; i < chainNodeIds.length; i++) {
          const id = chainNodeIds[i]!;
          const offset = (i - dragIdx) * DISLODGED_CHAIN_SPACING;
          currentPositions[id] = {
            x: dropX + offset,
            y: dropY,
          };
        }

        const zone = getDropZone(dropX, dropY);
        if (zone === "bottom") {
          setBottomDislodgedNodeIds((prev) => [...prev, ...chainNodeIds]);
          setBottomDislodgedChainOrder((prev) =>
            prev.includes(chainIndex) ? prev : [...prev, chainIndex],
          );
          setPositions((prev) => {
            const next = { ...prev };
            for (const id of chainNodeIds) delete next[id];
            return next;
          });
          setDislodgedPositions((prev) => {
            const next = { ...prev };
            for (const id of chainNodeIds) delete next[id];
            return next;
          });
        } else {
          const rawCell = pixelToCell(
            dropX,
            dropY,
            cellSize,
            originX,
            originY,
            gridSize,
          );
          if (rawCell) {
            const placement = placeChainOnGrid(
              chainIndex,
              rawCell.col,
              rawCell.row,
              draggingId,
              positions,
            );
            if (placement) {
              setPositions((prev) => {
                const next = { ...prev };
                for (const id of chainNodeIds) delete next[id];
                return { ...next, ...placement };
              });
              setDislodgedPositions((prev) => {
                const next = { ...prev };
                for (const id of chainNodeIds) delete next[id];
                for (const id of chainNodeIds) {
                  if (!(id in placement)) next[id] = currentPositions[id]!;
                }
                return next;
              });
              setBottomDislodgedNodeIds((prev) => {
                const next = prev.filter((id) => !chainNodeIds.includes(id));
                setBottomDislodgedChainOrder((prevOrder) =>
                  prevOrder.filter((ci) =>
                    next.some((id) => id.startsWith(`${ci}-`)),
                  ),
                );
                return next;
              });
            } else {
              const nextDislodged: Record<string, { x: number; y: number }> =
                {};
              for (const id of chainNodeIds)
                nextDislodged[id] = currentPositions[id]!;
              setDislodgedPositions((prev) => ({
                ...prev,
                ...nextDislodged,
              }));
              setPositions((prev) => {
                const next = { ...prev };
                for (const id of chainNodeIds) delete next[id];
                return next;
              });
              setBottomDislodgedNodeIds((prev) => {
                const next = prev.filter((id) => !chainNodeIds.includes(id));
                setBottomDislodgedChainOrder((prevOrder) =>
                  prevOrder.filter((ci) =>
                    next.some((id) => id.startsWith(`${ci}-`)),
                  ),
                );
                return next;
              });
            }
          } else {
            const nextDislodged: Record<string, { x: number; y: number }> = {};
            for (const id of chainNodeIds)
              nextDislodged[id] = currentPositions[id]!;
            setDislodgedPositions((prev) => ({ ...prev, ...nextDislodged }));
            setPositions((prev) => {
              const next = { ...prev };
              for (const id of chainNodeIds) delete next[id];
              return next;
            });
            setBottomDislodgedNodeIds((prev) => {
              const next = prev.filter((id) => !chainNodeIds.includes(id));
              setBottomDislodgedChainOrder((prevOrder) =>
                prevOrder.filter((ci) =>
                  next.some((id) => id.startsWith(`${ci}-`)),
                ),
              );
              return next;
            });
          }
        }
      } else {
        const rawCell = pixelToCell(
          dropX,
          dropY,
          cellSize,
          originX,
          originY,
          gridSize,
        );
        const validCells = getValidCellsForNode(draggingId);
        const snapCell =
          rawCell &&
          validCells.some((c) => c.col === rawCell.col && c.row === rawCell.row)
            ? rawCell
            : rawCell
              ? nearestValidCell(rawCell.col, rawCell.row, validCells)
              : validCells.length > 0
                ? validCells[0]!
                : null;
        const canSnap =
          snapCell &&
          validCells.some(
            (c) => c.col === snapCell.col && c.row === snapCell.row,
          );

        const wasDislodged = ref?.wasDislodgedAtStart ?? false;
        const dislodgedThisDrag = ref?.dislodgedThisDrag ?? false;

        if (!ref?.dislodgedThisDrag && !wasDislodged) {
          if (canSnap && snapCell) {
            setPositions((prev) => ({ ...prev, [draggingId]: snapCell }));
            setBottomDislodgedNodeIds((prev) => {
              const next = prev.filter((id) => id !== draggingId);
              setBottomDislodgedChainOrder((prevOrder) =>
                prevOrder.filter((ci) =>
                  next.some((id) => id.startsWith(`${ci}-`)),
                ),
              );
              return next;
            });
          }
        } else {
          if (canSnap && snapCell) {
            setPositions((prev) => ({ ...prev, [draggingId]: snapCell }));
            setDislodgedPositions((prev) => {
              const next = { ...prev };
              delete next[draggingId];
              return next;
            });
            setBottomDislodgedNodeIds((prev) => {
              const next = prev.filter((id) => id !== draggingId);
              setBottomDislodgedChainOrder((prevOrder) =>
                prevOrder.filter((ci) =>
                  next.some((id) => id.startsWith(`${ci}-`)),
                ),
              );
              return next;
            });
          } else {
            const zone = getDropZone(dropX, dropY);
            if (zone === "bottom") {
              const dragChainIndex = parseInt(draggingId.split("-")[0]!, 10);
              setBottomDislodgedNodeIds((prev) => [...prev, draggingId]);
              setBottomDislodgedChainOrder((prev) =>
                prev.includes(dragChainIndex)
                  ? prev
                  : [...prev, dragChainIndex],
              );
              setPositions((prev) => {
                const next = { ...prev };
                delete next[draggingId];
                return next;
              });
              setDislodgedPositions((prev) => {
                const next = { ...prev };
                delete next[draggingId];
                return next;
              });
            } else {
              setDislodgedPositions((prev) => ({
                ...prev,
                [draggingId]: { x: dropX, y: dropY },
              }));
              if (wasDislodged || dislodgedThisDrag) {
                setPositions((prev) => {
                  const next = { ...prev };
                  delete next[draggingId];
                  return next;
                });
              }
              setBottomDislodgedNodeIds((prev) => {
                const next = prev.filter((id) => id !== draggingId);
                setBottomDislodgedChainOrder((prevOrder) =>
                  prevOrder.filter((ci) =>
                    next.some((id) => id.startsWith(`${ci}-`)),
                  ),
                );
                return next;
              });
            }
          }
        }
      }

      setDraggingId(null);
      setDragPixel(null);
      dragStartRef.current = null;
    },
    [
      draggingId,
      dragPixel,
      cellSize,
      originX,
      originY,
      gridSize,
      getValidCellsForNode,
      getDropZone,
      placeChainOnGrid,
      positions,
    ],
  );

  useEffect(() => {
    if (!draggingId) return;
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [draggingId, handleDragMove, handleDragEnd]);

  const bigNodes = useMemo(
    () => entries.filter((e) => e.type === "big"),
    [entries],
  );

  const getNodePixelPosition = useCallback(
    (nodeId: string): { x: number; y: number } | null => {
      const ref = dragStartRef.current;
      const chainIndex = parseInt(nodeId.split("-")[0]!, 10);
      const isInChainDrag =
        draggingId &&
        ref?.chainNodeIds.includes(nodeId) &&
        (ref.dislodgedThisDrag || ref.wasDislodgedAtStart);
      if (isInChainDrag && ref && dragPixel) {
        const dragIdx = ref.chainNodeIds.indexOf(draggingId);
        const i = ref.chainNodeIds.indexOf(nodeId);
        if (dragIdx >= 0 && i >= 0) {
          const offset = (i - dragIdx) * DISLODGED_CHAIN_SPACING;
          return {
            x: dragPixel.x + offset,
            y: dragPixel.y,
          };
        }
      }
      if (draggingId === nodeId && dragPixel) return dragPixel;
      if (bottomDislodgedNodeIds.includes(nodeId)) {
        return getBottomStripPosition(nodeId);
      }
      const dislodged = dislodgedPositions[nodeId];
      if (dislodged) return dislodged;
      const pos = positions[nodeId];
      if (!pos) return null;
      return cellToPixel(pos.col, pos.row, cellSize, originX, originY);
    },
    [
      draggingId,
      dragPixel,
      dislodgedPositions,
      positions,
      bottomDislodgedNodeIds,
      cellSize,
      originX,
      originY,
      getBottomStripPosition,
    ],
  );

  const connectorSegments = useMemo(() => {
    const segs: {
      chainIndex: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      midX: number;
      midY: number;
      angleDeg: number;
      smallText: string;
      smallNodeId: string | null;
      smallDefaultText: string;
    }[] = [];
    chains.forEach((chain, chainIndex) => {
      const bigIndices = chain.nodes
        .map((n, i) => (n.type === "big" ? i : -1))
        .filter((i) => i >= 0);
      for (let i = 0; i < bigIndices.length - 1; i++) {
        const aId = `${chainIndex}-${bigIndices[i]!}`;
        const bId = `${chainIndex}-${bigIndices[i + 1]!}`;
        const p1 = getNodePixelPosition(aId);
        const p2 = getNodePixelPosition(bId);
        if (!p1 || !p2) continue;
        let angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
        if (angleDeg > 90) angleDeg -= 180;
        if (angleDeg < -90) angleDeg += 180;
        const smallNodeIndex = bigIndices[i]! + 1;
        const smallEntry = chain.nodes[smallNodeIndex];
        const isSmall = smallEntry?.type === "small";
        const smallNodeId = isSmall ? `${chainIndex}-${smallNodeIndex}` : null;
        const smallDefaultText = isSmall ? (smallEntry?.text ?? "") : "";
        const smallText = isSmall
          ? (textOverrides[smallNodeId!] ?? smallDefaultText)
          : "";
        segs.push({
          chainIndex,
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          midX: (p1.x + p2.x) / 2,
          midY: (p1.y + p2.y) / 2,
          angleDeg,
          smallText,
          smallNodeId,
          smallDefaultText,
        });
      }
    });
    return segs;
  }, [chains, getNodePixelPosition, textOverrides]);

  const hasSize = dimensions.width > 0 && dimensions.height > 0;

  return (
    <div
      ref={containerRef}
      className="relative min-h-[600px] w-full min-w-[640px] max-w-[100vw] rounded-md"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {hasSize && (
        <>
          {/* Bottom strip for dislodged nodes */}
          <div
            className="absolute left-0 z-0 rounded-b-md bg-white/10"
            style={{
              top: stripTop,
              width: dimensions.width,
              height: BOTTOM_STRIP_HEIGHT,
            }}
          />

          {/* 6x6 grid */}
          <div
            className="border-while/80 absolute grid border"
            style={{
              left: originX,
              top: originY,
              width: totalGridPx,
              height: totalGridPx,
              gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, i) => {
              const row = Math.floor(i / gridSize);
              const col = i % gridSize;
              const key = `${col},${row}`;
              const isPink = PINK_CELLS.has(key);
              const str = CELL_CONTENTS[key];
              return (
                <div
                  key={i}
                  className={`flex items-center justify-center border border-gray-100/10 text-white ${isPink ? "bg-[#f4cccc]/40" : ""}`}
                  style={{ width: cellSize, height: cellSize }}
                >
                  {str != null && (
                    <span className="select-none text-sm font-medium">
                      {str}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Thick white line above the first four cells in the last row */}
          <svg
            className="pointer-events-none absolute left-0 top-0 z-0"
            width={dimensions.width}
            height={dimensions.height}
          >
            <line
              x1={originX}
              y1={originY + (gridSize - 1) * cellSize}
              x2={originX + 4 * cellSize}
              y2={originY + (gridSize - 1) * cellSize}
              stroke="#ffffff80"
              strokeWidth={8}
              strokeLinecap="butt"
            />
          </svg>

          {/* Connectors */}
          <svg
            className="pointer-events-none absolute left-0 top-0 z-0"
            width={dimensions.width}
            height={dimensions.height}
          >
            {connectorSegments.map((seg, i) => (
              <g key={i}>
                <line
                  x1={seg.x1}
                  y1={seg.y1}
                  x2={seg.x2}
                  y2={seg.y2}
                  stroke="rgba(100, 100, 100, 1)"
                  strokeWidth={3}
                />
              </g>
            ))}
          </svg>

          {/* Small nodes */}
          {connectorSegments.map((seg, i) => {
            const ref = dragStartRef.current;
            const isGridChainDrag =
              draggingId &&
              ref?.chainIndex === seg.chainIndex &&
              !ref?.wasDislodgedAtStart &&
              !ref?.dislodgedThisDrag;
            if (seg.smallNodeId == null || isGridChainDrag) return null;
            let labelAngle = seg.angleDeg + 90;
            if (labelAngle > 90) labelAngle -= 180;
            if (labelAngle < -90) labelAngle += 180;
            return (
              <div
                key={`small-${i}`}
                className="absolute z-10 flex min-h-[0.875rem] min-w-[1rem] max-w-[4rem] cursor-text items-center justify-center break-words rounded px-1 py-0.5 text-center text-[12px] font-medium leading-none text-white hover:bg-white/20"
                style={{
                  left: seg.midX,
                  top: seg.midY,
                  transform: `translate(-50%, -50%) rotate(${labelAngle}deg)`,
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setEditingNodeId(seg.smallNodeId!);
                  setEditText(
                    textOverrides[seg.smallNodeId!] ?? seg.smallDefaultText,
                  );
                }}
              >
                {(seg.smallText || "\u00a0").split("-").join("-\u200B")}
              </div>
            );
          })}

          {/* Big nodes */}
          {bigNodes.map((entry) => {
            const pos = getNodePixelPosition(entry.id);
            if (!pos) return null;
            const displayText = textOverrides[entry.id] ?? entry.text;
            return (
              <div
                key={entry.id}
                className="absolute z-10 flex cursor-grab items-center justify-center overflow-hidden rounded border-2 border-neutral-600 bg-[oklch(0.85_0.08_250)] text-neutral-800 active:cursor-grabbing"
                style={{
                  left: pos.x - BIG_NODE_SIZE / 2,
                  top: pos.y - BIG_NODE_SIZE / 2,
                  width: BIG_NODE_SIZE,
                  height: BIG_NODE_SIZE,
                }}
                onMouseDown={(e) => handleDragStart(e, entry.id)}
              >
                <span
                  className="line-clamp-3 w-full min-w-0 max-w-full select-none overflow-hidden break-words px-1 py-0.5 text-center text-[14px] font-medium leading-tight [display:-webkit-box]"
                  style={
                    {
                      wordBreak: "break-word",
                      WebkitBoxOrient: "vertical",
                    } as React.CSSProperties
                  }
                  onDoubleClick={(e) => e.stopPropagation()}
                  onClick={() => handleNodeClick(entry.id, entry.text)}
                >
                  {(displayText || "\u00a0").split("-").join("-\u200B")}
                </span>
              </div>
            );
          })}

          {/* Edit overlay */}
          {editingNodeId && (
            <div className="absolute left-1/2 top-2 z-20 -translate-x-1/2 rounded border border-neutral-300 bg-white p-2 shadow">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={(e) => e.key === "Enter" && commitEdit()}
                className="min-w-[120px] rounded border border-neutral-200 px-2 py-1 text-sm text-black"
                autoFocus
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
