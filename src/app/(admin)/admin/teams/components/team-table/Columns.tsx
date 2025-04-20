"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  Waypoints,
  Trophy,
  Puzzle,
} from "lucide-react";
import { FormattedTime } from "~/lib/time";
import { ActualInteractionMode } from "~/server/db/schema";

export type TeamTableRow = {
  rank: number | null;
  id: string;
  displayName: string;
  role: string;
  actualInteractionMode: ActualInteractionMode;
  createTime: Date;
  finishTime: Date | null;
};

// Define the columns for the table using TanStack
export const columns: ColumnDef<TeamTableRow>[] = [
  {
    accessorKey: "rank",
    header: ({}) => <Trophy className="mx-auto size-4" />,
    cell: ({ row }) => {
      const rank: number = row.getValue("rank");
      return <p className="text-center">{rank ?? "-"}</p>;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const valA: number | null = rowA.getValue(columnId);
      const valB: number | null = rowB.getValue(columnId);
      if (valA === null && valB === null) return 0;
      if (valA === null) return 1;
      if (valB === null) return -1;
      return valA - valB;
    },
  },
  {
    accessorKey: "solves",
    header: () => <Puzzle className="mx-auto size-4" />,
    cell: ({ row }) => {
      const solves: number = row.getValue("solves");
      return <p className="text-center">{solves > 0 ? solves : "-"}</p>;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const valA: number | null = rowA.getValue(columnId);
      const valB: number | null = rowB.getValue(columnId);
      if (valA === null && valB === null) return 0;
      if (valA === null) return 1;
      if (valB === null) return -1;
      return valB - valA;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="flex w-[200px] items-center space-x-0.5">
        <p>ID</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex w-[200px] items-center space-x-1">
        <a
          className="truncate text-blue-500 hover:underline"
          href={`/teams/${row.getValue("id")}`}
        >
          {row.getValue("id")}
        </a>
        <a
          href={`/admin/graph?team=${row.getValue("id")}`}
          className="hover:opacity-85"
        >
          <Waypoints className="size-4 text-orange-500" />
        </a>
      </div>
    ),
  },
  // TODO: figure out how to get this column to fill available space, if any
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <div className="flex w-[36em] items-center space-x-0.5">
        <p>Display Name</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-[36em] truncate">{row.getValue("displayName")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="flex w-20 items-center space-x-0.5">
        <p>Role</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "actualInteractionMode",
    header: ({ column }) => (
      <div className="flex w-20 items-center space-x-0.5">
        <p>Mode</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    filterFn: (row, id, filterValue: string[]) =>
      filterValue.includes(row.getValue(id)),
  },
  {
    accessorKey: "createTime",
    header: ({ column }) => (
      <div className="flex w-36 items-center space-x-0.5">
        <p>Create Time</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => {
      const time: Date = row.getValue("createTime");
      return <FormattedTime time={time} />;
    },
  },
  {
    accessorKey: "finishTime",
    header: ({ column }) => (
      <div className="flex w-36 items-center space-x-0.5">
        <p>Finish Time</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => {
      const time: Date = row.getValue("finishTime");
      return <FormattedTime time={time} />;
    },
  },
];
