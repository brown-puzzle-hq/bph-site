import Image from "next/image";
import img1 from "./schmear campaign 1.png";
import img2 from "./schmear campaign 2.png";
import img3 from "./schmear campaign 3.png";
import img4 from "./schmear campaign 4.png";
import img5 from "./schmear campaign 5.png";
import img6 from "./schmear campaign 6.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "schmear-campaign";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <i>
        Things are getting dirty as these dancing bagels fight to be your
        breakfast.
      </i>
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
