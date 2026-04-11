import Image from "next/image";

import rabbitsfront from "./rabbits_front.jpg";
import rabbitsback from "./rabbits_back.jpg";

import murder from "./murder.jpg";
import shifts from "./shifts.jpg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "rabbit-nundrum";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <div className="text-center">
      <b>
        This is a physical puzzle! Please come to HQ in Friedman 208 to pick it
        up.
      </b>
    </div>
    <div>
      Please read the GENERAL INSTRUCTIONS before any of the other instructions.
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <div>
      <b>
        This was a physical puzzle. In addition to the plush rabbits (below),
        solvers received a series of documents, which you can access{" "}
        <a href="https://drive.google.com/drive/folders/1Mypoz7cn6zmI0-88fX62ylPQgBFeR6MO">
          <u>here</u>
        </a>
        .
      </b>
    </div>
    <div className="max-w-3xl justify-center">
      <Image
        src={rabbitsfront}
        alt="A set of six rabbits, with colors (left to right) blue, brown, green, pink, purple, white. 
      They have the letters E, S, A, R, D, R on their fronts (left to right)."
        className="mb-5 mt-5"
      />
      <Image
        src={rabbitsback}
        alt="A set of six rabbits, with colors (left to right) blue, brown, green, pink, purple, white. 
      They have the letters R, T, N, H, R, I on their backs (left to right)."
      />
    </div>
  </div>
);
//
/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
import Solution from "./solution/solution.mdx";
// export const solutionBody = <Solution />;
export const solutionBody = null;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Aren Guralp and Thea Miller-Priddy";

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
  INSIDEHATTER: "Do what must be done.",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {
  INSIDEHATTER: (
    <div className="max-w-3xl space-y-6">
      <p>Do what you must.</p>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <Image src={murder} alt="A white rabbit, beheaded." />
        <Image
          src={shifts}
          alt="A slip of paper that says: SHIFT -8, +0, +0 +14, +15, +10, -2, +19, -15, -6, +16, -2"
        />
      </div>
    </div>
  ),
};

/**
 * Specifically for The Rabbit 'Nundrum, remoteTasks will be displayed instead of tasks
 * for remote teams. Make sure the keys match!
 */
export const remoteTasks = tasks;
