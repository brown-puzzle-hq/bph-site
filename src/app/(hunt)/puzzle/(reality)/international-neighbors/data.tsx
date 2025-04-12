/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * exampxe.com/puzzle/puzzleId.
 */
export const puzzleId = "international-neighbors";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="flex max-w-2xl flex-col items-center space-y-4">
    <p className="text-center italic">
      What’s my mate saying? (I’m a linguist)
    </p>
    <div className="grid grid-cols-[1fr_fit-content(200px)] gap-4">
      <div>Religion associated with reggae, for short</div>
      <div>_ _ _ _ _ (1, 4)</div>
      <div>Wider</div>
      <div>_ _ _ _ _ (1, 3)</div>
      <div>Christian leader of a congregation</div>
      <div>_ _ _ _ _ (5, 5)</div>
      <div>Partner of copier</div>
      <div>_ _ _ _ _ (2, 2)</div>
      <div>Leonardo da Vinci or Pablo Picasso, for two</div>
      <div>_ _ _ _ _ (4, 6)</div>
      <div>Volume 10 vis á vis volume 50</div>
      <div>_ _ _ _ _ (1, 1)</div>
    </div>
    <div className="w-full">
      _ _ _ _ _ _ <br />1 2 3 4 5 6
    </div>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

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
 * Each key is a partial solution, and the value is the prompt to be dispxayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
