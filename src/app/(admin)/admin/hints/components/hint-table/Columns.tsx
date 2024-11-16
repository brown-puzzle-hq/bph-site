"use client";

import { ColumnDef } from "@tanstack/react-table";
import { hints } from "~/server/db/schema";
import HintStatusBox from "./HintStatusBox";

export function formatTime(time: unknown) {
  if (!(time instanceof Date)) {
    return "";
  }
  return time.toLocaleString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export type HintClaimer = { id: string; displayName: string } | null;

export type HintWithRelations = typeof hints.$inferSelect & {
  team: { displayName: string };
  claimer: HintClaimer;
  puzzle: { name: string };
};

// Define the columns for the table using TanStack
export const columns: ColumnDef<HintWithRelations>[] = [
  {
    accessorKey: "id",
    header: () => <div className="w-16">Id</div>,
    cell: ({ row }) => (
      <div className="w-16 truncate">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "puzzleName",
    header: () => <div className="w-32">Puzzle</div>,
    accessorFn: (row) => row.puzzle.name,
  },
  {
    accessorKey: "teamDisplayName",
    header: () => <div className="w-32">Team</div>,
    accessorFn: (row) => row.team!.displayName,
  },
  {
    accessorKey: "request",
    header: () => <div className="w-[42em]">Request</div>,
    cell: ({ row }) => (
      <div className="w-[42em] truncate">{row.getValue("request")}</div>
    ),
  },
  {
    accessorKey: "requestTime",
    header: () => <div className="w-32">Request Time</div>,
    cell: ({ row }) => {
      const time = row.getValue("requestTime");
      return (
        <div className="w-32 truncate font-medium">{formatTime(time)}</div>
      );
    },
  },
  {
    accessorKey: "claimer",
    header: () => <div className="w-32">Status</div>,
    cell: ({ row }) => (
      <div className="w-24 truncate">
        <HintStatusBox row={row} />
      </div>
    ),
  },
  {
    accessorKey: "responseTime",
    header: () => null,
  },
  {
    accessorKey: "status",
    header: () => null,
  },
];
