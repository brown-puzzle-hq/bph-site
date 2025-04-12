import Image from "next/image";
import BEN from "./media/ben.jpeg";
import ORIGINAL_BEN from "./media/original-ben.jpeg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "find-ben";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="w-fit max-w-xl text-center">
    <p className="mb-6 italic">What kind of place is behind Ben?</p>
    <iframe
      className="mb-4 aspect-video w-full"
      src="https://www.youtube-nocookie.com/embed/G04LbGyI9g8"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
    <Image src={BEN} alt="" className="mb-4" />
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl">
    <p className="mb-4">Isn't it obvious? Find Ben!</p>
    <p>Intended solve path is as follows:</p>
    <ol className="mb-4 ml-8 list-decimal">
      <li>Figure out who this man is</li>
      <li>Figure out what Jet Lag: The Game is</li>
      <li>
        Look up the challenge listed in the top right corner to find the season
        and episode where this screenshot is taken from
      </li>
      <li>Find the original frame</li>
      <li>
        Reverse image search or watch the surrounding footage to determine that
        the structure behind Ben is{" "}
        <span className="bg-main-text">Odawara Castle</span>
      </li>
      <li>
        The answer is thus <span className="bg-main-text">CASTLE</span>
      </li>
    </ol>
    <p className="mb-4">
      <span>Original image: </span>
    </p>
    <Image
      src={ORIGINAL_BEN}
      alt=""
      width={1280}
      height={721}
      className="mb-4"
    />
  </div>
);

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
