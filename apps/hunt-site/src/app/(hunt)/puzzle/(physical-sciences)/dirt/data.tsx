import Image from "next/image";
import dirt from "./dirt.svg";
import { CopyData } from "../../components/puzzle/CopyButton";

import bag12front from "./dirt_12_front.jpg";
import bag12back from "./dirt_12_back.jpg";
import bag34front from "./dirt_34_front.jpg";
import bag34back from "./dirt_34_back.jpg";
import bag56front from "./dirt_56_front.jpg";
import bag56back from "./dirt_56_back.jpg";
import bag78front from "./dirt_78_front.jpg";
import bag78back from "./dirt_78_back.jpg";
import bag910front from "./dirt_910_front.jpg";
import bag910back from "./dirt_910_back.jpg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "dirt";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-10">
      <b>
        This is a physical puzzle! Please come to HQ in Friedman 208 to pick it
        up.
      </b>
    </div>
    <div className="flex justify-around">
      <div className="flex flex-col gap-4 text-center font-bold">
        <span>↘</span>
        <span>News host</span>
        <span>Underskirt</span>
        <span>Small coin</span>
        <span>Campaigned for office</span>
      </div>
      <div className="flex flex-col gap-4 text-center font-bold">
        <span>→</span>
        <span>Ltd.</span>
        <span>Rock from space</span>
        <span>Yogi Bear, Rat, and Mole, for three</span>
        <span>Annulment</span>
      </div>
    </div>
    <div>
      <Image src={dirt} alt="A figure with many red triangles" />
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl">
    <div className="mb-10">
      <b>
        This was a physical puzzle. In addition to the information below,
        solvers received 10 bags of dirt:
      </b>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Image
          className="h-auto w-full"
          src={bag12front}
          alt="Two bags of dirt, numbered 1 and 2."
        />
        <Image
          className="h-auto w-full"
          src={bag12back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The middle and top mini-triangles are marked with a dot on the left and right bags, respectively."
        />
        <Image
          className="h-auto w-full"
          src={bag34front}
          alt="Two bags of dirt, numbered 3 and 4."
        />
        <Image
          className="h-auto w-full"
          src={bag34back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The top and top mini-triangles are marked with a dot on the left and right bags, respectively."
        />
        <Image
          className="h-auto w-full"
          src={bag56front}
          alt="Two bags of dirt, numbered 5 and 6."
        />
        <Image
          className="h-auto w-full"
          src={bag56back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The top and left mini-triangles are marked with a dot on the left and right bags, respectively."
        />
        <Image
          className="h-auto w-full"
          src={bag78front}
          alt="Two bags of dirt, numbered 7 and 8."
        />
        <Image
          className="h-auto w-full"
          src={bag78back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The middle and top mini-triangles are marked with a dot on the left and right bags, respectively."
        />
        <Image
          className="h-auto w-full"
          src={bag910front}
          alt="Two bags of dirt, numbered 9 and 10."
        />
        <Image
          className="h-auto w-full"
          src={bag910back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The middle mini-triangle of the left bag is marked with a dot on the left and right bags, respectively."
        />
      </div>
    </div>
    <div className="flex justify-around">
      <div className="flex flex-col gap-4 text-center font-bold">
        <span>↘</span>
        <span>News host</span>
        <span>Underskirt</span>
        <span>Small coin</span>
        <span>Campaigned for office</span>
      </div>
      <div className="flex flex-col gap-4 text-center font-bold">
        <span>→</span>
        <span>Ltd.</span>
        <span>Rock from space</span>
        <span>Yogi Bear, Rat, and Mole, for three</span>
        <span>Annulment</span>
      </div>
    </div>
    <div className="flex justify-center">
      <Image src={dirt} alt="A figure with many red triangles." />
    </div>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText: CopyData = {
  "text/plain": `Dirt			
			
↘		→	
News host		Ltd.	
Underskirt		Rock from space	
Small coin		Yogi Bear, Rat, and Mole, for three	
Campaigned for office		Annulment	
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Dirt</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">↘</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">→</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">News host</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Ltd.</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Underskirt</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Rock from space</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Small coin</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:297px;left:3px;"><div style="float:left;">Yogi Bear, Rat, and Mole, for three</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Campaigned for office</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Annulment</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="width:404px;height:336px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="16" colspan="4"><span><div style="max-height:336px"><img src="https://www.brownpuzzlehunt.com/_next/static/media/dirt.3d938dec.svg" style="width:inherit;height:inherit;object-fit:scale-down;object-position:left bottom;pointer-events:none;"/></div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr></tbody></table>`,
  "application/x-vnd.google-docs-embedded-grid_range_clip+wrapped": `{"dih":529742753,"data":"{\\"cid\\":\\"[[[\\\\\\"1481061969\\\\\\",0,24,1,5]]]\\",\\"grh\\":\\"<google-sheets-html-origin><style type=\\\\\\"text/css\\\\\\"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns=\\\\\\"http://www.w3.org/1999/xhtml\\\\\\" cellspacing=\\\\\\"0\\\\\\" cellpadding=\\\\\\"0\\\\\\" dir=\\\\\\"ltr\\\\\\" border=\\\\\\"1\\\\\\" style=\\\\\\"table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none\\\\\\" data-sheets-root=\\\\\\"1\\\\\\" data-sheets-baot=\\\\\\"1\\\\\\"><colgroup><col width=\\\\\\"100\\\\\\"/><col width=\\\\\\"100\\\\\\"/><col width=\\\\\\"100\\\\\\"/><col width=\\\\\\"100\\\\\\"/></colgroup><tbody><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\">Dirt</td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\">↘</td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\">→</td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\">News host</td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\">Ltd.</td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\">Underskirt</td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;\\\\\\"><div style=\\\\\\"white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;\\\\\\"><div style=\\\\\\"float:left;\\\\\\">Rock from space</div></div></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\">Small coin</td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;\\\\\\"><div style=\\\\\\"white-space:nowrap;overflow:hidden;position:relative;width:297px;left:3px;\\\\\\"><div style=\\\\\\"float:left;\\\\\\">Yogi Bear, Rat, and Mole, for three</div></div></td><td style=\\\\\\"border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;\\\\\\"><div style=\\\\\\"white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;\\\\\\"><div style=\\\\\\"float:left;\\\\\\">Campaigned for office</div></div></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\">Annulment</td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\"></td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"width:404px;height:336px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\" rowspan=\\\\\\"16\\\\\\" colspan=\\\\\\"4\\\\\\"><span><div style=\\\\\\"max-height:336px\\\\\\"><img src=\\\\\\"https://www.brownpuzzlehunt.com/_next/static/media/dirt.3d938dec.svg\\\\\\" style=\\\\\\"width:inherit;height:inherit;object-fit:scale-down;object-position:left bottom;pointer-events:none;\\\\\\"/></div></span></td></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr><tr style=\\\\\\"height:21px;\\\\\\"></tr></tbody></table>\\",\\"csm\\":\\"[null,null,[[[[\\\\\\"fPM0t5qECR8n38AZtLeSKQ==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"CotT3Vg67O4eHPsYw3MEsA==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"Bhb753M1+c6RIEcaTnfrYQ==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"IxrjI0jIH/71isD6gYe4eg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"KLKqwXP0GRMC09K+/OB2+Q==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"tE84T7UCyj6KAC1V7McBtQ==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"hwZcaY17MtrGBokESha/ow==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"NDDh7iiSGuXaGkLDXGql/w==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"ItOPCdATq1RTAh84kzcJ9Q==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"SP7G4lsG/mp3zaPWm979GA==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"Nf+HhQ4cZ3jMI74nIEkeEw==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"1B2M2Y8AsgTpgAmY7PhCfg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"pUCj6AEXlgmMR5RY+vCixg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]]]]\\"}","edi":"dkk2K1PtIXnRgux2eZVhTRqF2e8v_iL1HzZu3l9Nv_O2zD0yr0eXe_Dy6TmwrXFfay3q7RN3VQBm89vPeP6Jwu_D5yI-b3HZOVuf0a2IBElU","edrk":"xMUE2qceAns6TwNwBxmZ-D0WBIqbADfqt5OR46ll_TBf7xJ7uQ..","dct":"ritz","ds":false,"cses":false,"sm":"other"}`,
  "application/x-vnd.google-docs-internal-clip-id": `3b32b885-7fff-399b-506e-72de103c05ae`,
  "application/x-vnd.google-spreadsheet-compact-table+json": `{"1":1,"2":[195,-7,194,195,194,195,194,195,194,195,194,195,194,195,194,195,194,195,194,195,194,195,-5,194,203,-63,0],"3":{"1":[2,2,2,2,2,2,2,2,2,2,2,3],"4":["Dirt","↘","→","News host","Ltd.","Underskirt","Rock from space","Small coin","Yogi Bear, Rat, and Mole, for three","Campaigned for office","Annulment"],"5":[{"1":7,"8":{"1":"https://www.brownpuzzlehunt.com/_next/static/media/dirt.3d938dec.svg","2":1}}]},"4":[{"2":4224,"10":2,"15":"Arial"}],"5":[-33,0],"8":["=IMAGE(\\"https://www.brownpuzzlehunt.com/_next/static/media/dirt.3d938dec.svg\\")"],"9":[0],"12":[-32,1,16],"13":[-32,1,4],"15":{"1":24,"2":4},"20":96}`,
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
