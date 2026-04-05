/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "applied-probability";

const RED =
  "rounded-md bg-red-600 px-2 py-1 text-red-50 border-2 border-red-500";
const BLACK =
  "rounded-md bg-black px-2 py-1 text-gray-200 border-2 border-gray-800";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl font-medium">
    <div className="mb-6 font-normal italic">
      I'd bet your grade will be a single zero if you can't spin a solution.
    </div>

    <div className={RED}>GLaDOS's weapon of choice (10)</div>
    <div className={BLACK}>Asbestos-induced cancer (12)</div>
    <div className={RED}>
      <span className="italic">Gossip Girl</span> actor (2 8)
    </div>
    <div className={BLACK}>Biological catalyst (6)</div>
    <div className={RED}>Metabolic pathway that breaks down glucose (10)</div>
    <div className={BLACK}>One who reads without posting (6)</div>
    <div className={RED}>Phallic West Coast clam (7)</div>
    <div className={BLACK}>Lime or eggs, in baking (9)</div>
    <div className={RED}>
      Something you can get close to, but never reach (9)
    </div>
    <div className={BLACK}>Paperboys (7)</div>
    <div className={BLACK}>Dispose of glass or cardboard (7)</div>
    <div className={RED}>
      Animal chef in Everything Everywhere All at Once (7)
    </div>
    <div className={BLACK}>
      Video game series spanning RTS, MMORPG, and CCG genres (8)
    </div>
    <div className={RED}>Boxing franchise (5)</div>
    <div className={BLACK}>Dynamite of film (8)</div>
    <div className={RED}>Bears are often in this (11)</div>
    <div className={BLACK}>Slander (6)</div>
    <div className={RED}>Causes of trade deficits (7)</div>
    <div className={RED}>Common homes for dragons (8)</div>
    <div className={BLACK}>
      Like a Cauchy sequence in a compact metric space (10)
    </div>
    <div className={RED}>2024 Carolina Panthers first round pick (6 7)</div>
    <div className={BLACK}>Top chess engine (9)</div>
    <div className={RED}>Responsiveness, in economics (10)</div>
    <div className={BLACK}>Pitch (3)</div>
    <div className={RED}>Doctor with many contacts (15)</div>
    <div className={BLACK}>Arugula (6)</div>
    <div className={RED}>Deafening silence and alone together, for two (9)</div>
    <div className={BLACK}>Nothingness (8)</div>
    <div className={BLACK}>Overdose prevention drug (8)</div>
    <div className={RED}>State for the nonbelieving (6)</div>
    <div className={BLACK}>Shelf dweller (3)</div>
    <div className={RED}>Recipe components (11)</div>
    <div className={BLACK}>Zwischenzug (10)</div>
    <div className={RED}>Hades' home (10)</div>
    <div className={BLACK}>Philanthropist (5)</div>
    <div className={RED}>Disciples of Ayn Rand (12)</div>
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
export const authors = "Malcolm Certain";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText =
  '<meta charset="utf-8"><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">Applied probability</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;font-style:italic;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:398px;left:3px;"><div style="float:left;">I&#39;d bet your grade will be a single zero if you can&#39;t spin a solution.</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">GLaDOS&#39;s weapon of choice (10)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Asbestos-induced cancer (12)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Gossip Girl actor (2 8)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Biological catalyst (6)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Metabolic pathway that breaks down glucose (10)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">One who reads without posting (6)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Phallic West Coast clam (7)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Lime or eggs, in baking (9)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Something you can get close to, but never reach (9)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Paperboys (7)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Dispose of glass or cardboard (7)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Animal chef in Everything Everywhere All at Once (7)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Video game series spanning RTS, MMORPG, and CCG genres (8)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Boxing franchise (5)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Dynamite of film (8)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Bears are often in this (11)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Slander (6)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Causes of trade deficits (7)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Common homes for dragons (8)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Like a Cauchy sequence in a compact metric space (10)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">2024 Carolina Panthers first round pick (6 7)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Top chess engine (9)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Responsiveness, in economics (10)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Pitch (3)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Doctor with many contacts (15)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Arugula (6)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Deafening silence and alone together, for two (9)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Nothingness (8)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Overdose prevention drug (8)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">State for the nonbelieving (6)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Shelf dweller (3)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Recipe components (11)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Zwischenzug (10)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Hades&#39; home (10)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#000000;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Philanthropist (5)</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;background-color:#dc2626;font-family:Figtree;font-size:12pt;font-weight:normal;font-style:italic;color:#faf7fd;" rowspan="1" colspan="5">Disciples of Ayn Rand (12)</td></tr></tbody></table>';

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
