import Image from "next/image";
import style from "./style_ballots.png";
import verve from "./verve_ballots.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "pageant-problems";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <b>
        This is a physical puzzle! Please come to HQ in Friedman 208 to pick it
        up.
      </b>
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <b>
        This was a physical puzzle. In addition to the information below,
        solvers received the following paper ballots:
      </b>
      <div className="mb-4 mt-4 grid grid-cols-2 gap-4">
        <Image src={style} alt="" />
        <Image src={verve} alt="" />
      </div>
      <p>
        In this pageant, four competitors are competing in two races: STYLE and
        VERVE. The people have voted -- now we need to count the ballots.
      </p>
      <p>The election works by Single Transferable Vote:</p>
      <ul>
        <li>
          Ineligible votes are automatically transferred before any other
          calculations.
        </li>
        <li>
          The threshold for winning is floor(n/2)+1, where n is the number of
          remaining voters.
        </li>
        <li>
          If no candidate meets the threshold for winning, move the 1st place
          votes for the lowest candidate(s) to their next eligible options
          simultaneously.
        </li>
        <li>
          If a voter runs out of eligible preferences, they no longer count
          against the threshold for winning, and their vote is cast for no-one.
        </li>
      </ul>
      <p>
        A vote for a candidate is only eligible if it is a large hole that
        punches out all four corners of the rectangle.
      </p>
      <p>
        Who wins for STYLE? Who wins for VERVE? (Submit your answer in the form
        "WINNER 1 AND WINNER 2".)
      </p>
    </div>
  </div>
);

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
export const partialSolutions: Record<string, string> = {
  PRETTYANDTOYNBEE: "Oh no! Scandal! There's going to have to be a recount...",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {
  PRETTYANDTOYNBEE: (
    <div className="max-w-3xl space-y-6">
      <div>
        Oh no! Scandal! There's going to be a recount, and a number of
        independent judges will determine the results individually. However,
        each judge has different opinions about what votes should be counted...
      </div>
      <table>
        <tbody className="w-full table-fixed">
          <tr>
            <td>
              <b>Judge</b>
            </td>
            <td>
              <b>1</b>
            </td>
            <td>
              <b>2</b>
            </td>
            <td>
              <b>3</b>
            </td>
            <td>
              <b>4</b>
            </td>
            <td>
              <b>5</b>
            </td>
            <td>
              <b>6</b> (STYLE only)
            </td>
          </tr>
          <tr>
            <td>Full punch</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
          </tr>
          <tr>
            <td>Hanging chad</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
          </tr>
          <tr>
            <td>Swinging chad</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
          </tr>
          <tr>
            <td>Tri-chad</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
          </tr>
          <tr>
            <td>Small hole</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;❌&nbsp;</td>
            <td>&nbsp;✅&nbsp;</td>
          </tr>
        </tbody>
      </table>
      <p>
        Who wins, according to each judge? How many votes do they receive once
        they've won?
      </p>
    </div>
  ),
};
