import PuzzleTable from "./PuzzleTable";
import EventTable from "./event/EventTable";
import { IN_PERSON } from "@/config/client";
import { type Round } from "@/config/server";
import { AvailablePuzzle, AvailableEvent } from "@/puzzle/page";

type PuzzleListPageProps = {
  availablePuzzles: AvailablePuzzle[];
  availableRounds: Round[];
  availableEvents: AvailableEvent[];
  hasEventInputBox: boolean;
  hasFinishedHunt: boolean;
  isInPerson: boolean;
};

export default function PuzzleListPage({
  availablePuzzles,
  availableRounds,
  availableEvents,
  hasEventInputBox,
  hasFinishedHunt,
  isInPerson,
}: PuzzleListPageProps) {
  return (
    <div className="mx-auto mb-12 flex w-full max-w-3xl flex-col items-center px-4 pt-6">
      <h1 className="mb-2">Puzzles</h1>
      {/* Puzzle table */}
      <div className="w-full">
        <PuzzleTable
          availableRounds={availableRounds}
          availablePuzzles={availablePuzzles}
        />
      </div>

      {/* Event table */}
      {isInPerson && new Date() > IN_PERSON.START_TIME && (
        <>
          <h1 className="mb-2 mt-4">Events</h1>
          <EventTable
            availableEvents={availableEvents}
            inputBox={hasEventInputBox}
          />
        </>
      )}
    </div>
  );
}
