import Image from "next/image";
import DROP from "./drop-the.jpg";

const GRIDCOLS: Record<number, string> = {
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
};

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "drop-the";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <div className="font-bold">
      This is a metapuzzle. It uses feeders from the Action round.
    </div>
    <div className="pb-2.5 italic">
      You're trying to adapt these characters -- better known by other names --
      into your movie, but people are butting heads. What do they need?
    </div>
    <div className="items-center">
      <Image src={DROP} alt="" className="rounded-lg" />
    </div>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
const aliases = ["PUNISHER", "PROWLER", "LEADER", "THING", "HULK", "RAY"].map(
  (name) => name.split(""),
);
const highlightedIndices = [[6, 7], [2, 5], [3, 4], [0, 4], [2], [1]];
export const solutionBody = (
  <div className="max-w-3xl space-y-4">
    <div>
      Each of the feeder answers is the last name of a superhero. As clued by
      the title, each of these superheros has an alias that canonically starts
      with "The":
    </div>
    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="w-1/2 p-2 outline outline-white">Superhero name</th>
            <th className="w-1/2 p-2 outline outline-white">Alias</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">Bruce BANNER</td>
            <td className="p-2 outline outline-white">The HULK</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Hobie BROWN</td>
            <td className="p-2 outline outline-white">The PROWLER</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Frank CASTLE</td>
            <td className="p-2 outline outline-white">The PUNISHER</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Lucian GATES</td>
            <td className="p-2 outline outline-white">The RAY</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Ben GRIMM</td>
            <td className="p-2 outline outline-white">The THING</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">Samuel STERNS</td>
            <td className="p-2 outline outline-white">The LEADER</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      Dropping the "The" and filling in the aliases into the given grid yields:
    </div>
    <div className="flex flex-col items-center">
      {aliases.map((row, i) => (
        <div
          key={i}
          className={`grid w-fit text-center ${GRIDCOLS[row.length]}`}
        >
          {row.map((letter, j) => (
            <div
              key={j}
              className={
                "flex h-10 w-10 items-center justify-center border border-white" +
                (highlightedIndices[i]?.includes(j)
                  ? " bg-[#ffd71c]"
                  : " bg-[#EA4526]")
              }
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
    <div>
      Ordering the highlighted letters by the numbers they were given with, we
      obtain our final answer,{" "}
      <span className="font-bold text-main-accent">
        ALTERED EGO</span>.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Nate Chinman, Nicholas Cressman, Thomas Gordon, and Jack de Haan";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `<style>.ritz .waffle a{color:inherit}.ritz .waffle .s1{border-right:1px SOLID #000;background-color:#fff}.ritz .waffle .s4{border-right:1px SOLID #000;background-color:#fff;text-align:center;color:#000;font-family:"docs-Roboto Mono",Arial;font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px}.ritz .waffle .s5{background-color:#fff;text-align:center;color:#000;font-family:"docs-Roboto Mono",Arial;font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px}.ritz .waffle .s0{border-bottom:1px SOLID #000;background-color:#fff}.ritz .waffle .s2{border-bottom:1px SOLID #000;border-right:1px SOLID #000;background-color:#fff;text-align:center;color:#000;font-family:"docs-Roboto Mono",Arial;font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px}.ritz .waffle .s3{border-bottom:1px SOLID #000;border-right:1px SOLID #000;background-color:#ffe599;text-align:center;color:#000;font-family:"docs-Roboto Mono",Arial;font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px}</style><div class="grid-container ritz"dir=ltr><table cellpadding=0 cellspacing=0 class=waffle><tr><td><b>This is a metapuzzle. It uses feeders from the Action round.</b><tr><tr><td><i>You're trying to adapt these characters -- better known by other names -- into your movie, but people are butting heads. What do they need?</i><tr><tr><td><i>NB: pasting into a spreadsheet with column width 10 is recommended</i><tr><td><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><tr><td class=s1><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>4<td class=s3 colspan=2 dir=ltr>5<tr><td><td class=s4><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>10<td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>6<td class=s2 colspan=2 dir=ltr><td class=s5><tr><td><td class=s5><td class=s4><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>7<td class=s3 colspan=2 dir=ltr>8<td class=s2 colspan=2 dir=ltr><td class=s5><td class=s5><tr><td><td class=s5><td class=s5><td class=s4><td class=s3 colspan=2 dir=ltr>3<td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>9<td class=s5><td class=s5><td class=s5><tr><td><td class=s5><td class=s5><td class=s5><td class=s4><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>2<td class=s2 colspan=2 dir=ltr><td class=s5><td class=s5><td class=s5><td class=s5><tr><td><td class=s5><td class=s5><td class=s5><td class=s5><td class=s4><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>1<td class=s2 colspan=2 dir=ltr><td class=s5><td class=s5><td class=s5><td class=s5><td class=s5></table></div>`;

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
