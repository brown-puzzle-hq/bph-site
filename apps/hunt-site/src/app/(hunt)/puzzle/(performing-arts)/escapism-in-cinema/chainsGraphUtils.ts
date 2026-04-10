/** Pure utilities for ChainsGraph */

export type GridPos = { col: number; row: number };

/** Canonical key for an undirected edge between two node ids */
export function edgePairKey(a: string, b: string): string {
  return [a, b].sort().join(",");
}

export function getOccupiedCells(
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

export function getValidDropCells(
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

export function nearestValidCell(
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

export function cellToPixel(
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

export function pixelToCell(
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

/** Normalize line angle (degrees from atan2) to roughly -90..90 for segment storage */
export function normalizeSegmentAngle(angleDeg: number): number {
  if (angleDeg > 90) return angleDeg - 180;
  if (angleDeg < -90) return angleDeg + 180;
  return angleDeg;
}

/** Convert segment angle to label rotation: +90 then clamp to readable range */
export function normalizeLabelAngle(segmentAngleDeg: number): number {
  let a = segmentAngleDeg + 90;
  if (a > 90) a -= 180;
  if (a < -90) a += 180;
  return a;
}

/** Shared geometry for connector and user-edge segments (line + midpoint + angle) */
export type SegmentGeometry = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  midX: number;
  midY: number;
  angleDeg: number;
};

export function segmentGeometryFromPoints(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
): SegmentGeometry {
  const angleDeg = normalizeSegmentAngle(
    Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI),
  );
  return {
    x1: p1.x,
    y1: p1.y,
    x2: p2.x,
    y2: p2.y,
    midX: (p1.x + p2.x) / 2,
    midY: (p1.y + p2.y) / 2,
    angleDeg,
  };
}
