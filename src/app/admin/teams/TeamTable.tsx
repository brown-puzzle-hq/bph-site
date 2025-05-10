"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Filter,
  Rows2,
  Rows4,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "~/components/ui/button";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getCookie, setCookie } from "typescript-cookie";
import {
  type ActualInteractionMode,
  actualInteractionModeValues,
  roleEnum,
} from "~/server/db/schema";
import { type EditedTeam, type Role, updateTeam } from "./actions";
import { cn } from "~/lib/utils";
import { Checkbox } from "~/components/ui/checkbox";

export const clientEditableFieldKeys = ["role", "actualInteractionMode"];

export type ClientEditableFields = {
  role: Role;
  actualInteractionMode: ActualInteractionMode;
};

const fieldToOptions: Record<keyof ClientEditableFields, string[]> = {
  role: roleEnum.enumValues,
  actualInteractionMode: actualInteractionModeValues,
};

export type ClientEditedRow = {
  [K in keyof ClientEditableFields]?: {
    new: ClientEditableFields[K];
    old: ClientEditableFields[K];
  };
};

interface TeamTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const colorMap: Record<string, string> = {
  user: "bg-sky-200 text-sky-900",
  admin: "bg-emerald-200 text-emerald-900",
  testsolver: "bg-violet-200 text-violet-900",
  remote: "bg-lime-200 text-lime-900",
  "remote-box": "bg-yellow-200 text-yellow-900",
  "in-person": "bg-orange-200 text-orange-900",
};

export function TeamTable<TData, TValue>({
  columns,
  data,
}: TeamTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "rank", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "actualInteractionMode",
      value: ["remote", "remote-box"],
    },
  ]);
  const [interactionModeFilters, setInteractionModeFilters] = useState<
    ActualInteractionMode[]
  >(["remote", "remote-box"]);

  const [isCompact, setIsCompact] = useState(true);
  useEffect(() => {
    setIsCompact(getCookie("compact") !== "false");
  }, []);
  const pageSize = 1000;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
      sorting: [
        {
          id: "rank",
          desc: false,
        },
      ],
      columnFilters: [
        {
          id: "actualInteractionMode",
          value: ["remote", "remote-box"],
        },
      ],
    },
    pageCount: Math.ceil(data.length / pageSize),
    filterFns: {
      interactionModeFilter: (
        row,
        id,
        filterValue: ActualInteractionMode[],
      ) => {
        if (filterValue.length === 0) return true;
        const mode = row.getValue(id) as ActualInteractionMode;
        return filterValue.includes(mode);
      },
    },
  });

  const [editedRows, setEditedRows] = useState<Record<string, ClientEditedRow>>(
    {},
  );

  useEffect(() => {
    setEditedRows({});
    if (interactionModeFilters.length === 0) {
      setColumnFilters(
        columnFilters.filter((filter) => filter.id !== "actualInteractionMode"),
      );
    } else {
      setColumnFilters((prev) => {
        const filtered = prev.filter(
          (filter) => filter.id !== "actualInteractionMode",
        );
        return [
          ...filtered,
          {
            id: "actualInteractionMode",
            value: interactionModeFilters,
          },
        ];
      });
    }
  }, [interactionModeFilters]);

  function handleEditRow<F extends keyof ClientEditableFields>(
    teamId: string,
    field: F,
    cellValue: any,
  ) {
    setEditedRows((prev) => {
      const prevEdits = prev[teamId] ?? {};
      const oldValue = prevEdits[field]?.old ?? cellValue;
      const options = fieldToOptions[field];
      const prevIndex = options.indexOf(prevEdits[field]?.new ?? cellValue);
      const nextIndex = (prevIndex + 1) % options.length;
      const newValue = options[nextIndex];

      // If the new value is the same as the original, remove the field
      // If no other fields are left, remove the team entirely
      if (newValue === oldValue) {
        const { [field]: _, ...rest } = prevEdits;
        const updatedTeamEdit = { ...rest };

        if (Object.keys(updatedTeamEdit).length === 0) {
          const { [teamId]: _, ...restTeams } = prev;
          return restTeams;
        }

        return {
          ...prev,
          [teamId]: updatedTeamEdit,
        };
      }

      // Otherwise, update the field
      return {
        ...prev,
        [teamId]: {
          ...prevEdits,
          [field]: {
            new: newValue,
            old: oldValue,
          },
        },
      };
    });
  }

  const handleSaveEdits = async () => {
    const editedTeams: Record<string, EditedTeam> = {};
    for (const teamId in editedRows) {
      for (const field in editedRows[teamId]) {
        const editedField =
          editedRows[teamId][field as keyof ClientEditableFields];
        if (!editedField) continue;

        const { new: newValue } = editedField;

        if (field === "actualInteractionMode") {
          editedTeams[teamId] = {
            ...editedTeams[teamId],
            interactionMode:
              newValue === "remote-box" || newValue === "remote"
                ? "remote"
                : "in-person",
            hasBox: newValue === "remote-box",
          };
          continue;
        }

        editedTeams[teamId] = {
          ...editedTeams[teamId],
          [field]: newValue,
        };
      }
    }

    await updateTeam(editedTeams);
    // TODO: avoid flash some other way
    setTimeout(() => setEditedRows({}), 30);
  };

  return (
    <>
      <div className="w-screen px-4 xl:px-12">
        {/* Controls */}
        <div className="grid w-full grid-cols-2 pb-2 text-neutral-500 sm:grid-cols-3">
          {/* Filter teams */}
          <div className="flex items-center space-x-2">
            <Filter className="size-5" />
            <input
              name="filterTeams"
              placeholder="Filter teams..."
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="border-b text-sm placeholder:text-neutral-300 focus:outline-none"
              autoComplete="off"
            />
          </div>

          {/* Filter by interactionMode */}
          <div className="mx-auto hidden items-center space-x-2 text-nowrap text-sm font-medium sm:flex">
            <p
              className={cn(
                !interactionModeFilters.includes("in-person") &&
                  "text-[#BBBBBB]",
              )}
            >
              In Person
            </p>
            <Checkbox
              checked={interactionModeFilters.includes("in-person")}
              onCheckedChange={(checked) => {
                setInteractionModeFilters((prev) =>
                  checked
                    ? [...prev, "in-person"]
                    : prev.filter((mode) => mode !== "in-person"),
                );
              }}
              className="border-[1.5px] border-[#BBBBBB] shadow-none data-[state=checked]:border-neutral-500 data-[state=checked]:bg-white data-[state=checked]:text-neutral-500"
            />

            <p
              className={cn(
                !interactionModeFilters.includes("remote") && "text-[#BBBBBB]",
              )}
            >
              Remote
            </p>
            <Checkbox
              checked={interactionModeFilters.includes("remote")}
              onCheckedChange={(checked) => {
                setInteractionModeFilters((prev) =>
                  checked
                    ? [...prev, "remote"]
                    : prev.filter((mode) => mode !== "remote"),
                );
              }}
              className="border-[1.5px] border-[#BBBBBB] shadow-none data-[state=checked]:border-neutral-500 data-[state=checked]:bg-white data-[state=checked]:text-neutral-500"
            />

            <p
              className={cn(
                !interactionModeFilters.includes("remote-box") &&
                  "text-[#BBBBBB]",
              )}
            >
              Remote Box
            </p>
            <Checkbox
              checked={interactionModeFilters.includes("remote-box")}
              onCheckedChange={(checked) => {
                setInteractionModeFilters((prev) =>
                  checked
                    ? [...prev, "remote-box"]
                    : prev.filter((mode) => mode !== "remote-box"),
                );
              }}
              className="border-[1.5px] border-[#BBBBBB] shadow-none data-[state=checked]:border-neutral-500 data-[state=checked]:bg-white data-[state=checked]:text-neutral-500"
            />
          </div>

          {/* Pagination */}
          <div className="ml-auto flex items-center space-x-2">
            <button
              className="hover:opacity-70"
              onClick={() => {
                setIsCompact(!isCompact);
                setCookie("compact", !isCompact);
              }}
            >
              {isCompact ? (
                <Rows2 className="size-5" />
              ) : (
                <Rows4 className="size-5" />
              )}
            </button>
            <button
              className="hover:opacity-70"
              onClick={() => table.previousPage()}
            >
              <SquareChevronLeft className="size-5" />
            </button>
            <button
              className="hover:opacity-70"
              onClick={() => table.nextPage()}
            >
              <SquareChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-y-auto rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={`header-${headerGroup.id}`}
                  className="hover:bg-inherit"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={() =>
                        header.column.toggleSorting(
                          header.column.getIsSorted() === "asc",
                        )
                      }
                      role="button"
                      className={cn(
                        "hover:text-opacity-70",
                        isCompact && "py-0",
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={
                      isCompact ? "py-0 hover:bg-inherit" : "hover:bg-inherit"
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      const columnId = cell.column.id;
                      const teamId = String(row.getValue("id"));
                      const cellValue = String(cell.getValue());

                      // Check whether column is editable
                      if (clientEditableFieldKeys.includes(columnId)) {
                        const field = columnId as keyof ClientEditableFields;
                        const currValue = String(
                          editedRows[teamId]?.[field]?.new ?? cellValue,
                        );

                        return (
                          <TableCell
                            key={cell.id}
                            className={isCompact ? "py-0" : undefined}
                          >
                            <button
                              className={cn(
                                colorMap[currValue],
                                "rounded-md px-1 font-medium outline-none transition-opacity",
                                Object.keys(editedRows).length &&
                                  !editedRows[teamId]?.[field] &&
                                  "opacity-50",
                                isCompact
                                  ? "py-0.25 flex items-center text-xs"
                                  : "py-0.5",
                              )}
                              onClick={() =>
                                handleEditRow(teamId, field, cellValue)
                              }
                            >
                              {currValue}
                            </button>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          key={cell.id}
                          className={isCompact ? "py-0" : undefined}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="pointer-events-none h-16 text-center font-medium text-neutral-500"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div
        className={`fixed bottom-3 left-1/2 z-10 flex w-full max-w-xl -translate-x-1/2 transform px-4 transition-transform duration-300 ${
          Object.keys(editedRows).length !== 0
            ? "translate-y-0"
            : "translate-y-[5rem]"
        }`}
      >
        <Alert className="w-full border-0 bg-slate-900/75 p-2 shadow-lg">
          <div className="flex items-center justify-between">
            <AlertDescription className="flex items-center space-x-2 text-white">
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:block">
                Careful — you have unsaved changes!
              </span>
              <span className="sm:hidden">Unsaved changes!</span>
            </AlertDescription>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setEditedRows({})}>
                Reset
              </Button>
              <Button onClick={handleSaveEdits}>Save</Button>
            </div>
          </div>
        </Alert>
      </div>
    </>
  );
}
