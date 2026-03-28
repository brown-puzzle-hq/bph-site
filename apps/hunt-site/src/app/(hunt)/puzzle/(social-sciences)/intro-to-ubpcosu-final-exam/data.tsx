/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "intro-to-ubpcosu-final-exam";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <p>
        This is an open book exam—please use your notes from this course.
        Multiple choice answers are worth 0 points, with the free response
        determining the entirety of your grade for the semester. Good luck!
      </p>
    </div>
    <div className="mb-4">
      <p className="underline">Multiple Choice</p>
      <p className="font-bold">Translate the following:</p>
    </div>

    <ol className="list-decimal pl-4">
      <li className="mb-4">
        <p className="font-bold">Flies love collections.</p>
        <ol className="list-inside list-[a,b,c,d] pl-4">
          <li>
            <i>ecalosu octosu obono.</i>
          </li>
          <li>
            <i>etonosu ogtosu obono.</i>
          </li>
          <li>
            <i>emeosu opiosu obono.</i>
          </li>
          <li>
            <i>epiosu onwosu obono.</i>
          </li>
        </ol>
      </li>

      <li className="mb-4">
        <p className="font-bold">But the pernicious man collected!</p>
        <ol className="list-inside list-[a,b,c,d] pl-4">
          <li>
            <i>pon ustite tufufe dusime!</i>
          </li>
          <li>
            <i>ere ustite tupie nusipi!</i>
          </li>
          <li>
            <i>api ustite turucte cusime!</i>
          </li>
          <li>
            <i>gop ustite tutare musipi!</i>
          </li>
        </ol>
      </li>

      <li className="mb-4">
        <p className="font-bold">The inchworms asked, "Whence I forsook?"</p>
        <ol className="list-inside list-[a,b,c,d] pl-4">
          <li>
            <i>« kiki api cusiwe bewa? » onenosu cobokiki.</i>
          </li>
          <li>
            <i>« kiki jan dusiwa jono? » onanosu dobokiki.</i>
          </li>
          <li>
            <i>« kiki era dusiwi suso? » oninosu dobokiki.</i>
          </li>
          <li>
            <i>« kiki qui cusiwu tete? » onunosu cobokiki.</i>
          </li>
        </ol>
      </li>

      <li className="mb-4">
        <p className="font-bold">You are hating, but what is the cost?</p>
        <ol className="list-inside list-[a,b,c,d] pl-4">
          <li>
            <i>api ule usika, ere kiki utyosu usika bewa?</i>
          </li>
          <li>
            <i>tor ole usika, ere kiki upiosu usika jono?</i>
          </li>
          <li>
            <i>boh ale usika, pon kiki ukliposu usika bewa?</i>
          </li>
          <li>
            <i>quo ile usika, pon kiki utarosu usika jono?</i>
          </li>
        </ol>
      </li>

      <li className="mb-4">
        <p className="font-bold">You ace the exam! </p>
        <ol className="list-inside list-[a,b,c,d] pl-4">
          <li>
            <i>iloposu quo usihi!</i>
          </li>
          <li>
            <i>itarosu api usivan!</i>
          </li>
          <li>
            <i>inumosu tor usidu!</i>
          </li>
          <li>
            <i>ikjosu boh usitar!</i>
          </li>
        </ol>
      </li>
    </ol>

    <div className="mb-4">
      <p className="underline">Free Response</p>
      <p className="font-bold">Translate the following:</p>
    </div>
    <div>
      <p>
        <i>api utarosu</i>
      </p>
    </div>
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
