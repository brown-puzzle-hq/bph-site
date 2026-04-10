"use client";

import type { CSSProperties, MouseEvent } from "react";
import type { ChainEntry } from "./chainsGraphTypes";
import { BIG_NODE_SIZE } from "./chainsGraphConstants";

export type ConnectorSegment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  smallNodeId: string | null;
};

export type UserEdgeSegment = ConnectorSegment & {
  smallNodeId: string;
  smallText: string;
  midX: number;
  midY: number;
};

export type DanglingStubSegment = {
  smallNodeId: string;
  anchorBigId: string;
  isConnected: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

/** Toolbar for adding and removing edges */
export function Toolbar({
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
        Connect nodes
      </button>
      <button
        type="button"
        className={`rounded border px-2 py-1 text-sm text-white hover:bg-white/20 disabled:opacity-50 ${removeEdgeMode ? "border-amber-400 bg-amber-500/30" : "border-white/30 bg-white/10"}`}
        onClick={onRemoveEdgeClick}
        disabled={addEdgeMode}
      >
        Disconnect nodes
      </button>
    </div>
  );
}

/** Bottom strip for dislodged chains */
export function BottomStrip({
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
export function GridCells({
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
      className="absolute grid border border-white/80"
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
export function GridThickLine({
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

/** SVG for connectors and user edges */
export function ConnectorsSVG({
  width,
  height,
  connectorSegments,
  userEdgeSegments,
  danglingStubs,
  removeEdgeMode,
}: {
  width: number;
  height: number;
  connectorSegments: Array<ConnectorSegment & { chainIndex: number }>;
  userEdgeSegments: UserEdgeSegment[];
  danglingStubs: DanglingStubSegment[];
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
      {danglingStubs.map((seg) => (
        <g key={`dangling-${seg.smallNodeId}`}>
          <line
            x1={seg.x1}
            y1={seg.y1}
            x2={seg.x2}
            y2={seg.y2}
            stroke={
              removeEdgeMode && seg.isConnected
                ? "rgba(251, 191, 36, 0.95)"
                : "rgba(100, 100, 100, 1)"
            }
            strokeWidth={removeEdgeMode && seg.isConnected ? 5 : 3}
            strokeDasharray={seg.isConnected ? undefined : "6,4"}
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
export function SmallNodeLabel({
  midX,
  midY,
  labelAngle,
  text,
  className,
  onClick,
  onDoubleClick,
}: {
  midX: number;
  midY: number;
  labelAngle: number;
  text: string;
  className: string;
  onClick?: (e: MouseEvent) => void;
  onDoubleClick?: (e: MouseEvent) => void;
}) {
  return (
    <div
      className={className}
      style={{
        left: midX,
        top: midY,
        transform: `translate(-50%, -50%) rotate(${labelAngle}deg)`,
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {(text || "\u00a0").split("-").join("-\u200B")}
    </div>
  );
}

/** Label for user edges */
export function UserEdgeLabel({
  seg,
  labelAngle,
  removeEdgeMode,
  onRemove,
  onDoubleClick,
}: {
  seg: UserEdgeSegment;
  labelAngle: number;
  removeEdgeMode: boolean;
  onRemove: (e: MouseEvent) => void;
  onDoubleClick: (e: MouseEvent) => void;
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
export function BigNodesList({
  bigNodes,
  getNodePixelPosition,
  textOverrides,
  addEdgeFromId,
  connectingStubAnchorId,
  validConnectingTargets,
  onDragStart,
  onNodeClick,
  onAddEdgeClick,
}: {
  bigNodes: ChainEntry[];
  getNodePixelPosition: (id: string) => { x: number; y: number } | null;
  textOverrides: Record<string, string>;
  addEdgeFromId: string | null;
  connectingStubAnchorId: string | null;
  validConnectingTargets: Set<string> | null;
  onDragStart: (e: MouseEvent, id: string) => void;
  onNodeClick: (id: string, currentText: string, isEditable?: boolean) => void;
  onAddEdgeClick: (e: MouseEvent, id: string) => void;
}) {
  return (
    <>
      {bigNodes.map((entry) => {
        const pos = getNodePixelPosition(entry.id);
        if (!pos) return null;
        const displayText = textOverrides[entry.id] ?? entry.text;
        const isAddEdgeSource = addEdgeFromId === entry.id;
        const isStubAnchor = connectingStubAnchorId === entry.id;
        const isInConnectingMode =
          connectingStubAnchorId != null ||
          (addEdgeFromId != null && addEdgeFromId !== "");
        const isValidTarget = validConnectingTargets?.has(entry.id) ?? false;
        const isBlockedTarget =
          isInConnectingMode &&
          !isStubAnchor &&
          !isAddEdgeSource &&
          !isValidTarget;
        return (
          <div
            key={entry.id}
            className={`absolute z-10 flex items-center justify-center overflow-hidden rounded border-2 bg-[oklch(0.85_0.08_250)] text-neutral-800 ${isBlockedTarget ? "cursor-not-allowed opacity-40" : isInConnectingMode ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"} ${isStubAnchor ? "border-blue-500 ring-2 ring-blue-400" : isAddEdgeSource ? "border-blue-500 ring-2 ring-blue-300" : "border-neutral-600"}`}
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
                } as CSSProperties
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
export function EditOverlay({
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
