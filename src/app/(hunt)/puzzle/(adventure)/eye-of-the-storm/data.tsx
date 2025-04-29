const TEXT =
  "R A L E R N T O O J W L E N A A B I C E M O, O E I A M I L D R A S O O Y N E L N D A A L, D E E T C L F A L A R T R N A, E S E L I R N A T H C I O, G E A E H A S R N, S O C N N N W M R T S I A N B Y H B R E I R K O S E E M E I L E K W O C T R R T O S N Y B H, A S A F Y G O R D N S O E C A A Y T R T A P O I, M E D S R L I E E L A R V O J L D I";
const UNSCRAMBLED =
  "R A L B E R T O O J E W L M N A D I N E M O, O N I E N I A R A C S O O Y E L A D A L A L, D E E T C L L F L A R T C R N E S E E I A N A T H O I A, G E A H A R S S R S C N O, N N E W M T O I N, N B E Y H R K I R K S E A E M S I B E W O R C T R R T O N Y L B H, A S A F Y G O R D O N S E C A A L Y T T A P R I, O E D D S E I R E L A V O M J L R I";
const INDICES = [
  0, 8, 20, 21, 26, 28, 39, 40, 43, 44, 45, 52, 53, 57, 59, 65, 67, 71, 72, 74,
  79, 81, 84, 85, 87, 88, 90, 91, 93, 98, 105, 108, 109, 113, 114, 115, 117,
  126, 127, 128, 140, 141, 149, 150, 151, 154, 163, 164, 165, 167,
];
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
    <div className="pb-2.5 italic">
      You spin it right round, I, right round like a... hurricane?
    </div>
    <div className="mx-auto grid w-fit grid-cols-[repeat(13,2em)] grid-rows-[repeat(13,2em)] border text-center leading-none">
      {TEXT.split(" ").map((box, index) => (
        <div className="flex items-center justify-center border" key={index}>
          {box}
        </div>
      ))}
    </div>
    <div>
      {NAMES.map((name, index) => (
        <p key={index}>{name}</p>
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
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      As clued by the flavor text, a hurricane has gone through this puzzle and
      spun the letters around each 'I'. Undoing the damage by rotating the
      letters once clockwise, we recover the original grid:
    </div>
    <div className="mx-auto grid w-fit grid-cols-[repeat(13,2em)] grid-rows-[repeat(13,2em)] border text-center leading-none">
      {UNSCRAMBLED.split(" ").map((box, index) => (
        <div
          className={
            box == "I"
              ? "flex items-center justify-center border bg-purple-200 text-black"
              : "flex items-center justify-center border"
          }
          key={index}
        >
          {box}
        </div>
      ))}
    </div>
    <div>
      Now, completing the word search, we reveal the following unused letters:
    </div>
    <div className="mx-auto grid w-fit grid-cols-[repeat(13,2em)] grid-rows-[repeat(13,2em)] border text-center leading-none">
      {UNSCRAMBLED.split(" ").map((box, index) => (
        <div
          className={
            INDICES.includes(index)
              ? "flex items-center justify-center border bg-green-200 text-black"
              : "flex items-center justify-center border line-through"
          }
          key={index}
        >
          {box}
        </div>
      ))}
    </div>
    <div>
      Reading these letters and separating them by the commas, we obtain the
      following list of names:
    </div>
    <ul className="list-inside list-disc">
      <li>ROMO</li>
      <li>NADAL</li>
      <li>DELARENTA</li>
      <li>GASSO</li>
      <li>NEWTON</li>
      <li>HEMSWORTH</li>
      <li>ASCARI</li>
      <li>ODOMJR</li>
    </ul>
    <div>
      These are last names of people with first names from the original
      hurricane name list:
    </div>
    <ul className="list-inside list-disc">
      <li>Tony Romo</li>
      <li>Rafael Nadal</li>
      <li>Oscar Delarenta</li>
      <li>Patty Gasso</li>
      <li>Isaac Newton</li>
      <li>Chris Hemsworth</li>
      <li>Alberto Ascari</li>
      <li>Leslie Odom, Jr.</li>
    </ul>
    <div>
      Reading off the first letters of these first names, we get our answer:{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        TROPICAL.
      </span>
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Erin Finn";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
const LETTERS = TEXT.split(" ");
const size = Math.sqrt(LETTERS.length);
export const copyText =
  LETTERS.reduce((acc, val, i) => {
    acc += val;
    i % size === size - 1 ? (acc += "\n") : (acc += "\t");
    return acc;
  }, "") +
  "\n" +
  NAMES.join("\n");

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
