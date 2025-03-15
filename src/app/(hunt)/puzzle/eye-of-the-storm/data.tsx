const TEXT =
  "R A L E R N T O O J W L E N A A B I C E M O, O E I A M I L D R A S O O Y N E L N D A A L, D E E T C L F A L A R T R N A, E S E L I R N A T H C I O, G E A E H A S R N, S O C N N N W M R T S I A N B Y H B R E I R K O S E E M E I L E K W O C T R R T O S N Y B H, A S A F Y G O R D N S O E C A A Y T R T A P O I, M E D S R L I E E L A R V O J L D I";
const NAMES = [
  "Alberto",
  "Beryl",
  "Chris",
  "Debby",
  "Ernesto",
  "Francine",
  "Gordon",
  "Helene",
  "Isaac",
  "Joyce",
  "Kirk",
  "Leslie",
  "Milton",
  "Nadine",
  "Oscar",
  "Patty",
  "Rafael",
  "Sara",
  "Tony",
  "Valerie",
  "William",
];

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "eye-of-the-storm";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <p>You spin it right round, I, right round like a... hurricane?</p>
    <div className="mx-auto grid w-fit grid-cols-[repeat(13,1.5em)] grid-rows-[repeat(13,1.5em)] border">
      {TEXT.split(" ").map((box) => (
        <p className="flex items-center justify-center border">{box}</p>
      ))}
    </div>
    <div>
      {NAMES.map((name) => (
        <p>{name}</p>
      ))}
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
