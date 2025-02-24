/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "puzzle1";

/**
 * The `PuzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export function PuzzleBody(): JSX.Element {
  return <div className="text-center">This is the body of the puzzle.</div>;
}

/**
 * The `SolutionBody` renders in the solution page.
 * If there are no solutions available, return null.
 */
export function SolutionBody(): JSX.Element | null {
  return null;
  // return <div className="text-center">This is an example solution.</div>;
}

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
 * The `tasks` object is used for multi-step puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
