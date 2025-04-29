import Link from "next/link";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "m-guards-n-doors-and-k-choices";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="mx-auto max-w-3xl items-center space-y-4 text-center italic">
    This is an interactive puzzle! Please send one person on your team to
    Friedman 208 whenever you'd like to solve the puzzle! (Note: This used to be
    scheduled every two hours but is now being run as called)
  </div>
);

// Defined in RemoteBody.tsx
export const remoteBody = <></>;
export const remoteBoxBody = <></>;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-2">
    <div className="pb-6">
      Solvers were presented with various scenarios in which they had to
      maximize the chance that they get "correct information", in which case
      they are given correct letters, and concatenating the correct letters
      gives the answer. Remote solvers were given four scenarios, while
      in-person solvers had an interaction, with the third remote scenario
      removed. For readability, we denote a 1/3 probability with 33% and 2/3
      probability with 66%. We will break up each scenario to its own solution:
    </div>
    <div className="font-bold">Scenario 1:</div>
    <div>
      <span className="underline">
        Suppose the announcer is telling the truth.
      </span>
      <br />
      There are two liars and one truth-teller, and your goal is to pick the
      truth-teller. Picking a door arbitrarily gives you a 33% chance of picking
      the truth-teller, and a 66% chance of the truth-teller being in one of the
      other doors. The announcer opens a door you did not pick and reveals a
      liar. Because there is still a 33% chance of you having picked the
      truth-teller, and a 66% chance of the truth-teller being in a different
      door, there is a 66% chance of the truth-teller being in the other
      unopened door. Therefore, you should switch to have the greatest chance of
      picking the truth-teller. Searching up “Monty Hall Problem” online can
      help give further explanations and examples to explain why this is the
      case if you are still confused about this logic.
    </div>
    <div>
      <span className="underline">Suppose the announcer is lying.</span>
      <br />
      There are two truth-tellers and one liar, and your goal is to pick the
      liar. Picking a door gives you a 33% chance of picking the liar and a 66%
      chance of the liar being in one of the other doors. The announcer then
      opens a door you did not pick and reveals a truth-teller. There is still a
      33% chance of you having picked the liar already, so switching gives you a
      66% chance of picking the liar, so you should switch.
    </div>
    <div className="pb-6">
      Therefore, because switching gives you the greatest chance of picking the
      guard the announcer wants you to pick in both scenarios, you should{" "}
      <b>switch</b> to get correct information.
    </div>
    <div className="mt-6 font-bold">Scenario 2:</div>
    <div>
      Because both announcers agreed on the truth-telling nature of the guard
      behind the revealed door, the announcers must either both be telling the
      truth or both be lying.
    </div>
    <div>
      <span className="underline">
        Suppose both announcers is telling the truth.
      </span>
      <br />
      Because you want the guard behind your door to say that the announcer is a
      liar, your goal is to pick a lying guard. By announcer 2, either exactly
      two guards are lying or exactly two guards are telling the truth. If
      exactly two guards were telling the truth, then because both announcers
      are truth-tellers, all three guards behind the doors would be liars, which
      is impossible by the rules. Therefore, exactly two guards are liars, and
      both must be behind the doors. Therefore, behind the doors are two liars
      and one truth-teller.
      <br />
      You pick a door, and the announcers open a different door to reveal a
      truth-teller. Because there is only one truth-teller behind the doors, you
      conclude that both your door and the door you can switch to have liars
      behind them. Therefore, whether you switch or not is irrelevant, and you
      must therefore analyze the situation of both announcers lying to determine
      whether to switch or not.
    </div>
    <div>
      <span className="underline">Suppose both announcers are lying.</span>
      <br />
      Because you want the guard behind your door to say that the announcer is a
      truth-teller, your goal is to pick a lying guard. By announcer two, it is
      impossible for exactly two guards to be lying or for exactly two guards to
      be truth-telling. Therefore, there must either be four liars and one
      truth-teller or four truth-tellers and one liar (since it is against the
      rules for all five guards to be truth-tellers or liars, since then all
      three guards behind the doors would be the same). Because both announcers
      are lying, there cannot only be one liar, and thus there are four liars.
      Therefore, of the guards behind the doors, two are liars and one is a
      truth-teller.
      <br />
      You pick a door, which has a 66% chance of having a liar behind it. The
      announcers open a different door to reveal a liar. However, because there
      is still a 66% chance of your door having a liar behind it, you should
      stay with your door instead of switching.
    </div>
    <div className="pb-6">
      Therefore, because staying gives you a higher chance of picking the guard
      the announcers want when the announcers are lying, and staying or
      switching is irrelevant when the announcers are telling the truth, staying
      gives you a slightly higher chance of picking the correct guard, and thus
      you should <b>stay</b> to receive correct information.
    </div>
    <div className="mt-6 font-bold">Scenario 3 [not in in-person version]:</div>
    <div>
      Because the announcers disagree about the truth-telling nature of the
      guard behind the revealed door, one must be lying and the other must be
      telling the truth.
    </div>
    <div>
      <span className="underline">
        Suppose Announcer 1 is a truth-teller and Announcer 2 is a liar.
      </span>
      <br />
      Because you want your guard to have a different truth-telling nature from
      Announcer 2, you are looking for a truth-telling guard. By Announcer 2
      lying, two of the guards behind the doors cannot be truth-tellers, and
      thus there must be two liars and one truth-teller.
      <br />
      When you pick a door, there is a 33% chance of it being a truth-teller.
      The announcers reveal a lying guard, and because there is still a 33%
      chance of your door having a truth-teller, switching gives you a 66%
      chance of your door having a truth-teller. Therefore, you should switch.
    </div>
    <div>
      <span className="underline">
        Suppose Announcer 1 is a liar and Announcer 2 is a truth-teller.
      </span>
      <br />
      Because you want your guard to have the same truth-telling nature as
      Announcer 2, you are looking for a lying guard. Announcer 2 tells you that
      behind the doors, there must be two liars and one truth-teller.
      <br />
      The announcers then reveal the truth-teller, so both remaining doors have
      lying guards. Therefore, staying or switching is irrelevant, and you must
      therefore analyze the situation of Announcer 1 telling the truth and
      Announcer 2 lying to determine whether to switch or not.
    </div>
    <div className="pb-6">
      Because switching gives you the highest chance of picking the guard the
      announcers want in both situations, you should <b>switch</b> to receive
      correct information.
    </div>
    <div className="mt-6 font-bold">Scenario 4:</div>
    <div>
      Because Announcers 1 and 3 agreed on the truth-telling nature of the guard
      behind the revealed door, and both disagreed with Announcer 2, either
      Announcers 1 and 3 are truth-tellers and Announcer 2 is a liar, or
      Announcer 2 is a truth-teller and Announcers 1 and 3 are liars.
    </div>
    <div>
      <span className="underline">
        Suppose Announcers 1 and 3 are truth-tellers and Announcer 2 is a liar.
      </span>
      <br />
      By Announcer 1 telling the truth, you are looking for a guard who says at
      least two announcers are truth-tellers, and thus you are looking for a
      truth-telling guard. By Announcer 2 lying, there are at most two lying
      guards. Because Announcer 2 is themselves a liar, there can be at most one
      more lying guard, and because there must be at least one lying guard
      behind the doors, there is exactly one lying guard (and thus two
      truth-tellers) behind the doors. Announcer 3’s statement of “I am a
      truth-telling guard” gives you no information.
      <br />
      After picking a door, the announcers reveal the only lying guard.
      Therefore, whether you stay or switch, you will always pick a
      truth-teller, and thus in this situation, staying or switching is
      irrelevant. Therefore, you must analyze the situation of Announcers 1 and
      3 lying and Announcer 2 telling the truth to determine whether to switch
      or not.
    </div>
    <div>
      <span className="underline">
        Suppose Announcers 1 and 3 are liars and Announcer 2 is a truth-teller.
      </span>
      <br />
      By Announcer 1 lying, you are looking for a guard who says less than two
      announcers are truth-tellers, and thus you are looking for a truth-telling
      guard. By Announcer 2 telling the truth, there are at least three lying
      guards. Because both Announcers 1 and 3 are liars, this tells you that at
      least one guard behind the doors is a liar, which isn’t new information,
      because that is established by the rules of the puzzle. Therefore,
      Announcer 2 gives you no new information. Announcer 3’s statement of “I am
      a truth-telling guard” again gives you no information.
      <br />
      Therefore, you must set up two possible situations (each with a 50% chance
      of happening):
    </div>
    <div>
      <i>Suppose there are two liars and one truth-teller behind the doors:</i>
      <br />
      Because the announcers reveal a truth-teller, there are two liars behind
      the other doors. Therefore, you must analyze the situation of there being
      two truth-tellers and one liar behind the doors to determine whether to
      switch or not.
    </div>
    <div>
      <i>Suppose there are two truth-tellers and one liar behind the doors:</i>
      <br />
      Initially, you have a 66% chance of picking a truth-teller. After the
      announcers reveal a truth-teller, there is still a 66% chance of your door
      having a truth-teller.
    </div>
    <div className="pb-6">
      Because staying gives you the highest chance of receiving correct
      information in the only scenario in which it would make a difference, you
      should <b>stay</b> to receive correct information.
    </div>
    <div>
      After making all of the correct choices, solvers are given the following
      letters in order:{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        PUNCTILIO,
      </span>{" "}
      which is our answer.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Nate Chinman, Nicholas Cressman, and Jack de Haan";

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
