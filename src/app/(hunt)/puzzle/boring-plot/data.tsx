const GRID = [
  "S30",
  "S30",
  "G30",
  ".6D20.4",
  ".7D17.6",
  ".7D20.3",
  ".9D20.1",
  ".8D21.1",
  ".10D20",
  ".1D29",
];

const ARRANGEMENT = [
  "P10 P5",
  "P6",
  "P12 P4",
  "P2 P11",
  "P7 P1",
  "P9 P13 P8",
  "P3",
];

const DIGGING = [
  "↘.......↙.....↘...↓..↙....",
  ".↘.....↘.......↓..↓.↘.....",
  "..↓.....↘......↓..↓..↘....",
  "..→↓.....→↓...↘←.. ...↘...",
  "...→→↙....→→↓..→↓......→↘.",
  ".. ←←.....↙←←.. ←....... ←",
  "........ ←................",
  "..........................",
  "....↓........→↓...........",
  "....↓.........→↓..........",
  "....↘..........→↓.........",
  ".....↓..........→↓........",
  ".....→↓..........→↓.......",
  "......→→↘......... .......",
  ".........→→ ..............",
];

const STACK = [" 4.9", " 12.1", " 9.4", " 11.2", " 13", " 8.5"];

const COLORS: Record<string, string> = {
  ".": "bg-[#ad805f]",
  G: "bg-blue-200 border-b-2 border-[#38761d]",
  D: "bg-[#785236] border border-[#785236]",
  S: "bg-blue-200",
};

const decodeRLE = (rle: string): string[] => {
  const regex = /([A-Za-z .])(\d+)?/g;
  let row: string[] = [];

  let match;
  while ((match = regex.exec(rle)) !== null) {
    const char = match[1];
    const count = parseInt(match[2] || "1", 10);
    row.push(...Array(count).fill(char));
  }

  return row;
};

const FULLGRID = GRID.map(decodeRLE);
const FULLSTACK = STACK.map(decodeRLE);

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "boring-plot";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
  <div className="mb-4 max-w-3xl text-center">
      <b>
        This is a metapuzzle. It uses feeders from the{" "}
        <span className="underline">ADVENTURE</span> round.
      </b>
    </div>
  <div className="flex max-w-3xl flex-col items-center space-y-4 text-center">
    <i>
      You've spent ages digging through your backyard with only 6 fossils to
      show for it. If you dig through the fossil stack instead, going right and
      down, maybe you'll find what you need. What is the plot missing?
    </i>
    <p className="font-bold text-main-header">Your Backyard</p>
    <div className="grid">
      <div className="col-start-1 row-start-1 grid grid-cols-[0em,repeat(29,1.5em)] grid-rows-[repeat(10,1.5em)]">
        {FULLGRID.flatMap((row) =>
          row.map((cell) => <div className={COLORS[cell]} />),
        )}
      </div>
      <div className="col-start-1 row-start-1 pl-1 text-left font-mono font-bold text-main-header">
        <br />
        <br />
        <br />
        {ARRANGEMENT.map((line) => (
          <div>{line}</div>
        ))}
      </div>
    </div>
    <p className="font-bold text-main-header">Digging Guide</p>
    <div className="grid grid-cols-[repeat(26,1.5em)] grid-rows-[repeat(14,1.5em)] font-mono text-secondary-accent">
      {DIGGING.flatMap((row) =>
        row
          .split("")
          .map((cell) =>
            cell == "." ? (
              <p />
            ) : (
              <p className="flex items-center justify-center rounded-md border border-main-bg bg-main-accent">
                {cell}
              </p>
            ),
          ),
      )}
    </div>
    <p className="font-bold text-main-header">Fossil Stack</p>
    <div className="grid grid-cols-[repeat(13,1.5em)] grid-rows-[repeat(6,1.5em)]">
      {FULLSTACK.flatMap((row) =>
        row.map((cell) =>
          cell == "." ? (
            <p />
          ) : (
            <p className="flex items-center justify-center rounded-md border border-main-bg bg-main-accent">
              {cell}
            </p>
          ),
        ),
      )}
    </div>
  </div>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null; // Should be composed of the const variables up top

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
