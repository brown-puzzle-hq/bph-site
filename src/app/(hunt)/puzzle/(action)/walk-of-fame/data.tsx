import Image from "next/image";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "walk-of-fame";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="mx-auto mb-6 max-w-3xl text-center italic">
        This is a physical puzzle! You should have received it at kickoff.
        Please visit HQ in Friedman 208 if you believe you are missing these
        supplies.
  </div>
);

export const remoteBoxBody = (
  <div className="max-w-3xl text-center">
    This is a physical puzzle! You should have received it in your box. Contact
    brownpuzzlehq@gmail.com with any questions about your box or its materials.
  </div>
);

import WOF1 from "./Walk of Fame (1).png";
import WOF2 from "./Walk of Fame (2).png";
import WOF3 from "./Walk of Fame (3).png";
import WOF4 from "./Walk of Fame (4).png";
import WOF5 from "./Walk of Fame (5).png";

export const remoteBody = (
  <div>
    <div className="mb-4">
      <Image src={WOF1} width={500} height={500} alt="" />
    </div>

    <div className="mb-4">
      <Image src={WOF2} width={500} height={500} alt="" />
    </div>

    <div className="mb-4">
      <Image src={WOF3} width={500} height={500} alt="" />
    </div>

    <div className="mb-4">
      <Image src={WOF4} width={500} height={500} alt="" />
    </div>

    <div className="mb-4">
      <Image src={WOF5} width={500} height={500} alt="" />
    </div>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl text-center">
    This solution does not exist yet. Go nag Thomas.
  </div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */

export const boxCopyText = null; 

export const remoteCopyText = `<table>
    <tr>
        <td>=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FWalk%20of%20Fame%20(1).2baccab3.png&w=640&q=75")</td>
    </tr>
    <tr>
        <td>=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FWalk%20of%20Fame%20(2).8a2de31c.png&w=640&q=75")</td>
    </tr>
    <tr>
        <td>=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FWalk%20of%20Fame%20(3).c8e2df2e.png&w=640&q=75")</td>
    </tr>
    <tr>
        <td>=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FWalk%20of%20Fame%20(4).a37638c0.png&w=640&q=75")</td>
    </tr>
    <tr>
        <td>=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FWalk%20of%20Fame%20(5).f78ca136.png&w=640&q=75")</td>
    </tr>
</table>`;

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
