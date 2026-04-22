import { CopyData } from "~/lib/copy";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "ubpcosu-i";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <p>
        Speaking objectively or subjectively, there's something almost romantic
        about discovering a new language. Your professor has translated the
        following phrases, and left the rest to you:
      </p>
    </div>
    <div className="mb-4 overflow-x-auto">
      <table className="w-full max-w-3xl table-fixed border-collapse text-sm text-black">
        <colgroup>
          <col style={{ width: "42%" }} />
          <col style={{ width: "58%" }} />
        </colgroup>
        <tbody>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>eltosu bessu ustepi usile.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The woman hates strange worlds.
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>iltosu ustepi tunki usino.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The brave woman loves the world.
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki ennosu bespu ustite usino suso?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              Why does the man love sly horses?
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>eptosu ostite obole.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The men hate mangoes.
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki ustepi tunki usika suso?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              Why is the woman brave?
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki eptosu onnosu donku obono tete?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              How many brave horses love mangoes?
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>estosu ostite oboka.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The men are people.
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>istite pinke ustite usino.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The man loves the brave man.
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki oltosu dossu oboka tete?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              How many worlds are strange?
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki iptosu pissu ustepi usika suso?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              Why is the woman a strange mango?
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mb-4">
      From the phrases you know,
      <ul className="list-inside list-disc pl-4">
        <li>
          <i>kiki ostepi oboka tete?</i>
        </li>
        <li>
          <i>kiki ostosu donku oboka tete?</i>
        </li>
        <li>
          <i>kiki ostite obono tete?</i>
        </li>
        <li>
          <i>kiki okikiosu oboka tete?</i>
        </li>
      </ul>
    </div>
    There's one phrase left…
    <div className="overflow-x-auto">
      <table className="w-full max-w-3xl table-fixed border-collapse text-sm text-black">
        <colgroup>
          <col style={{ width: "42%" }} />
          <col style={{ width: "58%" }} />
        </colgroup>
        <tbody>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">(???)</td>
            <td className="border border-gray-400 px-3 py-2">
              The world hates sly men.
            </td>
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
  "text/plain": `Ubpcosu I			
Speaking objectively or subjectively, there's something almost romantic about discovering a new language. Your professor has translated the following phrases, and left the rest to you:			
			
eltosu bessu ustepi usile.		The woman hates strange worlds.	
iltosu ustepi tunki usino.		The brave woman loves the world.	
kiki ennosu bespu ustite usino suso?		Why does the man love sly horses?	
eptosu ostite obole.		The men hate mangoes.	
kiki ustepi tunki usika suso?		Why is the woman brave?	
kiki eptosu onnosu donku obono tete?		How many brave horses love mangoes?	
estosu ostite oboka.		The men are people.	
istite pinke ustite usino.		The man loves the brave man.	
kiki oltosu dossu oboka tete?		How many worlds are strange?	
kiki iptosu pissu ustepi usika suso?		Why is the woman a strange mango?	
			
From the phrases you know,			
kiki ostepi oboka tete?			
kiki ostosu donku oboka tete?			
kiki ostite obono tete?			
kiki okikiosu oboka tete?			
			
There's one phrase left…			
(???)		The world hates sly men.	`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="4">Ubpcosu I</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="4">Speaking objectively or subjectively, there&#39;s something almost romantic about discovering a new language. Your professor has translated the following phrases, and left the rest to you:</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">eltosu bessu ustepi usile.</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">The woman hates strange worlds.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">iltosu ustepi tunki usino.</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">The brave woman loves the world.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">kiki ennosu bespu ustite usino suso?</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">Why does the man love sly horses?</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">eptosu ostite obole.</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">The men hate mangoes.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">kiki ustepi tunki usika suso?</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">Why is the woman brave?</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">kiki eptosu onnosu donku obono tete?</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">How many brave horses love mangoes?</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">estosu ostite oboka.</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">The men are people.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">istite pinke ustite usino.</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">The man loves the brave man.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">kiki oltosu dossu oboka tete?</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">How many worlds are strange?</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">kiki iptosu pissu ustepi usika suso?</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:middle;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">Why is the woman a strange mango?</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">From the phrases you know,</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">kiki ostepi oboka tete?</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">kiki ostosu donku oboka tete?</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">kiki ostite obono tete?</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">kiki okikiosu oboka tete?</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">There&#39;s one phrase left…</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">(???)</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#efefef;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="2">The world hates sly men.</td></tr></tbody></table>`,
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
