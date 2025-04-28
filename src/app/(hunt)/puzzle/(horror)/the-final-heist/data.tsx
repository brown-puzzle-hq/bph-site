import Image from "next/image";
import LAYOUT from "./floorplan.png"

const DATA = "⬛,⬛,⬛,⬛,⬛,⬛,⬜,⬜,⬜,⬛,⬛,⬜,⬛,⬜,⬛,⬛,⬛,⬛,⬛,⬛";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "the-final-heist";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

export const inPersonBody = (
  <div className="flex max-w-3xl flex-col items-center space-y-4 text-center">
    <div className="font-bold">
      This is a sequence metapuzzle. It uses feeders from the 🏦 sequence.
    </div>
    <div className="pb-2.5 italic">
      You've made it to the final vault, but there's a problem: somebody's
      turned out the lights! fortunately, we've done some reconnaissance on your
      behalf. The floor plan for this vault is BLIND, and the room layout is as
      follows:
    </div>
    <div className="grid w-40 grid-cols-5 grid-rows-[repeat(4,32px)] overflow-clip rounded-md">
      {DATA.split(",").map((cell, index) => (
        <div key={index} className={cell === "⬛" ? "bg-black" : "bg-white"} />
      ))}
    </div>
    <iframe src="/api/puzzle/the-final-heist" width="750" height="600" />
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
      The Heist sequence is a set of Sokoban puzzles, where placing any objects
      on all of the buttons of a certain color or shining a laser of the certain
      color into its corresponding laser will open the door of that color.
      Mirrors reflect lasers as shown, and boxes can block lasers. Touching a
      laser will cause the robber to die, forcing a restart.
    </div>
    <div>
      For The Final Heist, the player goes in blind, unable to see anything
      other than the white square in the center of every room. In order to
      figure out layout, they use the given room layout of BLIND to reconstruct
      the rooms from the feeders. The answers to previous feeders are their
      floor plans, meaning that each room in a given level is assigned a letter,
      so that reading the rooms in reading order spells the feeder answer for
      each round.
    </div>
    <div>
      Placing the rooms to spell BLIND in the given layout gives the following
      overall map:
    </div>
    <Image src={LAYOUT} alt=""  />
    <div>
      Once the layout is determined, follow the following instructions to reach
      the end:
    </div>
    <ol className="list-inside list-decimal">
      <li>Place the block on the grey tile to open the door.</li>
      <li>Move two rooms over to the right.</li>
      <li>
        Move the mirror in this room to under the purple receptacle and block
        the green laser.
      </li>
      <li>
        Move to the room to the left and move the mirror in this room on one of
        the red tiles in the next room to the left.
      </li>
      <li>Place the block on the grey tile on the other red tile.</li>
      <li>
        Move down and collect all three blocks and the mirror, bringing them
        back up past the red door.
      </li>
      <li>
        Place one block on the grey tile and another block in the grey doorway.
      </li>
      <li>
        Line up all of other three blocks and two mirrors behind the blocking
        block and push them all through the grey doorway.
      </li>
      <li>
        Move a block in front of the purple laser, towards the top of the room,
        but leaving space to transport stuff above the purple laser.
      </li>
      <li>
        Move the other three blocks and the top-left to bottom-right mirror on
        the blue and yellow tiles in the bottom-right room.
      </li>
      <li>
        Move the last mirror to reflect the purple mirror to the right and into
        the mirror placed to block the green laser, reflecting into the purple
        receptacle.
      </li>
      <li>Move to the right and up into the exit.</li>
    </ol>
    <div>
      After reaching the end, the robber finally finds their money and retires, having successfully{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        PALMED
      </span>{" "}
      the money.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Malcolm Certain";

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
