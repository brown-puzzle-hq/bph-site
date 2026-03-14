import Image from "next/image";
import dirt from "./dirt.svg";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "dirt";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-10">
      <b>
        This is a physical puzzle! Please come to HQ in Friedman 208 to pick it
        up.
      </b>
    </div>
    <div className="flex justify-around">
      <div className="flex flex-col gap-4 text-center font-bold">
        <span>↘</span>
        <span>News host</span>
        <span>Underskirt</span>
        <span>Small coin</span>
        <span>Campaigned for office</span>
      </div>
      <div className="flex flex-col gap-4 text-center font-bold">
        <span>→</span>
        <span>Ltd.</span>
        <span>Rock from space</span>
        <span>Yogi Bear, Rat, and Mole, for three</span>
        <span>Annulment</span>
      </div>
    </div>
    <div>
      <Image src={dirt} alt="A figure with many red triangles" />
    </div>
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
