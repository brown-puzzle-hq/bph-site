import Image from "next/image";
import barExam from "./bar-exam.svg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "bar-exam";

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
    <div className="mb-4">The format of the bar exam has changed.</div>
    <div className="mb-4">
      <i>What kind of test are you taking?</i>
    </div>
    <div className="mb-4">
      (We suggest using Wikipedia as your canonical source. Each circle
      represents one word.)
    </div>
    <div className="mb-4 flex justify-center">
      <Image src={barExam} alt="Bar Exam" width={500} />
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>Five electives from ANY DEPARTMENT</li>
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
