/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "the-final-heist";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

export const inPersonBody = (
  <div>
    <div className="mb-4 max-w-3xl">
      This is a sequence metapuzzle. It uses feeders from the 🏦 sequence.
    </div>
    <div className="max-w-3xl text-center">
      <p className="italic">
        You've made it to the final vault, but there's a problem: somebody's
        turned out the lights! fortunately, we've done some reconnaissance on
        your behalf. The floor plan for this vault is BLIND, and the room layout
        is as follows:
      </p>
      <p>
        <br></br>⬛⬛⬛⬛⬛
        <br></br>⬛⬜⬜⬜⬛
        <br></br>⬛⬜⬛⬜⬛
        <br></br>⬛⬛⬛⬛⬛
      </p>
      <iframe src="/api/puzzle/the-final-heist" width="750" height="600" />
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
