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
      <p>We were too lazy to write our own puzzle, so we stole a 
        puzzle from the CMU Spring 2025 Puzzlehunt. 
        (Yes, the one that's happening right now.)</p>
      <br></br>
      <p><a href="https://puzzlehunt.club.cc.cmu.edu/protected/hunt/27/files/puzzle_28001_28001-index.html">
      <u>You can view their puzzle here.</u></a></p>
    </div>
  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="max-w-2xl p-4">
      <p>We were too lazy to write our own puzzle, so we stole a 
        puzzle from the CMU Spring 2025 Puzzlehunt. 
        (Yes, the one that happened last week.)</p>
      <br></br>
      <p><a href="https://puzzlehunt.club.cc.cmu.edu/puzzle/28001/view/">
      <u>You can view their puzzle here.</u></a></p>
    </div>
  </div>
);

export const remoteBody = remoteBoxBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = null;

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
