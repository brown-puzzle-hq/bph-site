"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, RefreshCw, Table } from "lucide-react";
import PuzzleTable from "./PuzzleTable";
import EventTable from "./EventTable";
import { useState, useMemo } from "react";
import { getCookie, setCookie } from "typescript-cookie";
import { cn } from "~/lib/utils";
import dynamic from "next/dynamic";
import { IN_PERSON, Round } from "~/hunt.config";

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <RefreshCw className="size-40 animate-spin opacity-30" />
    </div>
  ),
});

export type AvailablePuzzle = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
};

export type SolvedPuzzle = { puzzleId: string };

export type AvailableEvent = {
  id: string;
  name: string;
  answer: string;
  description: string;
  startTime: string;
};

export type FinishedEvent = {
  eventId: string;
  puzzleId: string | null;
};

type PuzzleListPageProps = {
  availablePuzzles: AvailablePuzzle[];
  solvedPuzzles: SolvedPuzzle[];
  availableRounds: Round[];
  availableEvents: AvailableEvent[];
  finishedEvents: FinishedEvent[];
  hasEventInputBox: boolean;
  hasFinishedHunt: boolean;
  isInPerson: boolean;
};

export default function PuzzleListPage({
  availablePuzzles,
  solvedPuzzles,
  availableRounds,
  availableEvents,
  finishedEvents,
  hasEventInputBox,
  hasFinishedHunt,
  isInPerson,
}: PuzzleListPageProps) {
  const [activeTab, setActiveTab] = useState(
    () => getCookie("puzzle_view") ?? "map",
  );
  const [needMap, setNeedMap] = useState(activeTab === "map");

  const memoizedMap = useMemo(
    () => (
      <Map
        availablePuzzles={availablePuzzles}
        solvedPuzzles={solvedPuzzles}
        availableRounds={availableRounds}
      />
    ),
    [availablePuzzles, solvedPuzzles, availableRounds],
  );

  return (
    <div className="grid min-h-[calc(100vh-56px-32px)]">
      <Tabs
        defaultValue={getCookie("puzzle_view") ?? "map"}
        onValueChange={(value) => {
          setActiveTab(value);
          setNeedMap(true);
          setCookie("puzzle_view", value);
        }}
        className="col-start-1 row-start-1"
      >
        <TabsList className="fixed right-0 z-20 m-2 flex h-fit flex-col space-y-1 bg-footer-bg text-[#6c518e] md:flex-row md:space-x-1 md:space-y-0">
          {/* Icons */}
          <TabsTrigger
            className="data-[state=active]:bg-[#5e437e] data-[state=active]:text-main-text"
            value="map"
            onMouseEnter={() => setNeedMap(true)}
          >
            <MapIcon />
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#5e437e] data-[state=active]:text-main-text"
            value="tables"
          >
            <Table />
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Map content */}
      {needMap && (
        <div className={"col-start-1 row-start-1"}>{memoizedMap}</div>
      )}

      {/* Table content */}
      <div
        className={cn(
          "z-10 col-start-1 row-start-1 hidden bg-main-bg bg-gradient-to-t from-[#872C3E] to-main-bg",
          activeTab === "tables" && "block",
        )}
      >
        <div className="mx-auto mb-6 flex w-full max-w-3xl grow flex-col items-center p-4 pt-6">
          <h1 className="mb-2">Puzzles</h1>

          {hasFinishedHunt && (
            <div>
              <p className="text-base italic text-main-text">
                You won the Bloscar! Congratulations on completing BPH 2025!{" "}
                {isInPerson && new Date() < IN_PERSON.END_TIME
                  ? "Please contact HQ at brownpuzzlehq@gmail.com for runaround."
                  : ""}
              </p>
            </div>
          )}

          {/* Puzzle table */}
          <PuzzleTable
            availableRounds={availableRounds}
            availablePuzzles={availablePuzzles}
            solvedPuzzles={solvedPuzzles}
          />

          {/* Event table */}
          {isInPerson && new Date() > IN_PERSON.START_TIME && (
            <>
              <h1 className="mb-2 mt-4">Events</h1>
              <EventTable
                availableEvents={availableEvents}
                finishedEvents={finishedEvents}
                inputBox={hasEventInputBox}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
