const CHAIN = "BBRBGGGRRGBGRRGRGRG";

const COLORS: Record<string, string> = {
  B: "bg-[#4a86e8] border-[#4264A9]",
  R: "bg-[#cc0000] border-[#8C271B]",
  G: "bg-[#cccccc] border-[#8A8A8A]",
};

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "chain-letters";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

/**      Use this{" "}
      <a
        href="/api/puzzle/genetic-counseling"
        className="text-link hover:underline"
      >
        data sheet
      </a>
      .
    </p> */
const physicalBody = (
  <div className="space-y-4">
    <div className="max-w-3xl text-center italic">
      The further a message travels, the harder it is to follow its
      instructions.
    </div>

    <div>The first bead in the chain is blue.</div>

    <div>
      Download the puzzle{" "}
      <a href="/api/puzzle/chain-letters" className="text-link hover:underline">
        here.
      </a>
    </div>
  </div>
);

export const inPersonBody = (
  <div>
    <div className="mx-auto mb-6 max-w-3xl text-center italic">
      This is a physical puzzle! If your team has not already picked up a chain,
      please visit HQ in Friedman 208.
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    {physicalBody}
  </div>
);

export const remoteBoxBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <p>
      <i>
        This is a physical puzzle! You should use an object found in your box.
        Contact brownpuzzlehq@gmail.com with any questions about your box or its
        materials.
      </i>
    </p>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    {physicalBody}
  </div>
);

export const remoteBody = (
  <div className="max-w-xl space-y-4 text-center">
    <i>
      This puzzle is a chain puzzle. In-person solvers and box purchasers were
      given a wire with beads of the following colors, in order:
    </i>
    <div className="flex justify-center py-1.5">
      {CHAIN.split("").map((cell, index) => (
        <div
          key={index}
          className={`size-4 rounded-sm border-2 md:size-6 ${COLORS[cell]}`}
        />
      ))}
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <div className="space-y-4">
      <div className="max-w-3xl text-center italic">
        The further a message travels, the harder it is to follow its
        instructions.
      </div>

      <div>
        Download the puzzle{" "}
        <a
          href="/api/puzzle/chain-letters"
          className="text-link hover:underline"
        >
          here.
        </a>
      </div>
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
      The puzzle is in the form of a .json file that encodes a graph of messages
      being to people. The structure can be analyzed online with a json viewer
      of some kind, or simply programmatically.
    </div>
    <div>
      The overall structure is three trees of messages, where most of the time
      the letter is sent to either two people or zero. Sometimes, however,
      people send the letter to exactly one person. This letter will instruct
      the recipient to send the message to far more than 2 people.
    </div>
    <div>
      Reading the first letter of every sentence of the message spells ASCII, so
      we can decode the number of people that they were instructed to send the
      letter to with ASCII.
    </div>
    <div>
      Each of the special letters is at a unique depth in the tree. By sorting
      the letters by depth, and then placing the letters in the order of the
      chain, we get the following results:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Color</th>
            <th className="p-2 outline outline-white">Depth order</th>
            <th className="p-2 outline outline-white">ASCII Number</th>
            <th className="p-2 outline outline-white">Character</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">Blue</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">87</td>
            <td className="p-2 outline outline-white">W</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Blue</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">79</td>
            <td className="p-2 outline outline-white">O</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Red</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">84</td>
            <td className="p-2 outline outline-white">T</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Blue</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">84</td>
            <td className="p-2 outline outline-white">T</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">White</td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">87</td>
            <td className="p-2 outline outline-white">W</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">White</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">69</td>
            <td className="p-2 outline outline-white">E</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">White</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">76</td>
            <td className="p-2 outline outline-white">L</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Red</td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">70</td>
            <td className="p-2 outline outline-white">F</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Red</td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">84</td>
            <td className="p-2 outline outline-white">T</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">White</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">72</td>
            <td className="p-2 outline outline-white">H</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Blue</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">66</td>
            <td className="p-2 outline outline-white">B</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">White</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">79</td>
            <td className="p-2 outline outline-white">O</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Red</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">79</td>
            <td className="p-2 outline outline-white">O</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Red</td>
            <td className="p-2 outline outline-white">5</td>
            <td className="p-2 outline outline-white">75</td>
            <td className="p-2 outline outline-white">K</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">White</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">40</td>
            <td className="p-2 outline outline-white">(</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Red</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">57</td>
            <td className="p-2 outline outline-white">9</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">White</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">44</td>
            <td className="p-2 outline outline-white">,</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Red</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">53</td>
            <td className="p-2 outline outline-white">5</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">White</td>
            <td className="p-2 outline outline-white">8</td>
            <td className="p-2 outline outline-white">41</td>
            <td className="p-2 outline outline-white">)</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      Reading the characters in the right order gives the clue phrase WOT
      TWELFTH BOOK (9, 5), and the twelfth book of the Wheel of Time series
      (without the leading "The" to fit the enumeration) is{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        GATHERING STORM
      </span>
      .
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Malcolm Certain and Arnav Singhal";

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
