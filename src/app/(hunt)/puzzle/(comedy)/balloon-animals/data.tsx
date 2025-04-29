import Image from "next/image";
import MONKEY from "./monkey.png";
import BAT from "./bat.png";
import DOG from "./dog.png";
import FISH from "./fish.png";
import FLOWER from "./flower.png";
import PLUTO from "./pluto.png";
import MONKEYSOL from "./monkey_sol.png";
import BATSOL from "./bat_sol.png";
import DOGSOL from "./dog_sol.png";
import FISHSOL from "./fish_sol.png";
import FLOWERSOL from "./flower_sol.png";
import PLUTOSOL from "./pluto_sol.png";

const ITEMS = [
  {
    name: "Bat",
    src: BAT,
    desc: (
      <div>
        It has majestic <u>big wings.</u>
      </div>
    ),
  },
  {
    name: "Dog",
    src: DOG,
    desc: (
      <div>
        Be careful with its <u>neck</u> and <u>back.</u>
      </div>
    ),
  },
  {
    name: "Fish",
    src: FISH,
    desc: (
      <div>
        I love its <u>upper lip</u> and <u>tail.</u>
      </div>
    ),
  },
  {
    name: "Flower",
    src: FLOWER,
    desc: (
      <div>
        What pretty <u>leaves</u> it has!
      </div>
    ),
  },
  {
    name: "Monkey",
    src: MONKEY,
    desc: (
      <div>
        The monkey is ticklish on its <u>neck</u> and <u>right ear.</u>
      </div>
    ),
  },
  {
    name: "Pluto",
    src: PLUTO,
    desc: (
      <div>
        Why doesn't he walk on his <u>hind legs?</u>
      </div>
    ),
  },
];
const SOLS = [
  {
    name: "Bat",
    src: BATSOL,
    desc: (
      <div>
        It has majestic <u>big wings.</u>
      </div>
    ),
  },
  {
    name: "Dog",
    src: DOGSOL,
    desc: (
      <div>
        Be careful with its <u>neck</u> and <u>back.</u>
      </div>
    ),
  },
  {
    name: "Fish",
    src: FISHSOL,
    desc: (
      <div>
        I love its <u>upper lip</u> and <u>tail.</u>
      </div>
    ),
  },
  {
    name: "Flower",
    src: FLOWERSOL,
    desc: (
      <div>
        What pretty <u>leaves</u> it has!
      </div>
    ),
  },
  {
    name: "Monkey",
    src: MONKEYSOL,
    desc: (
      <div>
        The monkey is ticklish on its <u>neck</u> and <u>right ear.</u>
      </div>
    ),
  },
  {
    name: "Pluto",
    src: PLUTOSOL,
    desc: (
      <div>
        Why doesn't he walk on his <u>hind legs?</u>
      </div>
    ),
  },
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
    <div className="max-w-3xl space-y-4 text-center">
      <div className="mx-auto mb-6 max-w-3xl text-center italic">
        This is a physical puzzle! If your team has not already picked up your
        balloons, please visit HQ in Friedman 208.
      </div>
      <hr className="my-6 mb-6 w-full border-t border-white" />
      <div className="font-bold">
        This is a metapuzzle. It uses feeders from the Comedy round.
      </div>
      <div className="pb-2.5 italic">
        Your circus movie is pretty good, but it requires more mainstream
        appeal.
        <br></br>
        What do you need?
      </div>

      {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {ITEMS.map(({ name, src, desc }, index) => (
          <div className="space-y-4" key={index}>
            <p className="font-bold text-main-header">{name}</p>
            <Image src={src} alt="" className="rounded-lg" />
            {desc}
          </div>
        ))}
      </div>*/}
    </div>
  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="mb-4 max-w-3xl text-center">
      <i>
        This is a physical puzzle! You should use an object found in your box.
        Contact brownpuzzlehq@gmail.com with any questions about your box or its
        materials.
      </i>
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <div className="mb-4 max-w-3xl text-center">
      <b>This is a metapuzzle. It uses feeders from the Comedy round.</b>
    </div>
    <div className="max-w-3xl space-y-4 text-center">
      <div className="pb-2.5 italic">
        Your circus movie is pretty good, but it requires more mainstream
        appeal.
        <br></br>
        What do you need?
      </div>
      {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {ITEMS.map(({ name, src, desc }, index) => (
          <div className="space-y-4" key={index}>
            <p className="font-bold text-main-header">{name}</p>
            <Image src={src} alt="" className="rounded-lg" />
            {desc}
          </div>
        ))}
      </div> */}
      <div className="font-bold">
        Erratum: The order of the two things to be careful with for the Dog
        should be switched.
      </div>
    </div>
  </div>
);

export const remoteBody = (
  <div>
    <div className="mb-4 max-w-3xl text-center">
      <b>This is a metapuzzle. It uses feeders from the Comedy round.</b>
    </div>
    <div className="max-w-3xl space-y-4 text-center">
      <div className="pb-2.5 italic">
        Your circus movie is pretty good, but it requires more mainstream
        appeal.
        <br></br>
        What do you need?
      </div>
      <div className="grid grid-cols-1 border-4 border-white sm:grid-cols-2">
        {ITEMS.map(({ name, src, desc }, index) => (
          <div className="space-y-4 border-4 border-white p-4" key={index}>
            <p className="font-bold text-main-header">{name}</p>
            <Image src={src} alt="" className="rounded-lg" />
            {desc}
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
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      Each feeder can be associated with one of the balloon animals. For
      example, KELPIE MUTT goes with Dog, and MICROGRAVITY pairs with Pluto.
      Writing the feeders on the balloons and keeping track of where the letters
      end up after folding, we obtain the following images:
    </div>
    <div className="grid grid-cols-1 border-4 border-white text-center sm:grid-cols-2">
      {SOLS.map(({ name, src, desc }, index) => (
        <div className="space-y-4 border-4 border-white p-4" key={index}>
          <p className="font-bold text-main-header">{name}</p>
          <Image src={src} alt="" className="rounded-lg" />
          {desc}
        </div>
      ))}
    </div>
    <div>
      Extracting letters as instructed and sorting by feeder length, we have:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Feeder Answer</th>
            <th className="p-2 outline outline-white">Balloon Animal</th>
            <th className="p-2 outline outline-white">Extracted Letters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">MINNOWS</td>
            <td className="p-2 outline outline-white">Fish</td>
            <td className="p-2 outline outline-white">MO</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">VAMPIRES</td>
            <td className="p-2 outline outline-white">Bat</td>
            <td className="p-2 outline outline-white">RE</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">POPPYSEED</td>
            <td className="p-2 outline outline-white">Flower</td>
            <td className="p-2 outline outline-white">PO</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">KELPIEMUTT</td>
            <td className="p-2 outline outline-white">Dog</td>
            <td className="p-2 outline outline-white">PM</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">PROTOHUMANS</td>
            <td className="p-2 outline outline-white">Monkey</td>
            <td className="p-2 outline outline-white">US</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">MICROGRAVITY</td>
            <td className="p-2 outline outline-white">Pluto</td>
            <td className="p-2 outline outline-white">IC</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      Reading off these letters in order gives our final answer:{" "}
      <span className="font-bold text-main-accent">
        MORE POP MUSIC</span>.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Phil Avilov, Noah Elbaum, Thomas Gordon, and Gabriel Nelkin";

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
