"use client";
import { ColumnDef } from "@tanstack/react-table";
import { teams } from "~/server/db/schema";
import { ChevronsUpDown, ArrowUp, ArrowDown, Check, X } from "lucide-react";
import { FormattedTime } from "~/lib/time";

// Define the columns for the table using TanStack
export const columns: ColumnDef<typeof teams.$inferSelect>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="flex w-[200px] items-center space-x-2">
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
      <div className="w-44 truncate">
        <a
          className="text-blue-500 hover:underline"
          href={`/teams/${row.getValue("id")}`}
        >
          {row.getValue("id")}
        </a>
      </div>
    ),
  },
  // TODO: figure out how to get this column to fill available space, if any
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <div className="flex w-[36em] items-center space-x-2">
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
      <div className="flex w-20 items-center space-x-2">
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
    accessorKey: "interactionMode",
    header: ({ column }) => (
      <div className="flex w-20 items-center space-x-2">
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
  },
  {
    accessorKey: "hasBox",
    header: ({ column }) => (
      <div className="flex w-fit items-center space-x-2">
        <p>Box</p>
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
      return (
        <p className="flex justify-center text-neutral-500">
          {row.getValue("hasBox") ? (
            <Check className="size-5" />
          ) : (
            <X className="size-5" />
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "createTime",
    header: ({ column }) => (
      <div className="flex w-36 items-center space-x-2">
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
      <div className="flex w-36 items-center space-x-2">
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
