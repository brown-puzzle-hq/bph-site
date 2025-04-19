import Image from "next/image";
import horse from "./horse.png";
import boom_and_bust from "./boom_and_bust.png";
import boompile from "./boompile.png";
import granted_dynamite from "./granted_dynamite.png";
import holster_tavern from "./holster_tavern.png";
import ingenious_engineering from "./ingenious_engineering.png";
import booklet1 from "./booklet_1.png";
import booklet2 from "./booklet_2.png";
import booklet3 from "./booklet_3.png";
import booklet4 from "./booklet_4.png";
import discard from "./playmat discard.png";
import stash from "./playmat stash.png";
import town from "./playmat town.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "a-fistful-of-cards";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mx-auto mb-6 max-w-3xl text-center italic">
        This is a physical puzzle! You should have received it at kickoff.
        Please visit HQ in Friedman 208 if you believe you are missing these
        supplies.
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <div className="mb-6 max-w-3xl text-center">
      <span className="underline">
        <b>Round 1</b>
      </span>
      : Deal 14 damage.
    </div>
    <div className="mb-3 max-w-3xl">
      <span className="underline">
        <b>Legal cards</b>
      </span>
      : The{" "}
      <Image
        src={horse}
        alt="horse"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      set.
    </div>

    <ul className="list-disc pl-6">
      <li>Boom and Bust</li>
      <li>Boompile</li>
      <li>Granted Dynamite</li>
      <li>Holster Tavern</li>
      <li>Ingenious Engineering</li>
    </ul>

    {/* <div className="mt-8 flex justify-center gap-4">
      <Image src={booklet1} alt="Booklet #1" width={200} height={400} />
      <Image src={booklet2} alt="Booklet #2" width={200} height={400} />
      <Image src={booklet3} alt="Booklet #3" width={200} height={400} />
      <Image src={booklet4} alt="Booklet #4" width={200} height={400} />
    </div> */}
  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="max-w-3xl text-center">
      <i>
        This is a physical puzzle! You should have received it in your box.
        Contact brownpuzzlehq@gmail.com with any questions about your box or its
        materials.
      </i>
    </div>
    <hr className="my-6 mb-6 border-t border-white" />
    <div className="mb-6 max-w-3xl text-center">
      <span className="underline">
        <b>Round 1</b>
      </span>
      : Deal 14 damage.
    </div>
    <div className="mb-3 max-w-3xl">
      <span className="underline">
        <b>Legal cards</b>
      </span>
      : The{" "}
      <Image
        src={horse}
        alt="hat"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      set.
    </div>

    <ul className="list-disc pl-6">
      <li>Boom and Bust</li>
      <li>Boompile</li>
      <li>Granted Dynamite</li>
      <li>Holster Tavern</li>
      <li>Ingenious Engineering</li>
    </ul>
  </div>
);

export const remoteBody = (
  <div>
    <div className="mx-auto mb-6 w-full text-center">
      <span className="underline">
        <b>Round 1</b>
      </span>
      : Deal 14 damage.
    </div>
    <hr className="my-6 mb-6 border-t border-white w-[848px]" />
    <div className="mb-6 w-full text-center">
      <span className="underline">
        <b>Legal cards</b>
      </span>
      : The{" "}
      <Image
        src={horse}
        alt="hat"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      set.
    </div>

    <div className="mt-5 grid grid-cols-3 justify-items-center gap-4">
      <Image src={boom_and_bust} alt="Boom and Bust" width={250} height={500} />
      <Image src={boompile} alt="Boompile" width={250} height={500} />
      <Image
        src={granted_dynamite}
        alt="Granted Dynamite"
        width={250}
        height={500}
      />
    </div>
    <div className="mx-auto mt-5 grid w-max grid-cols-2 justify-items-center gap-x-8">
      <Image
        src={holster_tavern}
        alt="Holster Tavern"
        width={250}
        height={500}
      />
      <Image
        src={ingenious_engineering}
        alt="Ingenious Engineering"
        width={250}
        height={500}
      />
    </div>

    <hr className="my-6 mb-6 border-t border-white" />

    <div className="mb-6 w-full text-center">
      <span className="underline">
        <b>Instructions</b>
      </span>
    </div>

    <div className="mt-8 flex justify-center gap-4">
      <Image src={booklet1} alt="Booklet #1" width={200} height={400} />
      <Image src={booklet2} alt="Booklet #2" width={200} height={400} />
      <Image src={booklet3} alt="Booklet #3" width={200} height={400} />
      <Image src={booklet4} alt="Booklet #4" width={200} height={400} />
    </div>

    <hr className="my-6 mb-6 border-t border-white" />

    <div className="mb-6 w-full text-center">
      <span className="underline">
        <b>Playmats</b>
      </span>
    </div>

    <div className="flex h-full flex-col items-center justify-between gap-4">
      <Image src={stash} alt="The Stash" width={700} height={1000} />
      <Image src={town} alt="The Town" width={700} height={1000} />
      <Image src={discard} alt="Discard Pile" width={700} height={1000} />
    </div>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl text-center">
    This puzzle does not have a solution. Go nag Jeremy.{" "}
  </div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null; // come back later

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
