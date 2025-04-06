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
  <div className="flex flex-col items-center">
    <div className="mb-4 max-w-3xl text-center">
      <b>
        This is a metapuzzle. It uses feeders from the{" "}
        <span className="underline">ACTION</span> round.
      </b>
    </div>
    <div className="mb-4 max-w-3xl">
      <i>
        You're trying to adapt these characters -- better known by other names
        -- into your movie, but people are butting heads. What do they need?
      </i>
    </div>

    <div className="mt-4 grid grid-cols-8 justify-center gap-1">
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        4
      </div>
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        5
      </div>
    </div>
    <div className="mt-4 grid grid-cols-7 justify-center gap-1">
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        10
      </div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        6
      </div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
    </div>
    <div className="mt-4 grid grid-cols-6 justify-center gap-1">
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        7
      </div>
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        8
      </div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
    </div>
    <div className="mt-4 grid grid-cols-5 justify-center gap-1">
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        3
      </div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        9
      </div>
    </div>
    <div className="mt-4 grid grid-cols-4 justify-center gap-1">
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        2
      </div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
    </div>
    <div className="mt-4 grid grid-cols-3 justify-center gap-1">
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
      <div className="flex h-10 w-10 items-center justify-center border border-white">
        1
      </div>
      <div className="flex h-10 w-10 items-center justify-center border border-white"></div>
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
  <div className="max-w-3xl text-center">
    {" "}
    This solution does not exist yet. Nag the triplets.{" "}
  </div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `<style>.ritz .waffle a{color:inherit}.ritz .waffle .s1{border-right:1px SOLID #000;background-color:#fff}.ritz .waffle .s4{border-right:1px SOLID #000;background-color:#fff;text-align:center;color:#000;font-family:"docs-Roboto Mono",Arial;font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px}.ritz .waffle .s5{background-color:#fff;text-align:center;color:#000;font-family:"docs-Roboto Mono",Arial;font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px}.ritz .waffle .s0{border-bottom:1px SOLID #000;background-color:#fff}.ritz .waffle .s2{border-bottom:1px SOLID #000;border-right:1px SOLID #000;background-color:#fff;text-align:center;color:#000;font-family:"docs-Roboto Mono",Arial;font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px}.ritz .waffle .s3{border-bottom:1px SOLID #000;border-right:1px SOLID #000;background-color:#ffe599;text-align:center;color:#000;font-family:"docs-Roboto Mono",Arial;font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px}</style><div class="grid-container ritz"dir=ltr><table cellpadding=0 cellspacing=0 class=waffle><tr><td><b>This is a metapuzzle. It uses feeders from the <u>ACTION</u> round.</b><tr><tr><td><i>You're trying to adapt these characters -- better known by other names -- into your movie, but people are butting heads. What do they need?</i><tr><tr><td><i>NB: column width 10 is recommended</i><tr><td><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><td class=s0><tr><td class=s1><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>4<td class=s3 colspan=2 dir=ltr>5<tr><td><td class=s4><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>10<td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>6<td class=s2 colspan=2 dir=ltr><td class=s5><tr><td><td class=s5><td class=s4><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>7<td class=s3 colspan=2 dir=ltr>8<td class=s2 colspan=2 dir=ltr><td class=s5><td class=s5><tr><td><td class=s5><td class=s5><td class=s4><td class=s3 colspan=2 dir=ltr>3<td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>9<td class=s5><td class=s5><td class=s5><tr><td><td class=s5><td class=s5><td class=s5><td class=s4><td class=s2 colspan=2 dir=ltr><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>2<td class=s2 colspan=2 dir=ltr><td class=s5><td class=s5><td class=s5><td class=s5><tr><td><td class=s5><td class=s5><td class=s5><td class=s5><td class=s4><td class=s2 colspan=2 dir=ltr><td class=s3 colspan=2 dir=ltr>1<td class=s2 colspan=2 dir=ltr><td class=s5><td class=s5><td class=s5><td class=s5><td class=s5></table></div>`;
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
