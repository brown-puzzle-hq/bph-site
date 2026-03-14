/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "maritime-studies";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <p>
        Looking through the logs of Captain George North, you find some unique
        passages.
      </p>
    </div>
    <div className="mb-4 overflow-x-auto">
      <table className="mx-auto w-full max-w-xl table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="border-border w-20 border px-3 py-2 text-left font-semibold">
              Day
            </th>
            <th className="border-border border px-3 py-2 text-left font-semibold">
              Bearings
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-muted/20">
            <td className="border-border border px-3 py-2 text-center tabular-nums">
              8
            </td>
            <td className="border-border border px-3 py-2">3.6 mi WSW</td>
          </tr>
          <tr className="odd:bg-muted/20">
            <td className="border-border border px-3 py-2 text-center tabular-nums">
              9
            </td>
            <td className="border-border border px-3 py-2">
              11.6 mi NNW; 3.5 mi WNW
            </td>
          </tr>
          <tr className="odd:bg-muted/20">
            <td className="border-border border px-3 py-2 text-center tabular-nums">
              10
            </td>
            <td className="border-border border px-3 py-2">
              3.5 mi W; 2.6 mi W
            </td>
          </tr>
          <tr className="odd:bg-muted/20">
            <td className="border-border border px-3 py-2 text-center tabular-nums">
              15
            </td>
            <td className="border-border border px-3 py-2">3.5 mi W</td>
          </tr>
          <tr className="odd:bg-muted/20">
            <td className="border-border border px-3 py-2 text-center tabular-nums">
              19
            </td>
            <td className="border-border border px-3 py-2">11.6 mi NNW</td>
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
export const authors = "Josiah Carberry";

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
