import Image from "next/image";
import map from "./culinary_chemistry.png";
import { CopyData } from "../../components/puzzle/CopyButton";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "culinary-chemistry-lab";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="mb-4 flex justify-center">
    <Image src={map} alt="A map with 5 molecules and a question mark" />
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
export const authors = "Kaylee Gallagher";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText: CopyData = {
  "text/plain": `					
					
					
					
					
					
					
					
					
					
					
					
					
					
					`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="width:606px;height:315px;overflow:hidden;vertical-align:bottom;" rowspan="15" colspan="6"><span><div style="max-height:315px"><img src="https://www.brownpuzzlehunt.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fculinary_chemistry.d54056dc.png&amp;amp;w=3840&amp;amp;q=75" style="width:inherit;height:inherit;object-fit:scale-down;object-position:left bottom;pointer-events:none;"/></div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr></tbody></table>`,
  "application/x-vnd.google-docs-internal-clip-id": `dbbf161a-7fff-a817-b8bd-d1c5246eb99d`,
  "application/x-vnd.google-spreadsheet-compact-table+json": `{"1":1,"2":[203,-89,0],"3":{"1":[3],"5":[{"1":7,"8":{"1":"https://www.brownpuzzlehunt.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fculinary_chemistry.d54056dc.png&w=3840&q=75","2":1}}]},"4":[{"2":4224,"10":2,"15":"Arial"}],"5":[0],"8":["=IMAGE(\\"https://www.brownpuzzlehunt.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fculinary_chemistry.d54056dc.png&w=3840&q=75\\")"],"9":[0],"12":[15],"13":[6],"15":{"1":15,"2":6},"20":90}`,
};

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {
  BASMATI: "Two words, please."
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
