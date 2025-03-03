"use client";
import { ColumnDef } from "@tanstack/react-table";
import { teams } from "~/server/db/schema";
import { ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react";
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
      <div className="w-44 truncate">{row.getValue("id")}</div>
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
    cell: ({ row }) => {
      const role = row.getValue("role") as string;

      const bgColor =
        role == "user"
          ? "bg-sky-200"
          : role == "admin"
            ? "bg-emerald-200"
            : "bg-violet-200";

      const textColor =
        role == "user"
          ? "text-sky-900"
          : role == "admin"
            ? "text-emerald-900"
            : "text-violet-900";

      return (
        <div className="inline-block">
          <div className={`inline-flex rounded-sm ${bgColor} px-1 py-0.5`}>
            <span className={`font-medium ${textColor}`}>{role}</span>
          </div>
        </div>
      );
    },
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
    cell: ({ row }) => {
      const interactionMode = row.getValue("interactionMode") as string;

      const bgColor =
        interactionMode == "remote"
          ? "bg-lime-200"
          : interactionMode == "in-person"
            ? "bg-orange-200"
            : "bg-gray-200";

      const textColor =
        interactionMode == "remote"
          ? "text-lime-900"
          : interactionMode == "in-person"
            ? "text-orange-900"
            : "text-gray-900";

      return (
        <div className="inline-block whitespace-nowrap">
          <div className={`inline-flex rounded-sm ${bgColor} px-1 py-0.5`}>
            <span className={`font-medium ${textColor}`}>
              {interactionMode}
            </span>
          </div>
        </div>
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
