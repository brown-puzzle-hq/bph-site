import Link from "next/link";
import Image from "next/image";
import PUZZLEBOX from "./BluenosPuzzleBox.png";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "bluenos-puzzle-box";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl items-center space-y-4 text-center">
    <iframe
      className="flex aspect-video w-full max-w-full"
      src="https://www.youtube-nocookie.com/embed/k2KJdVept8Y"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
    <div className="mb-4 italic">
      This is an interactive puzzle. Please schedule a time using{" "}
      <Link href="https://calendly.com/brownpuzzlehq/blueno-s-puzzle-box">
        <span className="underline">this link</span>
      </Link>{" "}
      and send two members of your team to Salomon 202 then.
    </div>
  </div>
);

export const remoteBoxBody = (
  <div className="flex max-w-3xl flex-col items-center justify-center text-center">
    <iframe
      className="aspect-video w-[576px] max-w-full"
      src="https://www.youtube-nocookie.com/embed/k2KJdVept8Y"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
    <Image src={PUZZLEBOX} alt="" />
  </div>
);

export const remoteBody = remoteBoxBody;

export const solutionBody = (
  <div className="max-w-3xl space-y-4 text-left">
    <p>
      For in-person teams, this was an interaction! Teams were brought to solve
      Blueno's Puzzle Box, a puzzle box that turned out to be much larger than
      most solvers expected. After solving the puzzle on each vertical of the
      box, teams had to chant "I Hate Mondays" to receive their final riddle,
      and find out the answer.
    </p>
    <p>
      Unfortunately, unbeknownst to solvers, there is a creature inside the box.
      The creature, crafty in its ways, likes to interfere with solvers, and
      sneakily undoes their progress when they're not looking.
    </p>
    <p>You can find out more information at wrapup!</p>
    <p>
      For remote teams, they were instead served a delicious Jet Lag puzzle.
      Each of the six images on the cube net are from specific episodes of Jet
      Lag: The Game, with either one or two characters obscured by the red
      circle.
    </p>
    <p>The six images are from the following episodes:</p>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-left">
        {/* Table Head */}
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-black">
              Face
            </th>
            <th className="border border-gray-300 px-4 py-2 text-black">
              Episode Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-black">
              Season
            </th>
            <th className="border border-gray-300 px-4 py-2 text-black">
              Timestamp
            </th>
            <th className="border border-gray-300 px-4 py-2 text-black">
              Character
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-black">
          {[
            ["Top", "Capture the Flag", "1", "6:49", "3"],
            ["Second From Top", "Hide and Seek", "1", "28:45", "ᗰ"],
            ["Left", "Arctic Escape", "4", "7:35", "CK"],
            ["Middle", "Australia", "4", "26:39", "in"],
            ["Right", "Tag (2024)", "5", "16:18", "R"],
            ["Bottom", "Tag (2023)", "6", "6:22", "9"],
          ].map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              {row.map((cell, i) => (
                <td key={i} className="border border-gray-300 px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p>
      Time to extract! If we write each of these characters on the faces of a
      cube net, fold the cube net up, and then unfold it again (so the marked
      face is in the same position and orientation), then the other characters
      are all rearranged. Helpfully, they are now positioned so we can read them
      (in their new orientations) as letters; reading left-to-right,
      top-to-bottom spells out the answer,{" "}
      <span className="font-bold text-main-accent">WRECKING</span>.
    </p>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors =
  "Phil Avilov and Kaz Bradley, for in-person teams; and Thomas Gordon, for remote teams";

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
