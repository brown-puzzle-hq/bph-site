/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "sunk-modern-naval-investigative-methodology";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-6">
    <div className="italic">
      To prevent expensive boats from hitting and damaging each other when they
      are docked, sailors put fenders in between the boats. For the purposes of
      this puzzle, people never put fenders diagonally.
    </div>
    <div className="italic">
      Also I want you to know two things about sailing that truly have nothing
      to do with this puzzle:
      <ol className="list-inside">
        <li>
          They are not 'ropes' on a boat, they are 'lines.' (So the answer to
          "How many ropes are there on this boat?" is always zero because they
          are lines.)
        </li>
        <li>
          Technically, the 'pier' is the physical structure that you walk on to
          get to the boat, and the 'dock' is the water surrounding the pier.
        </li>
      </ol>
    </div>

    <table className="mx-auto border border-black text-center">
      <tbody>
        <tr>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">C</td>
          <td className="border px-3 py-1">O</td>
          <td className="border px-3 py-1">N</td>
          <td className="border px-3 py-1">O</td>
          <td className="border px-3 py-1">C</td>
          <td className="border px-3 py-1">L</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">S</td>
          <td className="border px-3 py-1">T</td>
        </tr>

        <tr>
          <td className="border px-3 py-1">B</td>
          <td className="border px-3 py-1">L</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">C</td>
          <td className="border px-3 py-1">K</td>
          <td className="border px-3 py-1">S</td>
          <td className="border px-3 py-1">M</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">T</td>
          <td className="border px-3 py-1">H</td>
        </tr>

        <tr>
          <td className="border px-3 py-1">H</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">S</td>
          <td className="border px-3 py-1">T</td>
          <td className="border px-3 py-1">O</td>
          <td className="border px-3 py-1">R</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">C</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">L</td>
        </tr>

        <tr>
          <td className="border px-3 py-1">S</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">B</td>
          <td className="border px-3 py-1">B</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">T</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">C</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">L</td>
        </tr>

        <tr>
          <td className="border px-3 py-1">M</td>
          <td className="border px-3 py-1">E</td>
          <td className="border px-3 py-1">D</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">L</td>
          <td className="border px-3 py-1">L</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">S</td>
          <td className="border px-3 py-1">T</td>
          <td className="border px-3 py-1">S</td>
        </tr>

        <tr>
          <td className="border px-3 py-1">T</td>
          <td className="border px-3 py-1">E</td>
          <td className="border px-3 py-1">C</td>
          <td className="border px-3 py-1">H</td>
          <td className="border px-3 py-1">N</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">Q</td>
          <td className="border px-3 py-1">U</td>
          <td className="border px-3 py-1">E</td>
          <td className="border px-3 py-1">S</td>
        </tr>

        <tr>
          <td className="border px-3 py-1">O</td>
          <td className="border px-3 py-1">C</td>
          <td className="border px-3 py-1">C</td>
          <td className="border px-3 py-1">U</td>
          <td className="border px-3 py-1">P</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">T</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">O</td>
          <td className="border px-3 py-1">N</td>
        </tr>

        <tr>
          <td className="border px-3 py-1">T</td>
          <td className="border px-3 py-1">H</td>
          <td className="border px-3 py-1">E</td>
          <td className="border px-3 py-1">M</td>
          <td className="border px-3 py-1">S</td>
          <td className="border px-3 py-1">E</td>
          <td className="border px-3 py-1">L</td>
          <td className="border px-3 py-1">V</td>
          <td className="border px-3 py-1">E</td>
          <td className="border px-3 py-1">S</td>
        </tr>

        <tr>
          <td className="border px-3 py-1">Z</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">P</td>
          <td className="border px-3 py-1">P</td>
          <td className="border px-3 py-1">E</td>
          <td className="border px-3 py-1">R</td>
          <td className="border px-3 py-1">L</td>
          <td className="border px-3 py-1">E</td>
          <td className="border px-3 py-1">S</td>
          <td className="border px-3 py-1">S</td>
        </tr>

        <tr>
          <td className="border px-3 py-1">P</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">G</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">N</td>
          <td className="border px-3 py-1">A</td>
          <td className="border px-3 py-1">T</td>
          <td className="border px-3 py-1">I</td>
          <td className="border px-3 py-1">O</td>
          <td className="border px-3 py-1">N</td>
        </tr>
      </tbody>
    </table>

    <div>Hits:</div>

    <ul className="ml-6 list-disc">
      <li>Patrol Boat, B2</li>
      <li>Submarine, B4</li>
      <li>Destroyer, B9</li>
      <li>Battleship, E7</li>
      <li>Submarine, F2</li>
      <li>Aircraft Carrier, F9</li>
      <li>Patrol Boat, H6</li>
      <li>Destroyer, I4</li>
    </ul>

    <div>Misses:</div>

    <ul className="ml-6 list-disc">
      <li>A2</li>
      <li>A4</li>
      <li>A9</li>
      <li>D9</li>
      <li>E8</li>
      <li>F3</li>
      <li>F7</li>
      <li>G2</li>
      <li>H7</li>
      <li>I2</li>
      <li>I5</li>
      <li>I6</li>
      <li>J4</li>
      <li>J9</li>
    </ul>
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
export const authors = "Noah Elbaum";

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
