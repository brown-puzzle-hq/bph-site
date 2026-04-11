import Image from "next/image";
import img1 from "./schmear-1.jpeg";
import img2 from "./schmear-2.jpeg";
import img3 from "./schmear-3.jpeg";
import img4 from "./schmear-4.jpeg";
import img5 from "./schmear-5.jpeg";
import img6 from "./schmear-6.jpeg";
import img7 from "./schmear-7.jpeg";
import loc1 from "./location A.jpeg";
import loc2 from "./location B.jpeg";
import loc3 from "./location C.jpeg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "schmear-campaigns";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 text-center font-bold">
      This puzzle is scattered across campus! You don't need to enter any
      buildings or restricted areas to solve this puzzle.
    </div>
    <div className="mb-4">
      <i>
        Things are getting dirty as these dancing bagels fight to be your
        breakfast.
      </i>
      <Image className="mb-4" src={loc1} alt="" />
      <Image className="mb-4" src={loc2} alt="" />
      <Image className="mb-4" src={loc3} alt="" />
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl">
    <div className="mb-8">
      <i>
        Things are getting dirty as these dancing bagels fight to be your
        breakfast.
      </i>
    </div>
    <Image className="mb-4" src={img1} alt="" />
    <Image className="mb-4" src={img2} alt="" />
    <Image className="mb-4" src={img3} alt="" />
    <Image className="mb-4" src={img4} alt="" />
    <Image className="mb-4" src={img5} alt="" />
    <Image className="mb-4" src={img6} alt="" />
    <Image className="mb-4" src={img7} alt="" />
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Bailey Merlino and Megan Carlson";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText =
  "Things are getting dirty as these dancing bagels fight to be your breakfast.";

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
