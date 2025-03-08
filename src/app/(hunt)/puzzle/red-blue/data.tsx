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
export const inPersonBody = (
  <div className="flex max-w-3xl flex-col items-center space-y-4 text-center">
    <i className="p-4">
      Hey, isn't blue kinda negative? I think red better fits my positive
      personality!
    </i>

    <div className="grid w-60 grid-cols-5 gap-0 pb-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`flex h-12 w-12 items-center justify-center border ${
            i === 4 ? "border-none" : ""
          }`}
        ></div>
      ))}
    </div>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = null;

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
