import JigsawPuzzle from "./JigsawPuzzle";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "psychoceramics";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="w-full max-w-4xl">
    <div className="mb-4 space-y-4 text-center">
      <p>
        My pottery usually gets top g-Rae-des, but they've shattered in the
        kiln. How late will I be up redoing this assignment?
      </p>
      <p className="md:hidden">NB: wider screen recommended for this puzzle!</p>
    </div>
    <div className="max-w-[calc(100vw-96px)] overflow-auto">
      <JigsawPuzzle />
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
export const authors = "Megan Carlson, Bailey Merlino";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
// TODO: this might be wrong
export const copyText =
  '<style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s0{border-right:none;background-color:#ffffff;text-align:left;color:#000000;font-family:Arial;font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="0C0" style="width:100px;" class="column-headers-background">A</th></tr></thead><tbody><tr style="height: 20px"><th id="0R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0 softmerge" dir="ltr"><div class="softmerge-inner" style="width:698px;left:-1px">My pottery usually gets top g-Rae-des, but they’ve shattered in the kiln. How late will I be up redoing this assignment?</div></td></tr><tr style="height: 20px"><th id="0R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td></td></tr><tr style="height: 20px"><th id="0R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s0 softmerge" dir="ltr"><div class="softmerge-inner" style="width:498px;left:-1px">[Please refer to the website for the interaction. This line is not part of the puzzle.]</div></td></tr></tbody></table></div>';

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
