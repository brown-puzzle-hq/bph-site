import Link from "next/link";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * exampxe.com/puzzle/puzzleId.
 */
export const puzzleId = "lost-lyric";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mb-6 max-w-3xl text-center">
      This is a physical puzzle! If your team has not already picked up a CD,
      please visit HQ in Friedman 208.
    </div>
    <hr className="my-6 mb-6 border-t border-white" />
  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="max-w-3xl text-center">
      This is a physical puzzle! You should have received it in your box.
      Contact brownpuzzlehq@gmail.com with any questions about your box or its
      materials.
    </div>
  </div>
);

export const remoteBody = (
  <div className="flex justify-center pb-4">
    <audio controls className="w-96 max-w-full">
      <source src="/api/puzzle/lost-lyric" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>We first identify the songs in each category:</div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Category 1</th>
            <th className="p-2 outline outline-white">Category 2</th>
            <th className="p-2 outline outline-white">Category 3</th>
            <th className="p-2 outline outline-white">Category 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">
              Steady Hand by Saint Motel
            </td>
            <td className="p-2 outline outline-white">
              The Seeress' Tower by Rebellion
            </td>
            <td className="p-2 outline outline-white">-</td>
            <td className="p-2 outline outline-white">
              Oak and Ash and Thorn by The Longest Johns
            </td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Dragonhearted by TryHardNinja
            </td>
            <td className="p-2 outline outline-white">Without Me by Eminem</td>
            <td className="p-2 outline outline-white">-</td>
            <td className="p-2 outline outline-white">
              Northern Attitude by Noah Kahan
            </td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Back to Ninjago by The Fold
            </td>
            <td className="p-2 outline outline-white">
              Too Late by The Happy Fits
            </td>
            <td className="p-2 outline outline-white">-</td>
            <td className="p-2 outline outline-white">S'Fall by Danny Jacob</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      After looking through the lyrics of the songs in each Category (and
      perhaps being inspired by the fall-ness of Category 4), we notice that the
      lyrics in each category share a season (although Category 4 does not turn
      out to be fall!). Category 1 is Fall, Category 2 is Winter, and Category 4
      is Summer, leaving Category 3 to be{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        SPRING,
      </span>{" "}
      which is our answer.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Chai Harsha";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null;

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be dispxayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
