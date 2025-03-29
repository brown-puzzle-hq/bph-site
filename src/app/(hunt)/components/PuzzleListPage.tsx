"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, RefreshCw, Table } from "lucide-react";
import PuzzleTable from "../puzzle/components/PuzzleTable";
import EventTable from "../puzzle/components/EventTable";
import { useState, useMemo, useEffect } from "react";
import { getCookie, setCookie } from "typescript-cookie";
import { cn } from "~/lib/utils";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <RefreshCw className="size-40 animate-spin opacity-30" />
    </div>
  ),
});

type PuzzleListPageProps = {
  availablePuzzles: any;
  solvedPuzzles: any;
  availableRounds: any;
  canSeeEvents: any;
  availableEvents: any;
  finishedEvents: any;
  hasEventInputBox: boolean;
};

export default function PuzzleListPage({
  availablePuzzles,
  solvedPuzzles,
  availableRounds,
  canSeeEvents,
  availableEvents,
  finishedEvents,
  hasEventInputBox,
}: PuzzleListPageProps) {
  const [activeTab, setActiveTab] = useState(() => getCookie("puzzle_view") ?? "map");
  const [needMap, setNeedMap] = useState(activeTab === "map");

  // Will crash on mobile if not memoized
  const memoizedMap = useMemo(
    () => (
      <Map availablePuzzles={availablePuzzles} solvedPuzzles={solvedPuzzles} />
    ),
    [availablePuzzles, solvedPuzzles],
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

      {/* Table conent */}
      <div
        className={cn(
          "z-10 col-start-1 row-start-1 hidden bg-main-bg bg-gradient-to-t from-[#872C3E] to-main-bg",
          activeTab === "tables" && "block",
        )}
      >
        <div className="mx-auto mb-6 flex w-full max-w-3xl grow flex-col items-center p-4 pt-6">
          <h1 className="mb-2">Puzzles</h1>

          {/* Puzzle table */}
          <PuzzleTable
            availableRounds={availableRounds}
            availablePuzzles={availablePuzzles}
            solvedPuzzles={solvedPuzzles}
          />

          {/* Event table */}
          {canSeeEvents && (
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
