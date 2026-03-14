import { type GameProps } from "./Game";

export const puzzleId = "one-guard-no-doors";

/** Move-count thresholds for games 1–7;
 * meeting one records "threshold met" and unlocks the next puzzle in order */
export const ONE_GUARD_THRESHOLDS = [11, 1, 11, 1, 3, 5, 12] as const;

const game1: GameProps = {
  gameIndex: 0,
  height: 5,
  width: 5,
  blackWalls: [
    [3, 4],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 9],
    [10, 11],
    [11, 12],
    [12, 13],
    [13, 14],
    [15, 16],
    [16, 17],
    [17, 18],
    [18, 23],
  ],
  pinkWalls: [
    [2, 7],
    [15, 20],
    [16, 21],
    [22, 23],
  ],
  blueSquares: [],
  orangeSquares: [],
  startSquare: 11,
  guardStartSquare: 4,
};

const game2: GameProps = {
  gameIndex: 1,
  height: 5,
  width: 5,
  blackWalls: [
    [8, 13],
    [8, 9],
    [15, 16],
    [18, 19],
    [16, 21],
    [18, 23],
  ],
  pinkWalls: [[13, 14]],
  blueSquares: [14, 15, 18, 20, 21],
  orangeSquares: [6, 7, 9, 11, 19],
  startSquare: 16,
  guardStartSquare: 7,
};

const game3: GameProps = {
  gameIndex: 2,
  height: 5,
  width: 5,
  blackWalls: [
    [3, 8],
    [6, 7],
    [6, 11],
    [7, 12],
    [11, 12],
    [12, 13],
    [10, 15],
    [16, 17],
    [13, 18],
    [16, 21],
  ],
  pinkWalls: [[2, 7]],
  blueSquares: [4, 6, 8, 14, 15, 18, 20, 24],
  orangeSquares: [],
  startSquare: 16,
  guardStartSquare: 13,
};

const game4: GameProps = {
  gameIndex: 3,
  height: 5,
  width: 5,
  blackWalls: [
    [1, 6],
    [2, 7],
    [3, 8],
    [15, 16],
    [16, 21],
  ],
  pinkWalls: [
    [6, 7],
    [6, 11],
    [8, 9],
    [11, 12],
    [11, 16],
  ],
  blueSquares: [0, 6, 8, 10, 18, 21],
  orangeSquares: [2, 3, 13, 17],
  startSquare: 16,
  guardStartSquare: 13,
};

const game5: GameProps = {
  gameIndex: 4,
  height: 5,
  width: 5,
  blackWalls: [
    [4, 9],
    [10, 11],
    [22, 23],
  ],
  pinkWalls: [
    [5, 6],
    [5, 10],
    [7, 8],
    [8, 9],
    [8, 13],
    [13, 18],
    [17, 18],
    [18, 23],
  ],
  blueSquares: [],
  orangeSquares: [],
  startSquare: 16,
  guardStartSquare: 0,
};

const game6: GameProps = {
  gameIndex: 5,
  height: 5,
  width: 5,
  blackWalls: [
    [12, 13],
    [17, 18],
  ],
  pinkWalls: [[1, 6]],
  blueSquares: [7, 13],
  orangeSquares: [3, 9, 11],
  startSquare: 16,
  guardStartSquare: 8,
};

const game7: GameProps = {
  gameIndex: 6,
  height: 5,
  width: 5,
  blackWalls: [
    [2, 7],
    [7, 8],
    [8, 9],
    [10, 11],
    [12, 13],
    [13, 14],
  ],
  pinkWalls: [
    [2, 3],
    [3, 4],
    [10, 15],
    [12, 17],
  ],
  blueSquares: [8, 11, 13, 15, 19, 22],
  orangeSquares: [5, 16, 17, 18],
  startSquare: 15,
  guardStartSquare: 5,
};

const game8: GameProps = {
  gameIndex: 7,
  height: 5,
  width: 5,
  blackWalls: [],
  pinkWalls: [],
  blueSquares: [],
  orangeSquares: [18],
  startSquare: 16,
  guardStartSquare: 5,
};

export const allGames: GameProps[] = [
  game1,
  game2,
  game3,
  game4,
  game5,
  game6,
  game7,
  game8,
];

// inPersonBody and remoteBody are specified in page.tsx

export const solutionBody = null;

export const authors = null;

export const copyText = null;

export const partialSolutions: Record<string, string> = {};

export const tasks: Record<string, JSX.Element> = {};
