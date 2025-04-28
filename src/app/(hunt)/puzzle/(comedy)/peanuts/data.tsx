import Image from "next/image";
import PEANUTS from "./peanuts.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "peanuts";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="mx-auto mb-6 max-w-3xl text-center italic">
    This is a physical puzzle! You should have received it at kickoff. Please
    visit HQ in Friedman 208 if you believe you are missing these supplies.
  </div>
);

export const remoteBoxBody = (
  <div className="max-w-xl space-y-4 text-center">
    <p>
      <i>
        This is a physical puzzle! You should use objects found in your box.
        Contact brownpuzzlehq@gmail.com with any questions about your box or its
        materials.
      </i>
    </p>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl text-center">
    In-person solvers and box purchasers were given a bag of the following 41
    packing peanuts:
    <div className="flex justify-center py-4">
      <Image src={PEANUTS} alt="beads" />
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
      This puzzle uses the packing peanuts given out at kickoff (or in your
      Box!).
    </div>
    <div>
      There are 41 unique packing peanuts, each of which has between 1 and 3
      letters on it. 22 of these peanuts are numbered. Notably, 11 of them have
      numbers on the left-hand side of the packing peanut, and 11 of them have
      numbers on the right-hand side!
    </div>
    <div>
      We might notice that the numbers on the left-hand side of the peanuts are
      uniquely numbered 1 through 11. This might suggest that we're going to
      group the peanuts into 11 distinct groups, and maybe use the right-hand
      side to index into the groups.
    </div>
    <div>
      In fact, this is a common puzzle type (affectionately known as Trigram
      Hell) where solvers must group trigrams together in order to spell words
      or phrases. After some playing around, we can work out what the groups are
      supposed to be: they are all characters from Charles Schulz's iconic comic
      strip <i>Peanuts</i>!
    </div>
    <div>
      If we find the 11 characters, order them by left-hand number, and take the
      letter indicated by the right-hand number, then we get as follows:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Left #</th>
            <th className="p-2 outline outline-white">Character</th>
            <th className="p-2 outline outline-white">Right #</th>
            <th className="p-2 outline outline-white">Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">SNOOPY</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">P</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">SALLY BROWN</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">R</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">WOODSTOCK</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">O</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">PEPPERMINT PATTY</td>
            <td className="p-2 outline outline-white">10</td>
            <td className="p-2 outline outline-white">T</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">CHARLIE BROWN</td>
            <td className="p-2 outline outline-white">10</td>
            <td className="p-2 outline outline-white">O</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">SCHROEDER</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">H</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">GREAT PUMPKIN</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">U</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">8</td>
            <td className="p-2 outline outline-white">FRANKLIN ARMSTRONG</td>
            <td className="p-2 outline outline-white">11</td>
            <td className="p-2 outline outline-white">M</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">9</td>
            <td className="p-2 outline outline-white">LUCY VAN PELT</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">A</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">10</td>
            <td className="p-2 outline outline-white">PIGPEN</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">N</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">11</td>
            <td className="p-2 outline outline-white">LINUS VAN PELT</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">S</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      This spells the answer:{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        PROTOHUMANS.
      </span>
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Phil Avilov and Thomas Gordon";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const boxCopyText = null;
export const remoteCopyText = `ANP	ATP	5. CHA	DER [3]	DST	EBR
ELT [5]	8. FRA	7. GRE	INA	KIN [7]	11. LIN
LT [6]	9. LUC	LYB	MIN	N [7]	NG [11]
NKL	NPE	OCK [7]	OPY [5]	OWN [10]	PEN [6]
4. PEP	PER	10. PIG	RLI	RMS	ROE
ROW	2. SAL	6. SCH	1. SNO	TPA	TRO
TTY [10]	UMP	USV	3. WOO	YVA	`;

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
