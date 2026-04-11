import JigsawPuzzle from "./JigsawPuzzle";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "psychoceramics";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="w-full max-w-4xl">
    <div className="space-y-4 pb-4 text-center">
      <b>
        This is a metapuzzle. You will need to use some answers to puzzles from
        the Department rounds in order to solve it.
      </b>
    </div>
    <div className="mb-4 space-y-4">
      <p>
        My pottery usually gets top g-Rae-des, but they've shattered in the
        kiln.
      </p>
      <p>
        <i>How late will I be up redoing this assignment?</i>
      </p>
      <p className="font-bold md:hidden">
        NB: wider screen recommended for this puzzle!
      </p>
    </div>
    <div className="max-w-[calc(100vw-96px)] overflow-auto">
      <JigsawPuzzle />
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>
          <b>BUSINESS</b>: Rabbit 'Nundrum
        </li>
        <li>
          <b>HUMANITIES</b>: Card Game Theory
        </li>
        <li>
          <b>HUMANITIES</b>: Mischievous Literature
        </li>
        <li>
          <b>PERFORMING ARTS</b>: Escapism in Cinema
        </li>
        <li>
          <b>PHYSICAL SCIENCES</b>: Voting Dynamics
        </li>
        <li>
          <b>PHYSICAL SCIENCES</b>: Linesman Training
        </li>
        <li>
          Five electives from <b>RISD</b>
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
import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Megan Carlson, Bailey Merlino";

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
