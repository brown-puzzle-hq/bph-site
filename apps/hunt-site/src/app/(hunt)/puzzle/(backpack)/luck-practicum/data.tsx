import Image from "next/image";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";
import image8 from "./images/image8.png";
import image9 from "./images/image9.png";
import image10 from "./images/image10.png";
import { CopyData } from "~/lib/copy";

export const puzzleId = "luck-practicum";

export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="space-y-4 pb-4 text-center">
      <b>
        This is a metapuzzle. You will need to use some answers to puzzles from
        the Department rounds in order to solve it.
      </b>
    </div>
    <div className="mb-4 space-y-4">
      <p>
        You're using your unopened 54-card deck of Bicycle® index cards to
        prepare for your thesis. You write a letter on each of their backs, and
        pull out the following ten cards.
      </p>
    </div>
    <div className="mb-4">
      <i>What will you need to pass your thesis defense?</i>
    </div>
    <div className="mb-6 grid grid-cols-5 items-center justify-items-center gap-4">
      <Image src={image1} alt="Image 1" height={160} />
      <Image src={image2} alt="Image 2" height={160} />
      <Image src={image3} alt="Image 3" height={160} />
      <Image src={image4} alt="Image 4" height={160} />
      <Image src={image5} alt="Image 5" height={160} />
      <Image src={image6} alt="Image 6" height={160} />
      <Image src={image7} alt="Image 7" height={160} />
      <Image src={image8} alt="Image 8" height={160} />
      <Image src={image9} alt="Image 9" height={160} />
      <Image src={image10} alt="Image 10" height={160} />
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>Five electives from ANY DEPARTMENT</li>
      </ul>
    </div>
  </div>
);

export const remoteBody = inPersonBody;

import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

export const authors = "Thomas Gordon and Aren Guralp";

export const copyText: CopyData = {
  "text/plain": `Luck Practicum
You're using your unopened 54-card deck of Bicycle® index cards to prepare for your thesis. You write a letter on each of their backs, and pull out the following ten cards.
What will you need to pass your thesis defense?
Concentration Requirements:
Five electives from ANY DEPARTMENT`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Luck Practicum</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:1004px;left:3px;"><div style="float:left;">You&#39;re using your unopened 54-card deck of Bicycle® index cards to prepare for your thesis. You write a letter on each of their backs, and pull out the following ten cards.</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:297px;left:3px;"><div style="float:left;">What will you need to pass your thesis defense?</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image1.15a2ce49.png&w=1080&q=75")</div></span></td><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image2.17396f9a.png&w=1080&q=75")</div></span></td><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image3.4679774b.png&w=1080&q=75")</div></span></td><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image4.7db2c045.png&w=1080&q=75")</div></span></td><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image5.2a8d62a9.png&w=1080&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image6.f7e4460d.png&w=1080&q=75")</div></span></td><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image7.fba1c85b.png&w=1080&q=75")</div></span></td><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image8.0976968c.png&w=1080&q=75")</div></span></td><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image9.12951d90.png&w=1080&q=75")</div></span></td><td style="width:202px;height:252px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="12" colspan="2"><span><div style="max-height:252px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image10.d5f37e8f.png&w=1080&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Concentration Requirements:</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:297px;left:3px;"><div style="float:left;">Five electives from ANY DEPARTMENT</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr></tbody></table>`,
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
