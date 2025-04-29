import Image from "next/image";
import CONTENT from "./barbie.svg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "barbie";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <Image src={CONTENT} alt="" />
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
      The diagram organizes Barbie movies by similar topics in their titles,
      clued by the emojis labelling the categories. The categories are as
      follows:
    </div>
    <ul className="list-inside list-disc">
      <li>Dark blue: Mermaid</li>
      <li>Green: Princess</li>
      <li>Pink: Fairy</li>
      <li>Light blue: Numbers</li>
      <li>Yellow: Puppy</li>
      <li>Black: Music</li>
      <li>Red: Adventure</li>
      <li>Orange: Magic</li>
    </ul>
    <div>
      There is a unique movie for each space marked with a red number for
      extraction, which we sort by the order given at the bottom of the diagram:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Extraction Number</th>
            <th className="p-2 outline outline-white">Category/Categories</th>
            <th className="p-2 outline outline-white">Movie Title</th>
            <th className="p-2 outline outline-white">Extracted Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">11</td>
            <td className="p-2 outline outline-white">Music</td>
            <td className="p-2 outline outline-white">
              Barbie in Rock 'n Royals
            </td>
            <td className="p-2 outline outline-white">C</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">Puppy, Adventure</td>
            <td className="p-2 outline outline-white">
              Barbie & Her Sisters in The Great Puppy Adventure
            </td>
            <td className="p-2 outline outline-white">H</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">8</td>
            <td className="p-2 outline outline-white">Fairy, Mermaid</td>
            <td className="p-2 outline outline-white">
              Barbie Fairytopia: Mermaidia
            </td>
            <td className="p-2 outline outline-white">A</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">20</td>
            <td className="p-2 outline outline-white">Adventure, Princess</td>
            <td className="p-2 outline outline-white">
              Barbie: Princess Adventure
            </td>
            <td className="p-2 outline outline-white">T</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">20</td>
            <td className="p-2 outline outline-white">Adventure, Princess</td>
            <td className="p-2 outline outline-white">
              Barbie: Princess Adventure
            </td>
            <td className="p-2 outline outline-white">T</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">22</td>
            <td className="p-2 outline outline-white">Princess, Fairy</td>
            <td className="p-2 outline outline-white">
              Barbie: Mariposa & The Fairy Princess
            </td>
            <td className="p-2 outline outline-white">Y</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">21</td>
            <td className="p-2 outline outline-white">Fairy, Magic</td>
            <td className="p-2 outline outline-white">
              Barbie Fairytopia: Magic of the Rainbow
            </td>
            <td className="p-2 outline outline-white">C</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">9</td>
            <td className="p-2 outline outline-white">Mermaid, Numbers</td>
            <td className="p-2 outline outline-white">
              Barbie: In a Mermaid Tale 2
            </td>
            <td className="p-2 outline outline-white">A</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">18</td>
            <td className="p-2 outline outline-white">Music, Princess</td>
            <td className="p-2 outline outline-white">
              Barbie: The Princess & The Popstar
            </td>
            <td className="p-2 outline outline-white">T</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">Puppy, Adventure</td>
            <td className="p-2 outline outline-white">
              Barbie & Her Sisters in The Great Puppy Adventure
            </td>
            <td className="p-2 outline outline-white">H</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">22</td>
            <td className="p-2 outline outline-white">Princess, Fairy</td>
            <td className="p-2 outline outline-white">
              Barbie: Mariposa & The Fairy Princess
            </td>
            <td className="p-2 outline outline-white">Y</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      Reading the extracted letters in this order gives our answer:{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        CHATTY CATHY.
      </span>
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Veronika Grytsai";

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
