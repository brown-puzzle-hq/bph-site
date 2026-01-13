import Link from "next/link";
import { Round, META_PUZZLES } from "~/hunt.config";
import { AvailablePuzzle } from "@/puzzle/page";

export default function PuzzleTable({
  availableRounds,
  availablePuzzles,
}: {
  availableRounds: Round[];
  availablePuzzles: AvailablePuzzle[];
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
                  <Link
                    href={`/puzzle/${puzzle.id}`}
                    className="grid grid-cols-2 p-2 transition-all hover:bg-white/5"
                    prefetch={false}
                  >
                    <p>{puzzle.name.trim() ? puzzle.name : "\u200b"}</p>
                    {puzzle.answer !== null && (
                      <p className="truncate text-ellipsis text-correct-guess">
                        {puzzle.answer}
                      </p>
                    )}
                  </Link>
                </div>
              ))}
            <hr className="w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
