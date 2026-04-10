import Image from "next/image";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "thermodynamic-zoology";

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
    <div className="mb-4">
      Even though your animals are the same size, they've all been complaining
      about the heat.
    </div>
    <div className="mb-4">
      <i>Who could help them out?</i>
    </div>
    <div className="flex justify-center">
      <div className="mb-4 grid grid-cols-1 content-center">
        <Image src={image1} alt="Thermodynamic Zoology" height={100} />
        <Image src={image2} alt="Thermodynamic Zoology" height={100} />
        <Image src={image3} alt="Thermodynamic Zoology" height={100} />
        <Image src={image4} alt="Thermodynamic Zoology" height={100} />
        <Image src={image5} alt="Thermodynamic Zoology" height={100} />
        <Image src={image6} alt="Thermodynamic Zoology" height={100} />
        <Image src={image7} alt="Thermodynamic Zoology" height={100} />
      </div>
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>
          <b>MATH:</b> Analogical Semantics
        </li>
        <li>
          <b>MATH:</b> Primary Investigation
        </li>
        <li>
          Five electives from ANY NON-<b>MATH</b> DEPARTMENT
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
