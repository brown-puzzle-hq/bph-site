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
  <div className="max-w-4xl">
    <div className="pb-4 italic">
    Working as an unpaid film intern doesn't pay the bills, so you've 
    recently picked up an extra job at a back-alley DNA testing company, 
    SchmancestryDNA. As your first assignment, your manager has given you 
    this report to fill out by hand… What can you tell about this person from their DNA?
    </div>
    <p className="pb-6">
      Use this{" "}
      <a
        href="/api/puzzle/genetic-counseling"
        className="text-link hover:underline"
      >
        data sheet
      </a>
      .
    </p>
    <table className="pb-4 leading-none text-[#EFEDEB] text-xs sm:text-base">
      <thead>
        <tr className="bg-[#40271F] font-bold text-white">
          <th className="p-2">Trait</th>
          <th className="w-1/5 p-2">rsID</th>
          <th className="w-1/5 p-2">Allele 1</th>
          <th className="w-1/5 p-2">Allele 2</th>
        </tr>
      </thead>
      <tbody>
        {traits.map((trait, index) => (
          <tr
            className={index % 2 ? "bg-[#6D4C42]" : "bg-[#7D6056]"}
            key={index}
          >
            <td className="p-2 outline outline-[#5C382C]">{trait}</td>
            <td className="p-2 outline outline-[#5C382C]"></td>
            <td className="p-2 outline outline-[#5C382C]"></td>
            <td className="p-2 outline outline-[#5C382C]"></td>
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
