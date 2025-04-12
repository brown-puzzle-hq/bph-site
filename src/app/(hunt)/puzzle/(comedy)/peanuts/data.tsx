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
  <div className="max-w-3xl text-center">
    This is a physical puzzle! You should have received it at kickoff. Please
    visit HQ in Friedman 208 if you believe you are missing these supplies.
  </div>
);

export const remoteBoxBody = inPersonBody;

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
export const solutionBody = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `ANP	ATP	5. CHA	DER [3]	DST	EBR
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
