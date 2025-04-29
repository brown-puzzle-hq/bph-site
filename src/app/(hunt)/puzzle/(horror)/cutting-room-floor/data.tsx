/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "cutting-room-floor";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="max-w-3xl space-y-4 text-center">
      <div className="font-bold">
        This is a metapuzzle. It uses feeders from the Horror round.
      </div>

      <div className="mb-6 max-w-3xl">
        <i>
          The two plotlines of your movie have gotten all mixed up; there seems
          to be three different ways to arrange the scenes.
        </i>
      </div>
      <div className="max-w-3xl text-center">
        <i>How should you put the movie back together?</i>
      </div>
    </div>
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
      Greetings, aspiring horror-movie-editor! The most important thing to know
      about the Cutting-Room Floor is that there are many ways to order the
      scenes of a movie. Each scene (a six-letter feeder) is matched with a
      label (a fruit/vegetable), and the pairings can be found from the map:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Labels</th>
            <th className="w-1/3 p-2"></th>
            <th className="p-2 outline outline-white">Scenes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">APPLE</td>
            <td className="p-2 text-center"> &mdash;&mdash; </td>
            <td className="p-2 outline outline-white">KUNGFU</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">BLUEBERRY</td>
            <td className="p-2 text-center"> &mdash;&mdash; </td>
            <td className="p-2 outline outline-white">ARMLET</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">CARROTS</td>
            <td className="p-2 text-center"> &mdash;&mdash; </td>
            <td className="p-2 outline outline-white">DIAPER</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">DUKU</td>
            <td className="p-2 text-center"> &mdash;&mdash; </td>
            <td className="p-2 outline outline-white">PALMED</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">EGGPLANT</td>
            <td className="p-2 text-center"> &mdash;&mdash; </td>
            <td className="p-2 outline outline-white">WINNER</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">FENNEL</td>
            <td className="p-2 text-center"> &mdash;&mdash; </td>
            <td className="p-2 outline outline-white">KEPLER</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      As you may observe, there are three natural ways of ordering the labels.
      The first is alphabetically, as we see above. Here are all three together:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="w-1/3 p-2 outline outline-white">Word Length</th>
            <th className="w-1/3 p-2 outline outline-white">
              Rainbow Ordering
            </th>
            <th className="w-1/3 p-2 outline outline-white">First Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">DUKU</td>
            <td className="p-2 outline outline-white">APPLE</td>
            <td className="p-2 outline outline-white">APPLE</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">APPLE</td>
            <td className="p-2 outline outline-white">CARROTS</td>
            <td className="p-2 outline outline-white">BLUEBERRY</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">FENNEL</td>
            <td className="p-2 outline outline-white">DUKU</td>
            <td className="p-2 outline outline-white">CARROTS</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">CARROTS</td>
            <td className="p-2 outline outline-white">FENNEL</td>
            <td className="p-2 outline outline-white">DUKU</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">EGGPLANT</td>
            <td className="p-2 outline outline-white">BLUEBERRY</td>
            <td className="p-2 outline outline-white">EGGPLANT</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">BLUEBERRY</td>
            <td className="p-2 outline outline-white">EGGPLANT</td>
            <td className="p-2 outline outline-white">FENNEL</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      How does one come up with such orderings, you ask? That’s the key
      ingredient– a little observation, a little experimentation, and a little
      intuition. Each ordering of the tags gives us an ordering of the scenes,
      ya see. That’s the magic to making the whole thing work. Here they are:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="w-1/3 p-2 outline outline-white">Word Length</th>
            <th className="w-1/3 p-2 outline outline-white">
              Rainbow Ordering
            </th>
            <th className="w-1/3 p-2 outline outline-white">First Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">PALMED</td>
            <td className="p-2 outline outline-white">KUNGFU</td>
            <td className="p-2 outline outline-white">KUNGFU</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">KUNGFU</td>
            <td className="p-2 outline outline-white">DIAPER</td>
            <td className="p-2 outline outline-white">ARMLET</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">KEPLER</td>
            <td className="p-2 outline outline-white">PALMED</td>
            <td className="p-2 outline outline-white">DIAPER</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">DIAPER</td>
            <td className="p-2 outline outline-white">KEPLER</td>
            <td className="p-2 outline outline-white">PALMED</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">WINNER</td>
            <td className="p-2 outline outline-white">ARMLET</td>
            <td className="p-2 outline outline-white">WINNER</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">ARMLET</td>
            <td className="p-2 outline outline-white">WINNER</td>
            <td className="p-2 outline outline-white">KEPLER</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      What now? We watch the scenes in each order! Each ordering spells out a
      different word down the diagonal: PUPPET, KILLER, KRAMER, in that order.
      Surely this must be directing us to assemble the movie like a{" "}
      <span className="font-bold text-main-accent">
        JIGSAW
      </span>
      , which is our answer!
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Aren Guralp and Chloe Johnson";

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
