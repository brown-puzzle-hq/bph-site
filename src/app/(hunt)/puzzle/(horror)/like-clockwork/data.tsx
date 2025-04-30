import Image from "next/image";
import CLOCK from "./like_clockwork.svg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "like-clockwork";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="flex max-w-3xl flex-col items-center space-y-6">
    <b>This is a sequence metapuzzle. It uses feeders from the ⏰ sequence.</b>
    <Image src={CLOCK} alt="" />
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = <div className="max-w-3xl space-y-4">
  <div>
    In this puzzle, six gears (each with six teeth) are arranged in a circle. Interestingly enough, three of the gears contain words on the teeth, written counterclockwise: EERIER, HOISTS, and CARDIA.
  </div>
  <div>
    One of the gears is shown to be turning in a specific direction (clockwise). Because of how gears work, when that gear turns, then gears which are an odd distance away turn in the opposite direction, and gears which are an even distance away turn in the same direction.
  </div>
  <div>
    If we notice that the two feeder answers in this sequence are all six letter words, then we might realize that we can place the answers onto the blank gears. Specifically, we can place them onto the gears such that, as the gears spin around, each of the highlighted teeth could spell another six letter word. Using this, we can work out what 6-letter word can go on the remaining unfilled gear:
  </div>
  <div className="mb-6">
    The word BANNER goes on the fifth gear clockwise, with the B highlighted. The word JUNGLE goes on the fourth gear clockwise, with the E highlighted. This spells the following words:
  </div>

<div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white"># of Turns</th>
            <th className="p-2 outline outline-white">Spelled Phrase</th>
            <th className="p-2 outline outline-white">Full Word</th>
            <th className="p-2 outline outline-white">Missing Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">0</td>
            <td className="p-2 outline outline-white">BE?ORE</td>
            <td className="p-2 outline outline-white">BEFORE</td>
            <td className="p-2 outline outline-white">F</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">H?RALD</td>
            <td className="p-2 outline outline-white">HERALD</td>
            <td className="p-2 outline outline-white">E</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">E?SIGN</td>
            <td className="p-2 outline outline-white">ENSIGN</td>
            <td className="p-2 outline outline-white">N</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">TANNI?</td>
            <td className="p-2 outline outline-white">TANNIN</td>
            <td className="p-2 outline outline-white">N</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">RESCU?</td>
            <td className="p-2 outline outline-white">RESCUE</td>
            <td className="p-2 outline outline-white">E</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">JAI?ER</td>
            <td className="p-2 outline outline-white">JAILER</td>
            <td className="p-2 outline outline-white">L</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      The missing gear has the answer, <span className="font-bold text-main-accent">
          FENNEL</span>.
    </div>
</div>;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Thomas Gordon and Malcolm Certain";

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
