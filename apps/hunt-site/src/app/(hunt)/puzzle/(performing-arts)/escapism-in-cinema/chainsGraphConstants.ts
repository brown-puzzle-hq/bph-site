/** Layout and grid constants for the chains graph */

export const DEFAULT_GRID_SIZE = 6;
export const DEFAULT_CELL_SIZE = 100;
export const BIG_NODE_SIZE = 80;
export const STUB_LENGTH = 50;
export const DISLODGE_THRESHOLD_PX = 225;
export const DISLODGED_CHAIN_SPACING = BIG_NODE_SIZE + 24;
export const BOTTOM_STRIP_HEIGHT = 10 * (BIG_NODE_SIZE + 20);
export const TOP_PADDING = 32;
export const GRID_BOTTOM_PADDING = 24;
export const BOTTOM_STRIP_CHAIN_GAP = 100;

export const PINK_CELLS = new Set<string>([
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

export const CELL_CONTENTS: Record<string, string> = {
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
