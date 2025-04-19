/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "piecemeal";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

const across_index = [1, 4, 5];

const puzzleClues = [
  {
    down: [
      "Where you might order an Old Fashioned",
      "Relative of Id",
      "Good thing to balance golf balls on",
    ],
    across: [
      "Wager",
      "One of Bronze, Dark, Middle, or Reason",
      "Fish egg mass",
    ],
  },
  {
    down: [
      "One known to be honest",
      "Your grandma probably bites with this",
      "Attention-seeking exclamations",
    ],
    across: [
      'Immediately preceding "in a galaxy far, far away"',
      "Wall street order",
      "Common pre-med volunteer gig",
    ],
  },
  {
    down: [
      "What keeps a baby's shirt clean",
      "The rocks",
      "Used to color soft materials",
    ],
    across: [
      "Auction action",
      "Frigid",
      "Their dance was featured in a 2015 MIT Mystery Hunt puzzle",
    ],
  },
  {
    down: [
      'Interactive puzzle game from 2015, followed by "story"',
      "How a Roman might read four",
      "What you do with your eye",
    ],
    across: [
      'Stand-in for Charles, followed by "Majesty"',
      "Adam counterpart",
      "Poor-soil- and low-temperature-tolerant cereal",
    ],
  },
  {
    down: [
      "All women born after 1993, according to the Internet",
      "What one might do in hell",
      "Belonging to me and you",
    ],
    across: [
      "Casual fraternal address",
      "Acknowledgement of debt",
      "Common data type",
    ],
  },
  {
    down: ["Bunny verb", "What you use to hear", "Sardonic"],
    across: ["Chop down", "Crew's tool", "Ask nosy questions"],
  },
  {
    down: [
      "The onion browser",
      "Much ___ about nothing",
      "Comfortable place to sleep",
    ],
    across: [
      "What you'd pay off after a long night",
      "Ordinary Differential Equation",
      "Useful item to catch fish with",
    ],
  },
  {
    down: [
      'Gilbert\'s "___ Ballads"',
      "2019 horror movie about an allergy to the outdoors",
      "Tonic companion",
    ],
    across: [
      "What you might get on your knees to do",
      '"The Greatest"',
      "Where the rubbish should go",
    ],
  },
  {
    down: [
      "Shed tears",
      "The last tool to be made out of diamonds",
      "What you'll need to play an electric guitar",
    ],
    across: ["Repeated before a slide", "___-Com", "Yes"],
  },
];

export const inPersonBody = (
  <div className="max-w-4xl py-4">
    {/* <p className="pb-8">
      Rivers are three letters long and may either flow horizontally,
      vertically, or diagonally in strict alphabetical order. Horizontal and
      diagonal rivers are read left-to-right, and vertical rivers are read
      top-to-bottom. Any such triple of letters has a river flowing through it.
    </p> */}
    <div className="mb-6 text-center font-bold">Examples (and non-examples):</div>
    <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-3">
      <div className="relative mx-auto grid w-36 grid-cols-3 gap-0 outline outline-1 md:mx-0">
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">
          A
        </div>
        <div className="flex h-12 w-12 items-center justify-center border">
          R
        </div>
        <div className="flex h-12 w-12 items-center justify-center border">
          T
        </div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="absolute translate-y-[72px] border-t w-full" />
      </div>

      <div className="relative mx-auto grid w-36 grid-cols-3 gap-0 outline outline-1 md:mx-0">
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">
          J
        </div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">
          O
        </div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">
          Y
        </div>
        <div className="absolute translate-x-[120px] border-l h-full" />
      </div>

      <div className="relative mx-auto grid w-36 grid-cols-3 gap-0 outline outline-1 md:mx-0">
        <div className="flex h-12 w-12 items-center justify-center border">A</div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">B</div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">C</div>
        <div className="absolute translate-x-[72px] -translate-y-[28px] border-l h-[200px] -rotate-45" />
      </div>

      <div className="relative mx-auto grid w-36 grid-cols-3 gap-0 outline outline-1 md:mx-0">
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">Z</div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">Y</div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">X</div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="absolute translate-x-[72px] -translate-y-[28px] border-l h-[200px] rotate-45" />
      </div>

      <div className="relative mx-auto grid w-36 grid-cols-3 gap-0 outline outline-1 md:mx-0">
        <div className="flex h-12 w-12 items-center justify-center border">E</div>
        <div className="flex h-12 w-12 items-center justify-center border">G</div>
        <div className="flex h-12 w-12 items-center justify-center border">G</div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
      </div>

      <div className="relative mx-auto grid w-36 grid-cols-3 gap-0 outline outline-1 md:mx-0">
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">C</div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">O</div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
        <div className="flex h-12 w-12 items-center justify-center border">D</div>
        <div className="flex h-12 w-12 items-center justify-center border"></div>
      </div>
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />

    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {puzzleClues.map((clues, index) => (
        <div key={index} className="w-full space-y-4">
          <div className="mx-auto grid w-36 grid-cols-3 gap-0 outline outline-1 md:mx-0">
            <div className="flex h-12 w-12 items-center justify-center border">
              1
            </div>
            <div className="flex h-12 w-12 items-center justify-center border">
              2
            </div>
            <div className="flex h-12 w-12 items-center justify-center border">
              3
            </div>
            <div className="flex h-12 w-12 items-center justify-center border">
              4
            </div>
            <div className="flex h-12 w-12 items-center justify-center border"></div>
            <div className="flex h-12 w-12 items-center justify-center border"></div>
            <div className="flex h-12 w-12 items-center justify-center border">
              5
            </div>
            <div className="flex h-12 w-12 items-center justify-center border"></div>
            <div className="flex h-12 w-12 items-center justify-center border"></div>
          </div>

          <div>
            <div className="w-full font-bold text-main-header">Across</div>
            <ul className="list-inside list-decimal">
              {clues.across.map((clue, index) => (
                <li key={index} value={across_index[index]}>
                  {clue}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="w-full font-bold text-main-header">Down</div>
            <ul className="list-inside list-decimal">
              {clues.down.map((clue, index) => (
                <li key={index}>{clue}</li>
              ))}
            </ul>
          </div>
        </div>
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
