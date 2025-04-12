import Image from "next/image";
const LETTERS = [["L", "E", "T", "S", ], 
["W", "A", "T", "C", "H", ], 
["E", "X", "P", "E", "R", "T", ], 
["S", "T", "R", "Y", "T", "O", "P", ], 
["U", "Z", "Z", "L", "E", "A", "T", "S", ], 
["O", "M", "E", "R", "I", "D", "D", "L", "E", ], 
["S", "I", "N", "A", "D", "E", "S", "E", "R", "T"]];
import EYE from "./eye.svg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "eye-spy";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (<div className="max-w-4xl flex flex-col items-center space-y-6">
        <div className="mb-4 max-w-3xl text-center italic">
      This puzzle has intermediate answer confirmation.
    </div>

    {/* {LETTERS.map((line) => (
        <div className={`mt-1 grid grid-cols-${line.length} justify-center gap-1 max-w-4xl`}>
        {line.map(letter =>  <div className="flex h-10 w-10 items-center justify-center border border-white">{letter}</div>)}
        </div>
    ))} */}

<Image src={EYE} alt="" width="100"/>
<div className="flex flex-col items-center space-y-2">
      {LETTERS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((letter, colIndex) => (
            <div
              key={colIndex}
              className="p-2 bg-green-200 text-black rounded text-lg font-semibold shadow"
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
<div className="text-center">
"Hello, solver! Welcome to <br></br>
this puzzle, EYE SPY, made for you.<br></br>
I have some riddles. To begin:<br></br>
Where am I from? Where am I in?"<br></br>
</div>
</div>);

export const remoteBoxBody = inPersonBody;

export const remoteBody = null;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null; // Should be composed of the const variables up top

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {
    RAGETTI: "This is an answer to a riddle.",
    HORATIUS: "This is an answer to a riddle.",
    GIGAN: "This is an answer to a riddle.",
    ODIN: "This is an answer to a riddle.",
    PIRATE: "This is an answer to a riddle.",
    HURRICANE: "This is an answer to a riddle.",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {
    PROVIDENCE: (<div className="text-center space-y-6">
        <div>Best-dressed on a pearl of black; <br></br>
        Can't read. Can't write. Served under Jack.</div>
        <div>Ever heard of the Etruscans? <br></br>
        This man has. He didn't trust 'em: <br></br>
        fought on a bridge to save his home.<br></br>
        A bridge which, actually, led to Rome.</div>
        <div>He's roach-controlled, and from the sky, <br></br>
        And says he's here to make peace. (Lie.) <br></br>
        With buzzsaw out and hooks around, <br></br>
        He brings the king of monsters down.</div>
        <div>The wisest king, the weekdays' core; <br></br>
        A friend of ravens, death, and war.</div>
        <div>Their favorite letter is disputed.<br></br>
        Their favorite crime is oft-computed.<br></br>
        Their favorite team plays up in Penn.<br></br>
        Their favorite bird can count to ten.</div>
        <div>They each have names canonical;<br></br>
        Assigned in manner chronical.<br></br>
        A roofless wall, a lifeless cell,<br></br>
        Which whip up waves and froth and swell.</div>
    </div>)
};
