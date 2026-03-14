/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "applied-probability";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-2">
    <div className="mb-6 italic">
      I’d bet your grade will be a single zero if you can’t spin a solution.
    </div>

    <div className="text-red-600">GLaDOS’s weapon of choice (10)</div>
    <div className="text-black">Asbestos-induced cancer (12)</div>

    <div className="text-red-600">
      <span className="italic">Gossip Girl</span> actor (2 8)
    </div>

    <div className="text-black">Biological catalyst (6)</div>
    <div className="text-red-600">
      Metabolic pathway that breaks down glucose (10)
    </div>
    <div className="text-black">One who reads without posting (6)</div>
    <div className="text-red-600">Phallic West Coast clam (7)</div>
    <div className="text-black">Lime or eggs, in baking (9)</div>
    <div className="text-red-600">
      Something you can get close to, but never reach (9)
    </div>
    <div className="text-black">Paperboys (7)</div>
    <div className="text-black">Dispose of glass or cardboard (7)</div>
    <div className="text-red-600">
      Animal chef in Everything Everywhere All at Once (7)
    </div>
    <div className="text-black">
      Video game series spanning RTS, MMORPG, and CCG genres (8)
    </div>
    <div className="text-red-600">Boxing franchise (5)</div>
    <div className="text-black">Dynamite of film (8)</div>
    <div className="text-red-600">Bears are often in this (11)</div>
    <div className="text-black">Slander (6)</div>
    <div className="text-red-600">Causes of trade deficits (7)</div>
    <div className="text-red-600">Common homes for dragons (8)</div>
    <div className="text-black">
      Like a Cauchy sequence in a compact metric space (10)
    </div>
    <div className="text-red-600">
      2024 Carolina Panthers first round pick (6 7)
    </div>
    <div className="text-black">Top chess engine (9)</div>
    <div className="text-red-600">Responsiveness, in economics (10)</div>
    <div className="text-black">Pitch (3)</div>
    <div className="text-red-600">Doctor with many contacts (15)</div>
    <div className="text-black">Arugula (6)</div>
    <div className="text-red-600">
      Deafening silence and alone together, for two (9)
    </div>
    <div className="text-black">Nothingness (8)</div>
    <div className="text-black">Overdose prevention drug (8)</div>
    <div className="text-red-600">State for the nonbelieving (6)</div>
    <div className="text-black">Shelf dweller (3)</div>
    <div className="text-red-600">Recipe components (11)</div>
    <div className="text-black">Zwischenzug (10)</div>
    <div className="text-red-600">Hades’ home (10)</div>
    <div className="text-black">Philanthropist (5)</div>
    <div className="text-red-600">Disciples of Ayn Rand (12)</div>
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
export const authors = "Malcolm Certain";

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
