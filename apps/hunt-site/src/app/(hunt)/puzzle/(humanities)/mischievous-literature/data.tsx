import Image from "next/image";
import lit from "./lit.png";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "mischievous-literature";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <i>
        You're trying to read some classic stories for school, but your tiger
        friend keeps getting you into trouble. It's going to be a struggle to
        read the correct number for your panel discussion next class…
      </i>
    </div>
    <div className="mb-4">
      <p>Young commuter embarrassed after abrupt weather change.</p>
      <p>Rascal employs water bucket techniques.</p>
      <p>Stranded kid warns busy father about flood.</p>
      <p>Student preemptively rejects classmate for senior prom.</p>
    </div>
    <Image src={lit} alt="Four rectangles with characters and objects" />
  </div>
);

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = null;

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
