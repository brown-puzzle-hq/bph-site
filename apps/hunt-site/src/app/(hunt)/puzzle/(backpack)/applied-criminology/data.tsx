/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "applied-criminology";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="space-y-4 pb-4 text-center">
      <b>
        This is a metapuzzle. You will need to use some answers to puzzles from
        the Department rounds in order to solve it.
      </b>
    </div>
    <div className="mb-4">
      <i>
        You study hard, making an index card for each chapter of your law class,
        to figure out how to stop your sentencing.
      </i>
    </div>
    <div>
      <b>§1</b>
      <br />
      Whereas the devices injured were definitively owned by the city
      government, ejection of the defendant's alibi is inherently justified.
      <br />
      <br />
      <b>§2</b>
      <br />
      Whereas the business in question had criminal origins, its management of
      such an activity is clearly illegal.
      <br />
      <br />
      <b>§3</b>
      <br />
      Whereas religious purposes were occurring less than a mile away from the
      offending action, the jury must find the suspect guilty.
      <br />
      <br />
      <b>§4</b>
      <br />
      Whereas the instrument's location was just to the side of the trail,
      justice must be found.
      <br />
      <br />
      <b>§5</b>
      <br />
      Whereas verbiage of this sort was used, we must find an adequate
      punishment for the offender.
      <br />
      <br />
      <b>§6</b>
      <br />
      Whereas restricted areas were certainly entered with malicious intention,
      the victims must be avenged.
      <br />
      <br />
      <b>§7</b>
      <br />
      Whereas the illegal details were used in lieu of real payment, any
      sensible court would convict the accused.
      <br />
      <br />
      <b>§8</b>
      <br />
      Whereas the delivery became known to the state and is by no means under
      doubt, the defendant is deserving of punishment.
      <br />
      <br />
      <b>§9</b>
      <br />
      Whereas the intended action of the defendant was in no doubt to use their
      false items in fraud, the truth should bring the jury to the right
      decision.
    </div>
    <hr />
    <div className="mt-4 max-w-3xl space-y-4 pb-4">
      <b>Concentration Requirements:</b>
      <ul className="ml-6">
        <li>
          <b>MATH</b>: Herculean Math
        </li>
        <li>
          Four electives from <b>BUSINESS</b>
        </li>
        <li>
          Four electives from <b>PERFORMING ARTS</b>
        </li>
      </ul>
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
export const copyText = `Applied Criminology
This is a metapuzzle. You will need to use some answers to puzzles from the Department rounds in order to solve it.
You study hard, making an index card for each chapter of your law class, to figure out how to stop your sentencing.
§1
Whereas the devices injured were definitively owned by the city government, ejection of the defendant's alibi is inherently justified.

§2
Whereas the business in question had criminal origins, its management of such an activity is clearly illegal.

§3
Whereas religious purposes were occurring less than a mile away from the offending action, the jury must find the suspect guilty.

§4
Whereas the instrument's location was just to the side of the trail, justice must be found.

§5
Whereas verbiage of this sort was used, we must find an adequate punishment for the offender.

§6
Whereas restricted areas were certainly entered with malicious intention, the victims must be avenged.

§7
Whereas the illegal details were used in lieu of real payment, any sensible court would convict the accused.

§8
Whereas the delivery became known to the state and is by no means under doubt, the defendant is deserving of punishment.

§9
Whereas the intended action of the defendant was in no doubt to use their false items in fraud, the truth should bring the jury to the right decision.

Concentration Requirements:
MATH: Herculean Math
Four electives from BUSINESS
Four electives from PERFORMING ARTS`;

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
