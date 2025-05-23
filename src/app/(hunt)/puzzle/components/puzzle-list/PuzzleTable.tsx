"use client";
import { Round, META_PUZZLES } from "~/hunt.config";

type puzzleList = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
}[];

export default function PuzzleTable({
  availableRounds,
  availablePuzzles,
  solvedPuzzles,
}: {
  availableRounds: Round[];
  availablePuzzles: puzzleList;
  solvedPuzzles: { puzzleId: string }[];
}) {
  return (
    <div>
      {availableRounds.map((round) => (
        <div key={round.name}>
          <h2 className="m-1 pb-2 pt-4 text-center text-xl font-semibold">
            {round.name}
          </h2>
          <div className="w-full overflow-hidden rounded-md text-sm font-medium">
            <div className="grid grid-cols-2 p-2">
              <p className="text-secondary-text">Puzzle</p>
              <p className="text-secondary-text">Answer</p>
            </div>
            {availablePuzzles
              .filter((puzzle) => round.puzzles.includes(puzzle.id))
              .sort((puzzleA, puzzleB) =>
                META_PUZZLES.includes(puzzleA.id)
                  ? META_PUZZLES.includes(puzzleB.id)
                    ? puzzleA.name.localeCompare(puzzleB.name)
                    : -1
                  : META_PUZZLES.includes(puzzleB.id)
                    ? 1
                    : puzzleA.name.localeCompare(puzzleB.name),
              )
              .map((puzzle) => (
                <div key={puzzle.id}>
                  <hr className="w-full" />
                  <a
                    href={`/puzzle/${puzzle.id}`}
                    className="grid grid-cols-2 p-2 transition-all hover:bg-white/5"
                  >
                    <p>{puzzle.name.trim() ? puzzle.name : "\u200b"}</p>
                    {solvedPuzzles.some((sp) => sp.puzzleId === puzzle.id) && (
                      <p className="truncate text-ellipsis text-correct-guess">
                        {puzzle.answer}
                      </p>
                    )}
                  </a>
                </div>
              ))}
            <hr className="w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
