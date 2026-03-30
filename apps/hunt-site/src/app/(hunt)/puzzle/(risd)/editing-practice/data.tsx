import Image from "next/image";
import img from "./editing-practice.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "editing-practice";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <p>Dear Editor,</p>
    <p>
      Attached is my latest draft. I was trying to use common phrases to create
      a chilling atmosphere but I think I may have misremembered some of the
      sayings.
    </p>
    <p className="font-mono">
      In his two hardened decades as a private eye, Eddie Esterly had never had
      an icy dossier. That night—that woman—might just be what finally tipped
      him over. It would be a gelid 24 hours in Hades' fiery depths before he
      would give up the chase! Frigid eccrine gland secreted fluid prickled his
      brow, trickled down his neck like a warning.
    </p>
    <p className="font-mono">
      He didn't believe in gods or destiny, but alas, the glacial excruciatingly
      toilsome verisimilitude darkening his path! He could take frosty
      consolation in the thought that he would soon meet the ultimate test of
      his wits—that is, if she didn't once again give him the subzero scapula
      and surrounding region.
    </p>
    <p className="font-mono">
      His mind whirled around the memory often. He took a long drag of a
      cigar—he had tried several times before, but he had never been able to
      quit arctic meleagris. It eased his nerves, at least. It would all fall
      apart if he got a chilling 0.3048 meters now.
    </p>
    <p className="font-mono">
      He hailed a cab and paid the fare, handing over the last cool solid legal
      tender sewn into the lining of his overcoat. The city smoked and
      blackened. It would look different in the freezing diurnal sunshine.
    </p>
    <p className="font-mono">
      He had oft been accused of possessing a polar cardiovascular organ. Yet,
      he felt he had never been filled with more wanting. Grasping for what's
      just an extra directly ahead of him—so close, yet out of reach. This
      mystery or him—who was going to crack first?
    </p>
    <p className="w-full text-center font-mono text-[calc(min(5.128vw-1.641px,39.385px))]">
      ❄️ ___ ___ ___ … → ❄️ _ _ _ … [#]
    </p>
    <p className="w-full whitespace-pre text-center font-mono text-[calc(min(5.128vw-1.641px,39.385px))]">
      {"╰──────┬──────╯              "}
      <br />
      {"       #                     "}
    </p>
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
