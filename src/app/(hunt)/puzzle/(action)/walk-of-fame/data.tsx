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
    This is a physical puzzle! You should have received it at kickoff. Please
    visit HQ in Friedman 208 if you believe you are missing these supplies.
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
  <div className="max-w-3xl space-y-4">
    <div>
      This puzzle uses the five star-shaped stickers given out at kickoff (or in
      your Box!).
    </div>
    <div>
      Solvers should notice that these star-shaped stickers are reminiscent of
      the stars on the Hollywood Walk of Fame. In particular, it has the same
      layout of a name above a certain symbol.
    </div>
    <div>
      After some searching on the internet, we might find out that while most
      Walk of Fame stars have one of six common categories (motion pictures,
      broadcast television, etc.), which each have a certain symbol, stars in
      the Special Recognition category have unique symbols! In fact, each of our
      five stars consists of one of these unique symbols. For example, there is
      only one Walk of Fame star with a satellite dish symbol, which is the star
      for the radio station KTLA.
    </div>
    <div>
      Additionally, there are two dots on each of the stars. One of the dots is
      positioned on one of the five arms of the star, with each sticker having a
      unique marked arm. We will use these to sort the stars.
    </div>
    <div>
      The other dots is positioned over a certain letter in the word BLUENO. For
      each star, take the marked letter (e.g. the first letter, the second
      letter, or so on) of the lettering on the star with the actual symbol.
    </div>
    <div>
      After ordering by marked arm (clockwise, starting from the top) and
      indexing, we get:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Symbol</th>
            <th className="p-2 outline outline-white">Star</th>
            <th className="p-2 outline outline-white">Marked Letter</th>
            <th className="p-2 outline outline-white">Order</th>
            <th className="p-2 outline outline-white">Extracted Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">LA Dodgers logo</td>
            <td className="p-2 outline outline-white">Los Angeles Dodgers</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">G</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Seal of the City of LA
            </td>
            <td className="p-2 outline outline-white">Mayor Tom Bradley</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">A</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Satellite dish</td>
            <td className="p-2 outline outline-white">KTLA</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">T</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Phonograph</td>
            <td className="p-2 outline outline-white">The Recording Academy</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">E</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Building</td>
            <td className="p-2 outline outline-white">Los Angeles Times</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">S</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      Reading the extracted letters in order gives us our answer,{" "}
      <span className="font-bold text-main-accent">
        GATES</span>.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Thomas Gordon";

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
