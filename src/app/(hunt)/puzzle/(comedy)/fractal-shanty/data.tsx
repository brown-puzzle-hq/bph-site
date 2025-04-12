import Image from "next/image";
import FRACTAL from "./fractal.png";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "fractal-shanty";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <div className="w-full text-center italic">These sailors don't follow orders.</div>
    <Image className="mx-auto" src={FRACTAL} alt="" />
    <div className="border-4 border-white p-4">
    In the port the seagulls flew right round the masts of sloops and barques<br></br>
    Molly stole one in the ruckus and she called it Karl Marx
    </div><div className="border-4 border-white p-4">
    It shattered into pieces, and the world went down in flame<br></br>
    An outlaw, a port, a philosopher - alright, they start the same.
    </div><div className="border-4 border-white p-4">
    Jimmy paced along the deck, looking right into the gale<br></br>
    "In my twenty years of living, I have never stabbed a whale!"
    </div><div className="border-4 border-white p-4">
    Jimmy was a leftie and forged his own harpoon<br></br>
    In trying out his strength, he chucked it at the moon
    </div><div className="border-4 border-white p-4">
    Little Jim was raised by sailors with a halyard in his hand<br></br>
    In his twenty years of living, he had never left for land
    </div><div className="border-4 border-white p-4">
    Molly had to stay afloat, but women couldn't be employed<br></br>
    So she sailed aboard a whaler as one pretty cabin boy<br></br>
    There she dallied with the second mate and got herself a son<br></br>
    Then made off to Mogadishu with some baleen and a gun.
    </div><div className="border-4 border-white p-4">
    Molly lost to Davy Jones and was left to rot in hell<br></br>
    She was fighting for this letter, but instead she took the L
    </div><div className="border-4 border-white p-4">
    Molly won the competition and became a paralegal <br></br>
    But without her righteous guidance, Marx had turned into an eagle
    </div><div className="border-4 border-white p-4">
    She was right a kleptomaniac and would steal her rival's bones<br></br>
    Then she was challenged to a duel by a mollusc - Davy Jones
    </div><div className="border-4 border-white p-4">
    The captain walked up on his wooden leg and answered, "It's no vacation - <br></br>
    where do you think you go when you're swallowed by a cetacean?"
    </div><div className="border-4 border-white p-4">
    The executioner was there, his gaze as cold as snow.<br></br>
    "Tell me, wench, will you ever repent?" Proud Molly shouted,
    </div><div className="border-4 border-white p-4">
    The seagull helped her rob a bank, then take over the Dover shallows,<br></br>
    But her pyrotechnics and leftist ways had brought her to the gallows.
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
    This solution is too complicated to type up right now. Meh
  </div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `In the port the seagulls flew right round the masts of sloops and barques
Molly stole one in the ruckus and she called it Karl Marx

It shattered into pieces, and the world went down in flame
A pirate, a port, a philosopher - alright, they start the same.

Jimmy paced along the deck, looking right into the gale
"In my twenty years of living, I have never stabbed a whale!"

Jimmy was a leftie and forged his own harpoon
In trying out his strength, he chucked it at the moon

Little Jim was raised by sailors with a halyard in his hand
In his twenty years of living, he had never left for land

Molly had to stay afloat, but women couldn't be employed
So she sailed aboard a whaler as one pretty cabin boy
There she dallied with the second mate and got herself a son
Then made off to Mogadishu with some baleen and a gun.

Molly lost to Davy Jones and was left to rot in hell
She was fighting for this letter, but instead she took the L

Molly won the competition and became a paralegal 
But without her righteous guidance, Marx had turned into an eagle

She was right a kleptomaniac and would steal her rival's bones
Then she was challenged to a duel by a mollusc - Davy Jones

The captain walked up on his wooden leg and answered, "It's no vacation - 
where do you think you go when you're swallowed by a cetacean?"

The executioner was there, his gaze as cold as snow.
"Tell me, wench, will you ever repent?" Proud Molly shouted,

The seagull helped her rob a bank, then take over the Dover shallows,
But her pyrotechnics and leftist ways had brought her to the gallows.`;

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
