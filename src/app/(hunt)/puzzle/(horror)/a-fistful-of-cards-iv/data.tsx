import Image from "next/image";
import horse from "./horse.png";
import hat from "./hat.png";
import lasso from "./lasso.png";
import boom_and_bust from "./boom_and_bust.png";
import boompile from "./boompile.png";
import granted_dynamite from "./granted_dynamite.png";
import holster_tavern from "./holster_tavern.png";
import ingenious_engineering from "./ingenious_engineering.png";
import dynamite_stockpiling from "./dynamite_stockpiling.png";
import dynamite_storage from "./dynamite_storage.png";
import dynamite_workshop from "./dynamite_workshop.png";
import make_new_again from "./make_new_again.png";
import money_cache from "./money_cache.png";
import robbery from "./robbery.png";
import flood_of_cash from "./flood_of_cash.png";
import gathering_dynamite from "./gathering_dynamite.png";
import glory_and_gold from "./glory_and_gold.png";
import moral_hazard from "./moral_hazard.png";
import raze from "./raze.png";
import recycling_waste from "./recycling_waste.png";
import resell from "./resell.png";
import booklet1 from "./booklet_1.png";
import booklet2 from "./booklet_2.png";
import booklet3 from "./booklet_3.png";
import booklet4 from "./booklet_4.png";
import discard from "./playmat discard.png";
import stash from "./playmat stash.png";
import town from "./playmat town.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "a-fistful-of-cards-iv";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mx-auto mb-6 max-w-3xl text-center italic">
      This is a physical puzzle! You should have received it at kickoff. Please
      visit HQ in Friedman 208 if you believe you are missing these supplies.
    </div>
    <hr className="my-6 mb-6 w-full border-t border-white" />
    <div className="mb-6 max-w-3xl">
      Howdy Pardner! Great job slinging dynamite so far - just one more task to
      go. If you want to complete it you'll need to use everything at your
      disposal from the first three tasks. Unfortunately, the stash is shot
      beyond repair: you can still place your cards there and get your money as
      usual, but you won't need those cards to find the answer you're seeking.
      Finally, some advice: I reckon you'll need to start off with that "Granted
      Dynamite" feller and that you'll need to stash 12 cards this round!
    </div>
    <div className="mb-6 max-w-3xl text-center">
      <span className="underline">
        <b>Meta</b>
      </span>
      : Deal 864,691,128,455,135,235 damage.
    </div>
    <div className="mb-3 max-w-3xl">
      <span className="underline">
        <b>Legal cards</b>
      </span>
      : All of them! The{" "}
      <Image
        src={horse}
        alt="horse"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      ,{" "}
      <Image
        src={hat}
        alt="hat"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      , and{" "}
      <Image
        src={lasso}
        alt="lasso"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      sets.
    </div>
    <ul className="list-disc pl-6">
      <li>The first card you play must be Granted Dynamite.</li>
      <li>You must stash 12 cards from your hand during the game.</li>
      <li>Cards in the stash can be ignored once placed there.</li>
      <li>Cards in the town slide to the left (as in the discard pile).</li>
    </ul>
  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="max-w-3xl text-center">
      <i>
        This is a physical puzzle! You should have received it in your box.
        Contact brownpuzzlehq@gmail.com with any questions about your box or its
        materials.
      </i>
    </div>
    <hr className="my-6 mb-6 border-t border-white" />
    <div className="mb-6 max-w-3xl">
      Howdy Pardner! Great job slinging dynamite so far - just one more task to
      go. If you want to complete it you'll need to use everything at your
      disposal from the first three tasks. Unfortunately, the stash is shot
      beyond repair: you can still place your cards there and get your money as
      usual, but you won't need those cards to find the answer you're seeking.
      Finally, some advice: I reckon you'll need to start off with that "Granted
      Dynamite" feller and that you'll need to stash 12 cards this round!
    </div>
    <div className="mb-6 max-w-3xl text-center">
      <span className="underline">
        <b>Meta</b>
      </span>
      : Deal 864,691,128,455,135,235 damage.
    </div>
    <div className="mb-3 max-w-3xl">
      <span className="underline">
        <b>Legal cards</b>
      </span>
      : All of them! The{" "}
      <Image
        src={horse}
        alt="horse"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      ,{" "}
      <Image
        src={hat}
        alt="hat"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      , and{" "}
      <Image
        src={lasso}
        alt="lasso"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      sets.
    </div>
    <ul className="list-disc pl-6">
      <li>The first card you play must be Granted Dynamite.</li>
      <li>You must stash 12 cards from your hand during the game.</li>
      <li>Cards in the stash can be ignored once placed there.</li>
      <li>Cards in the town slide to the left (as in the discard pile).</li>
    </ul>
  </div>
);

export const remoteBody = (
  <div>
    <div className="mb-6 w-[848px] text-center">
      Howdy Pardner! Great job slinging dynamite so far - just one more task to
      go. If you want to complete it you'll need to use everything at your
      disposal from the first three tasks. Unfortunately, the stash is shot
      beyond repair: you can still place your cards there and get your money as
      usual, but you won't need those cards to find the answer you're seeking.
      Finally, some advice: I reckon you'll need to start off with that "Granted
      Dynamite" feller and that you'll need to stash 12 cards this round!
    </div>
    <div className="mb-6 max-w-3xl text-center">
      <span className="underline">
        <b>Meta</b>
      </span>
      : Deal 864,691,128,455,135,235 damage.
    </div>
    <div className="mb-3 max-w-3xl text-center">
      <span className="underline">
        <b>Legal cards</b>
      </span>
      : All of them! The{" "}
      <Image
        src={horse}
        alt="horse"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      ,{" "}
      <Image
        src={hat}
        alt="hat"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      , and{" "}
      <Image
        src={lasso}
        alt="lasso"
        width={30}
        height={30}
        className="inline-block align-text-bottom"
      />{" "}
      sets.
      <div className="flex justify-center">
        <ul className="list-disc pl-6 text-left">
          <li>The first card you play must be Granted Dynamite.</li>
          <li>You must stash 12 cards from your hand during the game.</li>
          <li>Cards in the stash can be ignored once placed there.</li>
          <li>Cards in the town slide to the left (as in the discard pile).</li>
        </ul>
      </div>
    </div>

    <div className="mt-8 grid grid-cols-3 justify-items-center gap-4">
      <Image src={boom_and_bust} alt="Boom and Bust" width={250} height={500} />
      <Image src={boompile} alt="Boompile" width={250} height={500} />
      <Image
        src={granted_dynamite}
        alt="Granted Dynamite"
        width={250}
        height={500}
      />
      <Image
        src={holster_tavern}
        alt="Holster Tavern"
        width={250}
        height={500}
      />
      <Image
        src={ingenious_engineering}
        alt="Ingenious Engineering"
        width={250}
        height={500}
      />
      <Image
        src={dynamite_stockpiling}
        alt="Dynamite Stockpiling"
        width={250}
        height={500}
      />
      <Image
        src={dynamite_storage}
        alt="Dynamite Storage"
        width={250}
        height={500}
      />
      <Image
        src={dynamite_workshop}
        alt="Dynamite Workshop"
        width={250}
        height={500}
      />
      <Image
        src={make_new_again}
        alt="Make New Again"
        width={250}
        height={500}
      />
      <Image src={money_cache} alt="Money Cache" width={250} height={500} />
      <Image src={robbery} alt="Robbery" width={250} height={500} />
      <Image src={flood_of_cash} alt="Flood of Cash" width={250} height={500} />
      <Image
        src={gathering_dynamite}
        alt="Gathering Dynamite"
        width={250}
        height={500}
      />
      <Image
        src={glory_and_gold}
        alt="Glory and Gold"
        width={250}
        height={500}
      />
      <Image src={moral_hazard} alt="Moral Hazard" width={250} height={500} />
    </div>
    <div className="mt-5 grid grid-cols-3 justify-items-center gap-4">
      <Image src={raze} alt="Raze" width={250} height={500} />
      <Image
        src={recycling_waste}
        alt="Recycling Waste"
        width={250}
        height={500}
      />
      <Image src={resell} alt="Resell" width={250} height={500} />
    </div>

    <hr className="my-6 mb-6 border-t border-white" />

    <div className="mb-6 w-full text-center">
      <span className="underline">
        <b>Instructions</b>
      </span>
    </div>

    <div className="mt-8 flex justify-center gap-4">
      <Image src={booklet1} alt="Booklet #1" width={200} height={400} />
      <Image src={booklet2} alt="Booklet #2" width={200} height={400} />
      <Image src={booklet3} alt="Booklet #3" width={200} height={400} />
      <Image src={booklet4} alt="Booklet #4" width={200} height={400} />
    </div>

    <hr className="my-6 mb-6 border-t border-white" />

    <div className="mb-6 w-full text-center">
      <span className="underline">
        <b>Playmats</b>
      </span>
    </div>

    <div className="flex h-full flex-col items-center justify-between gap-4">
      <Image src={stash} alt="The Stash" width={700} height={1000} />
      <Image src={town} alt="The Town" width={700} height={1000} />
      <Image src={discard} alt="Discard Pile" width={700} height={1000} />
    </div>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      In the A Fistful for Cards sequence, solvers play a physical card game
      with the goal of dealing a given amount of damage each puzzle.
    </div>
    <div>
      Each round yields a unique organization of cards on the playmat when the
      correct sequence is found. To extract the answer, index into the name of
      each card using the number of bullet holes on the space in the playmat.
      For instance, if "Example Card" ends up in slot one of The Stash (which
      has one bullet hole), we will take the first letter of the card name and
      end up with E.
    </div>
    <div>
      There are three main ideas required to solve this puzzle in the sequence:
    </div>
    <ol className="list-inside list-decimal">
      <li>
        Moral Hazard is the best way to rack up dynamite. This requires a bunch
        of cards to be played to work, though. Luckily...
      </li>
      <li>
        You can loop Recycling Waste, Make New Again, and Flood of Cash to play
        a bunch of cards. This requires a lot of money, though. Luckily...
      </li>
      <li>
        Glory and Gold can double the money from the 12 stashes required during
        this round to create 24 💰.
      </li>
    </ol>
    <div>
      After these three ideas are identified, a little bit (but hopefully not
      too much!) of finagling needs to be done to get to the requisite number of
      damage.
    </div>
    <div>
      In order to get to 864,691,128,455,135,235 damage, take the following
      actions:
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Action</th>
            <th className="p-2 outline outline-white">💰</th>
            <th className="p-2 outline outline-white">🧨</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">
              Play Granted Dynamite, gaining +3 🧨.
            </td>
            <td className="p-2 outline outline-white">0</td>
            <td className="p-2 outline outline-white">3</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Flood of Cash, gaining +2 💰.
            </td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">3</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Recycling Waste, paying 1 💰 to return Flood of Cash to your
              hand.
            </td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">3</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Flood of Cash, gaining +2 💰.
            </td>
            <td className="p-2 outline outline-white">3</td>
            <td className="p-2 outline outline-white">3</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Glory and Gold, paying 3 💰.
            </td>
            <td className="p-2 outline outline-white">0</td>
            <td className="p-2 outline outline-white">3</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Flip over all cards but Granted Dynamite, Moral Hazard, Make New
              Again, Recycling Waste, Flood of Cash, and Glory and Gold,
              flipping a total of 12 cards for +24 💰.
            </td>
            <td className="p-2 outline outline-white">24</td>
            <td className="p-2 outline outline-white">3</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Moral Hazard, paying 4 💰. Glory and Gold is discarded.
            </td>
            <td className="p-2 outline outline-white">20</td>
            <td className="p-2 outline outline-white">3</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Make New Again, paying 2 💰 to return Recycling Waste and
              Flood of Cash to hand.
            </td>
            <td className="p-2 outline outline-white">18</td>
            <td className="p-2 outline outline-white">3⋅2 = 6</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Flood of Cash, gaining +2 💰.
            </td>
            <td className="p-2 outline outline-white">20</td>
            <td className="p-2 outline outline-white">3⋅2² = 12</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Recycling Waste, paying 1 💰 to return Make New Again to
              hand.
            </td>
            <td className="p-2 outline outline-white">20</td>
            <td className="p-2 outline outline-white">3⋅2³ = 24</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Repeat the previous three steps seventeen more times. Each loop
              costs a net 1 💰 and has three cards played (doubling the 🧨 three
              times).
            </td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">3⋅2⁵⁴</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Make New Again, paying 2 💰 to return Recycling Waste and
              Flood of Cash to hand.
            </td>
            <td className="p-2 outline outline-white">0</td>
            <td className="p-2 outline outline-white">3⋅2⁵⁵</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Flood of Cash, gaining +2 💰.
            </td>
            <td className="p-2 outline outline-white">2</td>
            <td className="p-2 outline outline-white">3⋅2⁵⁶</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Recycling Waste, paying 1 💰 to return Granted Dynamite to
              hand.
            </td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">3⋅2⁵⁷</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">
              Play Granted Dynamite, gaining +3 🧨.
            </td>
            <td className="p-2 outline outline-white">1</td>
            <td className="p-2 outline outline-white">
              3⋅2⁵⁸ + 3 = 864,691,128,455,135,235
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      We have the following cards in each zone (ignoring The Stash for this
      round as instructed):
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Zone</th>
            <th className="p-2 outline outline-white">Cards</th>
            <th className="p-2 outline outline-white">Bullet Holes</th>
            <th className="p-2 outline outline-white">Extracted Letters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">The Town</td>
            <td className="p-2 outline outline-white">Moral Hazard</td>
            <td className="p-2 outline outline-white">4</td>
            <td className="p-2 outline outline-white">A</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Discard Pile</td>
            <td className="p-2 outline outline-white">
              Glory and Gold
              <br />
              Make New Again
              <br />
              Flood of Cash
              <br />
              Recycling Waste
              <br />
              Granted Dynamite
            </td>
            <td className="p-2 outline outline-white">
              4<br />
              1<br />
              2<br />
              14
              <br />5
            </td>
            <td className="p-2 outline outline-white">
              R<br />
              M<br />
              L<br />
              E<br />T
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      Reading off the extracted letters in order gives our answer,{" "}
      <span className="font-bold text-main-accent">
        ARMLET</span>.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Jeremy Fleming";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null; // come back later

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
