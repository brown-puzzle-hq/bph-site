/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "cubist-linguistics";

const CELL_COLORS: Record<string, string> = {
  gry: "#cccccc", // gray
  grn: "#b6d7a8", // green
  wht: "#ffffff", // white
  blk: "#000000", // black
  ylw: "#ffe599", // yellow
};

const GRID1: string[][] = [
  ["gry", "ylw", "gry", "gry"],
  ["gry", "grn", "gry", "grn"],
  ["gry", "grn", "grn", "gry"],
  ["grn", "grn", "grn", "grn"],
];

const GRID2: string[][] = [
  ["grn", "gry", "gry", "gry"],
  ["grn", "grn", "gry", "ylw"],
  ["gry", "grn", "gry", "gry"],
  ["grn", "grn", "grn", "grn"],
];

const GRID3: string[][] = [
  ["gry", "grn", "gry", "grn"],
  ["ylw", "gry", "grn", "grn"],
  ["grn", "ylw", "gry", "gry"],
  ["grn", "grn", "grn", "grn"],
];

const GRID4: string[][] = [
  ["gry", "gry", "gry", "gry"],
  ["gry", "grn", "gry", "grn"],
  ["grn", "grn", "gry", "gry"],
  ["grn", "grn", "grn", "grn"],
];

function ColorGrid({ grid }: { grid: string[][] }) {
  const cols = grid[0]?.length ?? 4;
  return (
    <div className="flex flex-col gap-1">
      <div
        className="inline-grid w-fit gap-0 border border-black"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1.5rem)`,
          gridTemplateRows: `repeat(${grid.length}, 1.5rem)`,
        }}
      >
        {grid.flatMap((row, r) =>
          row.map((cellClass, c) => (
            <div
              key={`${r}-${c}`}
              className="border border-black"
              style={{ backgroundColor: CELL_COLORS[cellClass] ?? "#ffffff" }}
            />
          )),
        )}
      </div>
    </div>
  );
}

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="max-w-3xl space-y-4 pb-4 text-center">
      <b>
        This is a metapuzzle. You will need to use some answers to puzzles from
        the Department rounds in order to solve it.
      </b>
    </div>
    <div className="mb-6 grid max-w-3xl place-items-center space-y-6">
      <ColorGrid grid={GRID1} />
      <ColorGrid grid={GRID2} />
      <ColorGrid grid={GRID3} />
      <div className="text-6xl">↓</div>
      <ColorGrid grid={GRID4} />
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>Six electives from ANY DEPARTMENT</li>
      </ul>
    </div>
  </div>
);

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Thomas Gordon and Aren Guralp";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null;

/**
 * The `partialSolutions` object is used to prompt solutions with sigrnificant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
