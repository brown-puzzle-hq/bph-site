import Link from "next/link";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "linesman-training";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 text-center">
      <b>
        This is a physical puzzle that you should have received at kickoff! If
        you think you did not receive the required materials, please come to HQ
        in Friedman 208 to pick them up.
      </b>
    </div>
    <div>
      <i>
        Make sure you're face-to-face to observe the flags, though keep all text
        hidden. We've given notches on a few tiles—be sure to line them up to
        help you put things together.
      </i>
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <i>
        Make sure you're face-to-face to observe the flags, though keep all text
        hidden. We've given notches on a few tiles—be sure to line them up to
        help you put things together.
      </i>
    </div>
    <div>
      This was a physical puzzle. To solve it remotely, follow the instructions:
      <ol className="list-inside">
        <li>
          Print{" "}
          <Link
            href="https://docs.google.com/presentation/d/1zezd6n8t7lveIOV519fZqVYo0ewhtn53gsOluQHQ7rQ/edit?usp=sharing"
            className="text-link hover:underline"
          >
            this document,
          </Link>{" "}
          ensuring the following settings:
          <ul className="list-inside pl-4">
            <li>Letter paper (cardstock recommended, but not necessary)</li>
            <li>Color</li>
            <li>Double-sided</li>
            <li>100% scale</li>
          </ul>
        </li>
        <li>
          The shapes should then be cut out; use the black borders on the back
          of each page to cut out the pentagons and hexagons. Scraps can be
          discarded. Solvers were also given tape, which may be useful.
        </li>
      </ol>
      <div className="mt-4">These instructions are not a puzzle.</div>
    </div>
  </div>
);

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
export const copyText = `Linesman Training
Make sure you're face-to-face to observe the flags, though keep all text hidden. We've given notches on a few tiles—be sure to line them up to help you put things together.`;

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
export const tasks: Record<string, JSX.Element> = {
  KICKME: (
    <div className="max-w-3xl">
      You heard the ball! Send a video of your team kicking the ball to
      brownpuzzlehq@gmail.com (you will not need the ball anymore).
    </div>
  ),
};
