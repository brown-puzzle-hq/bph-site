import Image from "next/image";
import whale from "./whales_shoot.png";
import grid from "./image_0_0.jpg";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "flying-through-the-grid";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-8">
      <Image src={grid} alt="" />
    </div>
    <div className="flex justify-around gap-16">
      <div className="flex flex-col">
        <span className="text-center font-bold">Across</span>
        <span>Jackal-headed Egyptian god</span>
        <span>
          <Image src={whale} alt="" width="150" />
        </span>
        <span>Silhouetted</span>
        <span>"Concrete jungle where dreams are made of" song</span>
        <span>Field of medicine for the elderly</span>
        <span>Annual holiday on June 25th</span>
        <span>One of the five gifted in a classic Christmas song.</span>
        <span>This kind of police. Would, hate this clue.</span>
        <span>Where the kazoo was invented</span>
        <span>Reddish pigment made from dirt</span>
        <span>
          3rd, 4th, and 5th names of the General who destroyed Carthage
        </span>
        <span>Sunroom</span>
        <span>Mario's dragon sidekick</span>
      </div>
      <div className="flex flex-col">
        <span className="text-center font-bold">Down</span>
        <span>Animal on Wyoming's flag</span>
        <span>What gen-Alpha farms</span>
        <span>Attraction to multiple genders</span>
        <span>New York corner store</span>
        <span>These are never-ending at Olive Garden</span>
        <span>Mites commonly found in grass</span>
        <span>You can hear the ocean in this</span>
        <span>Ray Tomlinson sent the first one</span>
        <span>Famous M.C.</span>
        <span>A kind of "hop" from Harlem</span>
        <span>The "Architect of Rock and Roll"</span>
        <span>Beethoven's first name</span>
        <span>CNN alternative</span>
        <span>Strategic alibi through lack of evidence</span>
        <span>Necessary piece of any princess costume</span>
      </div>
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
