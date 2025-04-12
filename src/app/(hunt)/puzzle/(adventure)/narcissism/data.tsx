import Image from "next/image";
import IMG1 from "./1.png";
import IMG2 from "./2.png";
import IMG3 from "./3.png";
import IMG4 from "./4.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "narcissism";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
        <div className="pb-2.5 italic">
        Your therapist asks if you feel that something's missing.
    </div>
    <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-2">
      <Image src={IMG1} className="rounded-lg" alt="" />
      <Image src={IMG2} className="rounded-lg" alt="" />
      <Image src={IMG3} className="rounded-lg" alt="" />
      <Image src={IMG4} className="rounded-lg" alt="" />
    </div>
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
export const partialSolutions: Record<string, string> = {
  SUPERIOR: "Full name, please.",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
