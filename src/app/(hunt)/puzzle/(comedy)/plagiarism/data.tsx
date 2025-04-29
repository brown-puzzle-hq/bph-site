import Image from "next/image";
import DINING from "./images/2dining.png";
import FOOTBALL from "./images/4football.png";
import ECON from "./images/5economics.png";
import RADIO from "./images/6radio.png";
import STATE from "./images/7state.png";
import OTHER from "./images/8other.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "plagiarism";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="max-w-2xl p-4">
      <p>
        We were too lazy to write our own puzzle, so we stole a puzzle from the
        CMU Spring 2025 Puzzlehunt. (Yes, the one that's happening right now.)
      </p>
      <br></br>
      <p>
        <a href="https://puzzlehunt.club.cc.cmu.edu/protected/hunt/27/files/puzzle_28001_28001-index.html">
          <u>You can view their puzzle here.</u>
        </a>
      </p>
    </div>
  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="max-w-2xl p-4">
      <p>
        We were too lazy to write our own puzzle, so we stole a puzzle from the
        CMU Spring 2025 Puzzlehunt. (Yes, the one that happened last week.)
      </p>
      <br></br>
      <p>
        <a href="https://puzzlehunt.club.cc.cmu.edu/puzzle/28001/view/">
          <u>You can view their puzzle here.</u>
        </a>
      </p>
    </div>
  </div>
);

export const remoteBody = remoteBoxBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      This puzzle directs you to a puzzle from a different puzzlehunt; A Local
      Knowledge Puzzle from CMU Puzzlehunt Spring 2025! Happily enough, this
      hunt ran in-person on exactly the same weekend as Brown Puzzlehunt's
      in-person weekend.
    </div>
    <div>
      The puzzle seems to be a set of eight clues, each of which is talking
      about some aspect of CMU's campus, alumni, or culture. Solving each of the
      clues gives a letter; all eight letters together spell the answer for the
      puzzle in their hunt. If you want to know the answer to their puzzle, go
      read their solution.
    </div>
    <div>
      We might (and many did!) try and submit the answer to their puzzle for
      this one; however, this doesn't work. If only it were that simple.
    </div>
    <div>
      However, these clues seem to be written in a very strange way; instead of
      mentioning CMU, they refer to “our university”. If we wilfully
      misinterpreted these clues to be about Brown University instead, we
      instead extract a different letter:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Clue #</th>
            <th className="p-2 outline outline-white">Clued Item(s)</th>
            <th className="p-2 outline outline-white">Extracted Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">
              Faunce House (president #9)
              <br />
              Brown University
            </td>
            <td className="p-2 outline outline-white">V</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">Sharpe Refectory</td>
            <td className="p-2 outline outline-white">A</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">Kendrick Lamar</td>
            <td className="p-2 outline outline-white">M</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">James Perry</td>
            <td className="p-2 outline outline-white">P</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">Vernon L Smith</td>
            <td className="p-2 outline outline-white">I</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">WBRU</td>
            <td className="p-2 outline outline-white">R</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">Rhode Island</td>
            <td className="p-2 outline outline-white">E</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">8</td>
            <td className="p-2 outline outline-white">RISD</td>
            <td className="p-2 outline outline-white">S</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      This gives us our parasitic answer:{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        VAMPIRES.
      </span>
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Thomas Gordon and Ryan Judge (from CMU!)";

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
