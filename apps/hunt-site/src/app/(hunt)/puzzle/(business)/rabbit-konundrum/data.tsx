/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "rabbit-konundrum";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="max-w-3xl space-y-6">
      <div className="italic">Physical Materials</div>

      <table className="table-auto border border-gray-300">
        <thead>
          <tr>
            <th className="border px-3 py-2">Plushie Color</th>
            <th className="border px-3 py-2">Written on Front Side</th>
            <th className="border px-3 py-2">Written on Back Side</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-3 py-2">Blue</td>
            <td className="border px-3 py-2">H</td>
            <td className="border px-3 py-2">R</td>
          </tr>
          <tr>
            <td className="border px-3 py-2">Pink</td>
            <td className="border px-3 py-2">T</td>
            <td className="border px-3 py-2">R</td>
          </tr>
          <tr>
            <td className="border px-3 py-2">Brown</td>
            <td className="border px-3 py-2">E</td>
            <td className="border px-3 py-2">R</td>
          </tr>
          <tr>
            <td className="border px-3 py-2">Green</td>
            <td className="border px-3 py-2">N</td>
            <td className="border px-3 py-2">R</td>
          </tr>
          <tr>
            <td className="border px-3 py-2">White</td>
            <td className="border px-3 py-2">I</td>
            <td className="border px-3 py-2">R</td>
          </tr>
          <tr>
            <td className="border px-3 py-2">Purple</td>
            <td className="border px-3 py-2">A</td>
            <td className="border px-3 py-2">R</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 italic">Puzzle Text</div>

      <div className="rounded p-2">
        You are to conduct an important tea party between important rabbits.
        Each Step consists of Instructions which refer to one or more seated
        rabbits (unless indicated otherwise). When a rabbit is wearing The Hat,
        their name is The Hatter. Otherwise, a rabbit's name is the color of
        their fur. At the end of each Step, The Hatter will say aloud the letter
        written on the side of their body facing toward the center of the table.
      </div>

      <div className="mt-6 font-bold">Step 1</div>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          The rabbits arrive and take their seats around the table. One of them,
          the host of the tea party, stands up to get the tea from the kitchen —
          they will be back soon, they promise aloud.
        </li>
        <li>
          A rabbit whose name is five letters long walks to the opposite side of
          the table to shake hands with a rabbit wearing a light pink bow.
        </li>
        <li>
          The Hatter passes The Hat to the rabbit sitting two seats to their
          left, who didn't actually want to be here but was dragged along by the
          rabbit sitting two seats to The Hatter's right. The rabbit puts The
          Hat on.
        </li>
      </ul>

      <div className="mt-6 font-bold">Step 2</div>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          A rabbit not sitting next to an empty seat gets up to use the
          bathroom.
        </li>
        <li>
          Meanwhile, the rabbit whose namesake may be found on the transgender
          pride flag asks, "Why is a raven like a writing desk?"
        </li>
        <li>
          Two neighboring rabbits offer guesses. In clockwise order from the
          asker:
          <ul className="ml-6 mt-1 list-disc space-y-1">
            <li>"Because they both produce flat notes."</li>
            <li>"Because Poe wrote on both."</li>
          </ul>
        </li>
        <li>
          The Hatter likes the second answer better, and gives The Hat to the
          rabbit which proposed it, who puts it on.
        </li>
      </ul>

      <div className="mt-6 font-bold">Step 3</div>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          The host returns, and serves tea. They start with the rabbit to their
          left, and continue clockwise, pouring tea for every second rabbit
          around the table, eventually returning to the one they started with
          and sitting back down.
        </li>
        <li>
          The rabbit returns from the bathroom, and is upset to find they
          haven't received any tea, but keeps quiet about it.
        </li>
        <li>
          As a show of gratitude for the tea, The Hatter gives The Hat to the
          host, who puts it on.
        </li>
      </ul>

      <div className="mt-6 font-bold">Step 4</div>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          The rabbits with tea in their cups take a sip, going counterclockwise
          from the most recent rabbit to say the letter O.
        </li>
        <li>
          One of the rabbits which drank tea realizes the tea is too bitter for
          them, so they get up to find the sugar bowl.
        </li>
        <li>
          Another rabbit decides they don't like the tea and passes their cup to
          the rabbit sitting one seat to their right.
        </li>
        <li>
          Meanwhile, the rabbit with a doubled letter in their name plays
          rock-paper-scissors with the rabbit sitting to their left. They draw
          three times in a row.
        </li>
        <li>
          The Hatter passes The Hat to a rabbit two seats away, who has not been
          The Hatter yet. They graciously (and silently) accept and put it on.
        </li>
      </ul>

      <div className="mt-6 font-bold">Step 5</div>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          When the sweet-toothed rabbit doesn't return, the rabbit who was upset
          about not receiving any tea leaves to go look for them. As they leave,
          they wonder aloud what could be so difficult about finding the sugar
          bowl.
        </li>
        <li>
          The two rabbits whose names end with E turn to each other and start
          whispering something red and fishy. This counts as speaking aloud, in
          case you were wondering.
        </li>
        <li>
          The Hatter passes The Hat to a different rabbit, whose name starts
          with the same letter as The Hatter's starting name. Of course, they
          put it on.
        </li>
      </ul>

      <div className="mt-6 font-bold">Step 6</div>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          The rabbit whose name begins with B takes a drink from a teacup which
          they did not start with.
        </li>
        <li>
          The rabbits finally return with the sugar bowl, and sit back down in
          their original adjacent seats.
        </li>
        <li>
          For fun, The Hatter passes The Hat six rabbits to their left, and they
          put The Hat back on.
        </li>
      </ul>

      <div className="mt-6 font-bold">Step 7</div>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          The rabbit which was the last to drink tea gets up and profusely
          thanks the host, regardless of their feelings toward the tea or its
          level of bitterness. They sit back down before the last Instruction in
          this Step.
        </li>
        <li>
          The rabbit who appears as a main character in Lewis Carroll's Alice's
          Adventures in Wonderland also stands up, and reaches for the sugar
          bowl, which the sweet-toothed rabbit happily gives away.
        </li>
        <li>
          The Hatter passes The Hat one rabbit away from the host, who is
          jealous they don't get to put it on again (but the receiving rabbit
          does).
        </li>
      </ul>

      <div className="mt-6 font-bold">Step 8</div>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          There is tension in the room. The rabbit with the most teacups, the
          rabbit which has spoken aloud the most number of times, the rabbit who
          has stood up the most, the rabbit who has started the most Steps
          sitting next to The Hatter, and the rabbit which is referenced in the
          most Instructions all make eye contact with each other in an apparent
          standoff over their common desire for The Hat.
        </li>
        <li>
          While they're all distracted staring at each other like weirdos, the
          remaining rabbit snatches The Hat off of The Hatter's head and puts it
          on, then sits back down, facing away from the table.
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
export const authors = "Aren Guralp and Thea Miller-Priddy";

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
