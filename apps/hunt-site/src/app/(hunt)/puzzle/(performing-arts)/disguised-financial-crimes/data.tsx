import Image from "next/image";
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";
import image4 from "./image4.png";
import image5 from "./image5.png";
import image6 from "./image6.png";
import image7 from "./image7.png";
import image8 from "./image8.png";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "disguised-financial-crimes";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <i>
        You and your partner, Detective Rolfsen, have finally unknotted the
        whole conspiracy: APMA-Econ majors are lizards in disguise.
      </i>
    </div>
    <div className="flex justify-around">
      <div className="flex flex-col gap-4">
        <span>
          <Image src={image1} alt="" height="200" />
        </span>
        <span>
          <Image src={image3} alt="" height="200" />
        </span>
        <span>
          <Image src={image5} alt="" height="200" />
        </span>
        <span>
          <Image src={image7} alt="" height="200" />
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <span>
          <Image src={image2} alt="" height="200" />
        </span>
        <span>
          <Image src={image4} alt="" height="200" />
        </span>
        <span>
          <Image src={image6} alt="" height="200" />
        </span>
        <span>
          <Image src={image8} alt="" height="200" />
        </span>
      </div>
    </div>
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
