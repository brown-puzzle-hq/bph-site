import Image from "next/image";
import PUZZLE from "./Opening Sequences.svg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "opening-sequences";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl text-center">
    <Image
      src={PUZZLE}
      alt="chess tree (puzzle body) image"
    />
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4 text-left">
    <p>
      The goal of this puzzle is to identify the names of the chess positions,
      which are different openings. The lines between the positions and the
      number indicate the number of moves (from white or black) it takes to go
      from one board state to the other. No number indicates one move.
    </p>

    <p className="space-y-4">
      The names of the positions with indices are (top to bottom):
    </p>

    <ul className="list-inside list-disc space-y-2">
      <li>
        Nescafe Frappe Attack <span className="font-semibold">[12]</span>
      </li>
      <li>
        Maccutcheon Variation <span className="font-semibold">[2]</span>
      </li>
      <li>
        Winawer Variation <span className="font-semibold">[1]</span>
      </li>
      <li>
        Bongcloud Attack <span className="font-semibold">[3]</span>
      </li>
      <li>
        Trompowsky Attack <span className="font-semibold">[1]</span>
      </li>
      <li>
        Petrov Defence <span className="font-semibold">[5]</span>
      </li>
      <li>
        Fingerslip Variation <span className="font-semibold">[1]</span>
      </li>
      <li>
        4 Knights Attack <span className="font-semibold">[1]</span>
      </li>
    </ul>

    <p>
      Taking indices one obtains{" "}
      <span className="font-bold text-main-accent">PAWNTOF4</span> (4). This
      move gives rise to the Bird's Opening. Since the answer is 4 letters, we
      get
      <span className="font-bold text-main-accent"> BIRD</span>.
    </p>

    <p className="italic text-gray-400">
      NOTE: The last opening could alternatively be “Four Knights Attack,” which
      gives an F during indexing, but PAWNTOFF doesn't make sense, so the puzzle
      solver is expected to realize you are supposed to index the number 4
      instead.
    </p>
  </div>
);

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
