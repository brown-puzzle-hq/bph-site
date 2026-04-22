import { CopyData } from "../../components/puzzle/CopyButton";
export const puzzleId = "multi-clef-composition";
import Image from "next/image";
import MCC1 from "./MCC_1.png";
import MCC2 from "./MCC_2.png";
import MCC3 from "./MCC_3.png";
import MCC4 from "./MCC_4.png";
import MCC5 from "./MCC_5.png";
import MCC6 from "./MCC_6.png";
import MCC7 from "./MCC_7.png";
import MCC from "./Updated Multi-Clef Composition (drawing).svg";

export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 text-center">
      <b>When in doubt, use Cornell as a canonical source for this puzzle.</b>
    </div>
    <div className="flex justify-center">
      <Image src={MCC} alt="" />
    </div>
  </div>
);

export const remoteBody = inPersonBody;

import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

export const authors = null;

export const copyText: CopyData = {
  "text/plain": `Multi-Clef Composition
When in doubt, use Cornell as a canonical source for this puzzle.`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Multi-Clef Composition</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:398px;left:3px;"><div style="float:left;">When in doubt, use Cornell as a canonical source for this puzzle.</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="width:505px;height:651px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="31" colspan="5"><span><div style="max-height:651px">=IMAGE("https://www.brownpuzzlehunt.com/_next/static/media/Updated%20Multi-Clef%20Composition%20(drawing).69f1ba43.svg")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>`,
};
export const partialSolutions: Record<string, string> = {};

export const tasks: Record<string, JSX.Element> = {};
