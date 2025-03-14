"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, Table } from "lucide-react";
import PuzzleTable from "../puzzle/components/PuzzleTable";
import EventTable from "../puzzle/components/EventTable";
import Map from "./Map";
import { useState, useMemo } from "react";

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
  const [activeTab, setActiveTab] = useState("map");
  const memoizedMap = useMemo(
    () => (
      <Map availablePuzzles={availablePuzzles} solvedPuzzles={solvedPuzzles} />
    ),
    [],
  );

  return (
    <Tabs defaultValue="map" onValueChange={setActiveTab}>
      <TabsList className="fixed right-0 z-20 m-2 space-x-1 bg-footer-bg py-5 text-[#6c518e]">
        {/* Icons */}
        <TabsTrigger
          className="data-[state=active]:bg-[#5e437e] data-[state=active]:text-main-text"
          value="map"
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

      {/* Map content */}
      <div className={activeTab === "map" ? "block" : "hidden"}>
        {memoizedMap}
      </div>

      {/* Table conent */}
      <div className={activeTab === "tables" ? "block" : "hidden"}>
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
    </Tabs>
  );
}
