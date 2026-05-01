import Image from "next/image";
import mov1 from "./MOVABLE CHORALE.svg";
import { CopyData } from "~/lib/copy";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "collaborative-chorale";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <i>
        Alex, Blake, Casey, and Drew decide to practice a measure from a
        four-part chorale by taking turns singing their respective parts.
        Instead of lyrics, each singer chooses their preferred system: either
        movable-do solfege or letter names. You want to know what this practice
        routine sounds like, but you are missing some key information…
      </i>
    </div>
    <div className="mb-4 flex justify-center">
      <Image className="bg-white" src={mov1} alt="Music notation" />
    </div>
    <ul className="list-disc">
      <li>The first person sings the tonic.</li>
      <li>The second person reads in bass clef.</li>
      <li>The third person sings an outer voice.</li>
      <li>The last person uses movable-do solfege.</li>
      <li>Alex sings before the bass.</li>
      <li>Blake sings before the tenor.</li>
      <li>Casey sings after the alto.</li>
      <li>Drew sings higher than Alex.</li>
      <li>Alex and Casey use the same system.</li>
      <li>Blake and Casey read in different clefs.</li>
      <li>The missing key signature has no sharps.</li>
      <li>Exactly three letter names are sung in total.</li>
      <li>None of the letter names require sharps or flats.</li>
    </ul>
  </div>
);

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Dylan Schenker";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText: CopyData = {
  "text/plain": `Collaborative Chorale
Alex, Blake, Casey, and Drew decide to practice a measure from a four-part chorale by taking turns singing their respective parts. Instead of lyrics, each singer chooses their preferred system: either movable-do solfege or letter names. You want to know what this practice routine sounds like, but you are missing some key information…
The first person sings the tonic.
The second person reads in bass clef.
The third person sings an outer voice.
The last person uses movable-do solfege.
Alex sings before the bass.
Blake sings before the tenor.
Casey sings after the alto.
Drew sings higher than Alex.
Alex and Casey use the same system.
Blake and Casey read in different clefs.
The missing key signature has no sharps.
Exactly three letter names are sung in total.
None of the letter names require sharps or flats.`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">Collaborative Chorale</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="6">Alex, Blake, Casey, and Drew decide to practice a measure from a four-part chorale by taking turns singing their respective parts. Instead of lyrics, each singer chooses their preferred system: either movable-do solfege or letter names. You want to know what this practice routine sounds like, but you are missing some key information…</td></tr><tr style="height:21px;"><td style="width:606px;height:294px;overflow:hidden;vertical-align:bottom;" rowspan="14" colspan="6"><span><div style="max-height:294px">=IMAGE("https://www.brownpuzzlehunt.com/_next/static/media/MOVABLE%20CHORALE.87cd6db8.svg")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">The first person sings the tonic.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">The second person reads in bass clef.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">The third person sings an outer voice.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">The last person uses movable-do solfege.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">Alex sings before the bass.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">Blake sings before the tenor.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">Casey sings after the alto.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">Drew sings higher than Alex.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">Alex and Casey use the same system.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">Blake and Casey read in different clefs.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">The missing key signature has no sharps.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">Exactly three letter names are sung in total.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">None of the letter names require sharps or flats.</td></tr></tbody></table>`,
};

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
