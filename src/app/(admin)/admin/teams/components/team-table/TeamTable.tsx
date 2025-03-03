"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Filter,
  Rows2,
  Rows4,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";

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

interface TeamTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TeamTable<TData, TValue>({
  columns,
  data,
}: TeamTableProps<TData, TValue>) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isCompact, setIsCompact] = useState(true);
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
    },
    pageCount: Math.ceil(data.length / pageSize),
  });

  return (
    <div className="px-4">
      {/* Controls */}
      <div className="flex items-center justify-between space-x-2 pb-2 text-neutral-500">
        <div className="flex items-center space-x-2">
          <Filter className="size-7" />
          <input
            name="filterTeams"
            placeholder="Filter teams..."
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="border-b placeholder:text-neutral-300 focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="hover:opacity-70"
            onClick={() => setIsCompact(!isCompact)}
          >
            {isCompact ? (
              <Rows2 className="size-7" />
            ) : (
              <Rows4 className="size-7" />
            )}
          </button>
          <button
            className="hover:opacity-70"
            onClick={() => table.previousPage()}
          >
            <SquareChevronLeft className="size-7" />
          </button>
          <button className="hover:opacity-70" onClick={() => table.nextPage()}>
            <SquareChevronRight className="size-7" />
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
                    className={`hover:text-opacity-70 ${isCompact && "py-0"}`}
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
                  onClick={(event) => {
                    if (
                      event.target instanceof HTMLElement &&
                      event.target.classList.contains("claimButton")
                    )
                      return;
                    if (event.metaKey || event.ctrlKey) {
                      // Open in new tab
                      window.open(`/teams/${row.getValue("id")}`, "_blank");
                    } else {
                      // Move to team page
                      router.push(`/teams/${row.getValue("id")}`);
                      router.refresh();
                    }
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`cursor-pointer ${isCompact && "py-0"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={isCompact ? "py-0" : undefined}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
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
  );
}
