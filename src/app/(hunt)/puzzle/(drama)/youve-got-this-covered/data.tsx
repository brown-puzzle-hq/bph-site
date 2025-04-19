import Link from "next/link";
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "youve-got-this-covered";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="mx-auto mb-6 max-w-3xl text-center italic">
      This is a physical puzzle! If your team has not already picked up a CD
      or needs a place to play it, please visit HQ in Friedman 208.
    </div>
    <hr className="my-6 mb-6 w-[848px] border-t border-white" />
    <div className="border-4 border-white p-4 h-32">
    {/* _	_ _ _____ _____ _____ ______ ____ ____ ____ _'__ __ <br></br>
    ____ ____ _____ ____ _____ ___ ___ ___ ______ __ _______ __ ____ ______ */}
</div>
  </div>
);

export const remoteBoxBody = (
  <div className="space-y-4">
    <div className="max-w-3xl text-center">
      <i>
        This is a physical puzzle! You should have received it in your box.
        Contact brownpuzzlehq@gmail.com with any questions about your box or its
        materials.
      </i>
    </div>
    <hr className="my-6 mb-6 border-t border-white" />
    <div className="border-4 border-white p-4 h-32"></div>
  </div>
);

export const remoteBody = (
  <div className="flex flex-col justify-center py-4 text-center max-w-3xl space-y-4">
    <audio controls className="w-96 max-w-full">
      <source src="/api/puzzle/youve-got-this-covered" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <div className="border-4 border-white p-4 h-32"></div>
  </div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl text-center">
    This solution is sorta written but like...fill this in later :)
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
