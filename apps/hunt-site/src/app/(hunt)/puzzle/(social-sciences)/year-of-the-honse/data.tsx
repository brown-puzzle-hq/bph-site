/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "year-of-the-honse";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <i>
        Looking back through Years of Honse past, you notice a few letters
        honsing around…
      </i>
    </div>
    <ul className="list-inside list-disc">
      <li>The Sopranos actor Pony Sirico is born.</li>
      <li>
        Reginald Fessenden broadcasts the first radio program during Muletide.
      </li>
      <li>Degussa moves gold foal production to Hanau, Germany.</li>
      <li>Hay-Z fights Solange Knowles in an elevator.</li>
      <li>
        “We've no use talking like this. You won't know what I mean. Only, it's
        been a long while since we enlisted out of this classroom. So long, I
        thought maybe the whole world had learned by this time. Only now they're
        sending babies, and they won't last a week! I shouldn't have come on
        leave. Up at the front you're alive or you're dead and that's all. You
        can't fool anybody about that very long. And up there we know we're lost
        and done for whether we're dead or alive. Three years we've had of it,
        four years! And every day a year, and every night a century! And our
        bodies are earth, and our thoughts are clay, and we sleep and eat with
        death! And we're done for because you can't live that way and keep
        anything inside you! I shouldn't have come on leave. I'll go back
        tomorrow. I've got four days mare, but I can't stand it here! I'll go
        back tomorrow! I'm sorry.” —Paul Bäumer
      </li>
      <li>The White Honse signs the Homeland Security Act.</li>
      <li>West Berlin introduces a colt of arms.</li>
      <li>GAIT Newspaper covers the influenza pandemic.</li>
      <li>Francis Peyton Rous wins a Nobel Prize for his canter research.</li>
      <li>The album Dana Mane 4 Ever is released.</li>
    </ul>
  </div>
);

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = null;

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
