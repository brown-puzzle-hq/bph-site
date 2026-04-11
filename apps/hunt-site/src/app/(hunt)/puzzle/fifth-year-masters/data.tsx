/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "fifth-year-masters";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 text-center font-bold">
      This puzzle is a capstone. It uses the structure of the hunt (but not any
      puzzle titles or answers).
    </div>
    <div className="mb-4">
      You've done 11 concentrations during your time here… but something was
      missing from each of them.
      <br />
      If you add that missing piece, you'll be able to learn something new.
    </div>
    <div className="mb-4">
      <i>What do you need to complete your education?</i>
    </div>
    <div className="flex justify-center">
      <table className="mb-4 border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="px-4 py-2 text-left font-medium underline">
              Department
            </th>
            <th className="px-4 py-2 text-left font-medium underline">
              Course Code
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Business</td>
            <td className="px-4 py-2">Bacteria or viruses</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Humanities</td>
            <td className="px-4 py-2">Gradually narrow</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Math</td>
            <td className="px-4 py-2">Insular religious sects</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Performing Arts</td>
            <td className="px-4 py-2">The way in</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Physical Sciences</td>
            <td className="px-4 py-2">City-ish</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">RISD</td>
            <td className="px-4 py-2">Creased, or having an inner layer</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Social Sciences</td>
            <td className="px-4 py-2">Enclosed, or reconnoitered</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="flex justify-center">
      <table className="mb-4 border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="px-4 py-2 text-left font-medium underline">
              Things to Learn
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Renounce a belief</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Rendering worse, through addition</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">
              Transmitted on a subscription television
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Gives up hope</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Sums that fund research</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Swiss cereal</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">People who cultivate plants, to sell</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Silhouettes</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Track for aspiring doctors</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2">Detector</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Ornamental lining in architecture</td>
          </tr>
        </tbody>
      </table>
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
