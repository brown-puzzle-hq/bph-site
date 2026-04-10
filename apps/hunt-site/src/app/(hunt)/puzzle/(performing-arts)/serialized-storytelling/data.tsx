import PuzzlePlayer from "@/puzzle/components/puzzle/PuzzlePlayer";
import CrosswordCluesClient from "./CrosswordCluesClient";
import { createHash } from "node:crypto";

export const puzzleId = "serialized-storytelling";

const GRID_ROWS = 22;
const GRID_COLS = 15;

const gridDef: string[] = [
  ".......@....@@@",
  ".......@.......",
  "@.....@@.......",
  ".............@@",
  "..@..@...@@@...",
  "...@...@.......",
  "......@........",
  ".....@..@...@..",
  "@@......@@@@...",
  "..@@...@@@...@@",
  "...@...@@......",
  "...@@...@......",
  ".........@@....",
  "@.....@..@@....",
  "@.....@......@@",
  "@@@@@.........@",
  "@@@...........@",
  "@@...@@@@@@@@@.",
  "@......@@@.....",
  "..@.....@......",
  "....@..........",
  "...@.......@...",
];

type Clue = {
  num: number;
  answerLength: number;
  row: number;
  col: number;
  direction: "A" | "D";
};

function normalizeAnswerText(answer: string) {
  return answer.replace(/[^A-Za-z]/g, "").toUpperCase();
}

function sha256Hex(input: string) {
  return createHash("sha256").update(input, "utf8").digest("hex");
}

function buildSolutionLettersFromAnswers(
  grid: string[],
  extractedClues: { across: Clue[]; down: Clue[] },
  acrossAnswers: Record<number, string>,
  downAnswers: Record<number, string>,
) {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const isBlock = (r: number, c: number) => grid[r]?.[c] === "@";

  const letters: string[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ""),
  );

  const place = (r: number, c: number, ch: string) => {
    const prev = letters[r]?.[c] ?? "";
    if (prev && prev !== ch) {
      throw new Error(
        `Conflicting letters at (${r},${c}): '${prev}' vs '${ch}'`,
      );
    }
    letters[r]![c] = ch;
  };

  for (const clue of extractedClues.across) {
    const raw = acrossAnswers[clue.num];
    if (raw == null) continue;
    const ans = normalizeAnswerText(raw);
    if (ans.length !== clue.answerLength) {
      throw new Error(
        `Across ${clue.num} answer length mismatch: expected ${clue.answerLength}, got ${ans.length}`,
      );
    }
    for (let i = 0; i < ans.length; i++) {
      const rr = clue.row;
      const cc = clue.col + i;
      if (isBlock(rr, cc)) {
        throw new Error(
          `Across ${clue.num} runs into a block at (${rr},${cc})`,
        );
      }
      place(rr, cc, ans[i]!);
    }
  }

  for (const clue of extractedClues.down) {
    const raw = downAnswers[clue.num];
    if (raw == null) continue;
    const ans = normalizeAnswerText(raw);
    if (ans.length !== clue.answerLength) {
      throw new Error(
        `Down ${clue.num} answer length mismatch: expected ${clue.answerLength}, got ${ans.length}`,
      );
    }
    for (let i = 0; i < ans.length; i++) {
      const rr = clue.row + i;
      const cc = clue.col;
      if (isBlock(rr, cc)) {
        throw new Error(`Down ${clue.num} runs into a block at (${rr},${cc})`);
      }
      place(rr, cc, ans[i]!);
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isBlock(r, c)) continue;
      if (!letters[r]![c]) return null;
    }
  }

  return letters;
}

function computePuzzleJsTextHashFromSolution(
  grid: string[],
  extractedClues: { across: Clue[]; down: Clue[] },
  acrossAnswers: Record<number, string>,
  downAnswers: Record<number, string>,
  salt: string,
) {
  const letters = buildSolutionLettersFromAnswers(
    grid,
    extractedClues,
    acrossAnswers,
    downAnswers,
  );
  if (!letters) return null;

  let data = "";
  for (let r = 0; r < letters.length; r++) {
    for (let c = 0; c < letters[r]!.length; c++) {
      if (grid[r]?.[c] === "@") continue;
      data += letters[r]![c]!;
    }
  }

  return sha256Hex(salt + data);
}

function extractClues(grid: string[]): { across: Clue[]; down: Clue[] } {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const isBlock = (r: number, c: number) => grid[r]?.[c] === "@";
  const across: Clue[] = [];
  const down: Clue[] = [];
  let clueNum = 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isBlock(r, c)) continue;
      const startAcross = c === 0 || isBlock(r, c - 1);
      const startDown = r === 0 || isBlock(r - 1, c);

      if (startAcross) {
        let len = 0;
        while (c + len < cols && !isBlock(r, c + len)) len++;
        across.push({
          num: clueNum,
          answerLength: len,
          row: r,
          col: c,
          direction: "A",
        });
      }

      if (startDown) {
        let len = 0;
        while (r + len < rows && !isBlock(r + len, c)) len++;
        down.push({
          num: clueNum,
          answerLength: len,
          row: r,
          col: c,
          direction: "D",
        });
      }

      if (startAcross || startDown) clueNum++;
    }
  }

  return { across, down };
}

const rebusCells: Array<{ r: number; c: number }> = [];

function makeFills(
  rows: number,
  cols: number,
  cells: Array<{ r: number; c: number }>,
) {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => "."),
  );
  for (const { r, c } of cells) {
    if (r >= 0 && r < rows && c >= 0 && c < cols) grid[r]![c] = "1";
  }
  return grid.map((row) => row.join(""));
}

const fillsDef = makeFills(GRID_ROWS, GRID_COLS, rebusCells);
const extracted = extractClues(gridDef);
const displayedAcross = extracted.across.filter(
  (clue) => !(clue.answerLength === 1),
);
const displayedDown = extracted.down.filter(
  (clue) => !(clue.answerLength === 1),
);
// DO NOT USE THE ANSWERS TO CONSTRUCT SOLUTION!! they are not up to date
export const acrossClues: Record<number, string> = {
  1: "Get dry and wrinkly",
  8: "Voice below soprano",
  12: "1988 skating medalist Brian",
  13: '"The hungriest man in history"',
  17: "Compassion",
  18: "Permit",
  19: "California high-tech region",
  22: "Prestigious public university system in the US",
  23: "Ratio of circumference to diameter",
  24: "Prohibit",
  25: "Any of six magnetosphere-observing satellites in the '60s",
  28: "Animated image file",
  30: "Surveillance org.",
  32: '"Join ___" ("You\'re not the first")',
  36: "Nike competitor",
  38: "Angkor Wat locale",
  39: "Ignited again",
  40: '"What\'s up?"',
  41: "CEO's degree, often",
  42: "One leading a D&D session",
  43: "One is a Cooper, one is a Walker, and one is in chains",
  45: "Poseidon's domain",
  46: "Someone in the UK's House of Commons",
  48: "Suffix with ball or bass",
  49: "Ginger ___",
  51: "Antlered animal",
  53: "Designation as a key wildlife site in the UK",
  54: "Compelled",
  57: "Grazing area",
  58: "Curtsy, in Gdansk",
  60: "Household skills class, for short",
  61: "Evel Knievel, e.g.",
  65: "A town in ancient Thrace, or most of a prefix meaning bird",
  66: "Concentrated liquid treatment used on the skin",
  67: "The state whose capital is Augusta, abbr.",
  68: "Votes against",
  69: "Ill-fated energy company",
  70: "Maniacs",
  73: "Crisis",
  76: "Childhood game that starts with a countdown",
  78: "Gear part",
  80: "Childbirth assistants",
  83: "Hospital employee",
  87: '"That smells!" to a kid',
  88: "Four of them are in a normal deck",
  90: "Piano piece",
  91: "Ump's call",
  93: "Karl Marx opus first published in 1867",
  95: "A knife used by dwellers of a 77D",
  96: "Kind of address",
  97: "Dash lengths",
};

export const downClues: Record<number, string> = {
  1: "Antimony's uninferrable chemical symbol",
  2: "Assassination, or ad lib for Playboi Carti",
  3: "Currency of 38A",
  4: '"Let ___!" ("Go ahead!")',
  5: "Inoculation",
  6: "Greek war goddess",
  7: '"___ and behold!"',
  8: "Home of the Hawks",
  9: 'Elizabeth who played the title role in Lifetime\'s "You"',
  10: "Abbeviation for trityl chloride",
  11: "First black NHL player",
  14: '"Whichever," phrase meaning something is not special',
  15: "Abbr. for the currency of India",
  16: "Abbr. for major of some future technicians",
  19: "Sweet stuff",
  20: "League of stars such as Victor Wembanyama, abbr.",
  21: "Cast member in an animated movie, abbr.",
  26: "Tour leader",
  27: "Time's 2012 Person of the Year",
  29: "Nike competitor",
  31: "Baseball player who was formerly just the 4th outfielder",
  33: '"Let me think..."',
  34: "Flow back",
  35: "Mover's form for the USPS",
  37: 'Pickles on "Rugrats"',
  38: "Gov. of the Separatist movement in Star Wars",
  40: "Shakespeare work of 1599",
  44: "Sentenced to a punishment",
  45: "A fortunate package, for the unemployed",
  46: "Blend",
  47: '"The magic word"',
  49: "___/ace",
  50: "C10H16, a terpene found in citrus rinds",
  52: "Pejorative for a loudly unsatisfied customer",
  54: "Baseball player who only plays offense",
  55: "Friend of meeny, miny, and moe",
  56: "Law enforcement agency of the Navy",
  59: "Cheerleader's call before a letter",
  62: "Make a mistake",
  63: "Twosome",
  64: "Pick up",
  71: '"Uneasy Hearts Weigh the Most" band, to fans',
  72: '"___ amis"',
  74: "More physical counterpart of 16D",
  75: '"Feel me?" for a texter',
  76: "Dwelling",
  77: "Ice house: Var.",
  78: "Abbr. sometimes used when addressing mail",
  79: "Lunch and dinner",
  80: "Twofold",
  81: "Helper",
  82: "Stick around",
  83: '"Uh-uh"',
  84: "Prefix with corn or form",
  85: "Evaluate",
  86: "Ending for seven countries in Asia",
  87: "Nittany Lions' sch.",
  89: "Govt.-issued ID",
  90: "Alternative to the ACT",
  92: "___ Manchu, title character of 5 Christopher Lee films",
  94: "How some boxing matches end",
};

export const acrossAnswers: Record<number, string> = {
  1: "SHRIVEL",
  8: "ALTO",
  12: "BOITANO",
  13: "TARRARE",
  17: "MERCY",
  18: "LICENSE",
  19: "SILICONVALLEY",
  22: "UC",
  23: "PI",
  24: "BAN",
  25: "OGO",
  28: "GIF",
  30: "NSA",
  32: "THECLUB",
  36: "ADIDAS",
  38: "CAMBODIA",
  39: "RELIT",
  40: "SI",
  41: "MBA",
  42: "DM",
  43: "ALICIA",
  45: "SEA",
  46: "MP",
  48: "OON",
  49: "ALE",
  51: "ELK",
  53: "NNW",
  54: "DRIVEN",
  57: "LEA",
  58: "DAG",
  60: "HOMEEC",
  61: "DAREDEVIL",
  65: "ORNI",
  66: "SERUM",
  67: "ME",
  68: "NAYS",
  69: "ENRON",
  70: "MADMEN",
  73: "EMERGENCY",
  76: "HIDEANDSEEK",
  78: "COG",
  80: "DOULAS",
  83: "NURSE",
  87: "PU",
  88: "SUITS",
  90: "SONATA",
  91: "SAFE",
  93: "DASKAPITAL",
  95: "ULU",
  96: "KEYNOTE",
  97: "ENS",
};

export const downAnswers: Record<number, string> = {
  1: "SB",
  2: "HOMICIDE",
  3: "RIEL",
  4: "ITRIP",
  5: "VACCINATION",
  6: "ENYO",
  7: "LO",
  8: "ATLANTA",
  9: "LAIL",
  10: "TRCL",
  11: "OREE",
  14: "ANYOLD",
  15: "RS",
  16: "EE",
  19: "SUGAR",
  20: "NBA",
  21: "VA",
  26: "GUIDE",
  27: "OBAMA",
  29: "FILA",
  31: "SS",
  33: "HMM",
  34: "EBB",
  35: "COA",
  37: "DIL",
  38: "CIA",
  40: "SINWAV",
  44: "CONDEMNED",
  45: "SEVERANCE",
  46: "MELD",
  47: "PLEASE",
  49: "ARO",
  50: "LIMONENE",
  52: "KAREN",
  54: "DH",
  55: "EENY",
  56: "NCIS",
  59: "GIMMEA",
  62: "ERR",
  63: "DUO",
  64: "LEARN",
  71: "DGD",
  72: "MES",
  74: "ME",
  75: "YK",
  76: "HOUSE",
  77: "IGLU",
  78: "CO",
  79: "MEALS",
  80: "DUAL",
  81: "AIDE",
  82: "STAY",
  83: "NOPE",
  84: "UNI",
  85: "RATE",
  86: "STAN",
  87: "PSU",
  89: "SSN",
  90: "SAT",
  92: "FU",
  94: "KO",
};

const PUZZLEJS_HASH_SALT = "PuzzleJS";
const textHash = computePuzzleJsTextHashFromSolution(
  gridDef,
  extracted,
  acrossAnswers,
  downAnswers,
  PUZZLEJS_HASH_SALT,
);

export const inPersonBody = (
  <div>
    <div className="w-full space-y-4 text-center">
      <i>
        Something is hidden episodically in this grid...
        <br />
      </i>
      2-16, 4-11, 3-10 [S], 1-6, 3-10 [D], 3-10 [A], 3-2, 2-6, 1-7, 6-16, 1-6,
      7-8, 1-8
    </div>

    <div className="mx-auto flex flex-col items-start justify-center gap-4 md:flex-row md:gap-8">
      <div className="relative">
        <PuzzlePlayer
          puzzleId={puzzleId}
          className="crossword-sparse"
          puzzleData={{
            "data-text": gridDef,
            "data-fill-classes": "no-fill rebus-cell",
            "data-fills": fillsDef,
            "data-fill-cycle": false,
            ...(textHash
              ? {
                  "data-hash-salt": PUZZLEJS_HASH_SALT,
                  "data-text-hashes": textHash,
                }
              : {}),
          }}
          options={{
            mode: "crossword",
            dataAttrs: { "data-show-commands": "true" },
          }}
        />
      </div>

      <CrosswordCluesClient
        puzzleId={puzzleId}
        across={displayedAcross}
        down={displayedDown}
        acrossClues={acrossClues}
        downClues={downClues}
      />
    </div>
  </div>
);

export const remoteBody = inPersonBody;
export const solutionBody = null;
export const authors = null;
export const copyText = null;
export const partialSolutions: Record<string, string> = {};
export const tasks: Record<string, JSX.Element> = {};
