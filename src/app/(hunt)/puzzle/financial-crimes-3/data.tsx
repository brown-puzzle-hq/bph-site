/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "financial-crimes-3";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-6">
      This is a physical puzzle! Please send someone from your team to Friedman
      208 to pick it up.
    </div>
    <p className="pb-4">
      <i>
        Hollywood accounting gone wrong! A gang of crooks has been stealing from
        your movie company under your nose. Fortunately, your old friend
        Detective Bluenoir tipped you off with a list of suspects and the
        possibly fraudulent purchases they made. Maybe if you line up the
        thieves and their shady dealings, then confiscate the contraband, you’ll
        uncover who’s been putting them up to the task.
      </i>
    </p>
    <p className="pb-4">
      Bluenoir: “Hi there. It’s me, your old pal Bluenoir. Listen, I did some
      digging on your behalf, and I’ve identified some suspects. All 8 of them
      worked on your company’s recent biopic, North Dakota Williams and the
      Inscrutable MacGuffin. I also nabbed some shopping lists that were flagged
      for suspicious transactions. It’s your job to figure out who bought what
      and which purchases were, say, less than legitimate. I made some routine
      inquiries and gathered some personal information, but I’ve been forced
      into hiding due to some legal trouble, if you catch my drift. The rest is
      up to you. Go get ‘em, kid.”
    </p>
  </div>
);

export const remoteBoxBody = null;

export const remoteBody = null;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

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
