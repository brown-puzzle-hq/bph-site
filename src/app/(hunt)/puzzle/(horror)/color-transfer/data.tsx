import Image from "next/image";
import Image1 from "./media/image1.png";
import Image2 from "./media/image2.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "color-transfer";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mb-4 max-w-3xl text-center">
      <b>
        This is a sequence metapuzzle. It uses feeders from the ✈️ sequence.
      </b>
    </div>
    <div className="max-w-2xl">
      <div className="flex justify-center pb-4">
        <iframe
          className="aspect-video w-full"
          src="https://www.youtube-nocookie.com/embed/UrX1BOCMXqE"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <p className="pb-4">
        Your three tickets each entitle you to ride to stops on four trains, on
        the following lines, in the following order:
      </p>
      <div className="flex justify-center pb-4">
        <Image src={Image1} alt="" width={500} height={500} />
      </div>
      <p className="pb-4">
        You can choose to get on trains travelling in either direction along the
        line. When a train reaches the end of the line, it turns around and
        travels in the other direction.
      </p>
      <p className="pb-4">Each stop that you travel costs a coin.</p>

      <div className="flex justify-center pb-4">
        <Image src={Image2} alt="" width={700} height={700} />
      </div>
    </div>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

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
