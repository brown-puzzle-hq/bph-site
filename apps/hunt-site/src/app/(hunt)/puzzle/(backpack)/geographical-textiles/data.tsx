import Image from "next/image";
import image1 from "./textiles/image1.png";
import image2 from "./textiles/image2.png";
import image3 from "./textiles/image3.png";
import image4 from "./textiles/image4.png";
import image5 from "./textiles/image5.png";
import image6 from "./textiles/image6.png";
import image7 from "./textiles/image7.png";
import image8 from "./textiles/image8.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "geographical-textiles";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="space-y-4 pb-4 text-center">
      <b>
        This is a metapuzzle. You will need to use some answers to puzzles from
        the Department rounds in order to solve it.
      </b>
    </div>
    <div className="mb-4 space-y-4">
      <p>
        My Scottish grandmother is visiting me in the States, but we're having a
        hard time communicating. Every sentence she states needs too much
        reading between the lines. How can we get out of this state of
        confusion?
      </p>
    </div>
    <div className="flex flex-col items-center justify-center space-y-4">
      <Image src={image1} alt="Image 1" width={500} height={500} />
      <Image src={image2} alt="Image 2" width={500} height={500} />
      <Image src={image3} alt="Image 3" width={500} height={500} />
      <Image src={image4} alt="Image 4" width={500} height={500} />
      <Image src={image5} alt="Image 5" width={500} height={500} />
      <Image src={image6} alt="Image 6" width={500} height={500} />
      <Image src={image7} alt="Image 7" width={500} height={500} />
      <Image src={image8} alt="Image 8" width={500} height={500} />
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>
          <b>BUSINESS</b>: Schmear Campaigns
        </li>
        <li>
          <b>HUMANITIES</b>: Multi-Clef Composition
        </li>
        <li>
          <b>HUMANITIES</b>: Sunk! Modern Naval Investigative Methodology
        </li>
        <li>
          <b>PHYSICAL SCIENCES</b>: Scacchic Fabrication
        </li>
        <li>
          <b>RISD</b>: Editing Practice
        </li>
        <li>
          <b>RISD</b>: How To Get Your Heart Broken
        </li>
        <li>
          <b>SOCIAL SCIENCES</b>: Year of the HONSE
        </li>
      </ul>
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
