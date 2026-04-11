import Image from "next/image";

import rabbitsfront from "./rabbits_front.jpg";
import rabbitsback from "./rabbits_back.jpg";

import murder from "./murder.jpg";
import shifts from "./shifts.jpg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "rabbit-nundrum";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <div className="text-center">
      <b>
        This is a physical puzzle! Please come to HQ in Friedman 208 to pick it
        up.
      </b>
    </div>
    <div>
      Please read the following GENERAL GUIDELINES before any of the other
      instructions.
    </div>
    <div className="space-y-4">
      <div>
        Each person on your team should look at the sheet corresponding to a
        single color of rabbit and follow the <b>Instructions</b> contained
        therein.
      </div>
      <div className="font-bold underline">
        You should pinky promise to only look at your own sheet, though you are
        free to communicate any information you want.
      </div>
      <div>
        You are about to execute an important tea party between important
        rabbits. To ensure everything goes smoothly, here are a few guidelines:
        <ol className="list-dec mt-4 list-inside px-4">
          <li>
            The rabbit wearing <b>The Hat</b> is <b>The Hatter</b>. They become{" "}
            <b>The Hatter</b> as soon as they put on <b>The Hat</b>, and stop
            being <b>The Hatter</b> as soon as they take it off. A rabbit that
            is given <b>The Hat</b> puts it on unless indicated otherwise.
          </li>
          <li>
            When a rabbit is <b>The Hatter</b>, they still follow their standard
            Instructions.
          </li>
          <li>
            When a <b>New Step</b> is called, <b>The Hatter</b> will read aloud
            the letter written on the side of their body facing toward the
            center of the table (this does not count as an <b>Instruction</b>,
            because it is one of the general guidelines), then follow any{" "}
            <b>Instructions</b> they wish to follow. <b>The Hatter</b> always
            acts first, and completes all of their relevant <b>Instructions</b>{" "}
            before another rabbit acts.
          </li>
          <li>
            Rabbits always sit back down facing toward the center of the table;
            if they move directly between seats, they preserve their
            orientation.
          </li>
          <li>
            When a rabbit asks another rabbit to do something, they will
            cooperate unless they have a reason to refuse.
          </li>
          <li>
            Unless indicated otherwise, rabbits will drink tea from the cup in
            front of them exactly four <b>Instructions</b> after it is served.
          </li>
          <li>
            There will always be a rabbit with an <b>Instruction</b> to follow.
          </li>
        </ol>
      </div>
      <div>
        Here are some recommended role distributions for teams with fewer than 6
        solvers:
        <div className="mt-4 px-4">
          5: One person should take both the green and blue rabbits, and the
          others should each take one rabbit.
          <br />
          4: One person should take the white and purple rabbits, another person
          should take the green and blue rabbits, and the others should each
          take one rabbit.
          <br />
          3: One person should take the pink and blue rabbits, another should
          take the white and purple rabbits, and the other should take the brown
          and green rabbits.
          <br />
          2: One person should take the green, brown, and pink rabbits, and the
          other should take the rest.
          <br />
          1: We would strongly recommend attempting this puzzle with at least
          two solvers.
        </div>
      </div>
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <div>
      <b>
        This was a physical puzzle. In addition to the plush rabbits (below),
        solvers received a series of documents, which you can access{" "}
        <a
          href="https://drive.google.com/drive/folders/1Mypoz7cn6zmI0-88fX62ylPQgBFeR6MO"
          className="text-link hover:underline"
        >
          here
        </a>
        .
      </b>
    </div>
    <div className="max-w-3xl justify-center">
      <Image
        src={rabbitsfront}
        alt="A set of six rabbits, with colors (left to right) blue, brown, green, pink, purple, white. 
      They have the letters E, S, A, R, D, R on their fronts (left to right)."
        className="mb-5 mt-5"
      />
      <Image
        src={rabbitsback}
        alt="A set of six rabbits, with colors (left to right) blue, brown, green, pink, purple, white. 
      They have the letters R, T, N, H, R, I on their backs (left to right)."
      />
    </div>
  </div>
);
//
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
export const partialSolutions: Record<string, string> = {
  INSIDEHATTER: "Do what must be done.",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {
  INSIDEHATTER: (
    <div className="max-w-3xl space-y-6">
      <p>Do what must be done.</p>
    </div>
  ),
};

/**
 * Specifically for The Rabbit 'Nundrum, remoteTasks will be displayed instead of tasks
 * for remote teams. Make sure the keys match!
 */
export const remoteTasks = {
  INSIDEHATTER: (
    <div className="max-w-3xl space-y-6">
      <p>Do what you must.</p>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <Image src={murder} alt="A white rabbit, beheaded." />
        <Image
          src={shifts}
          alt="A slip of paper that says: SHIFT -8, +0, +0 +14, +15, +10, -2, +19, -15, -6, +16, -2"
        />
      </div>
    </div>
  ),
};
