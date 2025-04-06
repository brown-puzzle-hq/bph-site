/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "the-guard-and-the-door";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mb-4 max-w-3xl text-center">
      <b>
        This is a sequence metapuzzle. It uses feeders from the 💂 sequence.
      </b>
    </div>
    <div className="max-w-3xl">
      <p className="mb-8 italic">
        As you approach the end of Brown Puzzlehunt, you find in front of you
        The Guard and The Door.
        <br></br>The Guard tells you the following:
      </p>
      <p className="mb-4">
        “Upon observation, when viewing it all,
        <br></br>how many are spotted right there on the wall?
      </p>
      <p className="mb-4">
        “Once the second one comes near, and if the truth is all you hear,
        <br></br>you must make it very clear the chance your letters are top
        tier.
      </p>
      <p className="mb-4">
        “In the past few moves, I need not see a thing,
        <br></br>but I now must observe to decide what to bring.
      </p>
      <p className="mb-4">
        “Not the moment you march straight through a door,
        <br></br>but the time that you get four chances before.
      </p>
      <p className="mb-4">
        “When they both point, they will point right or wrong,
        <br></br>find how many are right, and you'll move right along.”
      </p>
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
  <div className="max-w-3xl">
    <p className="mb-4">
      Each of the two-line clues from The Guard represent one of the previous
      puzzles in the Guard Sequence, as well as a number within that puzzle:
    </p>
    <ol className="list-decimal">
      <li className="mb-4 ml-8">
        “Upon observation, when viewing it all,
        <br />
        how many are spotted right there on the wall?
      </li>
      <p className="mb-4">
        This clues to the puzzle “One Guard, Two Doors, and a Screen.” The Guard
        asks how many are spotted on the wall when viewing the entire puzzle
        (i.e. the entire puzzle is in the user’s window), which is two, because
        the guard can only hit two points on the wall when the entire puzzle is
        in frame.
      </p>
      <li className="mb-4 ml-8">
        “Once the second one comes near, and if truth is all you hear,
        <br />
        you must make it very clear the chance your info is top tier.
      </li>
      <p className="mb-4">
        This clues to the puzzle “M Guards, N Doors, and K Choices.” The Guard
        asks what your chance of getting correct information is in the second
        puzzle if both announcers are telling the truth, which is 100%. Thus,
        because 100% \= 1, the number for this clue is 1.
      </p>
      <li className="mb-4 ml-8">
        “In the past few moves, I need not see a thing,
        <br />
        but I now must observe to decide what to bring.
      </li>
      <p className="mb-4">
        This clues to the puzzle “Two Guards, Two Doors, A Boat, A River, and A
        Cabbage.” The Guard asks for what move you are on if all of your
        previous moves could be preset but your current move would require
        observation of an event happening or not happening. Playing the puzzle
        optimally, this is your fourth move, when you must observe whether the
        guard on the other side of the river eats the cabbage or not.
      </p>
      <li className="mb-4 ml-8">
        “Not the moment you march straight through a door,
        <br />
        but the time that you get four chances before.
      </li>
      <p className="mb-4">
        This clues to the puzzle “Ten Guards, Ten Doors.” The Guard asks for the
        day four days before the day you go through your door, which is on the
        sixth day. Thus, The Guard is referring to the second day.
      </p>
      <li className="mb-4 ml-8">
        “When they both point, they will point right or wrong,
        <br />
        find how many are right, and you’ll move right along.”
      </li>
    </ol>
    <p className="mb-4">
      This clues to the puzzle “Two Guards, Two Doors.” The Guard asks how many
      times both guards point to the right door, which is three.
    </p>
    <p className="mb-4">
      Thus, the following information is obtained (in this order)
    </p>
    <ol className="list-decimal">
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: One Guard, Two Doors, and a Screen
          <br />
          Number: 2
        </p>
      </li>
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: M Guards, N Doors, and K Choices
          <br />
          Number: 1
        </p>
      </li>
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: Two Guards, Two Doors, A Boat, A River, and A Cabbage
          <br />
          Number: 4
        </p>
      </li>
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: Ten Guards, Ten Doors
          <br />
          Number: 2
        </p>
      </li>
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: Two Guards, Two Doors
          <br />
          Number: 3
        </p>
      </li>
    </ol>
    <p className="mb-4">
      These numbers can each be used to extract a letter from the answer of each
      puzzle:
    </p>
    <ol className="list-decimal">
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: One Guard, Two Doors, and a Screen
          <br />
          Number: 2<br />
          Answer: NATIONAL SECURITY
          <br />
          Extracted Letter: A
        </p>
      </li>
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: M Guards, N Doors, and K Choices
          <br />
          Number: 1<br />
          Answer: PUNCTILIO
          <br />
          Extracted Letter: P
        </p>
      </li>
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: Two Guards, Two Doors, A Boat, A River, and A Cabbage
          <br />
          Number: 4<br />
          Answer: KELPIE MUTT
          <br />
          Extracted Letter: P
        </p>
      </li>
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: Ten Guards, Ten Doors
          <br />
          Number: 2<br />
          Answer: CLOSED-DOOR
          <br />
          Extracted Letter: L
        </p>
      </li>
      <li className="mb-4 ml-8">
        <p className="mb-4">
          Puzzle: Two Guards, Two Doors
          <br />
          Number: 3<br />
          Answer: STERNS
          <br />
          Extracted Letter: E
        </p>
      </li>
    </ol>
    <p className="mb-4">Thus, the solution is APPLE.</p>
  </div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `As you approach the end of Brown Puzzlehunt, you find in front of you The Guard and The Door.
The Guard tells you the following:

“Upon observation, when viewing it all,
how many are spotted right there on the wall?

“Once the second one comes near, and if the truth is all you hear,
you must make it very clear the chance your letters are top tier.

“In the past few moves, I need not see a thing,
but I now must observe to decide what to bring.

“Not the moment you march straight through a door,
but the time that you get four chances before.

“When they both point, they will point right or wrong,
find how many are right, and you'll move right along.”`;

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
