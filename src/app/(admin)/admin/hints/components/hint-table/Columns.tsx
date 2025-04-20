"use client";

import { ColumnDef, SortingFnOption } from "@tanstack/react-table";
import { hints } from "~/server/db/schema";
import HintStatusBox from "./HintStatusBox";
import { ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react";

export type HintClaimer = { id: string; displayName: string } | null;
export type FollowUpHint = { id: number; userId: string } | null;

export type HintWithRelations = typeof hints.$inferSelect & {
  team: { displayName: string };
  claimer: HintClaimer;
  followUps: FollowUpHint[];
  puzzle: { name: string };
};

function formatTime(time: Date) {
  return time.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// Define the columns for the table using TanStack
export const columns: ColumnDef<HintWithRelations>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="flex w-fit items-center space-x-1">
        <p>ID</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </div>
    ),
    accessorFn: (row) => row.id,
  },
  {
    accessorKey: "puzzleName",
    header: ({ column }) => (
      <div className="flex w-32 items-center space-x-1">
        <p>Puzzle</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </div>
    ),
    accessorFn: (row) => row.puzzle.name,
    cell: ({ row }) => (
      <div className="w-32 truncate">{row.getValue("puzzleName")}</div>
    ),
  },
  {
    accessorKey: "teamDisplayName",
    header: ({ column }) => (
      <div className="flex w-32 items-center space-x-1">
        <p>Team</p>

        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </div>
    ),
    accessorFn: (row) => row.team.displayName,
    cell: ({ row }) => (
      <div className="w-32 truncate">{row.getValue("teamDisplayName")}</div>
    ),
  },
  {
    accessorKey: "request",
    header: ({ column }) => (
      <div className="flex w-[46em] items-center space-x-1">
        <p>Request</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-[46em] truncate">{row.getValue("request")}</div>
    ),
  },
  {
    accessorKey: "requestTime",
    header: ({ column }) => (
      <div className="flex w-28 items-center space-x-1">
        <p>Time</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </div>
    ),
    cell: ({ row }) => formatTime(row.getValue("requestTime")),
    sortingFn: "datetime",
  },
  {
    accessorKey: "claimer",
    header: ({ column }) => (
      <div className="flex w-20 items-center space-x-1">
        <p>Status</p>

        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </div>
    ),
    sortingFn: "sortHintByStatus" as SortingFnOption<HintWithRelations>,
    cell: ({ row }) => <HintStatusBox row={row} />,
  },
  {
    accessorKey: "responseTime",
    header: () => null,
  },
  {
    accessorKey: "status",
    header: () => null,
  },
  {
    accessorKey: "followUps",
    header: () => null,
  },
  {
    accessorKey: "teamId",
    header: () => null,
  },
];
