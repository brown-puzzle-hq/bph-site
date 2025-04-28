import Link from "next/link";
import Image from "next/image";
import ACD from "./A_Caribbean_Dream.jpg";
import ABY from "./Anyone_But_You.jpg";
import CMS from "./Catch_My_Soul.jpg";
import Ran from "./Ran.jpg";
import TH from "./The_Hungry.jpg";
import TKK from "./The_Karaoke_King.jpg";
import TLK from "./The_Lion_King.jpg";
import WSS from "./West_Side_Story.jpg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "watching-between-the-lines";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <div className="pb-2.5 italic">
      For too long now, I've been struggling with my favorite movies. Firstly,
      they look not at all alike. Also, I've found that lots, notably, are
      repeats. Finally, the list needs some more diverse inspirations.
    </div>
    <div className="flex flex-col items-center font-semibold">
      <div className="grid w-fit grid-cols-[100px_min-content] place-items-center justify-items-start gap-4 text-nowrap md:w-full md:grid-cols-[100px_1fr_100px_1fr_100px_min-content]">
        <Image
          src={WSS}
          width={100}
          height={100}
          alt="West Side Story 1"
          className="rounded-lg"
        />
        <p>(0061, 4)</p>
        <Image
          src={TLK}
          width={100}
          height={100}
          alt="Lion King 1"
          className="rounded-lg"
        />
        <p>(0002, 2)</p>
        <Image
          src={TH}
          width={100}
          height={100}
          alt="The Hungry 1"
          className="rounded-lg"
        />
        <p>(0417, 1)</p>
        <Image
          src={ACD}
          width={100}
          height={100}
          alt="A Caribbean Dream 1"
          className="rounded-lg"
        />
        <p>(0295, 1)</p>
        <Image
          src={CMS}
          width={100}
          height={100}
          alt="Catch My Soul 1"
          className="rounded-lg"
        />
        <p>(3294, 2)</p>
        <Image
          src={Ran}
          width={100}
          height={100}
          alt="Ran 1"
          className="rounded-lg"
        />
        <p>(0069, 8)</p>
        <Image
          src={ABY}
          width={100}
          height={100}
          alt="Anyone But You 1"
          className="rounded-lg"
        />
        <p>(2699, 1)</p>
        <Image
          src={Ran}
          width={100}
          height={100}
          alt="Ran 2"
          className="rounded-lg"
        />
        <p>(0032, 5)</p>
        <Image
          src={TKK}
          width={100}
          height={100}
          alt="The Karaoke King 1"
          className="rounded-lg"
        />
        <p>(1067, 4)</p>
        <Image
          src={ACD}
          width={100}
          height={100}
          alt="A Caribbean Dream 2"
          className="rounded-lg"
        />
        <p>(0695, 1)</p>
        <Image
          src={WSS}
          width={100}
          height={100}
          alt="West Side Story 2"
          className="rounded-lg"
        />
        <p>(0015, 4)</p>
        <Image
          src={TLK}
          width={100}
          height={100}
          alt="Lion King 2"
          className="rounded-lg"
        />
        <p>(3878, 8)</p>
        <Image
          src={ABY}
          width={100}
          height={100}
          alt="Anyone But You 2"
          className="rounded-lg"
        />
        <p>(1228, 7)</p>
        <Image
          src={TH}
          width={100}
          height={100}
          alt="The Hungry 2"
          className="rounded-lg"
        />
        <p>(2247, 7)</p>
        <Image
          src={ACD}
          width={100}
          height={100}
          alt="A Caribbean Dream 3"
          className="rounded-lg"
        />
        <p>(2155, 1)</p>
        <Image
          src={WSS}
          width={100}
          height={100}
          alt="West Side Story 3"
          className="rounded-lg"
        />
        <p>(0694, 3)</p>
        <Image
          src={CMS}
          width={100}
          height={100}
          alt="Catch My Soul 2"
          className="rounded-lg"
        />
        <p>(2383, 3)</p>
        <Image
          src={CMS}
          width={100}
          height={100}
          alt="Catch My Soul 3"
          className="rounded-lg"
        />
        <p>(0119, 3)</p>
        <Image
          src={TKK}
          width={100}
          height={100}
          alt="The Karaoke King 2"
          className="rounded-lg"
        />
        <p>(2651, 1)</p>
        <Image
          src={TLK}
          width={100}
          height={100}
          alt="Lion King 3"
          className="rounded-lg"
        />
        <p>(2669, 4)</p>
        <Image
          src={ACD}
          width={100}
          height={100}
          alt="A Caribbean Dream 4"
          className="rounded-lg"
        />
        <p>(1747, 6)</p>
        <Image
          src={Ran}
          width={100}
          height={100}
          alt="Ran 3"
          className="rounded-lg"
        />
        <p>(3520, 8)</p>
        <Image
          src={ABY}
          width={100}
          height={100}
          alt="Anyone But You 3"
          className="rounded-lg"
        />
        <p>(0003, 10)</p>
        <Image
          src={WSS}
          width={100}
          height={100}
          alt="West Side Story 4"
          className="rounded-lg"
        />
        <p>(1769, 4)</p>
        <Image
          src={TH}
          width={100}
          height={100}
          alt="The Hungry 3"
          className="rounded-lg"
        />
        <p>(0366, 9)</p>
        <Image
          src={TKK}
          width={100}
          height={100}
          alt="The Karaoke King 3"
          className="rounded-lg"
        />
        <p>(0362, 10)</p>
        <Image
          src={Ran}
          width={100}
          height={100}
          alt="Ran 4"
          className="rounded-lg"
        />
        <p>(2076, 2)</p>
        <Image
          src={CMS}
          width={100}
          height={100}
          alt="Catch My Soul 4"
          className="rounded-lg"
        />
        <p>(1248, 7)</p>
        <Image
          src={TKK}
          width={100}
          height={100}
          alt="The Karaoke King 4"
          className="rounded-lg"
        />
        <p>(1016, 4)</p>
        <Image
          src={TH}
          width={100}
          height={100}
          alt="The Hungry 4"
          className="rounded-lg"
        />
        <p>(1482, 4)</p>
        <Image
          src={TLK}
          width={100}
          height={100}
          alt="Lion King 4"
          className="rounded-lg"
        />
        <p>(2823, 3)</p>
        <Image
          src={ABY}
          width={100}
          height={100}
          alt="Anyone But You 4"
          className="rounded-lg"
        />
        <p>(0289, 4)</p>
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
  <div className="max-w-3xl space-y-4">
    <div>
      First, we notice that every movie is an adaptation of a Shakespeare play.
      Also, the flavor text has conspicuous phrases starting with "F", "T", "L",
      and "N", cluing that we should use{" "}
      <Link
        href="https://www.folgerdigitaltexts.org/api"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link hover:underline"
      >
        Folgers Through Line Number
      </Link>{" "}
      to get lines from the four-digit numbers next to each poster. Using the
      second number as a word index, we get the following words:
    </div>

    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Shakespeare Play</th>
            <th className="p-2 outline outline-white">FTLN Number</th>
            <th className="p-2 outline outline-white">Word Number</th>
            <th className="p-2 outline outline-white">Extracted Word</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">Romeo and Juliet</td>
            <td className="p-2 outline outline-white">0061</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">YOUR</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Hamlet</td>
            <td className="p-2 outline outline-white">0002</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">ANSWER</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Titus Andronichus</td>
            <td className="p-2 outline outline-white">0417</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">TIS</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              A Midsummer Night's Dream
            </td>
            <td className="p-2 outline outline-white">0295</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">THIS</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Othello</td>
            <td className="p-2 outline outline-white">3294</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">ON</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">King Lear</td>
            <td className="p-2 outline outline-white">0069</td>
            <td className="p-2 outline outline-white">8</td>
            <td className="p-2 outline outline-white">LINE</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Much Ado About Nothing
            </td>
            <td className="p-2 outline outline-white">2699</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">1</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">King Lear</td>
            <td className="p-2 outline outline-white">0032</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">9</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Julius Caesar</td>
            <td className="p-2 outline outline-white">1067</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">8</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              A Midsummer Night's Dream
            </td>
            <td className="p-2 outline outline-white">0695</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">2</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Romeo and Juliet</td>
            <td className="p-2 outline outline-white">0015</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">WORD</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Hamlet</td>
            <td className="p-2 outline outline-white">3678</td>
            <td className="p-2 outline outline-white">8</td>
            <td className="p-2 outline outline-white">6</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Much Ado About Nothing
            </td>
            <td className="p-2 outline outline-white">1228</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">IN</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Titus Andronichus</td>
            <td className="p-2 outline outline-white">2247</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">A</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              A Midsummer Night's Dream
            </td>
            <td className="p-2 outline outline-white">2155</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">TRAGEDY</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Romeo and Juliet</td>
            <td className="p-2 outline outline-white">0694</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">SET</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Othello</td>
            <td className="p-2 outline outline-white">2383</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">IN</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Othello</td>
            <td className="p-2 outline outline-white">0119</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">VENICE</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Julius Caesar</td>
            <td className="p-2 outline outline-white">2651</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">AND</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Hamlet</td>
            <td className="p-2 outline outline-white">2669</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">LINE</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              A Midsummer Night's Dream
            </td>
            <td className="p-2 outline outline-white">1747</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">0</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">King Lear</td>
            <td className="p-2 outline outline-white">3520</td>
            <td className="p-2 outline outline-white">8</td>
            <td className="p-2 outline outline-white">3</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Much Ado About Nothing
            </td>
            <td className="p-2 outline outline-white">0003</td>
            <td className="p-2 outline outline-white">10</td>
            <td className="p-2 outline outline-white">3</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Romeo and Juliet</td>
            <td className="p-2 outline outline-white">1769</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">0</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Titus Andronichus</td>
            <td className="p-2 outline outline-white">0366</td>
            <td className="p-2 outline outline-white">9</td>
            <td className="p-2 outline outline-white">WORD</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Julius Caesar</td>
            <td className="p-2 outline outline-white">0362</td>
            <td className="p-2 outline outline-white">10</td>
            <td className="p-2 outline outline-white">4</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">King Lear</td>
            <td className="p-2 outline outline-white">2076</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">SAID</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Othello</td>
            <td className="p-2 outline outline-white">1248</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">BY</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Julius Caesar</td>
            <td className="p-2 outline outline-white">1016</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">A</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Titus Andronichus</td>
            <td className="p-2 outline outline-white">1482</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">TRAGIC</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Hamlet</td>
            <td className="p-2 outline outline-white">2823</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">DANISH</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Much Ado About Nothing
            </td>
            <td className="p-2 outline outline-white">0289</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">HERO</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      The extracted message says to combine word 6 of line 1982 of Othello and
      word 4 of line 0330 from Hamlet, giving a final answer of{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        POPPYSEED.
      </span>
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Erin Finn";

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
