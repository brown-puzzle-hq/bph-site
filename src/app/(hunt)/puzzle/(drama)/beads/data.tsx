import Image from "next/image";
import BEADS from "./beads_diagram.svg";
import A from "./a.svg";
import B from "./b.svg";
import Y from "./y.svg";
import S from "./s.svg";
const CHAIN = "BBRBGGGRRGBGRRGRGRG";

const COLORS: Record<string, string> = {
  B: "bg-[#4a86e8] border-[#4264A9]",
  R: "bg-[#cc0000] border-[#8C271B]",
  G: "bg-[#cccccc] border-[#8A8A8A]",
};

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "beads";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="mx-auto mb-6 max-w-3xl text-center italic">
    This is a physical puzzle! If your team has not already picked up a chain,
    please visit HQ in Friedman 208.
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <p>
      <i>You've had me bending double from your curses!</i>
    </p>
    <div className="flex justify-center pt-1.5">
      <Image src={BEADS} alt="beads" />
    </div>
  </div>
);

export const remoteBoxBody = (
  <div className="max-w-xl space-y-4 text-center">
    <p>
      <i>
        This is a physical puzzle! You should use an object found in your box.
        Contact brownpuzzlehq@gmail.com with any questions about your box or its
        materials.
      </i>
    </p>
    <div className="flex justify-center pt-1.5">
      <Image src={BEADS} alt="beads" />
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-xl space-y-4 text-center">
    <i>
      This puzzle is a chain puzzle. In-person solvers and box purchasers were
      given a wire with beads of the following colors, in order:
    </i>
    <div className="flex justify-center py-1.5">
      {CHAIN.split("").map((cell, index) => (
        <div
          key={index}
          className={`size-4 rounded-sm border-2 md:size-6 ${COLORS[cell]}`}
        />
      ))}
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <div className="flex justify-center pt-1.5">
      <Image src={BEADS} alt="beads" />
    </div>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      For each row, taking the chain and making all the bends pictured results
      in the overall chain taking the shape of a letter:
    </div>
    <div className="items-center justify-center space-y-4">
      <div className="grid grid-cols-3">
        <Image src={A} height={200} alt="beads" />
        <Image src={B} height={200} alt="beads" />
        <Image src={Y} height={200} alt="beads" />
      </div>
      <div className="grid grid-cols-2">
        <Image src={S} height={300} alt="beads" />
        <Image src={S} height={300} alt="beads" />
      </div>
    </div>
    <div>
      These letters, when read in order, spell the answer:{" "}
      <span className="font-bold text-main-accent">ABYSS</span>.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Phil Avilov";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null; // Should be composed of the const variables up top

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
