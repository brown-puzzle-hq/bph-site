import PuzzlePlayer from "@/puzzle/components/puzzle/PuzzlePlayer";
import CrosswordCluesClient from "./CrosswordCluesClient";
import CrosswordOverlay from "./CrosswordOverlay";
import RebusControlsClient from "./RebusControlsClient";

export const puzzleId = "avionic-intersectionality";
const GRID_ROWS = 19;
const GRID_COLS = 25;

// - '.' = cell
// - '@' = off-grid empty space
const gridDefRaw: string[] = [
  "@@@@@@@@@@@@@@@@@.@@@.@@@",
  "@@@@.@@@@.............@@@",
  "@@........@@@@@@@.@@@.@@@",
  "@@@@.@@@@.@.@@.@@.@@@@@@@",
  ".....................@@@@",
  "@.@@.@@@@.@.@@.@@.@@.@@@@",
  "@.@@....@@.....@@......@@",
  "@.@@.@@@@@@@@@.@@@@@.@@@@",
  "@........@@.@@.......@@@@",
  "@.@@.@@@@@@.@.@@.@@.@@@@@",
  "@.@@.@@@@.@.@.....@.@@@@@",
  "@.@@.@@@@.@.@.@@.@@.@@@@@",
  "@@@@.@............@@@@@@@",
  "@@@@.@.@@.@.@.@@.@@@@@@@@",
  "@......@@.@.@....@@@@@@@@",
  "@@@@.@.@@@@.@@@@.@@@@@@@@",
  "@@@@.@@@@......@....@@@@@",
  "@@@@@@@@@@@.@@@@@@@@@@@@@",
  "@@@@@@@@@@@@@@@@@@@@@@@@@",
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
  { r: 0, c: 17 },
  { r: 1, c: 11 },
  { r: 1, c: 21 },
  { r: 3, c: 4 },
  { r: 4, c: 15 },
  { r: 4, c: 16 },
  { r: 5, c: 17 },
  { r: 8, c: 4 },
  { r: 11, c: 16 },
  { r: 12, c: 10 },
  { r: 12, c: 12 },
  { r: 14, c: 16 },
  { r: 15, c: 11 },
  { r: 16, c: 11 },
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

const OVERLAY_SCALE = 1.09;

const ACROSS_CLUE_LIST: string[] = [
  "Jackal-headed Egyptian god",
  "__IMAGE_WHALES_SHOOT__",
  "Cowlike",
  "Coriander",
  '"Concrete jungle where dreams are made of" song',
  "Annual holiday on June 25th",
  "One of the five gifted in a classic Christmas song",
  "This kind of police. Would, hate this clue",
  "Shakespearean king",
  "Wine valley",
  "Reddish pigment made from dirt",
  "3rd, 5th, and 4th name of the general who razed Carthage",
  "Sunroom",
  "Number one rule of improv",
];

const DOWN_CLUE_LIST: string[] = [
  "What Gen Alpha farms",
  "Animal on Wyoming's flag",
  "Attraction to more than one gender",
  "New York corner store",
  "Home of (x,y)",
  "Mites commonly found in grass",
  "Ray Tomlinson sent the first one",
  "Not a nerd?",
  "One whose pants are on fire",
  'A kind of "hop" from Harlem',
  "___ van Beethoven",
  "Strategic alibi through lack of evidence",
  "Fencing discipline",
  "A tough Master at the gym",
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
          <CrosswordOverlay puzzleId={puzzleId} scale={OVERLAY_SCALE} />
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
export const solutionBody = <div className="max-w-3xl">Solution TBD.</div>;
export const authors = "";
export const copyText = null;
export const partialSolutions: Record<string, string> = {};
export const tasks: Record<string, JSX.Element> = {};
