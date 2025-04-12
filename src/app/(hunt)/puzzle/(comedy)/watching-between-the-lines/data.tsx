import Link from "next/link";
import Image from "next/image";
import ACD from "./A_Caribbean_Dream.jpg";
import ABY from "./Anyone_But_You.jpg";
import CMS from "./Catch_My_Soul.jpg";
import Ran from "./Ran.jpg";
import TH from "./The_Hungry.jpg";
import TKK from "./The_Karaoke_King.jpg";
import TLK from "./The_Lion_King.jpg";
import WSS from "./West_Side_Story.jpg";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "watching-between-the-lines";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
  <div className="pb-2.5 italic">
    For too long now, I've been struggling with my favorite movies. 
      Firstly, they look not at all alike. Also, I've found that lots, 
      notably, are repeats. Finally, the list needs some more diverse 
      inspirations.
</div>
  <div className="flex flex-col items-center font-semibold">
    
      
    <div className="grid w-fit grid-cols-[100px_min-content] place-items-center justify-items-start gap-4 text-nowrap md:w-full md:grid-cols-[100px_1fr_100px_1fr_100px_min-content]">
      <Image
        src={WSS}
        width={100}
        height={100}
        alt="West Side Story 1"
        className="rounded-lg"
      />
      <p>(0061, 4)</p>
      <Image
        src={TLK}
        width={100}
        height={100}
        alt="Lion King 1"
        className="rounded-lg"
      />
      <p>(0002, 2)</p>
      <Image
        src={TH}
        width={100}
        height={100}
        alt="The Hungry 1"
        className="rounded-lg"
      />
      <p>(0417, 1)</p>
      <Image
        src={ACD}
        width={100}
        height={100}
        alt="A Caribbean Dream 1"
        className="rounded-lg"
      />
      <p>(0295, 1)</p>
      <Image
        src={CMS}
        width={100}
        height={100}
        alt="Catch My Soul 1"
        className="rounded-lg"
      />
      <p>(3294, 2)</p>
      <Image
        src={Ran}
        width={100}
        height={100}
        alt="Ran 1"
        className="rounded-lg"
      />
      <p>(0069, 8)</p>
      <Image
        src={ABY}
        width={100}
        height={100}
        alt="Anyone But You 1"
        className="rounded-lg"
      />
      <p>(2699, 1)</p>
      <Image
        src={Ran}
        width={100}
        height={100}
        alt="Ran 2"
        className="rounded-lg"
      />
      <p>(0032, 5)</p>
      <Image
        src={TKK}
        width={100}
        height={100}
        alt="The Karaoke King 1"
        className="rounded-lg"
      />
      <p>(1067, 4)</p>
      <Image
        src={ACD}
        width={100}
        height={100}
        alt="A Caribbean Dream 2"
        className="rounded-lg"
      />
      <p>(0695, 1)</p>
      <Image
        src={WSS}
        width={100}
        height={100}
        alt="West Side Story 2"
        className="rounded-lg"
      />
      <p>(0015, 4)</p>
      <Image
        src={TLK}
        width={100}
        height={100}
        alt="Lion King 2"
        className="rounded-lg"
      />
      <p>(3878, 8)</p>
      <Image
        src={ABY}
        width={100}
        height={100}
        alt="Anyone But You 2"
        className="rounded-lg"
      />
      <p>(1228, 7)</p>
      <Image
        src={TH}
        width={100}
        height={100}
        alt="The Hungry 2"
        className="rounded-lg"
      />
      <p>(2247, 7)</p>
      <Image
        src={ACD}
        width={100}
        height={100}
        alt="A Caribbean Dream 3"
        className="rounded-lg"
      />
      <p>(2155, 1)</p>
      <Image
        src={WSS}
        width={100}
        height={100}
        alt="West Side Story 3"
        className="rounded-lg"
      />
      <p>(0694, 3)</p>
      <Image
        src={CMS}
        width={100}
        height={100}
        alt="Catch My Soul 2"
        className="rounded-lg"
      />
      <p>(2383, 3)</p>
      <Image
        src={CMS}
        width={100}
        height={100}
        alt="Catch My Soul 3"
        className="rounded-lg"
      />
      <p>(0119, 3)</p>
      <Image
        src={TKK}
        width={100}
        height={100}
        alt="The Karaoke King 2"
        className="rounded-lg"
      />
      <p>(2651, 1)</p>
      <Image
        src={TLK}
        width={100}
        height={100}
        alt="Lion King 3"
        className="rounded-lg"
      />
      <p>(2669, 4)</p>
      <Image
        src={ACD}
        width={100}
        height={100}
        alt="A Caribbean Dream 4"
        className="rounded-lg"
      />
      <p>(1747, 6)</p>
      <Image
        src={Ran}
        width={100}
        height={100}
        alt="Ran 3"
        className="rounded-lg"
      />
      <p>(3520, 8)</p>
      <Image
        src={ABY}
        width={100}
        height={100}
        alt="Anyone But You 3"
        className="rounded-lg"
      />
      <p>(0003, 10)</p>
      <Image
        src={WSS}
        width={100}
        height={100}
        alt="West Side Story 4"
        className="rounded-lg"
      />
      <p>(1769, 4)</p>
      <Image
        src={TH}
        width={100}
        height={100}
        alt="The Hungry 3"
        className="rounded-lg"
      />
      <p>(0366, 9)</p>
      <Image
        src={TKK}
        width={100}
        height={100}
        alt="The Karaoke King 3"
        className="rounded-lg"
      />
      <p>(0362, 10)</p>
      <Image
        src={Ran}
        width={100}
        height={100}
        alt="Ran 4"
        className="rounded-lg"
      />
      <p>(2076, 2)</p>
      <Image
        src={CMS}
        width={100}
        height={100}
        alt="Catch My Soul 4"
        className="rounded-lg"
      />
      <p>(1248, 7)</p>
      <Image
        src={TKK}
        width={100}
        height={100}
        alt="The Karaoke King 4"
        className="rounded-lg"
      />
      <p>(1016, 4)</p>
      <Image
        src={TH}
        width={100}
        height={100}
        alt="The Hungry 4"
        className="rounded-lg"
      />
      <p>(1482, 4)</p>
      <Image
        src={TLK}
        width={100}
        height={100}
        alt="Lion King 4"
        className="rounded-lg"
      />
      <p>(2823, 3)</p>
      <Image
        src={ABY}
        width={100}
        height={100}
        alt="Anyone But You 4"
        className="rounded-lg"
      />
      <p>(0289, 4)</p>
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
  <div className="max-w-3xl space-y-4 text-center">
    <p>
      The key to this puzzle is two things. One, evey movie poster is based on a
      shakespeare movie. Two, they need to use a system called{" "}
      <Link
        href="https://www.folgerdigitaltexts.org/api"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link hover:underline"
      >
        Folgers Through Line Number
      </Link>{" "}
      (or FTLN). Once they do that, all they need to do is enter in the movie
      and the first number in the () into the website to get a line from that
      play. Then, the second number will lead them to grab a word from that
      line. Do this for every poster and they will get a phrase that directs
      them to two different words, specifically{" "}
      <span className="font-bold text-main-accent">POPPY</span> from Othello and{" "}
      <span className="font-bold text-main-accent">SEED</span> from Hamlet. They
      should put these together to get{" "}
      <span className="font-bold text-main-accent">POPPYSEED</span> as the
      answer.
    </p>
    <p className="space-y-4">
      This is the link to the{" "}
      <Link
        href="https://docs.google.com/spreadsheets/d/1ad1OP3Znxv84Pe8WtciMqgWxRPpexUf1t3LqS__V_DU/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link hover:underline"
      >
        original puzzle document
      </Link>
      , which has all the poster {"->"} play references and what each (line,
      word) combo should go to. The correct tab is the one labeled “Puzzle
      Solution.”
    </p>
  </div>
);

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
