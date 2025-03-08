import Image from "next/image";
import HL_1 from "./hl-1.png";
import HL_2 from "./hl-2.png";
import HL_3 from "./hl-3.png";
import HL_4 from "./hl-4.png";
import HL_5 from "./hl-5.png";
import HL_6 from "./hl-6.png";
const SCALE = 0.5;

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "hand-letters";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

export const inPersonBody = (
  <div className="max-w-3xl text-center">
    <p className="mb-4 italic">
      I'm on this really exciting movie shoot, but I've become so crazed that
      whenever I look at the clocks, I think they're trying to give me a
      message! I just wish I knew where I am heading next...
    </p>
    <Image
      src={HL_1}
      alt=""
      width={666 * SCALE}
      height={454 * SCALE}
      className="mb-5"
    />
    <Image
      src={HL_2}
      alt=""
      width={484 * SCALE}
      height={366 * SCALE}
      className="mb-5"
    />
    <Image
      src={HL_3}
      alt=""
      width={580 * SCALE}
      height={388 * SCALE}
      className="mb-5"
    />
    <Image
      src={HL_4}
      alt=""
      width={660 * SCALE}
      height={524 * SCALE}
      className="mb-5"
    />
    <Image
      src={HL_5}
      alt=""
      width={534 * SCALE}
      height={258 * SCALE}
      className="mb-5"
    />
    <Image
      src={HL_6}
      alt=""
      width={580 * SCALE}
      height={692 * SCALE}
      className="mb-5"
    />
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl text-center">This is an example solution.</div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `Providence\tPonta Delgata
Hanoi\tRome
Tehran\tTokyo
New Delhi\tDhaka\tLondon
Helsinki
Adelaide\tBrisbane\tVladivostok`;

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
