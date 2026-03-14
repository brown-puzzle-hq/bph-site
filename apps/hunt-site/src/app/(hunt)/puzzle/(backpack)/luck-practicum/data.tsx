import Image from "next/image";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";
import image8 from "./images/image8.png";
import image9 from "./images/image9.png";
import image10 from "./images/image10.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "luck-practicum";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <p>
        You’re using your unopened 54-card deck of Bicycle® index cards to
        prepare for your thesis. You write a letter on each of their backs, and
        pull out the following ten cards.
      </p>
    </div>
    <div className="mb-4">
      <i>What will you need to pass your thesis defense?</i>
    </div>
    <div className="grid grid-cols-5 gap-4">
      <Image src={image1} alt="Image 1" width={500} height={500} />
      <Image src={image2} alt="Image 2" width={500} height={500} />
      <Image src={image3} alt="Image 3" width={500} height={500} />
      <Image src={image4} alt="Image 4" width={500} height={500} />
      <Image src={image5} alt="Image 5" width={500} height={500} />
      <Image src={image6} alt="Image 6" width={500} height={500} />
      <Image src={image7} alt="Image 7" width={500} height={500} />
      <Image src={image8} alt="Image 8" width={500} height={500} />
      <Image src={image9} alt="Image 9" width={500} height={500} />
      <Image src={image10} alt="Image 10" width={500} height={500} />
    </div>
  </div>
);

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl">This is the solution.</div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Josiah Carberry";

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
