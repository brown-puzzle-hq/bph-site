import PuzzlePlayer from "@/puzzle/components/puzzle/PuzzlePlayer";
import CrosswordCluesClient from "./CrosswordCluesClient";
import CrosswordOverlay from "./CrosswordOverlay";
import RebusControlsClient from "./RebusControlsClient";

export const puzzleId = "avionic-intersectionality";
const GRID_ROWS = 19;
const GRID_COLS = 26;

// - '.' = cell
// - '@' = off-grid empty space
const gridDefRaw: string[] = [
  "@@@@@@@@@@@@@@@@@@@@@@@@@@",
  "@@@.@@@@@@@@@@@@@@@@@@@@@@",
  "@@@.@@@@@@@@@.@@@@@@@@@@@@",
  "@@@.@@@@@@@@@.@@@@@@@@@@@@",
  "@@@.@@@@.@@@@.@@@@@@@@@@@@",
  "@@@.@@@@.@@@@.@@@@.@@@@@@@",
  "@@@.@@@@.@.............@@@",
  "@@@.@@@@.@@@@.@@@@.@@@@@@@",
  "@@@.@@@@.@@@@.@@@@.@@@@@@@",
  "@.....................@@@@",
  "@@@.@@@@.@@@@@@@@@.@@@.@@@",
  "@@@.@@.........@@@......@@",
  "@@@.@@@@.@@.@@@.@@@@.@@@@@",
  "@@@.@@@@.@@.@@@.@@@@.@@@@@",
  "@@@.@@@..........@@@.@@@@@",
  "@@@.@@@@.@@.@@@.@@@@.@@@@@",
  "@@@.@@@@@@@@@@@.@@@@@@@@@@",
  "@@@@@@@@@@@@@@@@@@@@@@@@@@",
  "@@@@@@@@@@@@@@@@@@@@@@@@@@",
];

// If you accidentally enter the grid as 25 rows × 19 cols (swapped), we'll
// auto-transpose it into 19 rows × 25 cols.
function normalizeGrid(
  raw: string[],
  expectedRows: number,
  expectedCols: number,
) {
  const rawRows = raw.length;
  const rawCols = raw[0]?.length ?? 0;

  const assertChars = (row: string, r: number) => {
    if (!/^[.@]+$/.test(row)) {
      throw new Error(
        `gridDef contains invalid characters at row ${r}. Only '.' and '@' are allowed.`,
      );
    }
  };

  // Already the right shape.
  if (
    rawRows === expectedRows &&
    raw.every((row, r) => {
      assertChars(row, r);
      return row.length === expectedCols;
    })
  ) {
    return raw;
  }

  // Common mistake: swapped shape. Auto-transpose if it's exactly cols×rows.
  if (
    rawRows === expectedCols &&
    raw.every((row, r) => {
      assertChars(row, r);
      return row.length === expectedRows;
    })
  ) {
    const out: string[] = [];
    for (let r = 0; r < expectedRows; r++) {
      let row = "";
      for (let c = 0; c < expectedCols; c++) {
        row += raw[c]![r]!;
      }
      out.push(row);
    }
    return out;
  }

  throw new Error(
    `gridDef must be ${expectedRows} rows × ${expectedCols} cols (or ${expectedCols}×${expectedRows} to auto-transpose). Got ${rawRows}×${rawCols}.`,
  );
}

const gridDef = normalizeGrid(gridDefRaw, GRID_ROWS, GRID_COLS);

// Rebus cells: put the coordinates for shaded rebus squares here.
// (0-indexed, in the 19x25 grid)
const rebusCells: Array<{ r: number; c: number }> = [
  { r: 3, c: 3 },
  { r: 8, c: 3 },
  { r: 8, c: 8 },
  { r: 10, c: 8 },
  { r: 11, c: 9 },
  { r: 11, c: 12 },
  { r: 6, c: 12 },
  { r: 6, c: 22 },
  { r: 5, c: 18 },
  { r: 9, c: 15 },
  { r: 9, c: 16 },
  { r: 10, c: 18 },
  { r: 14, c: 14 },
  { r: 14, c: 15 },
];

function assertRebusCells(
  grid: string[],
  cells: Array<{ r: number; c: number }>,
) {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  for (const { r, c } of cells) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      throw new Error(
        `rebus cell out of bounds: (${r},${c}) for ${rows}x${cols}`,
      );
    }
    const ch = grid[r]?.[c];
    if (ch !== ".") {
      throw new Error(
        `rebus cell must be on a fillable '.' cell; got '${ch ?? ""}' at (${r},${c})`,
      );
    }
  }
}

function makeFills(
  rows: number,
  cols: number,
  cells: Array<{ r: number; c: number }>,
) {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => "."),
  );
  for (const { r, c } of cells) {
    grid[r]![c] = "1";
  }
  return grid.map((row) => row.join(""));
}

const fillsDef = makeFills(GRID_ROWS, GRID_COLS, rebusCells);
assertRebusCells(gridDef, rebusCells);

const OVERLAY_SCALE = 1.05;
const OVERLAY_SCALE_X = 1;
const OVERLAY_SCALE_Y = 1;
const OVERLAY_OFFSET_X = 52;
const OVERLAY_OFFSET_Y = 126;

const ACROSS_CLUE_LIST: string[] = [
  "Animal on Wyoming's flag",
  "Home of (x,y)",
  "Concrete jungle where dreams are made of song",
  "3rd, 4th, and 5th names of the general who razed Carthage",
  "Mirror pep talk opener",
];

const DOWN_CLUE_LIST: string[] = [
  "What Gen Alpha farms",
  "A gymnast's beam",
  "Attraction to more than one gender",
  "Annual holiday on June 25th",
  "Sits between Os and Pt on the table",
  "Brown's satire newspaper",
  "Strategic alibi through lack of evidence",
  "Baltic island",
];

export const inPersonBody = (
  <div>
    <div className="mx-auto flex flex-col items-start justify-center gap-4 md:gap-8 2xl:flex-row">
      <div className="flex flex-col items-start">
        <div className="relative min-h-[788px] min-w-[1000px]">
          <PuzzlePlayer
            puzzleId={puzzleId}
            className="crossword-sparse crossword-floating"
            puzzleData={{
              "data-text": gridDef,
              "data-text-shift-key": "rebus",
              "data-text-shift-lock": false,
              "data-fill-classes": "no-fill rebus-cell",
              "data-fills": fillsDef,
              "data-fill-cycle": false,
              "data-clue-position": "none",
            }}
            options={{
              mode: "crossword",
            }}
          />
          <CrosswordOverlay
            puzzleId={puzzleId}
            scale={OVERLAY_SCALE}
            scaleX={OVERLAY_SCALE_X}
            scaleY={OVERLAY_SCALE_Y}
            offsetX={OVERLAY_OFFSET_X}
            offsetY={OVERLAY_OFFSET_Y}
          />
        </div>

        <RebusControlsClient puzzleId={puzzleId} />
      </div>

      <CrosswordCluesClient
        acrossClues={ACROSS_CLUE_LIST}
        downClues={DOWN_CLUE_LIST}
      />
    </div>
  </div>
);
export const remoteBody = inPersonBody;
export const solutionBody = null;
export const authors = "";
export const copyText = null;
export const partialSolutions: Record<string, string> = {};
export const tasks: Record<string, JSX.Element> = {};
