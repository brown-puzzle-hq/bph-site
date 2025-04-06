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

import { roleEnum, interactionModeEnum } from "~/server/db/schema";
import { EditableFields, EditedTeam, updateTeam } from "../../actions";
import { cn } from "~/lib/utils";

const colorMap: Record<string, string> = {
  user: "bg-sky-200 text-sky-900",
  admin: "bg-emerald-200 text-emerald-900",
  testsolver: "bg-violet-200 text-violet-900",
  remote: "bg-lime-200 text-lime-900",
  "in-person": "bg-orange-200 text-orange-900",
  true: "bg-emerald-200 text-emerald-900",
  false: "bg-red-200 text-red-900",
};

export const editableFieldKeys = ["role", "interactionMode", "hasBox"];

export type EditedRow = {
  [K in keyof EditableFields]?: {
    new: EditableFields[K];
    old: EditableFields[K];
  };
};

interface TeamTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TeamTable<TData, TValue>({
  columns,
  data,
}: TeamTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createTime", desc: true },
  ]);
  const [isCompact, setIsCompact] = useState(true);
  useEffect(() => {
    setIsCompact(getCookie("compact") !== "false");
  }, []);
  const pageSize = 100;

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
      columnVisibility: {
        responseTime: false,
      },
      sorting: [
        {
          id: "createTime",
          desc: true,
        },
      ],
    },
    pageCount: Math.ceil(data.length / pageSize),
  });

  const [editedRows, setEditedRows] = useState<Record<string, EditedRow>>({});

  function handleEditRow<F extends keyof EditableFields>(
    teamId: string,
    field: F,
    cellValue: any,
  ) {
    setEditedRows((prev) => {
      const options: any[] =
        field === "role"
          ? roleEnum.enumValues
          : field === "interactionMode"
            ? interactionModeEnum.enumValues
            : field === "hasBox"
              ? ["true", "false"]
              : [];

      const prevEdits = prev[teamId] ?? {};
      const oldValue = prevEdits[field]?.old ?? cellValue;

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
    const editedTeams: Record<string, EditedTeam> = Object.entries(
      editedRows,
    ).reduce((acc: Record<string, EditedTeam>, [teamId, fields]) => {
      acc[teamId] = Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [key, value.new]),
      ) as EditedTeam;
      return acc;
    }, {});
    await updateTeam(editedTeams);
    // TODO: avoid flash some other way
    setTimeout(() => setEditedRows({}), 30);
  };

  return (
    <>
      <div className="w-screen px-4 xl:px-12">
        {/* Controls */}
        <div className="flex items-center justify-between space-x-2 pb-2 text-neutral-500">
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

          <div className="flex items-center space-x-2">
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
                      if (editableFieldKeys.includes(columnId)) {
                        const field = columnId as keyof EditableFields;
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
