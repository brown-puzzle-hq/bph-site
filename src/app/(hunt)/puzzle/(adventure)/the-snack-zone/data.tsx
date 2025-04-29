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
  <div className="max-w-3xl">
    <div className="mb-4 flex">
      <iframe
        className="aspect-video w-full"
        src="https://www.youtube-nocookie.com/embed/h3FAvml0EVU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>

    <div className="grid grid-cols-3 gap-2 rounded-md border-8 border-[#4A2D23] bg-[#4A2D23] text-center font-['Courier_New','Courier',monospace] text-2xl font-bold">
      <div className="flex items-center rounded-sm bg-white p-1">
        <Image src={SNACK_A} alt="" draggable="false" />
      </div>
      <div className="flex items-center rounded-sm bg-white p-1">
        <Image src={SNACK_B} alt="" draggable="false" />
      </div>
      <div className="flex items-center rounded-sm bg-white p-1">
        <Image src={SNACK_C} alt="" draggable="false" />
      </div>
      <div className="rounded-sm bg-[#5C382C] p-3">AU$10.04</div>
      <div className="rounded-sm bg-[#5C382C] p-3">AU$10.02</div>
      <div className="rounded-sm bg-[#5C382C] p-3">€7.03</div>

      <div className="flex items-center rounded-sm bg-white p-1">
        <Image src={SNACK_D} alt="" draggable="false" />
      </div>
      <div className="flex items-center rounded-sm bg-white p-1">
        <Image src={SNACK_E} alt="" draggable="false" />
      </div>
      <div className="flex items-center rounded-sm bg-white p-1">
        <Image src={SNACK_F} alt="" draggable="false" />
      </div>
      <div className="rounded-sm bg-[#5C382C] p-3">NZ$5.03</div>
      <div className="rounded-sm bg-[#5C382C] p-3">NZ$5.08</div>
      <div className="rounded-sm bg-[#5C382C] p-3">NZ$5.05</div>

      <div className="flex items-center rounded-sm bg-white p-1">
        <Image src={SNACK_G} alt="" draggable="false" />
      </div>
      <div className="flex items-center rounded-sm bg-white p-1">
        <Image src={SNACK_H} alt="" draggable="false" />
      </div>
      <div className="flex items-center rounded-sm bg-white p-1">
        <Image src={SNACK_I} alt="" draggable="false" />
      </div>
      <div className="rounded-sm bg-[#5C382C] p-3">NZ$5.04</div>
      <div className="rounded-sm bg-[#5C382C] p-3">¥12.07</div>
      <div className="rounded-sm bg-[#5C382C] p-3">NZ$5.02</div>
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
  <div className="max-w-3xl space-y-4">
    <p>
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
      accompanied by the cute little theme song and graphic seen in the video.
    </p>
    <p>
      At this point, solvers should know who Ben Doyle is and understand what
      Jet Lag is. Between the video and the puzzle title, they should find the
      term ‘The Snack Zone’ suspicious and look it up to figure out what exactly
      that term means.
    </p>
    <p>
      After briefly looking into the Snack Zone and perhaps perusing the wiki,
      it should become clear that the snacks in the vending machine have all
      made appearances on episodes of the snack zone. This is further confirmed
      by the ‘prices’, which contain currencies of the country where the episode
      was filmed as well as the season and episode of the segment represented as
      dollars and cents respectively.
    </p>
    <p>
      This should help to ID the snacks, but solvers may also need to watch the
      clips of specific snacks to confirm packaging matches. Some packaging is
      easier to find than others online, but the wiki should get most of the way
      there and internet sleuthing can ID the rest. The packaging shown has
      letters redacted with X's, and each snack has a single letter marked with
      an O instead. Extracting this letter, we get:
    </p>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr>
            <th className="p-2 outline outline-white">Snack Name</th>
            <th className="p-2 outline outline-white">Season</th>
            <th className="p-2 outline outline-white">Episode</th>
            <th className="p-2 outline outline-white">Extracted letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">Beef Sausage Rolls</td>
            <td className="p-2 outline outline-white">10</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">S</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Tim Tam</td>
            <td className="p-2 outline outline-white">10</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">A</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Trolli Saure Gluhwurmchen
            </td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">U</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Burger Rings</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">V</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Weet Bix</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">8</td>
            <td className="p-2 outline outline-white">I</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Baked Oaty Slices</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">G</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Three Cheese Selection
            </td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">N</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Puripuri Ebi Purio</td>
            <td className="p-2 outline outline-white">12</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">O</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Rashuns</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">N</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      Reading the extracted letters in the given order gives us our answer,{" "}
      <span className="font-bold text-main-accent">
        SAUVIGNON</span>.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Megan Carlson";

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
