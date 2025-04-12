import Image from "next/image";
import DoorImage from "./media/door.png";
import GImage from "./media/g.png";
import SImage from "./media/s.png";
import TImage from "./media/t.png";
import IImage from "./media/i.png";
import MImage from "./media/m.png";
import EImage from "./media/e.png";
import RImage from "./media/r.png";
import NImage from "./media/n.png";
import HandImage from "./media/pointer.png";

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
  <div>
    {/* DOORS SET 1 */}

    <div className="mb-5 max-w-3xl">
      As you approach the beginning of Brown Puzzlehunt, you find in front of
      you two doors. One door leads to the beginning of the Puzzlehunt; the
      other does not.
    </div>

    <div className="mb-5 max-w-3xl">
      In front of the doors are two guards. You are only allowed to ask one
      question to both guards. One guard always lies and the other always tells
      the truth.
    </div>

    <div className="mb-5 max-w-3xl">
      You ask the guards, “If I asked the other guard which door is the correct
      door, then what door would they choose?”
    </div>

    <div className="mb-5 max-w-3xl">
      The guards each point to a door. Knowing which door is correct, you go
      through it.
    </div>

    <div className="relative flex min-w-[480px] items-center justify-center gap-20">
      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door G" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={GImage} width={80} height={80} alt="Letter G" />
        </div>

        <div className="absolute -right-[50%] left-[150%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={350}
            height={350}
            alt="Pointing Hand"
            className="rotate-[230deg] scale-[1.75]"
          />
        </div>
        <div className="absolute -right-[50%] left-[150%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={150}
            height={150}
            alt="Pointing Hand"
            className="rotate-[230deg] scale-[1.75]"
          />
        </div>
      </div>

      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door S" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={SImage} width={80} height={80} alt="Letter S" />
        </div>
      </div>
    </div>

    <hr className="my-6 mb-8 border-t border-white" />

    {/* DOORS SET 2 */}

    <div className="mb-5 mt-8 max-w-3xl">
      As you continue on, you come across another two doors. One door will lead
      you to the beginning of the Puzzlehunt, while the other will not.
    </div>

    <div className="mb-5 max-w-3xl">
      In front of the doors are two guards. You are only allowed to ask one
      question to both guards. One guard always tells the truth and one
      alternates whether it is telling the truth or lying for every question it
      is asked.
    </div>

    <div className="mb-5 max-w-3xl">
      You ask the guards “If I asked the other guard which door is the correct
      door, then what door would they not choose?”{" "}
    </div>

    <div className="mb-5 max-w-3xl">
      The guards each point to a door. Knowing which door is correct, you go
      through it.
    </div>

    <div className="relative flex items-center justify-center gap-20">
      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door T" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={TImage} width={80} height={80} alt="Letter T" />
        </div>

        <div className="absolute -right-[50%] left-[150%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={350}
            height={350}
            alt="Pointing Hand"
            className="rotate-[230deg] scale-[1.75]"
          />
        </div>
        <div className="absolute -right-[50%] left-[150%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={150}
            height={150}
            alt="Pointing Hand"
            className="rotate-[230deg] scale-[1.75]"
          />
        </div>
      </div>

      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door I" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={IImage} width={45} height={80} alt="Letter I" />
        </div>
      </div>
    </div>

    <hr className="my-6 mb-8 border-t border-white" />

    {/* DOORS SET 3 */}

    <div className="mb-5 mt-8 max-w-3xl">
      As you continue on, you come across another two doors. One door will lead
      you to the beginning of the Puzzlehunt, while the other will not.{" "}
    </div>

    <div className="mb-5 max-w-3xl">
      In front of the doors are two guards. You are only allowed to ask one
      question to both guards. One guard always picks the correct door and one
      is the alternating guard from the previous set of doors.
    </div>

    <div className="mb-5 max-w-3xl">
      You ask the question “Which door is the correct door?”
    </div>

    <div className="mb-5 max-w-3xl">
      The guards each point to a door. Knowing which door is correct, you go
      through it.
    </div>

    <div className="relative flex items-center justify-center gap-20">
      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door M" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={MImage} width={90} height={80} alt="Letter M" />
        </div>

        <div className="absolute -right-[70%] left-[170%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={350}
            height={350}
            alt="Pointing Hand"
            className="rotate-[310deg] scale-[1.75]"
          />
        </div>
        <div className="absolute -right-[70%] left-[170%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={150}
            height={150}
            alt="Pointing Hand"
            className="rotate-[310deg] scale-[1.75]"
          />
        </div>
      </div>

      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door E" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={EImage} width={70} height={80} alt="Letter E" />
        </div>
      </div>
    </div>

    <hr className="my-6 mb-8 border-t border-white" />

    {/* DOORS SET 4 */}

    <div className="mb-5 mt-8 max-w-3xl">
      As you continue on, you come across another two doors. One door will lead
      you to the beginning of the Puzzlehunt, while the other will not.{" "}
    </div>

    <div className="mb-5 max-w-3xl">
      In front of the doors are two guards. You are only allowed to ask one
      question to both guards. One guard either always lies or always tells the
      truth, and the other is the alternating guard from the previous two sets
      of doors.
    </div>

    <div className="mb-5 max-w-3xl">
      You ask the question “If I asked the other guard to pick the door that
      you’d pick if I asked you to pick the correct door, what door would they
      pick?”{" "}
    </div>

    <div className="mb-5 max-w-3xl">
      The guards each point to a door. Knowing which door is correct, you go
      through it.
    </div>

    <div className="relative flex items-center justify-center gap-20">
      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door R" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={RImage} width={80} height={80} alt="Letter R" />
        </div>

        <div className="absolute -right-[70%] left-[170%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={350}
            height={350}
            alt="Pointing Hand"
            className="rotate-[310deg] scale-[1.75]"
          />
        </div>
        <div className="absolute -right-[70%] left-[170%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={150}
            height={150}
            alt="Pointing Hand"
            className="rotate-[310deg] scale-[1.75]"
          />
        </div>
      </div>

      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door E" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={EImage} width={80} height={80} alt="Letter E" />
        </div>
      </div>
    </div>

    <hr className="my-6 mb-8 border-t border-white" />

    {/* DOORS SET 5 */}

    <div className="mb-5 mt-8 max-w-3xl">
      As you continue on, you come across another two doors. One door will lead
      you to the beginning of the Puzzlehunt, while the other will not.{" "}
    </div>

    <div className="mb-5 max-w-3xl">
      In front of the doors are two guards. You are only allowed to ask one
      question to both guards. One guard always either tells the truth or lies
      and the other guard always either tells what they think is the truth or
      what they think is a lie (but unbeknownst to the other guard, they always
      think the other guard tells the truth, regardless of whether or not that
      is true).
    </div>

    <div className="mb-5 max-w-3xl">
      You ask the question “If I asked the other guard to pick the door that
      you’d pick if I asked you to pick the correct door, what door would they
      pick?”{" "}
    </div>

    <div className="mb-5 max-w-3xl">
      The guards each point to a door. Knowing which door is correct, you go
      through it.
    </div>

    <div className="relative flex items-center justify-center gap-20">
      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door R" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={RImage} width={80} height={80} alt="Letter R" />
        </div>

        <div className="absolute -right-[70%] left-[170%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={350}
            height={350}
            alt="Pointing Hand"
            className="rotate-[310deg] scale-[1.75]"
          />
        </div>
        <div className="absolute -right-[70%] left-[170%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={150}
            height={150}
            alt="Pointing Hand"
            className="rotate-[310deg] scale-[1.75]"
          />
        </div>
      </div>

      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door N" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={NImage} width={80} height={80} alt="Letter N" />
        </div>
      </div>
    </div>

    <hr className="my-6 mb-8 border-t border-white" />

    {/* DOORS SET 6 */}

    <div className="mb-5 mt-8 max-w-3xl">
      As you continue on, you come across another two doors. One door will lead
      you to the beginning of the Puzzlehunt, while the other will not.{" "}
    </div>

    <div className="mb-5 max-w-3xl">
      In front of the doors are two guards. You are only allowed to ask one
      question to both guards. One guard is super excited about Brown Puzzlehunt
      and will always point to the correct door, regardless of the question. The
      other guard always tells the truth.
    </div>

    <div className="mb-5 max-w-3xl">
      You ask the question “Which door will lead me to the most exciting and
      thrilling weekend of my entire life?”{" "}
    </div>

    <div className="mb-5 max-w-3xl">
      The guards each point to a door. Knowing which door is correct, you go
      through it.
    </div>

    <div className="relative flex items-center justify-center gap-20">
      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door S" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={SImage} width={80} height={80} alt="Letter S" />
        </div>

        <div className="absolute -right-[50%] left-[150%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={350}
            height={350}
            alt="Pointing Hand"
            className="rotate-[230deg] scale-[1.75]"
          />
        </div>
        <div className="absolute -right-[50%] left-[150%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={HandImage}
            width={150}
            height={150}
            alt="Pointing Hand"
            className="rotate-[230deg] scale-[1.75]"
          />
        </div>
      </div>

      <div className="relative">
        <Image src={DoorImage} width={200} height={400} alt="Door E" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={EImage} width={80} height={80} alt="Letter E" />
        </div>
      </div>
    </div>
    <div className="h-2"></div>
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
