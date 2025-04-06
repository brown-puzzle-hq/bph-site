import Image from "next/image";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "are-you-sure";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

const checkboxPrompts = [
  [
    "Check the box",
    "Do not check the box",
    "Do not refrain from not making the box unchecked",
    "“If no person at all were to not check this box, nobody would be doing the opposite of what they shouldn’t not do,” said a liar",
  ],
  [
    "Check this box if the closing price for the stock of iRobot on March 2nd, 2012 was $25.14",
    "Check this box if the opening price for the stock of iRobot on August 17th, 2016 was $40.39",
    "Check this box if the day high price for the stock of iRobot on January 31st, 2023 was $45.76",
  ],

  [
    "Check this box if Timothee Chalamet graduated from The Fiorello H. LaGuardia High School of Music & Art and Performing Arts",
    "Check this box if Timothee Chalamet graduated from (completed a degree at) New York University",
  ],
  [
    "Check the box if there is a smaller gap for a camel than Baby Gap (when getting the camel through the smallest gap)",
    "Check the box if Aisling Bea took photos of herself with a pineapple in esteemed company",
    "Check the box if the grapes that Sarah Millican and Munya Chuwawa ate (when eating the grape) were hidden in the same places as Fern Brady and Josh Kearns, respectively",
    "Check the box if Danielle Walker’s final password for the bouquet started with an “X”",
  ],
  [
    "Check the box if 1,4-dichlorocyclohexane contains chiral centers",
    "Check the box if the Wittig reagent contains an element whose atomic number is exactly one more than 3 above an element in the Grignard reagent",
  ],
  [
    "Check the box if Mudsdale appears in the perfect pokerap before Spheal",
    "Check the box if Brian David Gilbert, in his perfect pokerap, implied that Sunflora was “tentacool”",
    "Check the box if the original pokerap is a gesamtkunstwerk (according to Brian David Gilbert)",
  ],
  [
    "Check the box if having the closing price for the iRobot stock on March 2nd, 2012 would help to answer the 5th box of this puzzle",
    "Check the box if having knowledge of chiral centers and 1,4-dichlorocyclohexane would help solve the 14th box of this puzzle",
  ],
  [
    "Check the box if the theme of this puzzle hunt is a murder mystery",
    "Check the box if the theme of this puzzle hunt is connected in any way to a piece of public art that was on Brown’s campus but is no longer here",
  ],
  [
    "Check this box if checking it would make it checked in a way characteristic of checking a box. If you check whether this box is checked, it should be checked if you checked it, thereby making it checked.",
  ],
  [
    "With the understanding that you are still working on this puzzle, check this box if you have already won the 2025 Brown Puzzle Hunt",
    "With the understanding that you are still solving this box, check this box if you have already solved this puzzle",
  ],
  [
    "Check this box if the 3rd numerical digit to appear in this puzzle is “0” (note that if the number 123 is written, that is treated as 1, then 2, then 3)",
    "Check this box if the 4th vowel found in this puzzle (not including the title, but including the flavor text) is “e”",
    "Check this box if the ninth nine-letter word in this puzzle (not including the title, but including the flavor text) is “according”",
  ],
  [
    "Check this box if the total amount of checked boxes in this puzzle (including this one) is 16",
    "Check this box if there are any boxes that should be checked below this box.",
  ],
];

export const inPersonBody = (
  <div className="mb-2 max-w-4xl space-y-6">
    <p>
      Which of these two things do you like more: Samuel Morse or questions that
      have only two possible answers?
    </p>

    {checkboxPrompts.map((prompts, i) => (
      <div key={`${i}`}>
        {prompts.map((prompt, j) => (
          <div className="flex space-x-4" key={`${i}-${j}`}>
            <input
              type="checkbox"
              value=""
              className="h-6 min-w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600"
            />
            <p>{prompt}</p>
          </div>
        ))}
      </div>
    ))}
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
export const copyText = checkboxPrompts.reduce((acc, val) => acc + val.join("\n") + "\n\n", "");

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
