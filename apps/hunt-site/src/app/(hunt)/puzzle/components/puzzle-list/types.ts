export type AvailablePuzzle = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string | null;
};

export type AvailableEvent = {
  id: string;
  name: string;
  answer: string | null;
  spent: boolean;
  description: string;
  startTime: string;
};

export type PuzzleListRound = {
  name: string;
  id: string;
  totalPuzzles: number;
  unlockedPuzzles: number;
  solvedPuzzles: number;
};
