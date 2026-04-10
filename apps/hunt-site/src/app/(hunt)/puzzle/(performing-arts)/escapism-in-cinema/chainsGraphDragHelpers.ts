import { nearestValidCell, type GridPos } from "./chainsGraphUtils";

/** Pixel positions for each big node in a chain laid out horizontally from the drag anchor. */
export function layoutDislodgedChainPositions(
  chainNodeIds: string[],
  dragIdx: number,
  dropX: number,
  dropY: number,
  spacing: number,
): Record<string, { x: number; y: number }> {
  const out: Record<string, { x: number; y: number }> = {};
  for (let i = 0; i < chainNodeIds.length; i++) {
    const id = chainNodeIds[i]!;
    const offset = (i - dragIdx) * spacing;
    out[id] = { x: dropX + offset, y: dropY };
  }
  return out;
}

/** Pick snap cell for chain drop given raw cell under cursor and valid cells. */
export function snapCellForChainGridDrop(
  rawCell: GridPos,
  validCells: GridPos[],
): GridPos | null {
  if (validCells.length === 0) return null;
  return validCells.some((c) => c.col === rawCell.col && c.row === rawCell.row)
    ? rawCell
    : nearestValidCell(rawCell.col, rawCell.row, validCells);
}

/** Resolve snap cell for a single-node drag (grid or free placement). */
export function resolveSingleNodeSnapCell(
  rawCell: GridPos | null,
  validCells: GridPos[],
): GridPos | null {
  if (
    rawCell &&
    validCells.some((c) => c.col === rawCell.col && c.row === rawCell.row)
  ) {
    return rawCell;
  }
  if (rawCell) {
    return nearestValidCell(rawCell.col, rawCell.row, validCells);
  }
  return validCells.length > 0 ? validCells[0]! : null;
}

export function isCellInValidList(
  cell: GridPos,
  validCells: GridPos[],
): boolean {
  return validCells.some((c) => c.col === cell.col && c.row === cell.row);
}
