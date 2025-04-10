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
  <div className="max-w-2xl py-4">
    <p className="p-4 italic">What’s my mate saying? (I’m a linguist)</p>
    <table className="py-4">
      <tbody>
        <tr>
          <td className="px-4">Religion associated with reggae, for short</td>
          <td className="px-4">_ _ _ _ _ (1, 4)</td>
        </tr>
        <tr>
          <td className="px-4">Wider</td>
          <td className="px-4">_ _ _ _ _ (1, 3)</td>
        </tr>
        <tr>
          <td className="px-4">Christian leader of a congregation</td>
          <td className="px-4">_ _ _ _ _ (5, 5)</td>
        </tr>
        <tr>
          <td className="px-4">Partner of copier</td>
          <td className="px-4">_ _ _ _ _ (2, 2)</td>
        </tr>
        <tr>
          <td className="px-4">Leonardo da Vinci or Pablo Picasso, for two</td>
          <td className="px-4">_ _ _ _ _ (4, 6)</td>
        </tr>
        <tr>
          <td className="px-4">Volume 10 vis á vis volume 50</td>
          <td className="px-4">_ _ _ _ _ (1, 1)</td>
        </tr>
      </tbody>
    </table>
    <p className="px-4 pt-4">_ _ _ _ _ _ </p>
    <p className="px-4">1 2 3 4 5 6</p>
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
