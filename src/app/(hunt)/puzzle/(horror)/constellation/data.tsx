//TODO: make less jank

import Image from "next/image";
import CONS1 from "./Constellation1.svg";
import CONS2 from "./Constellation2.svg";
const SCALE = 0.5;
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "constellation";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center items-center">
    <p>
      <b>
        This is a sequence metapuzzle. It uses feeders from the ⭐ sequence.
      </b>
    </p>
    <div className="flex justify-center">
    <Image
    src={CONS1}
    alt=""
    // width={1638 * SCALE}
    // height={1752 * SCALE}
    className="mb-5 align-center"
  /> </div>
  <div className="flex justify-center">
      <Image
    src={CONS2}
    alt=""
    // width={1638 * SCALE}
    // height={1752 * SCALE}
    className="mb-5 align-center"
  /></div>
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
