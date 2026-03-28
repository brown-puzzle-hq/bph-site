import Image from "next/image";
import underwaterBasketweaving from "./basketweaving_image.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "underwater-basketweaving";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="max-w-3xl space-y-4 pb-4 text-center">
      <b>
        This is a metapuzzle. You will need to use some answers to puzzles from
        the Department rounds in order to solve it.
      </b>
    </div>
    <div className="mb-4 max-w-3xl space-y-4">
      <i>
        You're working on your final project, but your basket broke! Following
        the guidelines below and using your sense of direction to guide your
        turns will help you reconnect your basket's strands, and although the
        threads that remain are rigid by now, think about how much string you'll
        save by pulling the added threads tight!
      </i>
    </div>
    <div className="mb-4 max-w-3xl">
      <p className="font-bold">Project Guidelines:</p>
      <ol className="list-inside list-decimal">
        <li>
          Connect each colored pair using straight lines that can only travel at
          half-grid intervals.
        </li>
        <li>
          Lines may not overlap with one another (but they may cross each
          other).
        </li>
        <li>Lines may not cross or overlap with themselves.</li>
        <li>Two lines may not turn at the same point.</li>
        <li>Lines may not touch dots or boxes (until pulled tight).</li>
        <li>Each grid square is exactly 1 unit wide and 1 unit long.</li>
      </ol>
    </div>
    <div className="mb-4 flex justify-center">
      <Image
        src={underwaterBasketweaving}
        alt="Underwater Basketweaving"
        width={500}
        height={500}
      />
    </div>
    <div className="mb-4 max-w-3xl">
      <i>
        While weaving your basket, what answer to this puzzle would be as
        unnecessary as the concentration itself?
      </i>
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>
          <b>PERFORMING ARTS</b>: Cross(over)(word)
        </li>
        <li>
          <b>PERFORMING ARTS</b>: Going in Circles
        </li>
        <li>
          <b>PHYSICAL SCIENCES</b>: ####!
        </li>
        <li>
          <b>MATH</b>: Messy Placeholder
        </li>
        <li>
          <b>RISD</b>: Culinary Chemistry Lab
        </li>
        <li>
          <b>SOCIAL SCIENCES</b>: Intro to Ubpcosu: Final Exam
        </li>
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
