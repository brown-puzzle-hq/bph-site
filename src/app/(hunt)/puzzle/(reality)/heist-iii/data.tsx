/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "heist-iii";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

export const inPersonBody = (
  <iframe src="/api/puzzle/heist-iii" width="750" height="600" />
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
    <div>To solve this puzzle, follow the following instructions:</div>
    <ol className="list-inside list-decimal">
      <li>Move to the next room on the right.</li>
      <li>
        Block the green laser with the mirror and move the mirror over until the
        beam goes into the green receptacle.
      </li>
      <li>Move down to the next room.</li>
      <li>
        Move the mirror so that the orange laser is reflected into the orange
        receptacle.
      </li>
      <li>
        Go down into the next room, and move blocks from the left hallway onto
        the blue tiles.
      </li>
      <li>Place the third block where the the blue door used to be.</li>
      <li>
        Take the two blocks from the blue tiles and place them behind the block
        that is blocking the door.
      </li>
      <li>
        Push all the blocks through the door, going through the door yourself.
      </li>
      <li>Place the blocks on the grey tiles.</li>
      <li>Walk to the exit on the left.</li>
    </ol>
    <div>
      After reaching the end, the robber finds a sticky note, revealing that
      they missed the money, but did receive the floor plan, which is the
      answer:{" "}
      <span className="font-bold text-main-accent">
        WIRED</span>.
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
export const partialSolutions: Record<string, string> = {
  FLOORPLANWIRED: "Just the floor plan, please.",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
