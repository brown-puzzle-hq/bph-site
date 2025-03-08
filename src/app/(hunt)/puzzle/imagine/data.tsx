import Link from "next/link";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "imagine";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mb-6 max-w-3xl text-center">
      This is a physical puzzle! If your team has not already picked up a CD,
      please visit HQ in Friedman 208.
    </div>
    <hr className="my-6 mb-6 border-t border-white" />
    <div className="max-w-3xl pb-4 text-center">
      <i>
        The only inspiring thing here is how the internet came together to say
        "no."
      </i>
    </div>
  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="max-w-3xl text-center">
      <i>
        This is a physical puzzle! You should have received it in your Box.
        Contact brownpuzzlehq@gmail.com with any questions about your Box or its
        materials.
      </i>
    </div>
    <hr className="my-6 mb-6 border-t border-white" />
    <div className="max-w-3xl pb-4 text-center">
      <i>
        The only inspiring thing here is how the internet came together to say
        "no."
      </i>
    </div>
  </div>
);

export const remoteBody = (
  <div>
    <div className="max-w-3xl text-center">
      <i>
        The only inspiring thing here is how the internet came together to say
        "no."
      </i>
    </div>
    <div className="mt-8 max-w-3xl text-center">
      <Link href="https://drive.google.com/file/d/1FqNlv4SPrGrmKTHUj0PpTBOUCIMO-Ynq/view?usp=sharing">
        <span className="underline">[audio]</span>
      </Link>
    </div>
    <div className="flex justify-center pb-4">
      <audio controls>
        <source src="/api/puzzle/imagine" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl">
    <div className="mb-5 text-center">
      Answer:{" "}
      <span className="bg-main-tex hover:bg-inherit">
        INDIANA JONES AND THE LAST CRUSADE
      </span>
      .
    </div>
    <div className="mb-4 max-w-3xl">
      This puzzle is a reference to{" "}
      <Link href="https://www.youtube.com/watch?v=omEDLKS5pbY">
        <span className="underline">this pandemic celebrity cringe video</span>
      </Link>{" "}
      from 2020. It was a well-intentioned video that came off as very
      tone-deaf, so it went pretty viral.
    </div>

    <div>
      The realization of what this puzzle is about can be prompted by many
      things, such as:
      <ul className="max-w-3xl list-disc pl-6">
        <li>Title of the puzzle</li>
        <li>Variety of voices throughout the clips</li>
        <li>The flavor is the top comment on the original video</li>
        <li>
          Any search along the lines of 'imagine singing video' will produce
          clear results to either the original video or its Wikipedia page.
        </li>
      </ul>
    </div>

    <div className="mb-4 mt-4">
      After realizing the premise of the video, solvers should be able to match
      each clip to its singer. Each clip is followed by a spliced together
      number also composed of clips from the original video. By adding these
      numbers together, solvers can extract an index with which to get a single
      letter from each name.
    </div>

    <div className="mx-auto w-fit overflow-x-auto p-4">
      <table className="border border-white">
        <tbody>
          <tr>
            <td className="border border-white p-2">
              <b>Lyric</b>
            </td>
            <td className="border border-white p-2">
              <b>Celebrity</b>
            </td>
            <td className="border border-white p-2">
              <b>Index</b>
            </td>
            <td className="border border-white p-2">
              <b>Extract</b>
            </td>
          </tr>
          <tr>
            <td className="border border-white p-2">Living for today</td>
            <td className="border border-white p-2">Sia</td>
            <td className="border border-white p-2">3</td>
            <td className="border border-white p-2">A</td>
          </tr>
          <tr>
            <td className="border border-white p-2">Imagine no possessions</td>
            <td className="border border-white p-2">Pedro Pascal</td>
            <td className="border border-white p-2">1</td>
            <td className="border border-white p-2">P</td>
          </tr>
          <tr>
            <td className="border border-white p-2">Brotherhood of man</td>
            <td className="border border-white p-2">Mark Ruffalo</td>
            <td className="border border-white p-2">11</td>
            <td className="border border-white p-2">O</td>
          </tr>
          <tr>
            <td className="border border-white p-2">
              No need for greed and hunger
            </td>
            <td className="border border-white p-2">Will Ferrell</td>
            <td className="border border-white p-2">3</td>
            <td className="border border-white p-2">L</td>
          </tr>
          <tr>
            <td className="border border-white p-2">
              I hope someday you will join us
            </td>
            <td className="border border-white p-2">Leslie Odom Jr.</td>
            <td className="border border-white p-2">7</td>
            <td className="border border-white p-2">O</td>
          </tr>
          <tr>
            <td className="border border-white p-2">
              Imagine there's no heaven
            </td>
            <td className="border border-white p-2">Gal Gadot</td>
            <td className="border border-white p-2">4</td>
            <td className="border border-white p-2">G</td>
          </tr>
          <tr>
            <td className="border border-white p-2">Living for today</td>
            <td className="border border-white p-2">Sarah Silverman</td>
            <td className="border border-white p-2">7</td>
            <td className="border border-white p-2">I</td>
          </tr>
          <tr>
            <td className="border border-white p-2">And no religion too</td>
            <td className="border border-white p-2">Zoe Kravitz</td>
            <td className="border border-white p-2">1</td>
            <td className="border border-white p-2">Z</td>
          </tr>
          <tr>
            <td className="border border-white p-2">
              Imagine there's no countries
            </td>
            <td className="border border-white p-2">Eddie Benjamin</td>
            <td className="border border-white p-2">5</td>
            <td className="border border-white p-2">E</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mb-5 max-w-3xl">
      This extraction spells out the intermediate answer,{" "}
      <span className="bg-main-text hover:bg-inherit">APOLOGIZE</span>.
    </div>
    <div className="mb-5 max-w-3xl">
      From there, this is a judge puzzle! Emailed submissions meeting the stated
      criteria will be given the answer,{" "}
      <span className="bg-main-text hover:bg-inherit">
        INDIANA JONES AND THE LAST CRUSADE
      </span>
      .
    </div>
  </div>
);

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
export const tasks: Record<string, JSX.Element> = {
  APOLOGIZE: (
    <div>
      <div className="mb-6 max-w-3xl text-center">
        Oh...that thing you did was actually kind of insensitive...Make an
        apology video and send it to brownpuzzlehq@gmail.com. Your apology
        should include at least 4 of the following:
      </div>
      <ul className="max-w-3xl list-disc pl-6">
        <li>Blow your nose loudly for 5 continuous seconds</li>
        <li>Include every letter of the alphabet in your script</li>
        <li>Shed a definitely not fake tear</li>
        <li>Feature a musical instrument (bonus points for ukuleles)</li>
        <li>Quote an iconic influencer apology video</li>
        <li>Include blatant product placement or an ad read</li>
        <li>Use at least 5 different synonyms for the word ‘sorry’ </li>
      </ul>
    </div>
  ),
};
