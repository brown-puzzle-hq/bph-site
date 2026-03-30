import EventTable from "./event/EventTable";
import { AvailableEvent } from "./puzzle-utils";
import Link from "next/link";
import { cn } from "~/lib/utils";
import SeenRoundIcon from "./SeenRoundIcon";

type PuzzleListRound = {
  name: string;
  totalPuzzles: number;
  unlockedPuzzles: number;
  solvedPuzzles: number;
  monitor: number[]; // Indices of puzzles to monitor for "seen" status
};

type PuzzleListPageProps = {
  availableRounds: PuzzleListRound[];
  availableEvents: AvailableEvent[];
  hasFinishedHunt: boolean;
  hasEventInputBox: boolean;
};

export default function PuzzleListPage({
  availableRounds,
  availableEvents,
  hasFinishedHunt,
  hasEventInputBox,
}: PuzzleListPageProps) {
  return (
    <div className="mx-auto mb-12 w-full max-w-3xl px-4 pt-6">
      {/* Puzzle table */}
      <h1 className="mb-2 text-center">Rounds</h1>
      <div className="overflow-hidden rounded-b-md text-sm font-medium">
        {availableRounds
          .sort((a, b) =>
            a.name === "Backpack" ? -1 : b.name === "Backpack" ? 1 : 0,
          )
          .map((round) => (
            <div key={round.name}>
              <Link
                href={`/puzzle/${round.name.toLowerCase().replace(/\s/g, "-")}`}
                className={cn(
                  "flex items-center justify-between p-2 transition-colors hover:bg-white/5",
                  round.name === "Backpack" && "bg-black/20 font-bold",
                )}
                prefetch={false}
              >
                <div className="flex space-x-2">
                  <p>{round.name}</p>
                  {round.monitor.length > 0 && (
                    <SeenRoundIcon monitor={round.monitor} />
                  )}
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: round.totalPuzzles }, (_, i) => {
                    const isUnlocked = i < round.unlockedPuzzles;
                    const isSolved = i < round.solvedPuzzles;
                    return (
                      <div
                        key={i}
                        className={cn(
                          "size-3 rounded-full",
                          isSolved
                            ? "bg-green-500"
                            : isUnlocked
                              ? "bg-yellow-500"
                              : "bg-slate-300",
                        )}
                      />
                    );
                  })}
                </div>
              </Link>
              <hr />
            </div>
          ))}
      </div>
      {/* Event table */}
      {availableEvents.length > 0 && (
        <>
          <h1 className="mb-2 mt-4 text-center">Events</h1>
          <EventTable
            availableEvents={availableEvents}
            inputBox={hasEventInputBox}
          />
          <hr />
        </>
      )}
    </div>
  );
}
