/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "intro-to-ubpcosu-first-lecture";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 space-y-4">
      <p>
        Speaking objectively or subjectively, there’s something almost romantic
        about discovering a new language. Your professor has translated the
        following phrases, and left the rest to you:
      </p>
    </div>
    <div className="mb-4 overflow-x-auto">
      <table className="w-full max-w-3xl table-fixed border-collapse text-sm text-black">
        <colgroup>
          <col style={{ width: "42%" }} />
          <col style={{ width: "58%" }} />
        </colgroup>
        <tbody>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>eltosu bessu ustepi usile.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The woman hates strange worlds.
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>iltosu ustepi tunki usino.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The brave woman loves the world.
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki ennosu bespu ustite usino suso?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              Why does the man love sly horses?
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>eptosu ostite obole.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The men hate mangoes.
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki ustepi tunki usika suso?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              Why is the woman brave?
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki eptosu onnosu donku obono tete?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              How many brave horses love mangoes?
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>estosu ostite oboka.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The men are people.
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>istite pinke ustite usino.</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              The man loves the brave man.
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki oltosu dossu oboka tete?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              How many worlds are strange?
            </td>
          </tr>
          <tr className="bg-white">
            <td className="border border-gray-400 px-3 py-2">
              <i>kiki iptosu pissu ustepi usika suso?</i>
            </td>
            <td className="border border-gray-400 px-3 py-2">
              Why is the woman a strange mango?
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mb-4">
      From the phrases you know,
      <ul className="list-inside list-disc pl-4">
        <li>
          <i>kiki ostepi oboka tete?</i>
        </li>
        <li>
          <i>kiki ostosu donku oboka tete?</i>
        </li>
        <li>
          <i>kiki ostite obono tete?</i>
        </li>
        <li>
          <i>kiki okikiosu oboka tete?</i>
        </li>
      </ul>
    </div>
    There’s one phrase left…
    <div className="overflow-x-auto">
      <table className="w-full max-w-3xl table-fixed border-collapse text-sm text-black">
        <colgroup>
          <col style={{ width: "42%" }} />
          <col style={{ width: "58%" }} />
        </colgroup>
        <tbody>
          <tr className="bg-gray-100">
            <td className="border border-gray-400 px-3 py-2">(???)</td>
            <td className="border border-gray-400 px-3 py-2">
              The world hates sly men.
            </td>
          </tr>
        </tbody>
      </table>
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
