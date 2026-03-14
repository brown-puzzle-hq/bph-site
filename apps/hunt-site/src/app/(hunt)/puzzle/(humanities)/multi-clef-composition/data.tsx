/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "multi-clef-composition";
import Image from "next/image";
import MCC1 from "./MCC_1.png";
import MCC2 from "./MCC_2.png";
import MCC3 from "./MCC_3.png";
import MCC4 from "./MCC_4.png";
import MCC5 from "./MCC_5.png";
import MCC6 from "./MCC_6.png";
import MCC7 from "./MCC_7.png";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mb-6 flex justify-center">
      <Image src={MCC1} width={800} height={150} alt="" />
    </div>

    <div className="mb-6 flex justify-center">
      <Image src={MCC2} alt="" className="h-[150px] w-auto" />
    </div>

    <div className="mb-6 flex justify-center">
      <Image
        src={MCC3}
        width={200}
        height={200}
        alt=""
        className="h-[150px] w-auto"
      />
    </div>

    <div className="mb-6 flex justify-center">
      <Image
        src={MCC4}
        width={200}
        height={200}
        alt=""
        className="h-[150px] w-auto"
      />
    </div>

    <div className="mb-6 flex justify-center">
      <Image
        src={MCC5}
        width={200}
        height={200}
        alt=""
        className="h-[150px] w-auto"
      />
    </div>

    <div className="mb-6 flex justify-center">
      <Image
        src={MCC6}
        width={200}
        height={200}
        alt=""
        className="h-[150px] w-auto"
      />
    </div>

    <div className="mb-6 flex justify-center">
      <Image
        src={MCC7}
        width={200}
        height={200}
        alt=""
        className="h-[150px] w-auto"
      />
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
