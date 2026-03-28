import Image from "next/image";
import dirt from "./dirt.svg";

import bag12front from "./dirt_12_front.jpg";
import bag12back from "./dirt_12_back.jpg";
import bag34front from "./dirt_34_front.jpg";
import bag34back from "./dirt_34_back.jpg";
import bag56front from "./dirt_56_front.jpg";
import bag56back from "./dirt_56_back.jpg";
import bag78front from "./dirt_78_front.jpg";
import bag78back from "./dirt_78_back.jpg";
import bag910front from "./dirt_910_front.jpg";
import bag910back from "./dirt_910_back.jpg";

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

export const remoteBody = (
  <div className="max-w-3xl">
    <div className="mb-10">
      <b>
        This was a physical puzzle. In addition to the information below,
        solvers received 10 bags of dirt:
      </b>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Image
          className="h-auto w-full"
          src={bag12front}
          alt="Two bags of dirt, numbered 1 and 2."
        />
        <Image
          className="h-auto w-full"
          src={bag12back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The middle and top mini-triangles are marked with a dot on the left and right bags, respectively."
        />
        <Image
          className="h-auto w-full"
          src={bag34front}
          alt="Two bags of dirt, numbered 3 and 4."
        />
        <Image
          className="h-auto w-full"
          src={bag34back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The top and top mini-triangles are marked with a dot on the left and right bags, respectively."
        />
        <Image
          className="h-auto w-full"
          src={bag56front}
          alt="Two bags of dirt, numbered 5 and 6."
        />
        <Image
          className="h-auto w-full"
          src={bag56back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The top and left mini-triangles are marked with a dot on the left and right bags, respectively."
        />
        <Image
          className="h-auto w-full"
          src={bag78front}
          alt="Two bags of dirt, numbered 7 and 8."
        />
        <Image
          className="h-auto w-full"
          src={bag78back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The middle and top mini-triangles are marked with a dot on the left and right bags, respectively."
        />
        <Image
          className="h-auto w-full"
          src={bag910front}
          alt="Two bags of dirt, numbered 9 and 10."
        />
        <Image
          className="h-auto w-full"
          src={bag910back}
          alt="Two bags of dirt, marked with equilateral triangles made of 4 smaller equilateral triangles. The middle mini-triangle of the left bag is marked with a dot on the left and right bags, respectively."
        />
      </div>
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
    <div className="flex justify-center">
      <Image src={dirt} alt="A figure with many red triangles." />
    </div>
  </div>
);

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
