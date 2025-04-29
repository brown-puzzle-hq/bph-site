import Image from "next/image";
// import WMR from "./WMR_Puzzle_Body.jpg";
import WMR from "./whats-my-ride.png";
import SOLUTION from "./whats-my-ride-solution.png";

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
  <div className="max-w-3xl items-center text-center">
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
  <div className="max-w-3xl space-y-4">
    <div>
      The puzzle depicts a family tree. Specifically, a family tree of Greek
      mythology. Emojis in boxes clue which Greek god goes in the given square.
      A filled-in family tree is shown here:
    </div>
    <Image src={SOLUTION} alt="solution image" />
    <div>
      The box with a question mark corresponds to APOLLO. Answering the question
      from the title, What's My Ride?, according to the enumeration of 3
      provided at the bottom of the puzzle, gives us our answer of{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        SUN.
      </span>
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Erin Finn";

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
