import PrimaryInvestigationWheel from "./PrimaryInvestigationWheel";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "primary-investigation";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 italic">
      I found a transcript and a color wheel. I wonder if I can figure out their
      favorites?
    </div>
    <div className="mb-4 space-y-4">
      <b>THE TRANSCRIPT:</b>
      <p>
        “My favorite color of the year is the one directly inwards from the
        favorite color of the person with the most complicated explanation.”
      </p>
      <p>
        “There is a color of the year with part of a flower in its name and
        another one with ‘blue’ in its name that are nearly on top of each
        other. My favorite is the one that is slightly further from the center.”
      </p>
      <p>
        “My favorite is the earliest color of the year that is on the right side
        of the wheel.”
      </p>
      <p>
        “My favorite color of the year is actually two! Specifically, out of the
        doubles my favorite is the pair that are closest together.”
      </p>
      <p>
        “For the double color of the year that is nobody’s favorite, mixing the
        color in that pair furthest from the center with the color of the year
        from 8 years prior roughly yields a color of the year (in the
        intermediary years). My favorite color is the first color of the year
        you intersect when drawing a line straight down from this mixed color.”
      </p>
    </div>
    <div className="mb-4">
      <b>THE COLOR WHEEL:</b>
    </div>

    <PrimaryInvestigationWheel />
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
export const authors = "Nate Chinman";

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
