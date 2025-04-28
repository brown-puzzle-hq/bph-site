import Game from "./Game";
import Image from "next/image";
import screen_img from "./screen.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "one-guard-screen";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = <Game />;

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      This puzzle is a play on the single particle double slit experiment from
      quantum physics. In this experiment, if one observes (typically with
      particle detectors) which slit the particle goes through, the particle
      will go through the slit and straight to the screen. However, if the two
      slits are not observed and instead only the screen is observed,
      interference patterns appear in the same manner as if constant streams of
      particles were fired through both slits, due to the particle interfering
      with itself. The result of this is shown below:
    </div>
    <div className="mt-8 flex flex-col items-center space-y-2">
      <Image src={screen_img} width={500} height={500} alt="" />
    </div>
    <div className="mb-4">
      By these interference patterns, areas of light and darkness alternate on
      the screen.
    </div>
    <div>
      When the entire puzzle (including the slits) is observed, the guard walks
      straight from the slit to the screen, the same as in the double slit
      experiment. By resizing the window such that only the screen is visible,
      this interference pattern will be created, illuminating letters on the
      wall in this alternating pattern. By letting the simulation run enough
      times (speeding it up can be helpful), the guard will eventually reveal,
      from top to bottom, the letters{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        NATIONAL SECURITY,
      </span>{" "}
      which is the answer.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors =
  "Nate Chinman, Nicholas Cressman, Jack de Haan, Thomas Gordon";

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
