const GRID = [
  "0001000000000000000",
  "0000000010000000000",
  "0000010000000000000",
  "0000000001000000000",
  "0000001000000000000",
  "0000100000000000000",
  "0000000000000001000",
  "0000000000010000000",
  "0000000000000010000",
  "0000000000001000000",
  "0000000000000000100",
  "0100000000000000000",
  "0010000000000000000",
  "0000000000000000001",
  "0000000000000100000",
  "0000000000000000010",
  "0000000000100000000",
  "0000000100000000000",
  "0000000000000000001",
];

const CHAIN = "BBRBGGGRRGBGRRGRGRG";

const COLORS: Record<string, string> = {
  B: "bg-[#4a86e8]",
  R: "bg-[#cc0000]",
  G: "bg-[#cccccc]",
};

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "chain-letters";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="flex max-w-3xl flex-col items-center space-y-4 text-center">
    <div className="grid grid-cols-[auto,auto,auto] gap-x-2 text-left">
      <div
        className={`size-[1.5em] rounded-md border border-main-bg ${COLORS["B"]}`}
      />
      <p>=</p>
      COIA
      <div
        className={`size-[1.5em] rounded-md border border-main-bg ${COLORS["R"]}`}
      />
      <p>=</p>
      ISNVWAN
      <div
        className={`size-[1.5em] rounded-md border border-main-bg ${COLORS["G"]}`}
      />
      <p>=</p>
      XEPVITSO
    </div>
    <div className="grid grid-cols-[repeat(19,1.5em)] grid-rows-[repeat(19,1.5em)]">
      {GRID.flatMap((row) => row.split("").map((cell) => <p>{cell}</p>))}
    </div>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = (
  <div className="flex max-w-3xl flex-col items-center space-y-4 text-center">
  <div className="flex">
    {CHAIN.split("").map((cell) => (
      <div
        className={`size-[1.5em] rounded-md border border-main-bg ${COLORS[cell]}`}
      />
    ))}
  </div>
  <div className="grid grid-cols-[auto,auto,auto] gap-x-2 text-left">
    <div
      className={`size-[1.5em] rounded-md border border-main-bg ${COLORS["B"]}`}
    />
    <p>=</p>
    COIA
    <div
      className={`size-[1.5em] rounded-md border border-main-bg ${COLORS["R"]}`}
    />
    <p>=</p>
    ISNVWAN
    <div
      className={`size-[1.5em] rounded-md border border-main-bg ${COLORS["G"]}`}
    />
    <p>=</p>
    XEPVITSO
  </div>
  <div className="grid grid-cols-[repeat(19,1.5em)] grid-rows-[repeat(19,1.5em)]">
    {GRID.flatMap((row) => row.split("").map((cell) => <p>{cell}</p>))}
  </div>
</div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null;

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
