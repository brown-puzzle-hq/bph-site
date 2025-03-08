/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "the-guard-and-the-door";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <p className="mb-8 italic">
      As you approach the end of Brown Puzzlehunt, you find in front of you The
      Guard and The Door.
      <br></br>The Guard tells you the following:
    </p>
    <p className="mb-4">
      “Upon observation, when viewing it all,
      <br></br>how many are spotted right there on the wall?
    </p>
    <p className="mb-4">
      “Once the second one comes near, and if the truth is all you hear,
      <br></br>you must make it very clear the chance your letters are top tier.
    </p>
    <p className="mb-4">
      “In the past few moves, I need not see a thing,
      <br></br>but I now must observe to decide what to bring.
    </p>
    <p className="mb-4">
      “Not the moment you march straight through a door,
      <br></br>but the time that you get four chances before.
    </p>
    <p className="mb-4">
      “When they both point, they will point right or wrong,
      <br></br>find how many are right, and you'll move right along.”
    </p>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `As you approach the end of Brown Puzzlehunt, you find in front of you The Guard and The Door.
The Guard tells you the following:

“Upon observation, when viewing it all,
how many are spotted right there on the wall?

“Once the second one comes near, and if the truth is all you hear,
you must make it very clear the chance your letters are top tier.

“In the past few moves, I need not see a thing,
but I now must observe to decide what to bring.

“Not the moment you march straight through a door,
but the time that you get four chances before.

“When they both point, they will point right or wrong,
find how many are right, and you'll move right along.”`;

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
