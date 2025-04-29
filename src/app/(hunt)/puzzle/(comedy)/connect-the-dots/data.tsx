import Image from "next/image";
import DOTS from "./connect_the_dots.svg";
import SHAPES from "./shapes.svg";
import SOL from "./solution.svg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "connect-the-dots";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <Image className="mx-auto" src={DOTS} alt="" />
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
    <div>The clues on the left give ARI, BIG, CAN, IND, LEO, and ORION'S.</div>
    <div>
      And the clues on the right give US, ES, CER, DIPPER, MINOR, and BELT.
    </div>
    <div>
      If we pair these up by which connections form constellations, we get
      ARIES, BIG DIPPER, CANCER, INDUS, LEO MINOR, and ORION'S BELT. Drawing the
      lines between each pair gives us:
    </div>
    <Image className="mx-auto" src={SHAPES} alt="" />
    <div>
      Reading the letters interescted from each connection (going top-to-bottom
      on the left column) spells SHAPES, a partial answer directing us to form
      the constellations' shapes, using both black dots corresponding to each
      constellation. A completed drawing is shown here:
    </div>
    <Image src={SOL} alt="" />
    <div>
      Again, reading the letters from each constellation, going top-to-bottom on
      the left column and taking the letters within each constellation in
      top-down order, we obtain our answer,{" "}
    <span className="font-bold text-main-accent">
      MICROGRAVITY</span>.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Malcolm Certain and Thomas Gordon";

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
  SHAPE: "Keep going!",
  SHAPES: "Keep going!",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
