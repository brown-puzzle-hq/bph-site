import Image from "next/image";
import MAP from "./images/boring_plot_map.svg";

const GRID = [
  "S30",
  "S30",
  "G30",
  ".6D20.4",
  ".7D17.6",
  ".7D20.3",
  ".9D20.1",
  ".8D21.1",
  ".10D20",
  ".1D29",
];

const COLORGRID = [
  ".6D2A1D3B1D3C1D2E1D2F1D1H1D1.4",
  ".7D2A1D1B1D5C1D1E1D2F1H1.6",
  ".7D3A1D1B1D4C1D1E1D2F1D1H1D2.3",
  ".9D1A2D1B2D1C2D2E1D1F1D2H1D3.1",
  ".8D3A3B3C2D1E2D4H2D1.1",
  ".10A3D1B3C2D2E3D3H2D1",
  ".1D11B2D10E3D3",
];

const DIGGING = [
  "↘.......↙.....↘...↓..↙....",
  ".↘.....↘.......↓..↓.↘.....",
  "..↓.....↘......↓..↓..↘....",
  "..→↓.....→↓...↘←.. ...↘...",
  "...→→↙....→→↓..→↓......→↘.",
  ".. ←←.....↙←←.. ←....... ←",
  "........ ←................",
  "..........................",
  "....↓........→↓...........",
  "....↓.........→↓..........",
  "....↘..........→↓.........",
  ".....↘..........→↓........",
  ".....↘←..........→↓.......",
  "......→→↘......... .......",
  ".........→→ ..............",
];

const STACK = [" 4.9", " 12.1", " 9.4", " 11.2", " 13", " 8.5"];

const COLORS: Record<string, string> = {
  ".": "bg-[#ad805f]",
  G: "bg-blue-200 border-b-8 border-[#38761d]",
  D: "bg-[#785236] border border-[#785236]",
  S: "bg-blue-200",
  A: "bg-green-400 border border-green-400",
  B: "bg-blue-400 border border-blue-400",
  C: "bg-orange-400 border border-orange-400",
  E: "bg-yellow-400 border border-yellow-400",
  F: "bg-pink-400 border border-pink-400",
  H: "bg-red-400 border border-red-400",
};

const decodeRLE = (rle: string): string[] => {
  const regex = /([A-Za-z .])(\d+)?/g;
  let row: string[] = [];

  let match;
  while ((match = regex.exec(rle)) !== null) {
    const char = match[1];
    const count = parseInt(match[2] || "1", 10);
    row.push(...Array(count).fill(char));
  }

  return row;
};

const GRIDLETTERS = [
  Array<string>(6)
    .fill("")
    .concat("TAXPAIDMARTIALARTIST".split(""))
    .concat(Array<string>(4).fill("")),
  Array<string>(7)
    .fill("")
    .concat("PRIVATEEQUITYFIRM".split(""))
    .concat(Array<string>(6).fill("")),
  Array<string>(7)
    .fill("")
    .concat("TROPICALLAKESUPERIOR".split(""))
    .concat(Array<string>(3).fill("")),
  Array<string>(9)
    .fill("")
    .concat("CHATTYCATHYTEXTALIGN".split(""))
    .concat(Array<string>(1).fill("")),
  Array<string>(8)
    .fill("")
    .concat("PUNCTILIOALTORHAPSODY".split(""))
    .concat(Array(1).fill("")),
  Array<string>(10).fill("").concat("SUNWRECKINGSAUVIGNON".split("")),
  [""].concat("INDIANAJONESANDTHELASTCRUSADE".split("")),
];

// const STACK = [" 4.9", " 12.1", " 9.4", " 11.2", " 13", " 8.5"];

const STACKLETTERS = [
  "TREX".split("").concat(Array(9).fill("")),
  "LYSTROSAURUS".split("").concat(Array(1).fill("")),
  "TIKTAALIK".split("").concat(Array(4).fill("")),
  "XIPHACTINUS".split("").concat(Array(2).fill("")),
  "DACTYLIOCERAS".split(""),
  "SMILODON".split("").concat(Array(5).fill("")),
];

const FULLGRID = GRID.map(decodeRLE);
const FULLCOLORGRID = COLORGRID.map(decodeRLE);
const FULLSTACK = STACK.map(decodeRLE);

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "boring-plot";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="max-w-3xl space-y-4 text-center">
      <div className="font-bold">
        This is a metapuzzle. It uses feeders from the Adventure round.
      </div>
      <div className="pb-2.5 italic">
        You've spent ages digging through your backyard with only 6 fossils to
        show for it. If you dig through the fossil stack instead, going right
        and down, maybe you'll find what you need. What is the plot missing?
      </div>
    </div>
    <div className="flex max-w-3xl flex-col items-center space-y-4 text-center">
      <div className="flex justify-center pb-4">
        <Image src={MAP} alt="" /*width={300} height={300}*/ />
      </div>
      <p className="font-bold text-main-header">Your Backyard</p>
      <div className="grid grid-cols-[0em,repeat(29,1.5em)] grid-rows-[repeat(10,1.5em)]">
        {FULLGRID.flatMap((row, i) =>
          row.map((cell, j) => (
            <div className={COLORS[cell]} key={`${i}-${j}`} />
          )),
        )}
      </div>
      <p className="font-bold text-main-header">Digging Guide</p>
      <div className="grid grid-cols-[repeat(26,1.5em)] grid-rows-[repeat(15,1.5em)] text-center font-mono leading-[18px] text-main-header">
        {DIGGING.flatMap((row, i) =>
          row.split("").map((cell, j) =>
            cell == "." ? (
              <p key={`${i}-${j}`} />
            ) : (
              <p
                className="rounded-md border-[1.5px] border-[#4C3B2B] bg-[#72543A]"
                key={`${i}-${j}`}
              >
                {cell}
              </p>
            ),
          ),
        )}
      </div>
      <p className="font-bold text-main-header">Fossil Stack</p>
      <div className="grid grid-cols-[repeat(13,1.5em)] grid-rows-[repeat(6,1.5em)]">
        {FULLSTACK.flatMap((row, i) =>
          row.map((cell, j) =>
            cell == "." ? (
              <p key={`${i}-${j}`} />
            ) : (
              <p
                className="rounded-md border-[1.5px] border-[#4C3B2B] bg-[#72543A]"
                key={`${i}-${j}`}
              >
                {cell}
              </p>
            ),
          ),
        )}
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
  <div className="max-w-3xl space-y-4">
    <div>This meta uses all of the feeders from the Adventure round:</div>
    <ul className="list list-inside">
      <li>ALTO RHAPSODY</li>
      <li>CHATTY CATHY</li>
      <li>INDIANA JONES AND THE LAST CRUSADE</li>
      <li>LAKE SUPERIOR</li>
      <li>MARTIAL ARTIST</li>
      <li>PRIVATE EQUITY FIRM</li>
      <li>PUNCTILIO</li>
      <li>SAUVIGNON</li>
      <li>SUN</li>
      <li>TAXPAID</li>
      <li>TEXT ALIGN</li>
      <li>TROPICAL</li>
      <li>WRECKING</li>
    </ul>
    <div>
      It stands to reason that these feeders should be arranged onto the
      backyard grid. We can figure out where to place each feeder using the
      diagram, which draws a path through the map!
    </div>
    <div>
      Using the diagram at the top of the page, we can act as if we're 'digging'
      for fossils in layers on the map. Solvers should notice that the puzzle
      sprites are laid out in layers. By pretending that you are digging in the
      direction indicated by the arrow (where the green grass is up and feeders
      should be ordered based on this orientation), we can get a stratification
      of the feeders. The filled in grid should look like this:
    </div>
    <div className="grid grid-cols-[0em,repeat(29,1.5em)] grid-rows-[repeat(7,1.5em)] text-center">
      {FULLGRID.slice(3).flatMap((row, i) =>
        row.map((cell, j) => (
          <div className={COLORS[cell]} key={`${i}-${j}`}>
            {GRIDLETTERS[i]?.[j] || ""}
          </div>
        )),
      )}
    </div>
    <div>
      From here, we can place the all but the last of the given digging guides
      to extract the names of prehistoric creatures. A good break-in is TREX
      going directly down. The fossils can be placed like so:
    </div>
    <div className="grid grid-cols-[0em,repeat(29,1.5em)] grid-rows-[repeat(7,1.5em)] text-center">
      {FULLCOLORGRID.flatMap((row, i) =>
        row.map((cell, j) => (
          <div className={COLORS[cell]} key={`${i}-${j}`}>
            {GRIDLETTERS[i]?.[j] || ""}
          </div>
        )),
      )}
    </div>
    <div>This gives the following fossil stack:</div>
    <div className="grid grid-cols-[repeat(13,1.5em)] grid-rows-[repeat(6,1.5em)] text-center">
      {FULLSTACK.flatMap((row, i) =>
        row.map((cell, j) =>
          cell == "." ? (
            <p key={`${i}-${j}`} />
          ) : (
            <p
              className="rounded-md border-[1.5px] border-[#4C3B2B] bg-[#72543A]"
              key={`${i}-${j}`}
            >
              {STACKLETTERS[i]?.[j] || " "}
            </p>
          ),
        ),
      )}
    </div>
    <div>
      Finally, we use the last digging guide that was not used on the fossil
      stack itself:
    </div>
    <div className="grid grid-cols-[repeat(13,1.5em)] grid-rows-[repeat(6,1.5em)] text-center">
      {FULLSTACK.flatMap((row, i) =>
        row.map((cell, j) =>
          cell == "." ? (
            <p key={`${i}-${j}`} />
          ) : (
            <p
              className={
                j - i == 2 || j - i == 3
                  ? "rounded-md border-[1.5px] border-[#4C3B2B] bg-green-400"
                  : "rounded-md border-[1.5px] border-[#4C3B2B] bg-[#72543A]"
              }
              key={`${i}-${j}`}
            >
              {STACKLETTERS[i]?.[j] || " "}
            </p>
          ),
        ),
      )}
    </div>
    <div>
      This extracts what we need to fix this movie:{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">
        EXTRA ACTION.
      </span>
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null; // Should be composed of the const variables up top

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
