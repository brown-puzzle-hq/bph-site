import BigWheelRotator from "./BigWheelRotator";

// Fill these in per wheel in this exact angle order:
// [0deg, 45deg, 90deg, 135deg, 180deg, 225deg, 270deg, 315deg]
// 0deg is to the right, 90deg is at the top.
const WHEEL_LETTERS: string[][] = [
  ["*", "H", "", "C", "", "", "D", ""], // Wheel 1 (inner)
  ["H", "O", "", "R", "", "", "A", "F"], // Wheel 2
  ["U", "L", "H", "*", "", "", "R", "U"], // Wheel 3
  ["C", "Y", "*", "P", "", "F", "*", "D"], // Wheel 4
  ["K", "", "C", "!", "*", "R", "!", "*"], // Wheel 5
  ["S", "C", "K", "", "A", "*", "", "E"], // Wheel 6
  ["!", "O", "!", "", "T", "C", "", "!"], // Wheel 7
  ["", "*", "", "", "S", "K", "", ""], // Wheel 8
  ["", "!", "", "", "!", "!", "", ""], // Wheel 9 (outer)
];

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "big-wheel";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <BigWheelRotator
      wheels={WHEEL_LETTERS.map((letters, index) => ({
        label:
          index === 0
            ? "Wheel 1 (inner)"
            : index === WHEEL_LETTERS.length - 1
              ? "Wheel 9 (outer)"
              : `Wheel ${index + 1}`,
        letters,
      }))}
    />
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
export const authors = "Phil Avilov";

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
