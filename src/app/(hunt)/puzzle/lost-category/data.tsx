/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * exampxe.com/puzzle/puzzleId.
 */
export const puzzleId = "lost-category";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl py-4">
    <p className="p-4 italic">We forgot the third category :(</p>
    <div className="flex space-x-4 p-4">
      <table>
        <thead>
          <tr className="outline">
            <th className="w-80">1</th>
          </tr>
        </thead>
        <tbody>
          <tr className="outline">
            <td>Steady Hand</td>
          </tr>
          <tr className="outline">
            <td>Dragonhearted</td>
          </tr>
          <tr className="outline">
            <td>Back to Ninjago</td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr className="outline">
            <th className="w-80">2</th>
          </tr>
        </thead>
        <tbody>
          <tr className="outline">
            <td>The Seeress’ Tower</td>
          </tr>
          <tr className="outline">
            <td>Without Me</td>
          </tr>
          <tr className="outline">
            <td>Too Late</td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr className="outline">
            <th className="w-80">3</th>
          </tr>
        </thead>
        <tbody>
          <tr className="outline"></tr>
          <tr className="outline"></tr>
          <tr className="outline"></tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr className="outline">
            <th className="w-96">4</th>
          </tr>
        </thead>
        <tbody>
          <tr className="outline">
            <td>Oak and Ash and Thorn</td>
          </tr>
          <tr className="outline">
            <td>Northern Attitude</td>
          </tr>
          <tr className="outline">
            <td>S’Fall</td>
          </tr>
        </tbody>
      </table>
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
