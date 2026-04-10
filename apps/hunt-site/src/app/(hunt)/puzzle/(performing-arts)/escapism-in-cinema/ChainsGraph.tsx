"use client";

import {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
} from "react";
import {
  getValidDropCells,
  cellToPixel,
  pixelToCell,
  normalizeLabelAngle,
  segmentGeometryFromPoints,
  edgePairKey,
  type GridPos,
} from "./chainsGraphUtils";
import type {
  ChainGameProps,
  ChainConfig,
  ChainNodeConfig,
  ChainEntry,
} from "./chainsGraphTypes";

export type {
  ChainGameProps,
  ChainConfig,
  ChainNodeConfig,
} from "./chainsGraphTypes";

import {
  DEFAULT_GRID_SIZE,
  DEFAULT_CELL_SIZE,
  BIG_NODE_SIZE,
  STUB_LENGTH,
  DISLODGE_THRESHOLD_PX,
  DISLODGED_CHAIN_SPACING,
  BOTTOM_STRIP_HEIGHT,
  TOP_PADDING,
  GRID_BOTTOM_PADDING,
  BOTTOM_STRIP_CHAIN_GAP,
  PINK_CELLS,
  CELL_CONTENTS,
} from "./chainsGraphConstants";
import {
  Toolbar,
  BottomStrip,
  GridCells,
  GridThickLine,
  ConnectorsSVG,
  SmallNodeLabel,
  UserEdgeLabel,
  BigNodesList,
  EditOverlay,
} from "./ChainsGraphParts";
import {
  applyDanglingStubConnectMerge,
  absorbSourceStubForTargetStubConnect,
} from "./chainsGraphStubConnect";
import {
  layoutDislodgedChainPositions,
  snapCellForChainGridDrop,
  resolveSingleNodeSnapCell,
  isCellInValidList,
} from "./chainsGraphDragHelpers";

/** Build flat list of chain entries and list of big node indices */
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

/** Update bottom strip state after removing node ids from the strip. */
function pruneBottomStripFromNodeIds(
  nodeIds: string[],
  setBottomDislodgedNodeIds: Dispatch<SetStateAction<string[]>>,
  setBottomDislodgedChainOrder: Dispatch<SetStateAction<number[]>>,
) {
  setBottomDislodgedNodeIds((prev) => {
    const next = prev.filter((id) => !nodeIds.includes(id));
    setBottomDislodgedChainOrder((prevOrder) =>
      prevOrder.filter((ci) => next.some((id) => id.startsWith(`${ci}-`))),
    );
    return next;
  });
}

/** Applies drop onto the bottom strip for a set of chain node ids */
function applyDropToBottomStrip(
  idsToUpdate: string[],
  chainIndex: number,
  setPositions: Dispatch<SetStateAction<Record<string, GridPos>>>,
  setDislodgedPositions: Dispatch<
    SetStateAction<Record<string, { x: number; y: number }>>
  >,
  setBottomDislodgedNodeIds: Dispatch<SetStateAction<string[]>>,
  setBottomDislodgedChainOrder: Dispatch<SetStateAction<number[]>>,
) {
  setBottomDislodgedNodeIds((prev) => [...prev, ...idsToUpdate]);
  setBottomDislodgedChainOrder((prev) =>
    prev.includes(chainIndex) ? prev : [...prev, chainIndex],
  );
  setPositions((prev) => {
    const next = { ...prev };
    for (const id of idsToUpdate) delete next[id];
    return next;
  });
  setDislodgedPositions((prev) => {
    const next = { ...prev };
    for (const id of idsToUpdate) delete next[id];
    return next;
  });
}

/** Main component for the chains game */
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

  const [userEdges, setUserEdges] = useState<
    Array<{ fromId: string; toId: string; smallNodeId: string }>
  >([]);
  const [addEdgeFromId, setAddEdgeFromId] = useState<string | null>(null);
  const [addEdgeMode, setAddEdgeMode] = useState(false);
  const [removeEdgeMode, setRemoveEdgeMode] = useState(false);
  const userEdgeIdRef = useRef(0);

  const [danglingConnections, setDanglingConnections] = useState<
    Record<string, string>
  >({});

  const [connectingStubId, setConnectingStubId] = useState<string | null>(null);

  const [stubTransfers, setStubTransfers] = useState<Record<string, string>>(
    {},
  );

  const [absorbedStubs, setAbsorbedStubs] = useState<Set<string>>(new Set());

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
    chainNodeIdsOnGridAtStart: Set<string>;
    gridLeft: number;
    gridTop: number;
    gridRight: number;
    gridBottom: number;
  } | null>(null);

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
    (containerX: number, containerY: number): "bottom" | null => {
      if (
        containerY >= stripTop &&
        containerX >= originX &&
        containerX < originX + totalGridPx
      )
        return "bottom";
      return null;
    },
    [stripTop, originX, totalGridPx],
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
    cellWidth,
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
      cellWidth,
      bottomStripRowHeight,
      BOTTOM_STRIP_PADDING,
    ],
  );

  const nodeConnectionCount = useMemo(() => {
    const count: Record<string, number> = {};
    const inc = (id: string) => {
      count[id] = (count[id] ?? 0) + 1;
    };
    chains.forEach((chain, chainIndex) => {
      const bigIdxs = chain.nodes
        .map((n, i) => (n.type === "big" ? i : -1))
        .filter((i) => i >= 0);
      for (let i = 0; i < bigIdxs.length - 1; i++) {
        inc(`${chainIndex}-${bigIdxs[i]!}`);
        inc(`${chainIndex}-${bigIdxs[i + 1]!}`);
      }
      const firstBigIdx = bigIdxs[0];
      if (
        firstBigIdx !== undefined &&
        firstBigIdx > 0 &&
        chain.nodes[firstBigIdx - 1]?.type === "small"
      ) {
        const connected =
          danglingConnections[`${chainIndex}-${firstBigIdx - 1}`];
        if (connected) {
          inc(`${chainIndex}-${firstBigIdx}`);
          inc(connected);
        }
      }
      const lastBigIdx = bigIdxs[bigIdxs.length - 1];
      if (
        lastBigIdx !== undefined &&
        chain.nodes[lastBigIdx + 1]?.type === "small"
      ) {
        const connected =
          danglingConnections[`${chainIndex}-${lastBigIdx + 1}`];
        if (connected) {
          inc(`${chainIndex}-${lastBigIdx}`);
          inc(connected);
        }
      }
    });
    userEdges.forEach((e) => {
      inc(e.fromId);
      inc(e.toId);
    });
    return count;
  }, [chains, danglingConnections, userEdges]);

  const hasEdgeBetween = useCallback(
    (aId: string, bId: string): boolean => {
      const [ciStr, niStr] = aId.split("-");
      const [cjStr, njStr] = bId.split("-");
      const ci = parseInt(ciStr ?? "", 10);
      const cj = parseInt(cjStr ?? "", 10);
      const ni = parseInt(niStr ?? "", 10);
      const nj = parseInt(njStr ?? "", 10);
      if (
        Number.isNaN(ci) ||
        Number.isNaN(cj) ||
        Number.isNaN(ni) ||
        Number.isNaN(nj)
      )
        return false;
      if (ci === cj) {
        const bigIndices = bigIndicesByChain[ci] ?? [];
        const ai = bigIndices.indexOf(ni);
        const aj = bigIndices.indexOf(nj);
        if (ai >= 0 && aj >= 0 && Math.abs(ai - aj) === 1) return true;
      }
      const pair = edgePairKey(aId, bId);
      return userEdges.some((e) => edgePairKey(e.fromId, e.toId) === pair);
    },
    [bigIndicesByChain, userEdges],
  );

  const addEdge = useCallback(
    (fromId: string, toId: string) => {
      if (fromId === toId) return;
      const ci = parseInt(fromId.split("-")[0] ?? "", 10);
      const cj = parseInt(toId.split("-")[0] ?? "", 10);
      if (!Number.isNaN(ci) && !Number.isNaN(cj) && ci === cj) return;
      if (hasEdgeBetween(fromId, toId)) return;
      if ((nodeConnectionCount[fromId] ?? 0) >= 2) return;
      if ((nodeConnectionCount[toId] ?? 0) >= 2) return;
      userEdgeIdRef.current += 1;
      const smallNodeId = `user-edge-${userEdgeIdRef.current}`;
      setUserEdges((prev) => [...prev, { fromId, toId, smallNodeId }]);
      setTextOverrides((prev) => ({ ...prev, [smallNodeId]: "" }));
      setAddEdgeFromId(null);
      setAddEdgeMode(false);
    },
    [hasEdgeBetween, nodeConnectionCount],
  );

  const removeUserEdge = useCallback((smallNodeId: string) => {
    setUserEdges((prev) => prev.filter((e) => e.smallNodeId !== smallNodeId));
    setTextOverrides((prev) => {
      const next = { ...prev };
      delete next[smallNodeId];
      return next;
    });
  }, []);

  const commitEdit = useCallback(() => {
    if (editingNodeId === null) return;
    setTextOverrides((prev) => ({ ...prev, [editingNodeId]: editText }));
    setEditingNodeId(null);
  }, [editingNodeId, editText]);

  const handleNodeClick = useCallback(
    (id: string, currentText: string, isEditable?: boolean) => {
      if (isEditable) return;
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
    (e: MouseEvent, nodeId: string) => {
      if (addEdgeFromId != null) return;
      if (connectingStubId != null) return;
      if (e.detail === 2) return;
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
      for (const id of chainNodeIds) {
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
      const chainNodeIdsOnGridAtStart = new Set(
        chainNodeIds.filter((id) => id in positions),
      );
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
        chainNodeIdsOnGridAtStart,
        gridLeft: originX,
        gridTop: originY,
        gridRight: originX + totalGridPxForRef,
        gridBottom: originY + totalGridPxForRef,
      };
    },
    [
      addEdgeFromId,
      connectingStubId,
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
    (e: globalThis.MouseEvent) => {
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
        setDragPixel({
          x: containerX,
          y: Math.max(BIG_NODE_SIZE / 2, containerY),
        });
      } else {
        const dx = e.clientX - ref.clientX;
        const dy = e.clientY - ref.clientY;
        setDragPixel({
          x: ref.nodeX + dx,
          y: Math.max(BIG_NODE_SIZE / 2, ref.nodeY + dy),
        });
      }
    },
    [draggingId],
  );

  const handleDragEnd = useCallback(
    (_: globalThis.MouseEvent) => {
      if (!draggingId) return;
      const ref = dragStartRef.current;
      const dropX = dragPixel?.x ?? 0;
      const dropY = Math.max(BIG_NODE_SIZE / 2, dragPixel?.y ?? 0);
      const wasChainDrag =
        (ref?.wasDislodgedAtStart ?? false) ||
        (ref?.dislodgedThisDrag ?? false);

      if (wasChainDrag && ref?.chainNodeIds) {
        const { chainIndex, chainNodeIds, chainNodeIdsOnGridAtStart } = ref;
        const wholeChainDislodged = ref.dislodgedThisDrag ?? false;
        const chainNodeIdsDislodgedAtStart = chainNodeIds.filter(
          (id) => !chainNodeIdsOnGridAtStart.has(id),
        );
        const idsToUpdate = wholeChainDislodged
          ? chainNodeIds
          : chainNodeIdsDislodgedAtStart;
        const dragIdx = chainNodeIds.indexOf(draggingId);
        const currentPositions = layoutDislodgedChainPositions(
          chainNodeIds,
          dragIdx,
          dropX,
          dropY,
          DISLODGED_CHAIN_SPACING,
        );

        const zone = getDropZone(dropX, dropY);
        if (zone === "bottom") {
          applyDropToBottomStrip(
            idsToUpdate,
            chainIndex,
            setPositions,
            setDislodgedPositions,
            setBottomDislodgedNodeIds,
            setBottomDislodgedChainOrder,
          );
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
            const positionsWithoutChain = { ...positions };
            for (const id of chainNodeIds) delete positionsWithoutChain[id];
            const bigIndices = bigIndicesByChain[chainIndex] ?? [];
            const validCells = getValidDropCells(
              draggingId,
              chainIndex,
              dragIdx,
              bigIndices,
              positionsWithoutChain,
              gridSize,
            );
            const snapCell = snapCellForChainGridDrop(rawCell, validCells);

            if (snapCell) {
              setPositions((prev) => {
                const next = { ...prev };
                for (const id of idsToUpdate) delete next[id];
                return { ...next, [draggingId]: snapCell };
              });
              setDislodgedPositions((prev) => {
                const next = { ...prev };
                for (const id of idsToUpdate) {
                  if (id === draggingId) delete next[id];
                  else next[id] = currentPositions[id]!;
                }
                return next;
              });
              pruneBottomStripFromNodeIds(
                idsToUpdate,
                setBottomDislodgedNodeIds,
                setBottomDislodgedChainOrder,
              );
            } else {
              const nextDislodged: Record<string, { x: number; y: number }> =
                {};
              for (const id of idsToUpdate)
                nextDislodged[id] = currentPositions[id]!;
              setDislodgedPositions((prev) => ({
                ...prev,
                ...nextDislodged,
              }));
              setPositions((prev) => {
                const next = { ...prev };
                for (const id of idsToUpdate) delete next[id];
                return next;
              });
              pruneBottomStripFromNodeIds(
                idsToUpdate,
                setBottomDislodgedNodeIds,
                setBottomDislodgedChainOrder,
              );
            }
          } else {
            const nextDislodged: Record<string, { x: number; y: number }> = {};
            for (const id of idsToUpdate)
              nextDislodged[id] = currentPositions[id]!;
            setDislodgedPositions((prev) => ({ ...prev, ...nextDislodged }));
            setPositions((prev) => {
              const next = { ...prev };
              for (const id of idsToUpdate) delete next[id];
              return next;
            });
            pruneBottomStripFromNodeIds(
              idsToUpdate,
              setBottomDislodgedNodeIds,
              setBottomDislodgedChainOrder,
            );
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
        const snapCell = resolveSingleNodeSnapCell(rawCell, validCells);
        const canSnap =
          snapCell != null && isCellInValidList(snapCell, validCells);

        const wasDislodged = ref?.wasDislodgedAtStart ?? false;
        const dislodgedThisDrag = ref?.dislodgedThisDrag ?? false;

        if (!ref?.dislodgedThisDrag && !wasDislodged) {
          if (canSnap && snapCell) {
            setPositions((prev) => ({ ...prev, [draggingId]: snapCell }));
            pruneBottomStripFromNodeIds(
              [draggingId],
              setBottomDislodgedNodeIds,
              setBottomDislodgedChainOrder,
            );
          }
        } else {
          if (canSnap && snapCell) {
            setPositions((prev) => ({ ...prev, [draggingId]: snapCell }));
            setDislodgedPositions((prev) => {
              const next = { ...prev };
              delete next[draggingId];
              return next;
            });
            pruneBottomStripFromNodeIds(
              [draggingId],
              setBottomDislodgedNodeIds,
              setBottomDislodgedChainOrder,
            );
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
              pruneBottomStripFromNodeIds(
                [draggingId],
                setBottomDislodgedNodeIds,
                setBottomDislodgedChainOrder,
              );
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
      bigIndicesByChain,
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
      if (draggingId === nodeId && dragPixel) return dragPixel;
      const isInChainDrag =
        draggingId &&
        ref?.chainNodeIds.includes(nodeId) &&
        (ref.dislodgedThisDrag || ref.wasDislodgedAtStart);
      if (isInChainDrag && ref) {
        if (
          !ref.dislodgedThisDrag &&
          ref.chainNodeIdsOnGridAtStart.has(nodeId)
        ) {
          const pos = positions[nodeId];
          if (pos)
            return cellToPixel(pos.col, pos.row, cellSize, originX, originY);
        }
        if (dragPixel) {
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
      }
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
        const geom = segmentGeometryFromPoints(p1, p2);
        const smallNodeIndex = bigIndices[i]! + 1;
        const smallEntry = chain.nodes[smallNodeIndex];
        const isSmall = smallEntry?.type === "small";
        const smallNodeId = isSmall ? `${chainIndex}-${smallNodeIndex}` : null;
        const smallDefaultText = isSmall ? (smallEntry?.text ?? "") : "";
        const smallText = isSmall
          ? (textOverrides[smallNodeId!] ?? smallDefaultText)
          : "";
        segs.push({
          ...geom,
          chainIndex,
          smallText,
          smallNodeId,
          smallDefaultText,
        });
      }
    });
    return segs;
  }, [chains, getNodePixelPosition, textOverrides]);

  const userEdgeSegments = useMemo(() => {
    const segs: {
      fromId: string;
      toId: string;
      smallNodeId: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      midX: number;
      midY: number;
      angleDeg: number;
      smallText: string;
    }[] = [];
    userEdges.forEach((edge) => {
      const p1 = getNodePixelPosition(edge.fromId);
      const p2 = getNodePixelPosition(edge.toId);
      if (!p1 || !p2) return;
      const geom = segmentGeometryFromPoints(p1, p2);
      segs.push({
        ...geom,
        fromId: edge.fromId,
        toId: edge.toId,
        smallNodeId: edge.smallNodeId,
        smallText: textOverrides[edge.smallNodeId] ?? "",
      });
    });
    return segs;
  }, [userEdges, getNodePixelPosition, textOverrides]);

  const danglingSmallSegments = useMemo(() => {
    type DanglingSegment = {
      chainIndex: number;
      smallNodeId: string;
      anchorBigId: string;
      smallDefaultText: string;
      smallText: string;
      isConnected: boolean;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      midX: number;
      midY: number;
      angleDeg: number;
    };
    const segs: DanglingSegment[] = [];

    chains.forEach((chain, chainIndex) => {
      const bigIndices = chain.nodes
        .map((n, i) => (n.type === "big" ? i : -1))
        .filter((i) => i >= 0);
      if (bigIndices.length === 0) return;

      const addStub = (
        smallNodeIdx: number,
        terminalBigIdx: number,
        getDx: (
          p: { x: number; y: number },
          p2: { x: number; y: number } | null,
        ) => number,
        getDy: (
          p: { x: number; y: number },
          p2: { x: number; y: number } | null,
        ) => number,
        secondBigIdx: number | null,
      ) => {
        const smallEntry = chain.nodes[smallNodeIdx];
        if (!smallEntry || smallEntry.type !== "small") return;
        const terminalId = `${chainIndex}-${terminalBigIdx}`;
        const smallNodeId = `${chainIndex}-${smallNodeIdx}`;
        const smallDefaultText = smallEntry.text ?? "";
        const smallText = textOverrides[smallNodeId] ?? smallDefaultText;
        const p = getNodePixelPosition(terminalId);
        if (!p) return;

        const connectedBigId = danglingConnections[smallNodeId];
        if (connectedBigId) {
          const p2 = getNodePixelPosition(connectedBigId);
          if (p2) {
            const geom = segmentGeometryFromPoints(p, p2);
            segs.push({
              chainIndex,
              smallNodeId,
              anchorBigId: terminalId,
              smallDefaultText,
              smallText,
              isConnected: true,
              ...geom,
            });
            return;
          }
        }

        const p2 =
          secondBigIdx !== null
            ? getNodePixelPosition(`${chainIndex}-${secondBigIdx}`)
            : null;
        const dx = getDx(p, p2);
        const dy = getDy(p, p2);
        const len = Math.hypot(dx, dy);
        const ndx = len > 0 ? dx / len : 1;
        const ndy = len > 0 ? dy / len : 0;
        const edgeOffset = BIG_NODE_SIZE / 2;
        const x1 = p.x + ndx * edgeOffset;
        const y1 = p.y + ndy * edgeOffset;
        const x2 = p.x + ndx * (edgeOffset + STUB_LENGTH);
        const y2 = p.y + ndy * (edgeOffset + STUB_LENGTH);
        const angleDeg = ((Math.atan2(ndy, ndx) * 180) / Math.PI + 360) % 180;
        segs.push({
          chainIndex,
          smallNodeId,
          anchorBigId: terminalId,
          smallDefaultText,
          smallText,
          isConnected: false,
          x1,
          y1,
          x2,
          y2,
          midX: (x1 + x2) / 2,
          midY: (y1 + y2) / 2,
          angleDeg,
        });
      };

      const lastBigIdx = bigIndices[bigIndices.length - 1]!;
      const secondToLastBigIdx =
        bigIndices.length >= 2 ? bigIndices[bigIndices.length - 2]! : null;
      addStub(
        lastBigIdx + 1,
        lastBigIdx,
        (p, p2) => (p2 ? p.x - p2.x : 1),
        (p, p2) => (p2 ? p.y - p2.y : 0),
        secondToLastBigIdx,
      );

      const firstBigIdx = bigIndices[0]!;
      if (firstBigIdx > 0) {
        const secondBigIdx = bigIndices.length >= 2 ? bigIndices[1]! : null;
        addStub(
          firstBigIdx - 1,
          firstBigIdx,
          (p, p2) => (p2 ? p.x - p2.x : -1),
          (p, p2) => (p2 ? p.y - p2.y : 0),
          secondBigIdx,
        );
      }
    });
    return segs.filter((seg) => !absorbedStubs.has(seg.smallNodeId));
  }, [
    chains,
    getNodePixelPosition,
    textOverrides,
    danglingConnections,
    absorbedStubs,
  ]);

  const anchorToStubId = useMemo(() => {
    const map: Record<string, string> = {};
    danglingSmallSegments.forEach((seg) => {
      map[seg.anchorBigId] = seg.smallNodeId;
    });
    return map;
  }, [danglingSmallSegments]);

  const stubInfoByAnchor = useMemo(() => {
    const map: Record<
      string,
      { smallNodeId: string; smallText: string; smallDefaultText: string }
    > = {};
    danglingSmallSegments.forEach((seg) => {
      map[seg.anchorBigId] = {
        smallNodeId: seg.smallNodeId,
        smallText: seg.smallText,
        smallDefaultText: seg.smallDefaultText,
      };
    });
    return map;
  }, [danglingSmallSegments]);

  const validConnectingTargets = useMemo((): Set<string> | null => {
    const stubConnectedPairs = new Set<string>();
    danglingSmallSegments
      .filter((s) => s.isConnected)
      .forEach((s) => {
        const connectedId = danglingConnections[s.smallNodeId];
        if (connectedId)
          stubConnectedPairs.add(edgePairKey(s.anchorBigId, connectedId));
      });
    const isAlreadyConnected = (aId: string, bId: string) =>
      hasEdgeBetween(aId, bId) || stubConnectedPairs.has(edgePairKey(aId, bId));
    const chainIdx = (id: string) => parseInt(id.split("-")[0] ?? "", 10);

    if (connectingStubId != null) {
      const aStub = danglingSmallSegments.find(
        (s) => s.smallNodeId === connectingStubId,
      );
      if (!aStub) return null;
      const aHasText = aStub.smallText !== "";
      const aChain = chainIdx(aStub.anchorBigId);
      const valid = new Set<string>();
      bigNodes.forEach((node) => {
        if (node.id === aStub.anchorBigId) return;
        if (chainIdx(node.id) === aChain) return;
        if (isAlreadyConnected(aStub.anchorBigId, node.id)) return;
        if ((nodeConnectionCount[node.id] ?? 0) >= 2) return;
        const bStub = stubInfoByAnchor[node.id];
        if (aHasText && bStub && bStub.smallText !== "") return;
        valid.add(node.id);
      });
      return valid;
    }
    if (addEdgeFromId && addEdgeFromId !== "") {
      const aStub = stubInfoByAnchor[addEdgeFromId];
      const aHasText = (aStub?.smallText ?? "") !== "";
      const aChain = chainIdx(addEdgeFromId);
      const valid = new Set<string>();
      bigNodes.forEach((node) => {
        if (node.id === addEdgeFromId) return;
        if (chainIdx(node.id) === aChain) return;
        if (isAlreadyConnected(addEdgeFromId, node.id)) return;
        if ((nodeConnectionCount[node.id] ?? 0) >= 2) return;
        const bStub = stubInfoByAnchor[node.id];
        if (aHasText && bStub && bStub.smallText !== "") return;
        valid.add(node.id);
      });
      return valid;
    }
    return null;
  }, [
    connectingStubId,
    addEdgeFromId,
    danglingSmallSegments,
    danglingConnections,
    bigNodes,
    nodeConnectionCount,
    stubInfoByAnchor,
    hasEdgeBetween,
  ]);

  const hasSize = dimensions.width > 0 && dimensions.height > 0;

  return (
    <div className="p-5">
      <Toolbar
        addEdgeMode={addEdgeMode || connectingStubId != null}
        removeEdgeMode={removeEdgeMode}
        onAddEdgeClick={() => {
          setRemoveEdgeMode(false);
          if (addEdgeMode || connectingStubId != null) {
            setAddEdgeMode(false);
            setAddEdgeFromId(null);
            setConnectingStubId(null);
          } else {
            setAddEdgeMode(true);
            setAddEdgeFromId("");
          }
        }}
        onRemoveEdgeClick={() => {
          setAddEdgeMode(false);
          setAddEdgeFromId(null);
          setRemoveEdgeMode((prev) => !prev);
        }}
      />

      <div
        ref={containerRef}
        className="relative min-h-[600px] w-full min-w-[640px] max-w-[100vw] rounded-md"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {hasSize && (
          <>
            <BottomStrip
              stripTop={stripTop}
              width={dimensions.width}
              height={BOTTOM_STRIP_HEIGHT}
            />

            <GridCells
              gridSize={gridSize}
              cellSize={cellSize}
              originX={originX}
              originY={originY}
              totalGridPx={totalGridPx}
              pinkCells={PINK_CELLS}
              cellContents={CELL_CONTENTS}
            />

            <GridThickLine
              originX={originX}
              originY={originY}
              gridSize={gridSize}
              cellSize={cellSize}
              width={dimensions.width}
              height={dimensions.height}
            />

            <ConnectorsSVG
              width={dimensions.width}
              height={dimensions.height}
              connectorSegments={connectorSegments}
              userEdgeSegments={userEdgeSegments}
              danglingStubs={danglingSmallSegments}
              removeEdgeMode={removeEdgeMode}
            />

            {connectorSegments.map((seg, i) => {
              const dragRef = dragStartRef.current;
              const isGridChainDrag =
                draggingId &&
                dragRef?.chainIndex === seg.chainIndex &&
                !dragRef?.wasDislodgedAtStart &&
                !dragRef?.dislodgedThisDrag;
              if (seg.smallNodeId == null || isGridChainDrag) return null;
              const smallNodeId = seg.smallNodeId;
              const labelAngle = normalizeLabelAngle(seg.angleDeg);
              const isEditable = seg.smallDefaultText !== "";
              return (
                <SmallNodeLabel
                  key={`small-${i}`}
                  midX={seg.midX}
                  midY={seg.midY}
                  labelAngle={labelAngle}
                  text={seg.smallText}
                  className={`absolute z-10 flex min-h-[0.875rem] min-w-[1rem] max-w-[4rem] items-center justify-center break-words rounded px-1 py-0.5 text-center text-[12px] leading-none text-white hover:bg-white/20 ${isEditable ? "cursor-default font-bold" : "cursor-text font-normal"}`}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (isEditable) return;
                    setEditingNodeId(smallNodeId);
                    setEditText(
                      textOverrides[smallNodeId] ?? seg.smallDefaultText,
                    );
                  }}
                />
              );
            })}

            {userEdgeSegments.map((seg) => (
              <UserEdgeLabel
                key={`user-${seg.smallNodeId}`}
                seg={seg}
                labelAngle={normalizeLabelAngle(seg.angleDeg)}
                removeEdgeMode={removeEdgeMode}
                onRemove={(e) => {
                  if (removeEdgeMode) {
                    e.stopPropagation();
                    e.preventDefault();
                    removeUserEdge(seg.smallNodeId);
                    setRemoveEdgeMode(false);
                  }
                }}
                onDoubleClick={(e) => {
                  if (removeEdgeMode) return;
                  e.stopPropagation();
                  e.preventDefault();
                  setEditingNodeId(seg.smallNodeId);
                  setEditText(textOverrides[seg.smallNodeId] ?? "");
                }}
              />
            ))}

            {danglingSmallSegments.map((seg) => {
              const dragRef = dragStartRef.current;
              const isGridChainDrag =
                draggingId &&
                dragRef?.chainIndex === seg.chainIndex &&
                !dragRef?.wasDislodgedAtStart &&
                !dragRef?.dislodgedThisDrag;
              if (isGridChainDrag) return null;
              const labelAngle = normalizeLabelAngle(seg.angleDeg);
              const isEditable = seg.smallDefaultText !== "";
              const isConnecting = connectingStubId === seg.smallNodeId;
              const className = [
                "absolute z-10 flex min-h-[0.875rem] min-w-[1rem] max-w-[4rem] items-center justify-center break-words rounded px-1 py-0.5 text-center text-[12px] leading-none text-white",
                isEditable ? "font-bold" : "font-normal",
                removeEdgeMode && seg.isConnected
                  ? "cursor-pointer shadow-[0_0_12px_rgba(251,191,36,0.8)] ring-2 ring-amber-400 ring-offset-1 ring-offset-transparent hover:ring-amber-300"
                  : isConnecting
                    ? "cursor-pointer ring-2 ring-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"
                    : "cursor-pointer hover:bg-white/20",
              ].join(" ");
              return (
                <SmallNodeLabel
                  key={`dangling-${seg.smallNodeId}`}
                  midX={seg.midX}
                  midY={seg.midY}
                  labelAngle={labelAngle}
                  text={seg.smallText}
                  className={className}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (isEditable) return;
                    if (removeEdgeMode || connectingStubId != null) return;
                    setEditingNodeId(seg.smallNodeId);
                    setEditText(
                      textOverrides[seg.smallNodeId] ?? seg.smallDefaultText,
                    );
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (removeEdgeMode) {
                      if (seg.isConnected) {
                        const borrowedFrom = stubTransfers[seg.smallNodeId];
                        setTextOverrides((prev) => {
                          const next = { ...prev };
                          delete next[seg.smallNodeId];
                          if (borrowedFrom) delete next[borrowedFrom];
                          return next;
                        });
                        if (borrowedFrom) {
                          setStubTransfers((prev) => {
                            const next = { ...prev };
                            delete next[seg.smallNodeId];
                            return next;
                          });
                          setAbsorbedStubs((prev) => {
                            const next = new Set(prev);
                            next.delete(borrowedFrom);
                            return next;
                          });
                        }
                        setDanglingConnections((prev) => {
                          const next = { ...prev };
                          delete next[seg.smallNodeId];
                          return next;
                        });
                        setRemoveEdgeMode(false);
                      }
                      return;
                    }
                    if (connectingStubId === seg.smallNodeId) {
                      setConnectingStubId(null);
                    } else {
                      if ((nodeConnectionCount[seg.anchorBigId] ?? 0) >= 2)
                        return;
                      setConnectingStubId(seg.smallNodeId);
                      setAddEdgeFromId(null);
                      setAddEdgeMode(false);
                    }
                  }}
                />
              );
            })}

            <BigNodesList
              bigNodes={bigNodes}
              getNodePixelPosition={getNodePixelPosition}
              textOverrides={textOverrides}
              addEdgeFromId={addEdgeFromId}
              connectingStubAnchorId={
                connectingStubId != null
                  ? (danglingSmallSegments.find(
                      (s) => s.smallNodeId === connectingStubId,
                    )?.anchorBigId ?? null)
                  : null
              }
              validConnectingTargets={validConnectingTargets}
              onDragStart={handleDragStart}
              onNodeClick={handleNodeClick}
              onAddEdgeClick={(e, id) => {
                if (connectingStubId != null) {
                  e.stopPropagation();
                  if (!validConnectingTargets?.has(id)) return;
                  const aStub = danglingSmallSegments.find(
                    (s) => s.smallNodeId === connectingStubId,
                  )!;
                  const bStub = stubInfoByAnchor[id];
                  applyDanglingStubConnectMerge(
                    connectingStubId,
                    aStub.smallText,
                    bStub,
                    setTextOverrides,
                    setStubTransfers,
                    setAbsorbedStubs,
                  );
                  setDanglingConnections((prev) => ({
                    ...prev,
                    [connectingStubId]: id,
                  }));
                  setConnectingStubId(null);
                  return;
                }
                if (addEdgeFromId == null) return;
                e.stopPropagation();
                if (addEdgeFromId === "") {
                  const stubId = anchorToStubId[id];
                  if (stubId) {
                    setAddEdgeFromId(null);
                    setAddEdgeMode(false);
                    setConnectingStubId(stubId);
                    return;
                  }
                  setAddEdgeFromId(id);
                } else if (addEdgeFromId === id) {
                  setAddEdgeFromId(null);
                  setAddEdgeMode(false);
                } else {
                  const targetStubId = anchorToStubId[id];
                  if (targetStubId) {
                    if (!validConnectingTargets?.has(id)) return;
                    const sourceStubId = anchorToStubId[addEdgeFromId];
                    const srcStubInfo = sourceStubId
                      ? stubInfoByAnchor[addEdgeFromId]
                      : null;
                    const tgtStubInfo = stubInfoByAnchor[id];
                    if (
                      sourceStubId &&
                      srcStubInfo &&
                      tgtStubInfo &&
                      srcStubInfo.smallText === "" &&
                      tgtStubInfo.smallText === ""
                    ) {
                      absorbSourceStubForTargetStubConnect(
                        targetStubId,
                        sourceStubId,
                        setStubTransfers,
                        setAbsorbedStubs,
                      );
                    }
                    setDanglingConnections((prev) => ({
                      ...prev,
                      [targetStubId]: addEdgeFromId,
                    }));
                    setAddEdgeFromId(null);
                    setAddEdgeMode(false);
                  } else {
                    if (!validConnectingTargets?.has(id)) return;
                    addEdge(addEdgeFromId, id);
                  }
                }
              }}
            />

            {editingNodeId && (
              <EditOverlay
                editText={editText}
                onEditChange={setEditText}
                onCommit={commitEdit}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
