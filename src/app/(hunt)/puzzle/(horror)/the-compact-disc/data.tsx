import Image from "next/image";
import Disc from "./images/disc.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "the-compact-disc";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mx-auto mb-6 max-w-3xl text-center italic">
      This is a physical puzzle! If your team has not already picked up a CD,
      please visit HQ in Friedman 208.
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <div className="max-w-3xl space-y-4 text-center">
      <div className="font-bold">
        This is a sequence metapuzzle. It uses feeders from the 💿 sequence.
      </div>

      <div className="pb-2.5 italic">
        You take a minute (or several) to listen to your CD.
      </div>
    </div>
  </div>
);

export const remoteBoxBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <div className="font-bold">
      This is a sequence metapuzzle. It uses feeders from the 💿 sequence.
    </div>
    <div className="italic">
      This is a physical puzzle! It uses an object found in your box. Contact
      brownpuzzlehq@gmail.com with any questions about your box or its
      materials.
    </div>
    <div className="italic">
      You take a minute (or several) to listen to your CD.
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <div className="font-bold">
      This is a sequence metapuzzle. It uses feeders from the 💿 sequence.
    </div>
    <div className="italic">
      You take a minute (or several) to listen to your CD.
    </div>
    <div className="flex justify-center pt-1.5">
      <Image src={Disc} alt="" width={500} height={500} />
    </div>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>The feeders to this sequence metapuzzle:</div>
    <ul className="list list-inside">
      <li>INDIANA JONES AND THE LAST CRUSADE</li>
      <li>SPRING</li>
      <li>SUNDAY</li>
    </ul>
    <div>
      The diagram on the CD describes the path of the laser as time passes,
      which is also known as an Archimedean spiral. Notably, each feeder has a
      corresponding length of time (we define spring as having 92 days).
      Converting each time length into a path length of the laser, we can
      calculate the final position of the laser dot.
    </div>
    <div>
      There are several approaches that can be taken to find the position after
      travelling a given distance. The first, and most painful, way is to use
      the exact polar-coordinate path-length integral, plot it as a function of
      time, and find the point that this curve intersects the y=L line.
    </div>
    <div>
      Alternatively, we can approximate the spiral as a sequence of circles that
      increase in diameter. In order for this approximation to be accurate
      enough, though, we need to use the average radius of each circle, so the
      first radius is 25 mm + 0.8 µm, and each successive radius increases by
      1.6 µm. This simple approximation stays within 0.000025 radians of the
      exact answer!
    </div>
    <div>
      Finally, there are, apparently, tools online that will tell you how many
      revolutions are taken before a certain path length is reached for a given
      parametrization of an Archimedean spiral.
    </div>
    <div>No matter what method you use, these are the final points:</div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Feeder</th>
            <th className="p-2 outline outline-white">Time (min)</th>
            <th className="p-2 outline outline-white">
              Number of complete revolutions
            </th>
            <th className="p-2 outline outline-white">
              Angle from the horizontal (rad)
            </th>
            <th className="p-2 outline outline-white">
              Angle from the horizontal (deg)
            </th>
            <th className="p-2 outline outline-white">Radial distance (mm)</th>
            <th className="p-2 outline outline-white">Extracted bigram</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">SPRING</td>
            <td className="p-2 outline outline-white">132480</td>
            <td className="p-2 outline outline-white">6907</td>
            <td className="p-2 outline outline-white">1.42</td>
            <td className="p-2 outline outline-white">81.4</td>
            <td className="p-2 outline outline-white">36.1</td>
            <td className="p-2 outline outline-white">KU</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">SUNDAY</td>
            <td className="p-2 outline outline-white">1440</td>
            <td className="p-2 outline outline-white">91</td>
            <td className="p-2 outline outline-white">2.55</td>
            <td className="p-2 outline outline-white">146</td>
            <td className="p-2 outline outline-white">25.1</td>
            <td className="p-2 outline outline-white">NG</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              INDIANA JONES AND THE LAST CRUSADE
            </td>
            <td className="p-2 outline outline-white">127</td>
            <td className="p-2 outline outline-white">8</td>
            <td className="p-2 outline outline-white">0.521</td>
            <td className="p-2 outline outline-white">29.9</td>
            <td className="p-2 outline outline-white">25.0</td>
            <td className="p-2 outline outline-white">FU</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      Reading off the bigrams in reading order off the CD (or in order of
      decreasing length), we get our answer,{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        KUNG FU
      </span>
      .
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Thomas Gordon and Arnav Singhal";

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
