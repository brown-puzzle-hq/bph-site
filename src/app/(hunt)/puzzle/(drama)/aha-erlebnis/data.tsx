/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "aha-erlebnis";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="items-center text-center">
    <div className="max-w-3xl space-y-4 text-center">
      <div className="font-bold">
        This is a metapuzzle. It uses feeders from the Drama round.
      </div>

      <div className="pb-2.5 italic">
        The emotions of the characters just aren't connecting with audiences.
        How can you make this German film more accessible?
      </div>
    </div>

    <div className="flex flex-col p-6 text-white">
      <div>
        <div className="text-4xl font-bold">😍</div>
        <div className="mt-4 flex justify-center gap-4">
          {[
            "",
            "",
            "1",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "2",
            "",
            "",
            "",
            "",
          ].map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-6 w-6 border-b-2 border-white"></div>
              <div className="w-6 text-center">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-col p-6 text-white">
      <div>
        <div className="text-4xl font-bold">🥱</div>
        <div className="mt-4 flex justify-center gap-4">
          {[
            "3",
            "",
            "4",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ].map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-6 w-6 border-b-2 border-white"></div>
              <div className="w-6 text-center">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-col p-6 text-white">
      <div>
        <div className="text-4xl font-bold">🤕</div>
        <div className="mt-4 flex justify-center gap-4">
          {["", "", "6", "", "", "", "5", "", "", "", ""].map(
            (value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-6 w-6 border-b-2 border-white"></div>
                <div className="w-6 text-center">{value}</div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>

    <div className="flex flex-col p-6 text-white">
      <div>
        <div className="text-4xl font-bold">😱</div>
        <div className="mt-4 flex justify-center gap-4">
          {["", "9", "", "", "", "", "", "", "", "", "7", "", "", "", ""].map(
            (value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-6 w-6 border-b-2 border-white"></div>
                <div className="w-6 text-center">{value}</div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>

    <div className="flex flex-col p-6 text-white">
      <div>
        <div className="text-4xl font-bold">😶</div>
        <div className="mt-4 flex justify-center gap-4">
          {["", "10", "", "", "", "", "", "", "", "", "8", ""].map(
            (value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-6 w-6 border-b-2 border-white"></div>
                <div className="w-6 text-center">{value}</div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>

    <div className="flex flex-col p-6 text-white">
      <div>
        <div className="text-4xl font-bold">🙂</div>
        <div className="mt-4 flex justify-center gap-4">
          {["", "", "", "", "", "", "", "11", "", "", "", "", ""].map(
            (value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-6 w-6 border-b-2 border-white"></div>
                <div className="w-6 text-center">{value}</div>
              </div>
            ),
          )}
        </div>
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
    <div>All six feeders for this meta are:</div>
    <ul className="list list-inside">
      <li>ABYSS</li>
      <li>CLOSED-DOOR</li>
      <li>DAMAGE</li>
      <li>SPRING</li>
      <li>SUNDAY</li>
      <li>WORLD</li>
    </ul>
    <div>
      The puzzle page presents solvers with enumerations and six different
      emotions. There are also six feeders! Interesting…
    </div>
    <div>
      The flavor text points to something German-related. Solvers should realize
      that pairing a feeder with one of the six emotions produces a German word
      that consists of a compound word between the two words. The average person
      may be most familiar with the concept of Schadenfreude, or the “pleasure
      derived by someone from another person's misfortune.” The feeders and
      emotions can then be combined to generate words fitting the given
      enumerations.
    </div>
    <div className="flex flex-col items-center text-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="w-1/4 p-2 outline outline-white">Feeder</th>
            <th className="w-1/4 p-2 outline outline-white">Emotion</th>
            <th className="w-1/4 p-2 outline outline-white">German word</th>
            <th className="w-1/4 p-2 outline outline-white">Definition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">ABYSS</td>
            <td className="p-2 outline outline-white">ATTRACTION</td>
            <td className="p-2 outline outline-white">ABGRUNDANZIEHUNG</td>
            <td className="p-2 outline outline-white">
              That strange compulsion to look over the edge of a cliff.
            </td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">SPRING</td>
            <td className="p-2 outline outline-white">TIREDNESS</td>
            <td className="p-2 outline outline-white">FRÜHJAHRSMÜDIGKEIT</td>
            <td className="p-2 outline outline-white">
              Long-lasting state of reduced performance and lethargy that many
              people experience in spring.
            </td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">WORLD</td>
            <td className="p-2 outline outline-white">PAIN</td>
            <td className="p-2 outline outline-white">WELTSCHMERZ</td>
            <td className="p-2 outline outline-white">
              Feeling of melancholy and pessimism that comes from being aware of
              the contrast between the way things are and the way you wish they
              were.
            </td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">CLOSED-DOOR</td>
            <td className="p-2 outline outline-white">PANIC</td>
            <td className="p-2 outline outline-white">TORSCHLUSSPANIK</td>
            <td className="p-2 outline outline-white">
              Sense of urgency that comes with age, as you realize that time is
              running out to do everything you want to do in life.
            </td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">SUNDAY</td>
            <td className="p-2 outline outline-white">EMPTINESS</td>
            <td className="p-2 outline outline-white">SONTAGSLEERE*</td>
            <td className="p-2 outline outline-white">
              Emptiness and boredom that comes on Sundays, when the weekend is
              almost over and you're left with the feeling that there's nothing
              to look forward to.
            </td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">DAMAGE</td>
            <td className="p-2 outline outline-white">HAPPINESS</td>
            <td className="p-2 outline outline-white">SCHADENFREUDE</td>
            <td className="p-2 outline outline-white">
              Pleasure derived by someone from another person's misfortune.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      Filling these words into the blanks and extracting the numbered letters
      gets the final answer,{" "}
      <span className="font-bold text-main-accent">
        GEFÜHL PROOF</span>.
      Don't forget the umlaut!
    </div>
    <div>
      *Note: We were given feedback from native speakers that SONTAGSLEERE
      should really be spelled SONNTAGSLEERE, although many (apparently unreliable)
      English resources spelled it incorrectly. These sources also oversold
      the commonness of this word and ABGRUNDANZIEHUNG. Our apologies to German
      speakers for these errors!
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Audrey Feigin, Thomas Gordon, Veronika Grytsai, Bailey Merlino, and Arnav Singhal";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `<table>
  <tr>
    <td>
    <b>This is a metapuzzle. It uses feeders from the Drama round.</b>
    </td>
  </tr>
  <tr>
    <td>
    <i>The emotions of the characters just aren't connecting with audiences. How can you make this German film more accessible?</i>
    </td>
  </tr>
  <tr>
  </tr>
  <tr>
    <td>😍</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td>
  </tr><tr>
    <td></td> <td></td> <td></td> <td>1</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>2</td> <td></td> <td></td> <td></td> <td></td>
  </tr>
  <tr>
    <td>🥱</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td>
  </tr><tr>
    <td></td> <td>3</td> <td></td> <td>4</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
  </tr>
  <tr>
    <td>🤕</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td>
  </tr><tr>
    <td></td> <td></td> <td></td> <td>6</td> <td></td> <td></td> <td></td> <td>5</td> <td></td> <td></td> <td></td> <td></td>
  </tr>
  <tr>
    <td>😱</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td>
  </tr><tr>
    <td></td> <td></td> <td>9</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>7</td> <td></td> <td></td> <td></td> <td></td>
  </tr>
  <tr>
    <td>😶</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td>
  </tr><tr>
    <td></td> <td></td> <td>10</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>8</td> <td></td>
  </tr>
  <tr>
    <td>🙂</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td> <td>_</td>
  </tr><tr>
    <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>11</td> <td></td> <td></td> <td></td> <td></td> <td></td>
  </tr>
</table>`; //come back later

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {
  GEFUHLPROOF: "Correct answer must include diacritical marks!",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
