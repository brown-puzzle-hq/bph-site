import Image from "next/image";
import image from "./disguised_fin_crimes.png";
import { CopyData } from "../../components/puzzle/CopyButton";

export const puzzleId = "disguised-financial-crimes";

export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <div className="text-center">
      <b>
        This puzzle can be found on the 3rd floor of Page-Robinson Hall. You
        should bring your tape. If you are a non-Brown team whose solving room
        is not located in this building, please call us to get access.
      </b>
    </div>
    <div className="text-center">
      <b>We recommend using online tools to solve this puzzle.</b>
    </div>
    <div className="mb-4">
      <i>
        You and your partner, Detective Rolfsen, have finally unknotted the
        whole conspiracy: APMA-Econ majors are taxonomically lizards in
        disguise.
      </i>
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <i>
        You and your partner, Detective Rolfsen, have finally unknotted the
        whole conspiracy: APMA-Econ majors are taxonomically lizards in
        disguise.
      </i>
    </div>
    <div className="flex justify-center">
      {/* <div className="flex flex-col gap-4">
        <span>
          <Image src={image1} alt="" height="200" />
        </span>
        <span>
          <Image src={image3} alt="" height="200" />
        </span>
        <span>
          <Image src={image5} alt="" height="200" />
        </span>
        <span>
          <Image src={image7} alt="" height="200" />
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <span>
          <Image src={image2} alt="" height="200" />
        </span>
        <span>
          <Image src={image4} alt="" height="200" />
        </span>
        <span>
          <Image src={image6} alt="" height="200" />
        </span>
        <span>
          <Image src={image8} alt="" height="200" />
        </span>
      </div> */}
      <Image src={image} alt="Disguised Financial Crimes" />
    </div>
  </div>
);

import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

export const authors = "Thea Miller-Priddy and Eno Thomson-Tribe";

export const copyText = `Disguised Financial Crimes
This puzzle can be found on the 3rd floor of Page-Robinson Hall. You should bring your tape and red string. If you are a non-Brown team whose solving room is not located in this building, please call us to get access.

We recommend using online tools to solve this puzzle.

You and your partner, Detective Rolfsen, have finally unknotted the whole conspiracy: APMA-Econ majors are taxonomically lizards in disguise.`;

export const remoteCopyText: CopyData = {
  "text/plain": `Disguised Financial Crimes
You and your partner, Detective Rolfsen, have finally unknotted the whole conspiracy: APMA-Econ majors are taxonomically lizards in disguise.`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Disguised Financial Crimes</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;font-style:italic;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:903px;left:3px;"><div style="float:left;">You and your partner, Detective Rolfsen, have finally unknotted the whole conspiracy: APMA-Econ majors are taxonomically lizards in disguise.</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="width:808px;height:609px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="29" colspan="8"><span><div style="max-height:609px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/disguised_fin_crimes.6200de0e.png&w=3840&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>`,
};
export const partialSolutions: Record<string, string> = {};

export const tasks: Record<string, JSX.Element> = {};
