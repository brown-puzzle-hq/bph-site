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
  <div>
    <div className="mb-6 max-w-3xl text-center">
      <i>
        This is a physical puzzle! If your team has not already picked up a
        chain, please visit HQ in Friedman 208.
      </i>
    </div>

    <div className="flex max-w-3xl flex-col items-center space-y-4 text-center">
      <i className="pb-4">Some people just can't follow simple instructions.</i>
      <p>
        <a href="https://drive.google.com/file/d/1WC3lR93-eT8h33FBVRAMNAYvxofSd4W4/view?usp=sharing">
          <u>This is a link to download a JSON file.</u>
        </a>
      </p>
    </div>
  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="mb-6 max-w-3xl text-center">
      <i>
        This is a physical puzzle! You should use an object found in your box.
      </i>
    </div>
    <div className="flex max-w-3xl flex-col items-center space-y-4 text-center">
      <i className="pb-4">Some people just can't follow simple instructions.</i>
      <p>
        <a href="https://drive.google.com/file/d/1WC3lR93-eT8h33FBVRAMNAYvxofSd4W4/view?usp=sharing">
          <u>This is a link to download a JSON file.</u>
        </a>
      </p>
    </div>
  </div>
);

export const remoteBody = (
  <div className="flex max-w-3xl flex-col items-center space-y-4">
    <div className="mb-4 max-w-3xl">
      <div className="mb-4">
        <b>
          This puzzle is a chain puzzle. In-person solvers and box purchasers
          were given a wire with beads of the following colors, in order:
        </b>
      </div>
      <div className="mb-4 flex">
        {CHAIN.split("").map((cell, index) => (
          <div
            key={index}
            className={`size-[1.5em] rounded-md border border-main-bg ${COLORS[cell]}`}
          />
        ))}
      </div>
      <div className="flex max-w-3xl flex-col items-center space-y-4 text-center">
        <i className="pb-4">
          Some people just can't follow simple instructions.
        </i>
        <p>
          <a href="https://drive.google.com/file/d/1WC3lR93-eT8h33FBVRAMNAYvxofSd4W4/view?usp=sharing">
            <u>This is a link to download a JSON file.</u>
          </a>
        </p>
      </div>
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
