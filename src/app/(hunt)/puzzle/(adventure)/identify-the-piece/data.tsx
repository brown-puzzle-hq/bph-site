import Image from "next/image";
import IMG1 from "./1.png";
import IMG2 from "./2.png";
import IMG3 from "./3.png";
import IMG4 from "./4.png";
import IMG5 from "./5.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "identify-the-piece";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <i>
      NOTE: This puzzle is intended to proceed in levels, where you can look at
      the next clue when you correctly answer the current clue. The answer to
      the last clue is the answer to the entire puzzle. Submit the answer to the
      example level to get started.
    </i>
    <p className="font-bold">Example</p>
    <Image src={IMG1} alt="" />
    <p>(6,5) {"->"} LITTLE FUGUE</p>
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
      All of the riddles are the names of famous musical works of the form
      [Adjective] + [Song Form]. The song form is another famous work of that
      type, and the adjective is made by altering the score to make a pun.
    </div>
    <ol className="list-inside list-decimal">
      <li>
        This is Beethoven's 5th Symphony, but the last motif is missing, making
        it an{" "}
        <span className="font-bold text-main-accent">
          UNFINISHED SYMPHONY</span>.
      </li>
      <li>
        This is a Chopin Etude, but the time signature is in the mathematical
        constant pi, giving{" "}
        <span className="font-bold text-main-accent">
          TRANSCENDENTAL ETUDES</span>.
      </li>
      <li>
        This is Strauss's Blue Danube Waltz (which is Valse in French), but the
        bassline is entirely the solfège note la, making it{" "}
        <span className="font-bold text-main-accent">
          LA VALSE</span>.
      </li>
      <li>
        This is Bohemian Rhapsody on the alto clef, making it{" "}
        <span className="font-bold text-main-accent">
          ALTO RHAPSODY</span>,{" "}
        which is the answer to this puzzle.
      </li>
    </ol>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Philip Yao";

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
export const tasks: Record<string, JSX.Element> = {
  LITTLEFUGUE: (
    <div className="max-w-3xl space-y-4 text-center">
      <Image src={IMG2} alt="" />
      <p>(10, 8)</p>
    </div>
  ),
  UNFINISHEDSYMPHONY: (
    <div className="max-w-3xl space-y-4 text-center">
      <Image src={IMG3} alt="" />
      <p>(14, 6)</p>
    </div>
  ),
  TRANSCENDENTALETUDES: (
    <div className="max-w-3xl space-y-4 text-center">
      <Image src={IMG4} alt="" />
      <p>(2, 5)</p>
    </div>
  ),
  LAVALSE: (
    <div className="max-w-3xl space-y-4 text-center">
      <Image src={IMG5} alt="" />
      <p>(4, 8)</p>
    </div>
  ),
};
