/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "genetic-counseling";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

const traits = [
  "Coffee consumption",
  "Warrior/Worrier personality",
  "Nicotine Dependence Risk",
  "Coronary heart disease risk",
  "Norovirus resistance",
  "Red Hair",
  "Blonde Hair",
  "Baldness",
  "Photic Sneeze Reflex",
  "Earwax type",
  "Blue eyes",
  "Sprinter/endurance runner (muscle type)",
  "Bitter taster (phenylthiocarbamide)",
  "Asian Flush",
  "Type 2 Diabetes Risk (TCF7L2)",
  "Type 2 Diabetes/Obesity Risk (FTO gene)",
  "Lactose intolerance",
  "Dyslexia risk",
  "Cilantro taste",
  "Peanut Allergy",
  "Gunther Disease (Congenital Erythropoietic Porphyria)",
];

export const inPersonBody = (
  <div className="max-w-4xl p-4">
    <p className="pb-4">
      Your back-alley DNA testing company has really started to get off the
      ground, but your lack of programming skills means you're forced to chain
      together this report by hand. What can you tell about this person from
      their DNA? (13)
    </p>
    <p className="pb-4">
      Use this{" "}
      <a
        href="/api/puzzle/genetic-counseling"
        className="text-link hover:underline"
      >
        data sheet
      </a>
      .
    </p>
    <table className="pb-4 text-black outline">
      <thead>
        <tr className="bg-neutral-500 outline">
          <th className="px-1 outline">Trait</th>
          <th className="w-1/5 px-1 outline">rsID</th>
          <th className="w-1/5 px-1 outline">Allele 1</th>
          <th className="w-1/5 px-1 outline">Allele 2</th>
        </tr>
      </thead>
      <tbody>
        {traits.map((trait, index) => (
          <tr
            className={index % 2 ? "bg-neutral-300" : "bg-neutral-100"}
            key={index}
          >
            <td className="px-1 outline">{trait}</td>
            <td className="px-1 outline"></td>
            <td className="px-1 outline"></td>
            <td className="px-1 outline"></td>
          </tr>
        ))}
      </tbody>
    </table>
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
