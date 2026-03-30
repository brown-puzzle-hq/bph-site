"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { formatDuration } from "~/lib/time";

export type TeamPuzzleStats = {
  team: {
    displayName: string;
  };
  guesses: number;
  unlockTime: Date | null;
  solveTime: Date | null;
};

function formatTime(time: Date | null) {
  if (!time) return "-";
  return time.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDurationCell(deltaMs: number | null) {
  if (deltaMs == null) return "-";
  return formatDuration(deltaMs);
}

// Define the columns for the table using TanStack
export const columns: ColumnDef<TeamPuzzleStats>[] = [
  {
    accessorKey: "teamDisplayName",
    header: ({ column }) => (
      <div className="flex w-32 items-center space-x-1">
        <p>Team</p>

        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4 stroke-[2.75]" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4 stroke-[2.75]" />
        ) : (
          <ChevronsUpDown className="size-4 stroke-[2.75]" />
        )}
      </div>
    ),
    accessorFn: (row) => row.team.displayName,
    cell: ({ row }) => (
      <div className="w-32 truncate">{row.getValue("teamDisplayName")}</div>
    ),
  },
  {
    accessorKey: "guesses",
    header: ({ column }) => (
      <div className="flex w-28 items-center space-x-1">
        <p>Guesses</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4 stroke-[2.75]" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4 stroke-[2.75]" />
        ) : (
          <ChevronsUpDown className="size-4 stroke-[2.75]" />
        )}
      </div>
    ),
    cell: ({ row }) => <div className="w-8">{row.getValue("guesses")}</div>,
  },
  {
    accessorKey: "unlockTime",
    header: ({ column }) => (
      <div className="flex w-28 items-center space-x-1">
        <p>Unlock Time</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4 stroke-[2.75]" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4 stroke-[2.75]" />
        ) : (
          <ChevronsUpDown className="size-4 stroke-[2.75]" />
        )}
      </div>
    ),
    cell: ({ row }) => formatTime(row.getValue("unlockTime")),
    sortingFn: "datetime",
  },
  {
    accessorKey: "solveTime",
    header: ({ column }) => (
      <div className="flex w-28 items-center space-x-1">
        <p>Solve Time</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4 stroke-[2.75]" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4 stroke-[2.75]" />
        ) : (
          <ChevronsUpDown className="size-4 stroke-[2.75]" />
        )}
      </div>
    ),
    cell: ({ row }) => formatTime(row.getValue("solveTime")),
    sortingFn: "datetime",
  },
  {
    accessorKey: "delta",
    accessorFn: (row) =>
      row.solveTime && row.unlockTime
        ? row.solveTime.getTime() - row.unlockTime.getTime()
        : null,
    header: ({ column }) => (
      <div className="flex w-fit items-center space-x-1 text-nowrap">
        <p>Solve Duration</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4 stroke-[2.75]" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4 stroke-[2.75]" />
        ) : (
          <ChevronsUpDown className="size-4 stroke-[2.75]" />
        )}
      </div>
    ),
    cell: ({ row }) => formatDurationCell(row.getValue("delta")),
  },
];
