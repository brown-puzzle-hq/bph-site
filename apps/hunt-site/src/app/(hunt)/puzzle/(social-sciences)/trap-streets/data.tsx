import { CopyData } from "~/lib/copy";
import Image from "next/image";
import map from "./Map.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "trap-streets";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      <ol className="list-inside list-decimal">
        <li>Famous football family</li>
        <li>Serena _____ of tennis </li>
        <li>Fugi-_____, the avian criminal</li>
        <li>Star Wars: A New _____</li>
        <li>_____ Giulia, building named after a Pope</li>
        <li>_____ University of this puzzle hunt</li>
        <li>The pond of the eleventh hour</li>
        <li>Mean Girls protagonist _____ Heron</li>
      </ol>
    </div>
    <div>
      <Image src={map} alt="A map of Brown University" />
    </div>
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
export const authors = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */

export const copyText: CopyData = {
  "text/plain": `Trap Streets
1. Famous football family
2. Serena _____ of tennis
3. Fugi-_____, the avian criminal
4. Star Wars: A New _____
5. _____ Giulia, building named after a Pope
6. _____ University of this puzzle hunt
7. The pond of the eleventh hour
8. Mean Girls protagonist _____ Heron`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Trap Streets</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">1. Famous football family</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">2. Serena _____ of tennis</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">3. Fugi-_____, the avian criminal</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">4. Star Wars: A New _____</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:297px;left:3px;"><div style="float:left;">5. _____ Giulia, building named after a Pope</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:297px;left:3px;"><div style="float:left;">6. _____ University of this puzzle hunt</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">7. The pond of the eleventh hour</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:297px;left:3px;"><div style="float:left;">8. Mean Girls protagonist _____ Heron</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;"></td></tr><tr style="height:21px;"><td style="width:606px;height:378px;overflow:hidden;vertical-align:bottom;" rowspan="18" colspan="6"><span><div style="max-height:378px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/Map.21478bdd.png&w=3840&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>`,
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
