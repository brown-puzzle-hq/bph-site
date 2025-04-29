import Image from "next/image";
import IDS from "./Financial_Crimes_IDs.png";
import RECEIPTS from "./Financial_Crimes_Receipts.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "financial-crimes-3";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const body = (
  <div>
    <p className="pb-4">
      <i>
        Hollywood accounting gone wrong! A gang of crooks has been stealing from
        your movie company under your nose. There are 8 suspects, all of whom
        worked on your company's recent biopic,
      </i>{" "}
      North Dakota Williams and the Inscrutable MacGuffin.
      <i>
        {" "}
        We have collected 8 lists of purchases that the suspects made, but we
        don't know which suspect made which purchases. We also know that exactly
        3 of the items purchased were fraudulent, and that each fraudulent
        purchase was made by a different person. All the information we have to
        go on is identification for each suspect, the purchase lists, and
        interview transcripts. Maybe if you line up the thieves and their shady
        dealings, then confiscate the contraband, you'll uncover who's been
        putting them up to the task.
      </i>
    </p>
    <p className="mb-6">Below are the interview transcripts:</p>
    <p className="mb-4">
      “My name is Henriksson Fjord, and I was the lead in{" "}
      <em>North Dakota Williams and the Inscrutable MacGuffin</em>… Look, I'll
      be honest, working with Speven is terrible. He's a total control freak.
      Everything has to be exactly the way he wants it, down to the goddamn
      lenses on the cameras. He doesn't even trust anyone but himself or his
      writer buddy to run errands for him. I'm never acting for him again, no
      matter how good the pay is… Chef Bo is great. He's a bit of a control
      freak too. You know he buys new kitchen equipment for each gig? He refuses
      to reuse a single pot. But man is that food worth any eccentricities.
      Going back to DoorDash after filming ended was the saddest day of my
      life.”
    </p>
    <p className="mb-4">
      “My name is Speven Steelberg, and I was the director for{" "}
      <em>North Dakota Williams and the Inscrutable MacGuffin</em>… Yes, I've
      cultivated quite the reputation for my standards. But that's what gets the
      movie made. Nobody pays for mediocrity. For example, I hear some directors
      let actors or writers leave in the middle of the filming day to pick up
      food or drinks or what have you. It's ridiculous! You can't get anything
      done when half your cast is out for coffee… My commitment to method acting
      is unparalleled. Everyone on set, not just the lead, needs to be embodying
      every trait of the main character. And I mean <em>every</em> trait: we
      emulated absolutely everything we could about the real North Dakota, from
      his appearance to his diet.”
    </p>
    <p className="mb-4">
      “My name is Colleen Hooverville, and I was the writer for{" "}
      <em>North Dakota Williams and the Inscrutable MacGuffin</em>… It was a
      truly incredible experience working with Dr. Botnik. I have so much
      respect for him and his work, and his knowledge of North Dakota Williams'
      life is second to none. His recall is exceptional too; I'm convinced he
      hasn't needed to go back and check his references in years when it comes
      to the subject… You learn so much when you write a biopic like this. For
      example, did you know that North Dakota was actually bald under his famous
      fedora? The hat was his way of coping with the hair loss. What a
      fascinating character.”
    </p>
    <p className="mb-4">
      “My name is Bo E. R. D., and I was the caterer for{" "}
      <em>North Dakota Williams and the Inscrutable MacGuffin</em>… Soffa? Man,
      I hate that little twerp. She's always talking about how she loves to cook
      to try to buddy up to me, but between you and me, she wouldn't know a
      whisk from a cleaver. Whenever I'm on set, I always make her go on the
      drink runs. No need to waste my energy when some annoying kid can do it
      for me.”
    </p>
    <p className="mb-4">
      “My name is Jason Bourne-Again, and I was the security chief for{" "}
      <em>North Dakota Williams and the Inscrutable MacGuffin</em>… I don't keep
      track of purchases. Not my job. But I do remember someone raving about the
      fancy new biographies they got on North Dakota. Probably some nerd who
      reads or writes for a living.”
    </p>
    <p className="mb-4">
      “My name is Dr. Botnik, and I was the historical accuracy consultant for{" "}
      <em>North Dakota Williams and the Inscrutable MacGuffin</em>… As everybody
      knows, North Dakota was famously deathly afraid of rats, mice, and all
      other furry vermin. I believe Speven wanted to test one of the actors on
      their commitment to the role by exposing them to such creatures and seeing
      if they reacted with adequate amounts of fear. But alas, Henriksson's
      stunt double looks so much like him, I just couldn't tell you which of the
      two placed the order… One of the many peculiarities about North Dakota was
      his diet. He was nearly entirely vegan, but made an exception for chicken
      wings, which he would eat dozens of a day. I must say, I don't know how he
      did it. I have been vegan for so long, the mere sight of meat makes me
      feel profusely ill.”
    </p>
    <p className="mb-4">
      “My name is Corbin Copy, and I was Henriksson's stunt double in{" "}
      <em>North Dakota Williams and the Inscrutable MacGuffin</em>… Working on
      the film was a fantastic experience. It was just a pity we weren't able to
      film everything we wanted to. We had floated the idea of a whole extra act
      set in Central Europe, but due to length concerns it didn't make it out of
      the planning phase.”
    </p>
    <p className="mb-4">
      “My name is Soffa Moore, and I was the unpaid intern for{" "}
      <em>North Dakota Williams and the Inscrutable MacGuffin</em>… Me? The
      plane tickets? No way. They wouldn't let some intern buy something
      important like that! That was one of the higher ups. Like, somebody whose
      name is in the OPENING credits. Isn't that so cool? Gosh, I sure hope
      that's me someday…”
    </p>
  </div>
);

export const inPersonBody = (
  <div className="mx-auto mb-6 max-w-3xl text-center">
    This is a physical puzzle! Please send someone from your team to Friedman
    208 to pick it up.
  </div>
);

export const remoteBoxBody = (
  <div className="mx-auto mb-6 max-w-3xl text-center">
    This is a physical puzzle! You should have received some documents in your
    box. Contact brownpuzzlehq@gmail.com with any questions about your box or
    its materials.
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      In-person solvers and box purchasers were given two documents along with
      the puzzle. You may need to print them and cut along black lines; they are
      the following two images:
    </div>
    <div className="mb-6 flex w-full max-w-3xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0">
      <Image className="w-full sm:w-1/2 sm:pr-3" src={IDS} alt="" />
      <Image className="w-full sm:w-1/2 sm:pl-3" src={RECEIPTS} alt="" />
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    {body}
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      The interviews provided give logical hints on matching each person with
      their purchases. The statements, in order, give the following information:
    </div>
    <ol className="list-inside list-decimal">
      <li>
        Either the director or the writer purchased the filming equipment.
      </li>
      <li>The caterer purchased the kitchen equipment.</li>
      <li>
        The food was not purchased by the director, writer, lead, or stunt
        double.
      </li>
      <li>
        The historical accuracy consultant did not purchase the reference books.
      </li>
      <li>The intern purchased the coffee.</li>
      <li>
        Either the historical accuracy consultant or the writer purchased the
        reference books.
      </li>
      <li>Either the lead or the stunt double purchased the rodents.</li>
      <li>The historical accuracy consultant did not purchase the food.</li>
      <li>
        The plane tickets were purchased by the writer, director, or lead.
      </li>
    </ol>
    This gives the following map:
    <ol className="list-inside list-decimal">
      <li>The director purchased the filming equipment.</li>
      <li>The caterer purchased the kitchen equipment.</li>
      <li>The security chief purchased the food.</li>
      <li>The writer purchased the reference books.</li>
      <li>The intern purchased the coffee.</li>
      <li>The stunt double purchased the rodents.</li>
      <li>The historical accuracy consulted purchased the costumes.</li>
      <li>The lead purchased the plane tickets.</li>
    </ol>
    <div>
      The interviews also specify some incongruities, which clue the fraudulent
      purchases. in particular, they are the following:
    </div>
    <ol className="list-inside list-decimal">
      <li>
        The act in Central Europe got axed, meaning the Flight to Hungary is
        fraudulent.
      </li>
      <li>North Dakota Williams was bald, meaning the Wigs are fraudulent.</li>
      <li>
        North Dakota Williams did not eat beef, meaning the Hamburgers were
        fraudulent.
      </li>
    </ol>
    <div>
      Lining up the receipts of the fraudulent purchases and the IDs of the
      purchasers, we extract the word on the ID that lines up the fraudulent
      item. This gives us{" "}
      <span className="font-bold text-main-accent">
        PRIVATE EQUITY FIRM</span>,{" "}
      which is the answer.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Malcolm Certain";

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
