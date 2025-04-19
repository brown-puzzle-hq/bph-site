const CHAIN = "BBRBGGGRRGBGRRGRGRG";

const COLORS: Record<string, string> = {
  B: "bg-[#4a86e8] border-[#4264A9]",
  R: "bg-[#cc0000] border-[#8C271B]",
  G: "bg-[#cccccc] border-[#8A8A8A]",
};

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "red-blue";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

const puzzleBody = (
  <div className="mx-auto w-10 justify-center gap-0">
    {Array.from({ length: 22 }).map((_, i) => (
      <div
        key={i}
        className={`aspect-square ${i == 4 || i == 10 || i == 16 ? "" : i >= 17 ? "bg-neutral-600" : "bg-neutral-400"} ${
          i == 4 || i == 10 || i == 16
            ? ""
            : "border-1 border border-white ring-1 ring-white"
        }`}
      />
    ))}
  </div>
);

export const inPersonBody = (
  <div>
    <div className="mx-auto mb-6 max-w-3xl text-center italic">
      This is a physical puzzle! If your team has not already picked up a chain,
      please visit HQ in Friedman 208.
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <div className="flex flex-col justify-center space-y-4 text-center">
      <p>
        <b>
          This is a sequence metapuzzle. It uses feeders from the ⛓️ sequence.
        </b>
      </p>
      <p className="pb-2.5">
        <i>
          Hey, isn't blue kinda negative? I think red better fits my positive
          personality!
        </i>
      </p>
      <div>The first bead in the chain is blue.</div>
      <div className="flex w-full">{puzzleBody}</div>
    </div>
  </div>
);

export const remoteBoxBody = (
  <div className="max-w-xl space-y-4 text-center">
    <p>
      <i>
        This is a physical puzzle! You should use an object found in your box.
        Contact brownpuzzlehq@gmail.com with any questions about your box or its
        materials.
      </i>
    </p>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <p>
      <b>
        This is a sequence metapuzzle. It uses feeders from the ⛓️ sequence.
      </b>
    </p>
    <p className="pb-2.5">
      <i>
        Hey, isn't blue kinda negative? I think red better fits my positive
        personality!
      </i>
    </p>
    {puzzleBody}
  </div>
);

export const remoteBody = (
  <div className="max-w-xl space-y-4 text-center">
    <i>
      This puzzle is a chain puzzle. In-person solvers and box purchasers were
      given a wire with beads of the following colors, in order:
    </i>
    <div className="flex justify-center py-1.5">
      {CHAIN.split("").map((cell, index) => (
        <div
          key={index}
          className={`size-4 rounded-sm border-2 md:size-6 ${COLORS[cell]}`}
        />
      ))}
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <p>
      <b>
        This is a sequence metapuzzle. It uses feeders from the ⛓️ sequence.
      </b>
    </p>
    <p className="pb-2.5">
      <i>
        Hey, isn't blue kinda negative? I think red better fits my positive
        personality!
      </i>
    </p>
    {puzzleBody}
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
