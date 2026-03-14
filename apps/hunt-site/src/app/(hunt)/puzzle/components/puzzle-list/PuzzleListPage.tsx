import EventTable from "./event/EventTable";
import { type Round } from "@/config/server";
import { AvailableEvent } from "./puzzle-utils";
import Link from "next/link";

type PuzzleListPageProps = {
  availableRounds: Round[];
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
        <hr />
        {availableRounds.map((round) => (
          <div key={round.name}>
            <Link
              href={`/puzzle/${round.name.toLowerCase().replace(/\s/g, "-")}`}
              className="block p-2 transition-all hover:bg-white/5"
              prefetch={false}
            >
              {round.name}
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
        </>
      )}
    </div>
  );
}
