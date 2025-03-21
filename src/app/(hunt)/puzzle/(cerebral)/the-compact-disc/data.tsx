import Image from "next/image";
import Disc from "./images/disc.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "the-compact-disc";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mb-4 max-w-3xl">
      This is a sequence metapuzzle. It uses feeders from the 💿 sequence.
    </div>
    <div className="mb-6 max-w-3xl text-center">
      <i>
        This is a physical puzzle! If your team has not already picked up a CD,
        please visit HQ in Friedman 208.
      </i>
    </div>
    <p className="p-4 italic">You take a minute (or several) to listen to your CD.</p>
    <div className="max-w-2xl p-4">
      <div className="flex justify-center pb-4">
        <Image src={Disc} alt="" width={500} height={500} />
      </div>
    </div>
  </div>
);

export const remoteBoxBody = (
<div>
<div className="mb-4 max-w-3xl">
  This is a sequence metapuzzle. It uses feeders from the 💿 sequence.
</div>
<div className="mb-6 max-w-3xl text-center">
  <i>
    This is a physical puzzle! It uses an object found in your box.
  </i>
</div>
<p className="p-4 italic">You take a minute (or several) to listen to your CD.</p>
<div className="max-w-2xl p-4">
  <div className="flex justify-center pb-4">
    <Image src={Disc} alt="" width={500} height={500} />
  </div>
</div>
</div>
);

export const remoteBody = (
<div>
<div className="mb-4 max-w-3xl">
  This is a sequence metapuzzle. It uses feeders from the 💿 sequence.
</div>
<p className="p-4 italic">You take a minute (or several) to listen to your CD.</p>
<div className="max-w-2xl p-4">
  <div className="flex justify-center pb-4">
    <Image src={Disc} alt="" width={500} height={500} />
  </div>
</div>
</div>
);

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
