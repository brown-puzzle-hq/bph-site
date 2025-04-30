import { cn } from "~/lib/utils";

const DATA =
  "T, , , , 👁️, , , ,⬜, , , , , , 👁️, ,⬜,⬜, , , , , 👁️, , , ,⬜, , , , , , 👁️, , ,⬜,⬜, , , , 👁️, , , , ,⬜, , , , , 👁️, , ,⬜,⬜, , , , 👁️, , ,⬜,⬜";
const SOL_DATA =
  "T,R,O,P,👁️,C,A,L,⬜,T,A,X,P,A,👁️,D,⬜,⬜,V,A,M,P,👁️,R,E,S,⬜,S,E,C,U,R,👁️,T,Y,⬜,⬜,N,A,T,👁️,O,N,A,L,⬜,M,A,R,T,👁️,A,L,⬜,⬜,A,R,T,👁️,S,T,⬜,⬜";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "eye-to-eye";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <div className="font-bold">
      This is a sequence metapuzzle. It uses feeders from the 👁️ sequence.
    </div>
    <div className="pb-2.5 italic">
      Only one of my eyes ever work... What do I need to fix my eyesight?
    </div>
    <div className="mx-auto grid w-full max-w-80 grid-cols-9 border text-center text-lg font-bold leading-8">
      {DATA.split(",").map((cell, index) => (
        <div
          key={index}
          className={cn("aspect-square border", cell === "⬜" && "bg-white")}
        >
          {cell !== "⬜" && cell}
        </div>
      ))}
    </div>
  </div>
);

// Flagging: need actual emoji integration here

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      Upon looking at the grid, we can see that the words of the feeders each
      fit in one row of the grid such that the eye l-eye-nes up with an I in the
      word. Filling the grid yields (green highlight added):
    </div>

    <div className="mx-auto grid w-full max-w-80 grid-cols-9 border text-center text-lg font-bold leading-8">
      {SOL_DATA.split(",").map((cell, index) => {
        const col = index % 9;
        const isGreen = col === 4 || col === 5;
        return (
          <div
            key={index}
            className={cn(
              "aspect-square border",
              cell === "⬜" && "bg-white",
              isGreen && "bg-green-400",
            )}
          >
            {cell !== "⬜" && cell}
          </div>
        );
      })}
    </div>
    <div>
      Looking at the letters that fill the missing eye in the pair of eyes in
      each row, we can visually read off the answer:{" "}
      <span className="font-bold text-main-accent">CARROTS</span>.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Arnav Singhal and Thomas Gordon";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */

export const copyText = `
  <style type="text/css">
  .tg {
    border-collapse: separate;
    border-spacing: 0;
  }
  .tg td {
    border: none;
  }
  .tg tr:first-child td,
  .tg tr:first-child th {
    border-top: 2px solid black;
  }
  .tg tr:last-child td,
  .tg tr:last-child th {
    border-bottom: 2px solid black;
  }
  .tg tr td:first-child,
  .tg tr th:first-child {
    border-left: 2px solid black;
  }
  .tg tr td:last-child,
  .tg tr th:last-child {
    border-right: 2px solid black;
  }
  .tg .tg-87il{background-color:#000000;text-align:left;vertical-align:bottom}
  .tg .tg-ttet{background-color:#000000;text-align:left;vertical-align:bottom}
  .tg .tg-1tnc{background-color:#000000;color:#333333;font-weight:bold;text-align:center;vertical-align:top}
  .tg .tg-fll5{font-weight:bold;text-align:center;vertical-align:bottom}
  .tg .tg-za14{text-align:left;vertical-align:bottom}
  </style>
  <table class="tg">
  <tbody>
    <tr>
      <th class="tg-fll5"><span style="font-weight:bold">T</span></th>
      <th class="tg-za14"></th>
      <th class="tg-za14"></th>
      <th class="tg-za14"></th>
      <th class="tg-fll5"><span style="font-weight:bold">👁️</span></th>
      <th class="tg-za14"></th>
      <th class="tg-za14"></th>
      <th class="tg-za14"></th>
      <th class="tg-ttet"></th>
    </tr>
    <tr>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-fll5">👁️</td>
      <td class="tg-za14"></td>
      <td class="tg-1tnc"></td>
      <td class="tg-ttet"></td>
    </tr>
    <tr>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-fll5">👁️</td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-ttet"></td>
    </tr>
    <tr>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-fll5"><span style="font-weight:bold">👁️</span></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-ttet"></td>
    </tr>
    <tr>
      <td class="tg-87il"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-fll5"><span style="font-weight:bold">👁️</span></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
    </tr>
    <tr>
      <td class="tg-87il"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-fll5"><span style="font-weight:bold">👁️</span></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-ttet"></td>
    </tr>
    <tr>
      <td class="tg-87il"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-fll5"><span style="font-weight:bold">👁️</span></td>
      <td class="tg-za14"></td>
      <td class="tg-za14"></td>
      <td class="tg-ttet"></td>
      <td class="tg-ttet"></td>
    </tr>
  </tbody></table>`;

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
