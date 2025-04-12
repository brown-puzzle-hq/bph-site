import Image from "next/image";
import fridge from "./fridge.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "fridge-magnets";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="space-y-4 max-w-3xl text-center">
      <b>
        This is a sequence metapuzzle. It uses feeders from the 🧩 sequence.
      </b>
    </div>
    <div className="max-w-3xl text-center">
      <Image src={fridge} width={800} height={800} alt="Fridge Magnets" />
    </div>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl">
    <div className="mb-6 text-center">
      Answer: <span className="bg-main-text hover:bg-inherit">DIAPER</span>.
    </div>
    <div className="mb-6 max-w-3xl">
      The feeders can be broken down into fragments (SUN)(DAY), (MIN)(NOW)(S),
      and (FA)(V)(OUR)(ITE) and arranged to form the answers, leaving some
      blanks. Here are the complete answers (which are clued by the emojis):
    </div>
    <ul className="mb-6 list-none">
      <li>(DI)(SUN)(ITE)</li>
      <li>(MIN)(E)</li>
      <li>(FA)(R)</li>
      <li>(S)(NOW)(DAY)</li>
      <li>(V)(AP)(OUR)</li>
    </ul>

    <div className="mb-6">
      To complete all of the answers, we needed to add these fragments: (DI),
      (E), (R), (AP). Anagramming these fragments gives{" "}
      <span className="bg-main-text hover:bg-inherit">DIAPER</span>.
    </div>
  </div>
);

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
