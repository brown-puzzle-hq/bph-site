import Game from "./Game";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "two-guards-river";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export function inPersonBody(isSolved: boolean) {
  return (
    <div className="text-center">
      <p className="mx-auto max-w-3xl italic">
        You are traveling with two guards, two doors, and a cabbage. You arrive
        at a river and find a boat. The boat can hold you and two other
        entities, and it cannot cross the river without you.
      </p>
      <br />
      <p className="mx-auto max-w-3xl">
        There is a wolf guard and a goat guard. The guards are
        indistinguishable. There are two doors: one will let you through to the
        next round, and the other will end your puzzlehunt journey. The doors
        are also indistinguishable. If you leave the wolf guard with the correct
        door unattended, the wolf will eat it. If you leave the goat guard with
        the incorrect door, the goat will eat it as well. If you leave the wolf
        guard with the goat guard, the wolf will eat the goat. If you leave the
        goat guard with the cabbage, the goat guard will eat the cabbage. If you
        bring the cabbage on the boat, the cabbage will eat the boat, and you
        will drown (no one can swim) 💀.
      </p>
      <br />
      <p className="mx-auto max-w-3xl">
        How can you ensure you go through the correct door?
      </p>
      <br />
      <Game isSolved={isSolved} />
    </div>
  );
}

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      This puzzle is a variant of the river crossing puzzle, but the main goal
      here is to determine which guard is the wolf guard and which guard is the
      goat guard, without letting the correct door or goat guard die.
    </div>
    <div>
      The only way to make this determination is to leave one guard with the
      cabbage and see if it is eaten. Once the goat guard is found, placing both
      doors with the goat guard will leave the correct door uneaten, and we can
      enter the correct door, solving the puzzle.
    </div>
    <div>Specifically, to solve the puzzle, follow the following steps:</div>
    <ol className="list-inside list-decimal">
      <li>Bring both guards across the river.</li>
      <li>Bring one guard back with you across the river.</li>
      <li>Bring both doors across the river.</li>
    </ol>
    <div>Now, observe whether the unattended guard eats the cabbage.</div>
    <div className="underline">If the guard does eat the cabbage:</div>
    <ol className="list-inside list-decimal" start={4}>
      <li>Bring both doors back across the river.</li>
      <li>Go back across the river by yourself.</li>
      <li>
        Go back across the river by yourself, and go through the only door
        there.
      </li>
    </ol>
    <div>If the guard does eat the cabbage:</div>
    <ol className="list-inside list-decimal" start={4}>
      <li>Go back across the river by yourself.</li>
      <li>
        Go back across the river by yourself, and go through the only door
        there.
      </li>
    </ol>
    <div>
      After the correct door is entered, the puzzle is automatically solved.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Nate Chinman, Nicholas Cressman, Thomas Gordon, and Jack de Haan";

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
