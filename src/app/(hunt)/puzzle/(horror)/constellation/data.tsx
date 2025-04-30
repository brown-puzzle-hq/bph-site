//TODO: make less jank

import Image from "next/image";
import CONS1 from "./Constellation1.svg";
import CONS2 from "./Constellation2.svg";
import constolution from "./constolution.png"
const SCALE = 0.5;
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "constellation";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center items-center">
    <p>
      <b>
        This is a sequence metapuzzle. It uses feeders from the ⭐ sequence.
      </b>
    </p>
    <div className="flex justify-center">
    <Image
    src={CONS1}
    alt=""
    // width={1638 * SCALE}
    // height={1752 * SCALE}
    className="mb-5 align-center"
  /> </div>
  <div className="flex justify-center">
      <Image
    src={CONS2}
    alt=""
    // width={1638 * SCALE}
    // height={1752 * SCALE}
    className="mb-5 align-center"
  /></div>
    </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody  = <div className="max-w-3xl space-y-4">
  <div>
    Constellation consists of three mini-puzzles, each mechanically based off of one of its feeder puzzles. The diagram at the top gives you three “feeder” answers, each of which feed into two of the mini puzzles and pop out a letter. The answer to the puzzle is what you get when you put all the letters in the order indicated.
  </div>
  <div>
    The first mini-puzzle is based on Walk of Fame and takes CAPITOL RECORDS LOGO and BOWTIE as its inputs. CAPITOL RECORDS LOGO and BOWTIE are both unique Hollywood walk of fame star arts, denoting CAPITOL RECORDS and CHEVROLET SUBURBAN respectively. Taking the third letter of both yields _EP____.
  </div>
  <div>
    The second mini-puzzle is based on What’s My Ride? and takes BOWTIE and PLEIADES as its inputs. BOWTIE and PLEIADES both appear on the logos of two different “rides” (car brands): CHEVROLET and SUBARU respectively. Taking the penultimate letter of both yields ____ER.
  </div>
  <div> 
    The third mini-puzzle is based on Connect the Dots and takes CAPITOL RECORDS LOGO and PLEIADES as its inputs. Both the CAPITOL RECORDS LOGO and PLEIADES (the constellation) contain star patterns. If you connect the stars like in Connect the Dots, you get K__L__. Putting all three sets of letters together yields{" "} 
    <span className="font-bold text-main-accent">
          KEPLER</span>.
  </div>
  <div className="flex flex-col items-center space-y-2 mt-8">
      <Image src={constolution} width={500} height={500} alt="" />
  </div>
  <div className="mt-4 text-center text-base text-white">
      The pattern in Connect the Dots. CAPITOL RECORDS LOGO goes across, PLEIADES is everything else.
    </div>

</div>;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Thomas Gordon and Malcolm Certain";

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
