/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "anthropology-of-computers";

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
    <div className="max-w-3xl space-y-4 pb-4 text-center">
      Professor Conway hasn't told you what's going to be on the final — you're
      going in blind. So you stay up studying all night, taking no breaks
      between words, counting down until there's nothing left to review.
    </div>
    <div className="mb-4 max-w-3xl text-center">
      <i>What will the final exam be?</i>
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>
          <b>HUMANITIES</b>: Avionic Intersectionality
        </li>
        <li>
          <b>PHYSICAL SCIENCES</b>: Dirt
        </li>
        <li>
          Four electives from <b>MATH</b>
        </li>
        <li>
          Four electives from <b>SOCIAL SCIENCES</b>
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
export const authors = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `Anthropology of Computers
This is a metapuzzle. You will need to use some answers to puzzles from the Department rounds in order to solve it.
Professor Conway hasn't told you what's going to be on the final — you're going in blind. So you stay up studying all night, taking no breaks between words, counting down until there's nothing left to review.
What will the final exam be?

Concentration Requirements:
HUMANITIES: Avionic Intersectionality
PHYSICAL SCIENCES: Dirt
Four electives from MATH
Four electives from SOCIAL SCIENCES`;

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
