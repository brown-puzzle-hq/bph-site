import Image from "next/image";
import SNACK_I from "./media/snackI.jpg";
import SNACK_D from "./media/snackD.jpg";
import SNACK_G from "./media/snackG.jpg";
import SNACK_F from "./media/snackF.jpg";
import SNACK_E from "./media/snackE.jpg";
import SNACK_C from "./media/snackC.jpg";
import SNACK_B from "./media/snackB.jpg";
import SNACK_A from "./media/snackA.jpg";
import SNACK_H from "./media/snackH.jpg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "the-snack-zone";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl text-center">
    <div className="mb-4 flex justify-center">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/h3FAvml0EVU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>

    <div className="border-[2px] border-black bg-gray-500 px-8 py-12">
      <div className="grid grid-cols-3 gap-[2px] bg-black p-[2px] shadow-lg">
        <div className="flex flex-col items-center justify-center bg-white text-white">
          <Image
            src={SNACK_A}
            alt=""
            width={1280}
            height={721}
            className="mb-4"
            draggable="false"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-white text-white">
          <Image
            src={SNACK_B}
            alt=""
            width={1280}
            height={721}
            className="mb-4"
            draggable="false"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-white text-white">
          <Image
            src={SNACK_C}
            alt=""
            width={1280}
            height={721}
            className="mb-4"
            draggable="false"
          />
        </div>
        <div className="bg-black p-3 text-center font-['Courier_New','Courier',monospace] text-2xl font-bold text-white">
          AU$10.04
        </div>
        <div className="bg-black p-3 text-center font-['Courier_New','Courier',monospace] text-2xl font-bold text-white">
          AU$10.02
        </div>
        <div className="bg-black p-3 text-center font-['Courier_New','Courier',monospace] text-2xl font-bold text-white">
          €7.03
        </div>

        <div className="flex flex-col items-center justify-center bg-white text-white">
          <Image
            src={SNACK_D}
            alt=""
            width={1280}
            height={721}
            className="mb-4"
            draggable="false"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-white text-white">
          <Image
            src={SNACK_E}
            alt=""
            width={1280}
            height={721}
            className="mb-4"
            draggable="false"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-white text-white">
          <Image
            src={SNACK_F}
            alt=""
            width={1280}
            height={721}
            className="mb-4"
            draggable="false"
          />
        </div>
        <div className="bg-black p-3 text-center font-['Courier_New','Courier',monospace] text-2xl font-bold text-white">
          NZ$5.03
        </div>
        <div className="bg-black p-3 text-center font-['Courier_New','Courier',monospace] text-2xl font-bold text-white">
          NZ$5.08
        </div>
        <div className="bg-black p-3 text-center font-['Courier_New','Courier',monospace] text-2xl font-bold text-white">
          NZ$5.05
        </div>

        <div className="flex flex-col items-center justify-center bg-white text-white">
          <Image
            src={SNACK_G}
            alt=""
            width={1280}
            height={721}
            className="mb-4"
            draggable="false"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-white text-white">
          <Image
            src={SNACK_H}
            alt=""
            width={1280}
            height={721}
            className="mb-4"
            draggable="false"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-white text-white">
          <Image
            src={SNACK_I}
            alt=""
            width={1280}
            height={721}
            className="mb-4"
            draggable="false"
          />
        </div>
        <div className="bg-black p-3 text-center font-['Courier_New','Courier',monospace] text-2xl font-bold text-white">
          NZ$5.04
        </div>
        <div className="bg-black p-3 text-center font-['Courier_New','Courier',monospace] text-2xl font-bold text-white">
          ¥12.07
        </div>
        <div className="bg-black p-3 text-center font-['Courier_New','Courier',monospace] text-2xl font-bold text-white">
          NZ$5.02
        </div>
      </div>
    </div>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl text-center">
    <p className="mb-4 text-left">
      This puzzle is a reference to a recurring segment on Jet Lag: The Game
      known as{" "}
      <a
        className="text-blue-400 underline"
        href="https://jetlag.fandom.com/wiki/The_Snack_Zone"
        target="_blank"
      >
        The Snack Zone
      </a>
      . This segment occurs when a player / combo of players (usually Ben and
      Adam) sample a local snack and offer their review. It is generally
      accompanied by a cute little theme song and graphic which I’d kinda like
      to splice into the video but that might be too obvious.
    </p>
    <p className="mb-4 text-left">
      At this point, solvers should know who Ben Doyle is and understand what
      Jet Lag is. Between the video and the puzzle title, they should find the
      term ‘the snack zone’ suspicious and look it up to figure out what exactly
      that term means.{" "}
    </p>
    <p className="mb-4 text-left">
      After briefly looking into the Snack Zone and perhaps perusing the wiki,
      it should become clear that the snacks in the vending machine have all
      made appearances on episodes of the snack zone. This is further confirmed
      by the ‘prices’, which contain currencies of the country where the episode
      was filmed as well as the season and episode of the segment represented as
      dollars and cents respectively. Prices are given chronologically.{" "}
    </p>
    <p className="mb-4 text-left">
      This should help to ID the snacks, but solvers may also need to watch the
      clips of specific snacks to confirm packaging matches. Some packaging is
      easier to find than others online, but the wiki should get most of the way
      there and internet sleuthing can ID the rest. Taking the letters indicated
      with an ‘O’ and ordering A-I produces a final answer of SAUVIGNON.
    </p>
    <table className="mb-4 min-w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="text-left">Letter</th>
          <th className="text-left">Snack Name</th>
          <th className="text-left">Season</th>
          <th className="text-left">Episode</th>
          <th className="text-left">Extracted letter</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-left">A</td>
          <td className="text-left">Beef Sausage Rolls</td>
          <td className="text-left">10</td>
          <td className="text-left">4</td>
          <td className="text-left">S</td>
        </tr>
        <tr>
          <td className="text-left">B</td>
          <td className="text-left">Tim Tam</td>
          <td className="text-left">10</td>
          <td className="text-left">2</td>
          <td className="text-left">A</td>
        </tr>
        <tr>
          <td className="text-left">C</td>
          <td className="text-left">Trolli Saure Gluhwurmchen</td>
          <td className="text-left">7</td>
          <td className="text-left">3</td>
          <td className="text-left">U</td>
        </tr>
        <tr>
          <td className="text-left">D</td>
          <td className="text-left">Burger Rings</td>
          <td className="text-left">5</td>
          <td className="text-left">3</td>
          <td className="text-left">V</td>
        </tr>
        <tr>
          <td className="text-left">E</td>
          <td className="text-left">Weet Bix</td>
          <td className="text-left">5</td>
          <td className="text-left">8</td>
          <td className="text-left">I</td>
        </tr>
        <tr>
          <td className="text-left">F</td>
          <td className="text-left">Baked Oaty Slices</td>
          <td className="text-left">5</td>
          <td className="text-left">5</td>
          <td className="text-left">G</td>
        </tr>
        <tr>
          <td className="text-left">G</td>
          <td className="text-left">Three Cheese Selection</td>
          <td className="text-left">5</td>
          <td className="text-left">4</td>
          <td className="text-left">N</td>
        </tr>
        <tr>
          <td className="text-left">H</td>
          <td className="text-left">Puripuri Ebi Purio</td>
          <td className="text-left">12</td>
          <td className="text-left">7</td>
          <td className="text-left">O</td>
        </tr>
        <tr>
          <td className="text-left">I</td>
          <td className="text-left">Rashuns</td>
          <td className="text-left">5</td>
          <td className="text-left">2</td>
          <td className="text-left">N</td>
        </tr>
      </tbody>
    </table>
    <p>
      ** Small inelegance that may or may not be an issue: Rashuns are listed as
      the first snack on the wiki, but the show hasn’t officially been named
      ‘The Snack Zone’ yet and the intro doesn’t play. Probably only diehards
      will care about this but just a note.
    </p>
  </div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null;

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

/**

[A]: AU$10.04
[B]: AU$10.02
[C]: €7.03
[D]: NZ$5.03
[E]: NZ$5.08
[F]: NZ$5.05
[G]: NZ$5.04
[H]: ¥12.07
[I]: NZ$5.02


 */

