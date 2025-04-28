import Image from "next/image";
import Link from "next/link";
import MUSIC from "./sound-of-music.png";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "sound-of-music";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl items-center space-y-4 text-center">
    <div className="font-bold">
      This is a sequence metapuzzle. It uses feeders from the 🎼 sequence.
    </div>
    <div className="pb-2.5 italic">
      Identifying notes is an important musical skill.
    </div>
    <div className="max-w-3xl text-center">
      <Image src={MUSIC} /*width={800} height={800}*/ alt="" />
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
  <div className="max-w-3xl space-y-4">
    The three feeder answers for this puzzle are MINNOWS, ALTO RHAPSODY, and
    INDIANA JONES AND THE LAST CRUSADE. Each of these answers contains a{" "}
    <Link href="https://en.wikipedia.org/wiki/Solf%C3%A8ge">
      <span className="underline">solfege</span>
    </Link>{" "}
    note: MI in MINNOWS, SO in ALTO RHAPSODY, LA in INDIANA JONES AND THE LAST
    CRUSADE (note that SO is an alternate form of SOL). The sheet music solvers are
    given is in C major, so MI = E, SO = G, LA = A. If they map each word to the
    notes based on the solfege, then index into the word based on the beat (so
    if a note is the 18th beat in the measure, they extract the 18th letter),
    solvers will get CYANOCOCCUS NINE. CYANOCOCCUS is the scientific name for{" "}
    <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
      BLUEBERRY,
    </span>{" "}
    which is the answer to the puzzle.
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Malcolm Certain";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null; // Should be composed of the const variables up top

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
