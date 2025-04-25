/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "two-guards-two-doors";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>Make changes in ./PuzzleBody.tsx!!! (Line 107)</div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl">
    <div className="text-center">
      Answer: <span className="bg-main-text hover:bg-inherit">STERNS</span>.
    </div>

    <div className="mb-6">
      This contains 6 mini puzzles. Each one is a riff on the classic &ldquo;2
      Guards, 2 Doors&rdquo; riddle. One letter is extracted from each
      mini-puzzle, and when they are compiled in order, they yield the answer.
      One small quirk in this puzzle (that is mentioned in detail below) is that
      you need to solve the mini-puzzles slightly out of order, as you need
      information from the third mini-puzzle in the second one.
    </div>

    <div className="mb-6">
      <span className="underline">
        <b>Mini-Puzzle 1</b>
      </span>
      : This is the classic &ldquo;2 Guards, 2 Doors&rdquo; riddle. When the
      truth-telling guard hears the question, they truthfully report that the
      other guard (the lying guard) would pick the wrong door. When the lying
      guard hears the question, they lie by telling you that the truth-telling
      guard would pick the lying door. Thus, both guards pick the wrong door,
      and you must take the letter from the door that is not pointed to.
    </div>

    <div className="mb-6">
      <span className="underline">
        <b>Mini-Puzzle 2</b>
      </span>
      : This mini-puzzle includes the first instance of the alternating guard.
      Since you do not know if they start by telling the truth or lying, you
      need to solve the next mini-puzzle before solving this one (to determine
      how the alternating guard must have acted in this puzzle). Once you learn
      that the alternating guard is telling the truth in the third mini-puzzle,
      you can deduce that they must have been lying in this mini-puzzle. Thus
      the logic for this puzzle is nearly the same as the first one, since there
      is one guard that lies and one that tells the truth. However, the question
      asks about which door would the other guard NOT choose, flipping the
      answers. Because of this, the truth-telling guard truthfully reports that
      the lying guard would not pick the correct door and the lying guard lies
      about which door the truth-telling guard would not pick, saying it is the
      correct door. Because of this, you must extract the letter that the guards
      are pointing to.
    </div>

    <div className="mb-6">
      <span className="underline">
        <b>Mini-Puzzle 3</b>
      </span>
      : In this mini-puzzle, you know that one guard always picks the incorrect
      door. Since both guards point to the same door (the incorrect one), this
      means that the alternating guard must be telling the truth in this puzzle.
      Knowing this you can go back and solve the second mini-puzzle.
      Additionally, that means you must extract the letter that the guards are
      not pointing to.
    </div>

    <div className="mb-6">
      <span className="underline">
        <b>Mini-Puzzle 4</b>
      </span>
      : In this mini-puzzle, you use the information about the alternating guard
      that you learned in the third mini-puzzle to deduce that the alternating
      guard must be lying in this puzzle. For this question, it is helpful to
      determine all possible responses a guard can give based on whether or not
      they lie and whether or not the other guard lies, and it is helpful to
      work backward through the question. Below are the explanations for why the
      underlined guard would answer the way they do in the given situation.
    </div>
    <ul className="list-decimal pl-6">
      <li className="mb-4">
        {" "}
        <span className="underline">
          A truth-telling guard and another truth-telling guard:
        </span>{" "}
        The truth-telling guard would pick the correct door. This is because if
        asked which door is correct, they would pick the correct door. This
        means that the other guard would truthfully relay the previous piece of
        information and choose the correct door. This means that the initial
        guard would truthfully relay the previous information and choose the
        correct door.{" "}
      </li>
      <li className="mb-4">
        {" "}
        <span className="underline">
          A truth-telling guard and a lying guard:
        </span>{" "}
        The truth-telling guard would pick the wrong door. This is because if
        asked which door is correct, they would pick the correct door. This
        means that the other guard would lie about the previous piece of
        information and choose the wrong door. This means that the initial guard
        would truthfully relay the previous piece of information and choose the
        wrong door.{" "}
      </li>
      <li className="mb-4">
        {" "}
        <span className="underline">
          A lying guard and a truth-telling guard:
        </span>{" "}
        The lying guard would pick the right door. This is because if asked
        which door is correct, they would pick the wrong door. This means that
        the other guard would truthfully relay the previous piece of information
        and choose the wrong door. This means that the initial guard would lie
        about the previous piece of information and choose the right door.{" "}
      </li>
      <li className="mb-4">
        {" "}
        <span className="underline">A lying guard and a lying guard:</span> The
        lying guard would pick the wrong door. This is because if asked which
        door is correct, they would pick the wrong door. This means that the
        other guard would lie about the previous piece of information and choose
        the right door. This means that the initial guard would lie about the
        previous piece of information and choose the wrong door.{" "}
      </li>
    </ul>

    <div className="mb-6">
      As you can see from these responses, the only thing that affects the
      answer to how a guard answers this question is whether the other guard
      tells the truth or lies (the answer is wrong when the other guard lies and
      right when they tell the truth). Since the alternating guard always lies
      in this puzzle, that means the other guard will always point to the wrong
      door. Since both guards point to the same door, that means you need to
      extract the letter that the guards are not pointing to.
    </div>

    <div className="mb-6">
      <span className="underline">
        <b>Mini-Puzzle 5</b>
      </span>
      : Since this is the same question as in the previous question, you can use
      the same logic to determine how the guards will answer. Since one guard
      always thinks that the other one is telling the truth, that means they
      will always pick the right door. Since both guards point to the same door,
      that means you need to extract the letter that the guards are pointing to.
    </div>

    <div className="mb-6">
      <span className="underline">
        <b>Mini-Puzzle 6</b>
      </span>
      : This one is pretty obvious. One guard always points to the correct door
      and both guards point to the same door. That means that you should extract
      the letter that both guards are pointing to.{" "}
    </div>
  </div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null; // come back to later

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
