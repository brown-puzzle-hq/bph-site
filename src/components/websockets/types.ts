// Types of websocket messages
export type SocketMessage =
  | { type: "SolvedPuzzle"; puzzleName: string; puzzleId: string }
  | { type: "UnlockedPuzzle"; puzzleName: string; puzzleId: string }
  | { type: "Toast"; title: string; description: string };
