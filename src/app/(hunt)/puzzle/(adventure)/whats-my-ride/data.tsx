import Image from "next/image";
// import WMR from "./WMR_Puzzle_Body.jpg";
import WMR from "./whats-my-ride.png";
import SOLUTION from "./WMR_Solution.jpg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "whats-my-ride";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl text-center items-center">
    <Image
      src={WMR}
      // width={500}
      // height={500}
      alt=""
      className="pb-4"
    />
    <p className="text-4xl">3️⃣</p>
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
    <p className="mb-4">
      This puzzle is a family tree based on Greek myth. Specifically, Apollo’s
      family tree. The solvers need to ID that this is 1) a family tree, 2)
      about Greek myth, 3) that Apollo is the ? in the middle, and 4) the 3
      emoji at the bottom and the title should direct them to answer{" "}
      <span className="text-main-accent">SUN</span>. If they are guessing
      SUNCHARIOT or CHARIOT instead, just clue them to check the emoji at the
      bottom of the page. Attached is a rough version of the family tree with
      all the names written in instead of the emojis to help if they seem to be
      hung up on one or another.
    </p>
    <Image
      src={SOLUTION}
      width={500}
      height={500}
      alt="solution image"
      className="mx-auto"
    />
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
export const partialSolutions: Record<string, string> = {
  CHARIOT: "Check the bottom!",
  SUNCHARIOT: "Check the bottom!",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
