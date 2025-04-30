import Image from "next/image";
import ColorWheel from "./media/color-wheel.svg";
import Solution from "./media/color-wheel-sol.svg";
const LETTERS = [
  "S",
  "I",
  "N",
  "K",
  "C",
  "A",
  "L",
  "P",
  "U",
  "R",
  "E",
  "V",
  "L",
  "I",
  "G",
  "O",
  "L",
  "I",
  "N",
  "D",
  "I",
  "G",
  "O",
  "L",
  "I",
  "N/D",
  "D/N",
  "I",
  "H",
  "W",
  "O",
  "L",
  "P",
  "R",
  "E",
  "L",
  "A",
  "C",
  "K",
  "N",
  "I",
  "D",
  "N",
  "I",
  "G",
  "O",
  "L",
  "I",
  "N",
  "K",
  "C",
  "A",
  "L",
  "I",
  "S",
  "E",
  "T",
  "I",
  "L",
  "E",
];

const FEEDERS = [
  0, 5, 8, 11, 13, 14, 18, 22, 25, 29, 33, 34, 37, 38, 40, 42, 44, 50, 51, 54,
  56, 58, 59,
];
const EXTRACTION = [29, 33, 39, 43, 48, 55];
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "color-wheel";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mb-4 max-w-3xl text-center">
      <b>
        This is a sequence metapuzzle. It uses feeders from the ✈️ sequence.
      </b>
    </div>
    <div className="max-w-2xl">
      <div className="flex justify-center pb-4">
        <iframe
          className="aspect-video w-full"
          src="https://www.youtube-nocookie.com/embed/UrX1BOCMXqE"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="pb-4">
        In order to complete this challenge, Ben needs to visit all the required
        stops in order, from S to E. The only problem is that Sam is right
        behind him; so if he ever visits the station he was just at, he'll get
        caught, and lose Jet Lag: The Game.
      </div>
      <div className="pb-4">
        Once, and once only, Ben can take a walking path between stations S and
        E (marked with the red dashed line.)
      </div>
      <p className="pb-4">
        He can choose to get on trains travelling in either direction along the
        line.
      </p>
      <div className="pb-4">
        Each stop he travels costs a coin, whether he walks or takes the train.
      </div>
      <div className="flex justify-center pb-4">
        <Image src={ColorWheel} alt="" width={500} height={500} />
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
      First, the strange colors of the train lines, in combination with the
      title, can help clue that we should assign letters to the stations based
      on the colors of the train lines. The S and E that we start and end on are
      given to us already, and this is the full map:
    </div>
    <div className="flex justify-center pb-4">
      <Image src={Solution} alt="" width={500} height={500} />
    </div>
    <div>
      Now, we need to trace a path starting at S and ending at E. Given that our
      feeders are SAUVIGNON, WRECKING, and CASTLE, we can conjecture that we
      need to take a path that visits each of the letters of these feeders in
      order. Indeed, such a path with 59 steps (not including starting at S)
      does exist:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Step</th>
            <th className="p-2 outline outline-white">Letter</th>
            <th className="w-1/11 p-2"></th>
            <th className="p-2 outline outline-white">Step</th>
            <th className="p-2 outline outline-white">Letter</th>
            <th className="w-1/11 p-2"></th>
            <th className="p-2 outline outline-white">Step</th>
            <th className="p-2 outline outline-white">Letter</th>
            <th className="w-1/11 p-2"></th>
            <th className="p-2 outline outline-white">Step</th>
            <th className="p-2 outline outline-white">Letter</th>
            <th className="w-1/11 p-2"></th>
            <th className="p-2 outline outline-white">Step</th>
            <th className="p-2 outline outline-white">Letter</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(12).keys()].map((i) => (
            <tr>
              <td
                className={
                  "p-2 outline outline-white" +
                  (EXTRACTION.includes(i) ? " bg-green-200 text-black" : "")
                }
              >
                {i}
              </td>
              <td
                className={
                  "p-2 outline outline-white" +
                  (FEEDERS.includes(i)
                    ? " bg-orange-200 font-bold text-black"
                    : "")
                }
              >
                {LETTERS[i]}
              </td>
              <td></td>
              <td
                className={
                  "p-2 outline outline-white" +
                  (EXTRACTION.includes(i + 12)
                    ? " bg-green-200 text-black"
                    : "")
                }
              >
                {i + 12}
              </td>
              <td
                className={
                  "p-2 outline outline-white" +
                  (FEEDERS.includes(i + 12)
                    ? " bg-orange-200 font-bold text-black"
                    : "")
                }
              >
                {LETTERS[i + 12]}
              </td>
              <td></td>
              <td
                className={
                  "p-2 outline outline-white" +
                  (EXTRACTION.includes(i + 24)
                    ? " bg-green-200 text-black"
                    : "")
                }
              >
                {i + 2 * 12}
              </td>
              <td
                className={
                  "p-2 outline outline-white" +
                  (FEEDERS.includes(i + 24)
                    ? " bg-orange-200 font-bold text-black"
                    : "")
                }
              >
                {LETTERS[i + 2 * 12]}
              </td>
              <td></td>
              <td
                className={
                  "p-2 outline outline-white" +
                  (EXTRACTION.includes(i + 36)
                    ? " bg-green-200 text-black"
                    : "")
                }
              >
                {i + 3 * 12}
              </td>
              <td
                className={
                  "p-2 outline outline-white" +
                  (FEEDERS.includes(i + 36)
                    ? " bg-orange-200 font-bold text-black"
                    : "")
                }
              >
                {LETTERS[i + 3 * 12]}
              </td>
              <td></td>
              <td
                className={
                  "p-2 outline outline-white" +
                  (EXTRACTION.includes(i + 48)
                    ? " bg-green-200 text-black"
                    : "")
                }
              >
                {i + 4 * 12}
              </td>
              <td
                className={
                  "p-2 outline outline-white" +
                  (FEEDERS.includes(i + 48)
                    ? " bg-orange-200 font-bold text-black"
                    : "")
                }
              >
                {LETTERS[i + 4 * 12]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      The feeder stops are labelled with orange, and the tickets presented at
      the right of the puzzle are labelled with green. Reading the green letters
      in the order given, we obtain our answer,{" "}
      <span className="font-bold text-main-accent">WINNER</span>.
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
