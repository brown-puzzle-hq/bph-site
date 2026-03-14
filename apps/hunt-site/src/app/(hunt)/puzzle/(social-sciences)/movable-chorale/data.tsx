import Image from "next/image";
import mov1 from "./MOVABLE CHORALE.svg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "movable-chorale";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <i>
        Alex, Blake, Casey, and Drew decide to practice a measure from a
        four-part chorale by taking turns singing their respective parts.
        Instead of lyrics, each singer chooses their preferred system: either
        movable-do solfege or letter names. You want to know what this practice
        routine sounds like, but you are missing some key information…
      </i>
    </div>
    <div className="mb-4 flex justify-center">
      <Image className="bg-white" src={mov1} alt="Music notation" />
    </div>
    <ul className="list-disc">
      <li>The first person sings the tonic.</li>
      <li>The second person reads in bass clef.</li>
      <li>The third person sings an outer voice.</li>
      <li>The last person uses movable-do solfege.</li>
      <li>Alex sings before the bass.</li>
      <li>Blake sings before the tenor.</li>
      <li>Casey sings after the alto.</li>
      <li>Drew sings higher than Alex.</li>
      <li>Alex and Casey use the same system.</li>
      <li>Blake and Casey read in different clefs.</li>
      <li>The missing key signature has no sharps.</li>
      <li>Exactly three letter names are sung in total.</li>
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
