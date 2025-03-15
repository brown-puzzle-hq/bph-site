import Image from "next/image";
import MONKEY from "./monkey.png";
import BAT from "./bat.png";
import DOG from "./dog.png";
import FISH from "./fish.png";
import FLOWER from "./flower.png";
import PLUTO from "./pluto.png";

const ITEMS = [
  { name: "Bat", src: BAT, desc: "big wings" },
  { name: "Dog", src: DOG, desc: "back, neck" },
  { name: "Fish", src: FISH, desc: "upper lip, tail" },
  { name: "Flower", src: FLOWER, desc: "leaves" },
  { name: "Monkey", src: MONKEY, desc: "neck, right ear" },
  { name: "Pluto", src: PLUTO, desc: "back legs" },
];

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "balloon-animals";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mb-6 max-w-3xl text-center">
      <i>
      This is a physical puzzle! If your team has not already picked up your balloons,
      please visit HQ in Friedman 208.
      </i>
    </div>
    <div className="mb-4 max-w-3xl text-center">
      <b>
        This is a metapuzzle. It uses feeders from the{" "}
        <span className="underline">COMEDY</span> round.
      </b>
    </div>
    <div className="max-w-3xl space-y-4 text-center">
      <p>
        Your circus movie is pretty good, but it requires more mainstream
        appeal.
      </p>
      <p>What do you need?</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {ITEMS.map(({ name, src, desc }, index) => (
          <div className="space-y-4" key={index}>
            <p className="font-bold text-main-header">{name}</p>
            <Image src={src} alt="" className="rounded-lg" />
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="mb-6 max-w-3xl text-center">
      <i>
      This is a physical puzzle! You should use an object found in your box.
      </i>
    </div>
    <div className="mb-4 max-w-3xl text-center">
      <b>
        This is a metapuzzle. It uses feeders from the{" "}
        <span className="underline">COMEDY</span> round.
      </b>
    </div>
    <div className="max-w-3xl space-y-4 text-center">
      <p>
        Your circus movie is pretty good, but it requires more mainstream
        appeal.
      </p>
      <p>What do you need?</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {ITEMS.map(({ name, src, desc }) => (
          <div className="space-y-4">
            <p className="font-bold text-main-header">{name}</p>
            <Image src={src} alt="" className="rounded-lg" />
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const remoteBody = (
  <div>
    <div className="mb-4 max-w-3xl text-center">
      <b>
        This is a metapuzzle. It uses feeders from the{" "}
        <span className="underline">COMEDY</span> round.
      </b>
    </div>
    <div className="max-w-3xl space-y-4 text-center">
      <p>
        Your circus movie is pretty good, but it requires more mainstream
        appeal.
      </p>
      <p>What do you need?</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {ITEMS.map(({ name, src, desc }) => (
          <div className="space-y-4">
            <p className="font-bold text-main-header">{name}</p>
            <Image src={src} alt="" className="rounded-lg" />
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

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
