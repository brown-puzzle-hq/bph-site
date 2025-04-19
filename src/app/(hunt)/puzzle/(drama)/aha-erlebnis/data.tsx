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
  <div className="text-center items-center">
    <div className="space-y-4 max-w-3xl text-center">
      <div className="font-bold">
        This is a metapuzzle. It uses feeders from the{" "}
        Drama round.
      </div>
    
      <div className="pb-2.5 italic">
          The emotions of the characters just aren't connecting with audiences.
          How can you make this German film more accessible?
      </div>
    </div>

    <div className="flex flex-col p-6 text-white">
      <div>
        <div className="font-bold text-4xl">😍</div>
        <div className="mt-4 flex gap-4 justify-center">
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
        <div className="font-bold text-4xl">🥱</div>
        <div className="mt-4 flex gap-4 justify-center">
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
        <div className="font-bold text-4xl">🤕</div>
        <div className="mt-4 flex gap-4 justify-center">
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
        <div className="font-bold text-4xl">😱</div>
        <div className="mt-4 flex gap-4 justify-center">
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
        <div className="font-bold text-4xl">😶</div>
        <div className="mt-4 flex gap-4 justify-center">
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
        <div className="font-bold text-4xl">🙂</div>
        <div className="mt-4 flex gap-4 justify-center">
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
  <div className="max-w-3xl text-center">
    This puzzle does not have a solution. Go nag Arnav.{" "}
  </div>
);

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
