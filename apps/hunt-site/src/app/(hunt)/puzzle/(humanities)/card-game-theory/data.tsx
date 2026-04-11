/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "card-game-theory";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <p>
        <i>
          My deck costs too much elixir! What new 1-elixir card could I add to
          my deck to raise my mood while lowering my average elixir cost? (7 6)
        </i>
      </p>
    </div>
    <div className="mb-4">
      <p>Knight which is hard of hearing</p>
      <p>Braveheart actor is confused without myself</p>
      <p>Hiding activates lasers</p>
      <p>Crazed admirer starts relapsing</p>
      <p>Frustrated Strip Weathers not electric after dongle accident</p>
      <p>Lawyer test twice and (Magic Johnson rapper and Hecox of Smosh)</p>
      <p>Jimin's family surrounded by Gangnam Style singer's sound</p>
    </div>
  </div>
);

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `Card Game Theory
My deck costs too much elixir! What new 1-elixir card could I add to my deck to raise my mood while lowering my average elixir cost? (7 6)

Knight which is hard of hearing
Braveheart actor is confused without myself
Hiding activates lasers
Crazed admirer starts relapsing
Frustrated Strip Weathers not electric after dongle accident
Lawyer test twice and (Magic Johnson rapper and Hecox of Smosh)
Jimin's family surrounded by Gangnam Style singer's sound`;

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {
  HOLIDAY: "Keep going!",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
