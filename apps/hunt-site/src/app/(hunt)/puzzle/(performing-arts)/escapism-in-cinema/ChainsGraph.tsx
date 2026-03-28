"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  getOccupiedCells,
  getValidDropCells,
  nearestValidCell,
  cellToPixel,
  pixelToCell,
  normalizeLabelAngle,
  segmentGeometryFromPoints,
  type GridPos,
} from "./chainsGraphUtils";

// Public type for chain game props
export type ChainGameProps = {
  chains: ChainConfig[];
  gridSize?: number;
  cellSize?: number;
};

export type ChainConfig = {
  nodes: ChainNodeConfig[];
};

export type ChainNodeConfig = {
  type: "big" | "small";
  text?: string;
};

// Private type for runtime data
// Small nodes appear as edges between big nodes
type ChainEntry = {
  chainIndex: number;
  nodeIndex: number;
  id: string;
  type: "big" | "small";
  text: string;
};

// Number of cells on each side of the grid
const DEFAULT_GRID_SIZE = 6;
// Size of each cell in the grid
const DEFAULT_CELL_SIZE = 100;

// Size of big nodes
const BIG_NODE_SIZE = 80;

// Drag past this distance to dislodge whole chain from grid
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

// Cells that are pink (#f4cccc)
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

// Cells that show text
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

/** Update bottom strip state after removing node ids from the stri. */
function pruneBottomStripFromNodeIds(
  nodeIds: string[],
  setBottomDislodgedNodeIds: React.Dispatch<React.SetStateAction<string[]>>,
  setBottomDislodgedChainOrder: React.Dispatch<React.SetStateAction<number[]>>,
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
  setPositions: React.Dispatch<React.SetStateAction<Record<string, GridPos>>>,
  setDislodgedPositions: React.Dispatch<
    React.SetStateAction<Record<string, { x: number; y: number }>>
  >,
  setBottomDislodgedNodeIds: React.Dispatch<React.SetStateAction<string[]>>,
  setBottomDislodgedChainOrder: React.Dispatch<React.SetStateAction<number[]>>,
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

/** Toolbar for adding and removing edges */
function Toolbar({
  addEdgeMode,
  removeEdgeMode,
  onAddEdgeClick,
  onRemoveEdgeClick,
}: {
  addEdgeMode: boolean;
  removeEdgeMode: boolean;
  onAddEdgeClick: () => void;
  onRemoveEdgeClick: () => void;
}) {
  return (
    <div className="flex justify-center gap-2">
      <button
        type="button"
        className={`rounded border px-2 py-1 text-sm text-white hover:bg-white/20 disabled:opacity-50 ${addEdgeMode ? "border-amber-400 bg-amber-500/30" : "border-white/30 bg-white/10"}`}
        onClick={onAddEdgeClick}
        disabled={removeEdgeMode}
      >
        Add edge
      </button>
      <button
        type="button"
        className={`rounded border px-2 py-1 text-sm text-white hover:bg-white/20 disabled:opacity-50 ${removeEdgeMode ? "border-amber-400 bg-amber-500/30" : "border-white/30 bg-white/10"}`}
        onClick={onRemoveEdgeClick}
        disabled={addEdgeMode}
      >
        Remove edge
      </button>
    </div>
  );
}

/** Bottom strip for dislodged chains */
function BottomStrip({
  stripTop,
  width,
  height,
}: {
  stripTop: number;
  width: number;
  height: number;
}) {
  return (
    <div
      className="absolute left-0 z-0 rounded-b-md bg-white/10"
      style={{ top: stripTop, width, height }}
    />
  );
}

/** Grid cells for the game grid */
function GridCells({
  gridSize,
  cellSize,
  originX,
  originY,
  totalGridPx,
  pinkCells,
  cellContents,
}: {
  gridSize: number;
  cellSize: number;
  originX: number;
  originY: number;
  totalGridPx: number;
  pinkCells: Set<string>;
  cellContents: Record<string, string>;
}) {
  return (
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
        const isPink = pinkCells.has(key);
        const str = cellContents[key];
        return (
          <div
            key={i}
            className={`flex items-center justify-center border border-gray-100/10 text-white ${isPink ? "bg-[#f4cccc]/40" : ""}`}
            style={{ width: cellSize, height: cellSize }}
          >
            {str != null && (
              <span className="select-none text-sm font-medium">{str}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Thick line for the grid */
function GridThickLine({
  originX,
  originY,
  gridSize,
  cellSize,
  width,
  height,
}: {
  originX: number;
  originY: number;
  gridSize: number;
  cellSize: number;
  width: number;
  height: number;
}) {
  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 z-0"
      width={width}
      height={height}
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
  );
}

type ConnectorSegment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  smallNodeId: string | null;
};
type UserEdgeSegment = ConnectorSegment & {
  smallNodeId: string;
  smallText: string;
  midX: number;
  midY: number;
};

/** SVG for connectors and user edges */
function ConnectorsSVG({
  width,
  height,
  connectorSegments,
  userEdgeSegments,
  removeEdgeMode,
}: {
  width: number;
  height: number;
  connectorSegments: Array<ConnectorSegment & { chainIndex: number }>;
  userEdgeSegments: UserEdgeSegment[];
  removeEdgeMode: boolean;
}) {
  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 z-0"
      width={width}
      height={height}
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
      {userEdgeSegments.map((seg) => (
        <g key={`user-${seg.smallNodeId}`}>
          <line
            x1={seg.x1}
            y1={seg.y1}
            x2={seg.x2}
            y2={seg.y2}
            stroke={
              removeEdgeMode
                ? "rgba(251, 191, 36, 0.95)"
                : "rgba(100, 100, 100, 1)"
            }
            strokeWidth={removeEdgeMode ? 5 : 3}
          />
        </g>
      ))}
    </svg>
  );
}

/** Label for small nodes */
function SmallNodeLabel({
  midX,
  midY,
  labelAngle,
  text,
  className,
  onDoubleClick,
}: {
  midX: number;
  midY: number;
  labelAngle: number;
  text: string;
  className: string;
  onDoubleClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={className}
      style={{
        left: midX,
        top: midY,
        transform: `translate(-50%, -50%) rotate(${labelAngle}deg)`,
      }}
      onDoubleClick={onDoubleClick}
    >
      {(text || "\u00a0").split("-").join("-\u200B")}
    </div>
  );
}

/** Label for user edges */
function UserEdgeLabel({
  seg,
  labelAngle,
  removeEdgeMode,
  onRemove,
  onDoubleClick,
}: {
  seg: UserEdgeSegment;
  labelAngle: number;
  removeEdgeMode: boolean;
  onRemove: (e: React.MouseEvent) => void;
  onDoubleClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`absolute z-10 flex min-h-[0.875rem] min-w-[1rem] max-w-[4rem] items-center justify-center break-words rounded px-1 py-0.5 text-center text-[12px] font-normal leading-none text-white ${removeEdgeMode ? "cursor-pointer shadow-[0_0_12px_rgba(251,191,36,0.8)] ring-2 ring-amber-400 ring-offset-1 ring-offset-transparent hover:ring-amber-300" : "cursor-text hover:bg-white/20"}`}
      style={{
        left: seg.midX,
        top: seg.midY,
        transform: `translate(-50%, -50%) rotate(${labelAngle}deg)`,
      }}
      onClick={onRemove}
      onDoubleClick={onDoubleClick}
    >
      {(seg.smallText || "\u00a0").split("-").join("-\u200B")}
    </div>
  );
}

/** List of big nodes */
function BigNodesList({
  bigNodes,
  getNodePixelPosition,
  textOverrides,
  addEdgeFromId,
  onDragStart,
  onNodeClick,
  onAddEdgeClick,
}: {
  bigNodes: ChainEntry[];
  getNodePixelPosition: (id: string) => { x: number; y: number } | null;
  textOverrides: Record<string, string>;
  addEdgeFromId: string | null;
  onDragStart: (e: React.MouseEvent, id: string) => void;
  onNodeClick: (id: string, currentText: string, isEditable?: boolean) => void;
  onAddEdgeClick: (e: React.MouseEvent, id: string) => void;
}) {
  return (
    <>
      {bigNodes.map((entry) => {
        const pos = getNodePixelPosition(entry.id);
        if (!pos) return null;
        const displayText = textOverrides[entry.id] ?? entry.text;
        const isAddEdgeSource = addEdgeFromId === entry.id;
        return (
          <div
            key={entry.id}
            className={`absolute z-10 flex cursor-grab items-center justify-center overflow-hidden rounded border-2 bg-[oklch(0.85_0.08_250)] text-neutral-800 active:cursor-grabbing ${isAddEdgeSource ? "border-blue-500 ring-2 ring-blue-300" : "border-neutral-600"}`}
            style={{
              left: pos.x - BIG_NODE_SIZE / 2,
              top: pos.y - BIG_NODE_SIZE / 2,
              width: BIG_NODE_SIZE,
              height: BIG_NODE_SIZE,
            }}
            onMouseDown={(e) => onDragStart(e, entry.id)}
            onClick={(e) => onAddEdgeClick(e, entry.id)}
          >
            <span
              className={`line-clamp-3 w-full min-w-0 max-w-full select-none overflow-hidden break-words px-1 py-0.5 text-center text-[14px] leading-tight [display:-webkit-box] ${entry.text !== "" ? "font-bold" : "font-normal"}`}
              style={
                {
                  wordBreak: "break-word",
                  WebkitBoxOrient: "vertical",
                } as React.CSSProperties
              }
              onDoubleClick={(e) => e.stopPropagation()}
              onClick={() =>
                onNodeClick(entry.id, entry.text, entry.text !== "")
              }
            >
              {(displayText || "\u00a0").split("-").join("-\u200B")}
            </span>
          </div>
        );
      })}
    </>
  );
}

/** Overlay for editing text */
function EditOverlay({
  editText,
  onEditChange,
  onCommit,
}: {
  editText: string;
  onEditChange: (value: string) => void;
  onCommit: () => void;
}) {
  return (
    <div className="absolute left-1/2 top-2 z-20 -translate-x-1/2 rounded border border-neutral-300 bg-white p-2 shadow">
      <input
        type="text"
        value={editText}
        onChange={(e) => onEditChange(e.target.value)}
        onBlur={onCommit}
        onKeyDown={(e) => e.key === "Enter" && onCommit()}
        className="min-w-[120px] rounded border border-neutral-200 px-2 py-1 text-sm text-black"
        autoFocus
      />
    </div>
  );
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

  // User-added edges (between arbitrary big nodes)
  const [userEdges, setUserEdges] = useState<
    Array<{ fromId: string; toId: string; smallNodeId: string }>
  >([]);
  const [addEdgeFromId, setAddEdgeFromId] = useState<string | null>(null);
  const [addEdgeMode, setAddEdgeMode] = useState(false);
  const [removeEdgeMode, setRemoveEdgeMode] = useState(false);
  const userEdgeIdRef = useRef(0);

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
    chainNodeIdsOnGridAtStart: Set<string>;
    gridLeft: number;
    gridTop: number;
    gridRight: number;
    gridBottom: number;
  } | null>(null);

  // Start all chains in bottom strip
  useEffect(() => {
    const allBigIds = chains.flatMap((_, ci) =>
      (bigIndicesByChain[ci] ?? []).map((ni) => `${ci}-${ni}`),
    );
    setPositions({});
    setDislodgedPositions({});
    setBottomDislodgedNodeIds(allBigIds);
    setBottomDislodgedChainOrder(chains.map((_, i) => i));
  }, [chains, gridSize, bigIndicesByChain]);

  // Update dimensions
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
      const norm = (x: string, y: string) => [x, y].sort().join(",");
      const pair = norm(aId, bId);
      return userEdges.some((e) => norm(e.fromId, e.toId) === pair);
    },
    [bigIndicesByChain, userEdges],
  );

  const addEdge = useCallback(
    (fromId: string, toId: string) => {
      if (fromId === toId) return;
      if (hasEdgeBetween(fromId, toId)) return;
      userEdgeIdRef.current += 1;
      const smallNodeId = `user-edge-${userEdgeIdRef.current}`;
      setUserEdges((prev) => [...prev, { fromId, toId, smallNodeId }]);
      setTextOverrides((prev) => ({ ...prev, [smallNodeId]: "" }));
      setAddEdgeFromId(null);
      setAddEdgeMode(false);
    },
    [hasEdgeBetween],
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
    (e: React.MouseEvent, nodeId: string) => {
      if (addEdgeFromId != null) return; // Add-edge mode: don't start drag
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
    (_: MouseEvent) => {
      if (!draggingId) return;
      const ref = dragStartRef.current;
      const dropX = dragPixel?.x ?? 0;
      const dropY = dragPixel?.y ?? 0;
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
            const snapCell =
              validCells.length === 0
                ? null
                : validCells.some(
                      (c) => c.col === rawCell.col && c.row === rawCell.row,
                    )
                  ? rawCell
                  : nearestValidCell(rawCell.col, rawCell.row, validCells);

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

  const hasSize = dimensions.width > 0 && dimensions.height > 0;

  return (
    <div className="p-5">
      <Toolbar
        addEdgeMode={addEdgeMode}
        removeEdgeMode={removeEdgeMode}
        onAddEdgeClick={() => {
          setRemoveEdgeMode(false);
          if (addEdgeMode) {
            setAddEdgeMode(false);
            setAddEdgeFromId(null);
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
              removeEdgeMode={removeEdgeMode}
            />

            {connectorSegments.map((seg, i) => {
              const ref = dragStartRef.current;
              const isGridChainDrag =
                draggingId &&
                ref?.chainIndex === seg.chainIndex &&
                !ref?.wasDislodgedAtStart &&
                !ref?.dislodgedThisDrag;
              if (seg.smallNodeId == null || isGridChainDrag) return null;
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
                    setEditingNodeId(seg.smallNodeId!);
                    setEditText(
                      textOverrides[seg.smallNodeId!] ?? seg.smallDefaultText,
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

            <BigNodesList
              bigNodes={bigNodes}
              getNodePixelPosition={getNodePixelPosition}
              textOverrides={textOverrides}
              addEdgeFromId={addEdgeFromId}
              onDragStart={handleDragStart}
              onNodeClick={handleNodeClick}
              onAddEdgeClick={(e, id) => {
                if (addEdgeFromId == null) return;
                e.stopPropagation();
                if (addEdgeFromId === "") {
                  setAddEdgeFromId(id);
                } else if (addEdgeFromId === id) {
                  setAddEdgeFromId(null);
                  setAddEdgeMode(false);
                } else {
                  addEdge(addEdgeFromId, id);
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
