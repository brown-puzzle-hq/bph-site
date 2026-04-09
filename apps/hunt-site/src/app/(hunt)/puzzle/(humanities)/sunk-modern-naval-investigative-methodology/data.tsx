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
  <div className="max-w-3xl">
    <div className="mb-4 italic">
      To prevent expensive boats from hitting and damaging each other when they
      are docked, sailors put fenders in between the boats. For the purposes of
      this puzzle, people never put fenders diagonally.
    </div>

    <table className="mx-auto mb-4 border border-black text-center">
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

    <div className="mb-4">
      Hits:
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
    </div>

    <div className="mb-4">
      Misses:
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
export const copyText = `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:1206px;left:3px;"><div style="float:left;">To prevent expensive boats from hitting and damaging each other when they are docked, sailors put fenders in between the boats. For the purposes of this puzzle, people never put fenders diagonally.</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:600px;left:3px;"><div style="float:left;">Also I want you to know two things about sailing that truly have nothing to do with this puzzle:</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:903px;left:3px;"><div style="float:left;">1. They are not &#39;ropes&#39; on a boat, they are &#39;lines.&#39; (So the answer to &quot;How many ropes are there on this boat?&quot; is always zero because they are lines.)</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:802px;left:3px;"><div style="float:left;">2. Technically, the &#39;pier&#39; is the physical structure that you walk on to get to the boat, and the &#39;dock&#39; is the water surrounding the pier.</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">C</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">O</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">N</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">O</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">C</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">L</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">T</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">B</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">L</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">C</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">K</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">M</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">T</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">H</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">H</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">T</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">O</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">R</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">C</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">L</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">B</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">B</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">T</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">C</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">L</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">M</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">E</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">D</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">L</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">L</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">T</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">T</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">E</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">C</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">H</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">N</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Q</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">U</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">E</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">O</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">C</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">C</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">U</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">P</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">T</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">O</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">N</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">T</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">H</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">E</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">M</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">E</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">L</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">V</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">E</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Z</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">P</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">P</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">E</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">R</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">L</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">E</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">S</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">P</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">G</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">N</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">T</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">O</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">N</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Hits:</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Misses:</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Patrol Boat, B2</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A2</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Submarine, B4</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A4</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Destroyer, B9</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">A9</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Battleship, E7</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">D9</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Submarine, F2</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">E8</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Aircraft Carrier, F9</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">F3</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Patrol Boat, H6</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">F7</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Destroyer, I4</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">G2</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">H7</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I2</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I5</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">I6</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">J4</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">J9</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr></tbody></table>`;

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
