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
  "rs4630083",
  "rs4680",
  "rs12913832",
  "rs17822931",
  "rs1815739",
  "rs1805007",
  "rs671",
  "rs11803731",
  "rs7495174",
  "rs7192",
  "rs72921001",
  "rs4778138",
  "rs4988235",
];

const alleles = [
  "AA",
  "GG",
  "AA",
  "CC",
  "CC",
  "TT",
  "AA",
  "AA",
  "AA",
  "TT",
  "AA",
  "AA",
  "CC",
];

const chromosomes = [
  "1",
  "2",
  "2",
  "3",
  "4",
  "15",
  "7",
  "4",
  "4",
  "6",
  "2",
  "8",
  "7",
];

const phenotypes = [
  "Musician",
  "Warrior",
  "Brown eyes",
  "Wet earwax",
  "Sprinter",
  "Flaming locks of auburn hair",
  "Asian flusher",
  "Straight hair",
  "Azure orbs",
  "Peanut allergy",
  "Cilantro taster",
  "Freckles",
  "Also eats dairy but with pain",
];

const letters = [
  "M",
  "A",
  "R",
  "T",
  "I",
  "A",
  "L",
  "A",
  "R",
  "T",
  "I",
  "S",
  "T",
];

export const inPersonBody = (
  <div className="flex max-w-3xl flex-col">
    <div className="pb-4 italic">
      Working as an unpaid film intern doesn't pay the bills, so you've recently
      picked up an extra job at a back-alley DNA testing company,
      SchmancestryDNA. As your first assignment, your manager has given you this
      report to fill out by hand… What can you tell about this person from their
      DNA?
    </div>
    <p className="pb-6">
      Use this{" "}
      <a
        href="/api/puzzle/genetic-counseling"
        className="text-link hover:underline"
      >
        data sheet
      </a>{" "}
      and this{" "}
      <a
        href="/api/puzzle/genetic-counseling-pdf"
        className="text-link hover:underline"
      >
        company advertisement.
      </a>
    </p>
    <table className="items-center pb-4 text-xs leading-none text-[#EFEDEB] sm:text-base">
      <thead>
        <tr className="bg-[#40271F] font-bold text-white">
          <th className="w-1/5 p-2">rsID</th>
          <th className="w-1/5 p-2">Chromosome</th>
          <th className="w-3/5 p-2">Phenotype</th>
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
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      Each given rsID can be found in the data sheet, where the single
      nucleotide polymorphism (SNP) alleles and the chromosome can be found. By
      researching the actual SNP, such as by using SNPedia, the given genotypes
      can be associated with phenotypes. Specific names for these phenotypes can
      be found in the company advertisement, and the chromosome number is used
      to index into this phenotype:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">rsID</th>
            <th className="p-2 outline outline-white">Alleles</th>
            <th className="p-2 outline outline-white">Chromosome</th>
            <th className="p-2 outline outline-white">Phenotype</th>
            <th className="p-2 outline outline-white">Extracted Letter</th>
          </tr>
        </thead>
        <tbody>
          {traits.map((trait, index) => (
            <tr key={index}>
              <td className="p-2 outline outline-white">{trait}</td>
              <td className="p-2 outline outline-white">{alleles[index]}</td>
              <td className="p-2 outline outline-white">
                {chromosomes[index]}
              </td>
              <td className="p-2 outline outline-white">{phenotypes[index]}</td>
              <td className="p-2 outline outline-white">{letters[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      Reading the extracted letters in order gives{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        MARTIAL ARTIST,
      </span>{" "}
      which is the answer.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Kaylee Gallagher";

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
