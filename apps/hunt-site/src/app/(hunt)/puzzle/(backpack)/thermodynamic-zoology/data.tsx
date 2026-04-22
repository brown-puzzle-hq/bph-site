import Image from "next/image";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";
import { CopyData } from "~/lib/copy";

export const puzzleId = "thermodynamic-zoology";

export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="space-y-4 pb-4 text-center">
      <b>
        This is a metapuzzle. You will need to use some answers to puzzles from
        the Department rounds in order to solve it.
      </b>
    </div>
    <div className="mb-4">
      Even though your animals are the same size, they've all been complaining
      about the heat.
    </div>
    <div className="mb-4">
      <i>Who could help them out?</i>
    </div>
    <div className="flex justify-center">
      <div className="mb-4 grid grid-cols-1 content-center">
        <Image src={image1} alt="Thermodynamic Zoology" height={100} />
        <Image src={image2} alt="Thermodynamic Zoology" height={100} />
        <Image src={image3} alt="Thermodynamic Zoology" height={100} />
        <Image src={image4} alt="Thermodynamic Zoology" height={100} />
        <Image src={image5} alt="Thermodynamic Zoology" height={100} />
        <Image src={image6} alt="Thermodynamic Zoology" height={100} />
        <Image src={image7} alt="Thermodynamic Zoology" height={100} />
      </div>
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>
          <b>MATH:</b> Analogical Semantics
        </li>
        <li>
          <b>MATH:</b> Primary Investigation
        </li>
        <li>
          Five electives from ANY NON-<b>MATH</b> DEPARTMENT
        </li>
      </ul>
    </div>
  </div>
);

export const remoteBody = inPersonBody;

import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

export const authors = null;

export const copyText: CopyData = {
  "text/plain": `Thermodynamic Zoology
Even though your animals are the same size, they've all been complaining about the heat.
Who could help them out?

Concentration Requirements:
MATH: Analogical Semantics
MATH: Primary Investigation
Five electives from ANY NON-MATH DEPARTMENT`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Thermodynamic Zoology</div></div></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:600px;left:3px;"><div style="float:left;">Even though your animals are the same size, they&#39;ve all been complaining about the heat.</div></div></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Who could help them out?</div></div></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="width:101px;height:105px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="5" colspan="1"><span><div style="max-height:105px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image1.e09e8914.png&w=256&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="width:101px;height:105px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="5" colspan="1"><span><div style="max-height:105px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image2.54a2b951.png&w=256&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="width:101px;height:105px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="5" colspan="1"><span><div style="max-height:105px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image3.27277cd1.png&w=256&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="width:101px;height:105px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="5" colspan="1"><span><div style="max-height:105px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image4.c5c8fab4.png&w=256&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="width:101px;height:105px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="5" colspan="1"><span><div style="max-height:105px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image5.c5c8fab4.png&w=256&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="width:101px;height:105px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="5" colspan="1"><span><div style="max-height:105px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image6.54a2b951.png&w=256&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="width:101px;height:105px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="5" colspan="1"><span><div style="max-height:105px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image7.27277cd1.png&w=256&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Concentration Requirements:</div></div></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">MATH: Analogical Semantics</div></div></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">MATH: Primary Investigation</div></div></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:398px;left:3px;"><div style="float:left;">Five electives from ANY NON-MATH DEPARTMENT</div></div></td></tr></tbody></table>`,
};

export const partialSolutions: Record<string, string> = {};

export const tasks: Record<string, JSX.Element> = {};
