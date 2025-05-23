"use client";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
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

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function StatsTable<TData, TValue>({
  columns,
  data,
}: TableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "delta", desc: false },
  ]);
  const [showAll, setShowAll] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      columnVisibility: {
        responseTime: false,
        status: false,
        followUps: false,
        teamId: false,
      },
    },
  });

  const minRows = 10;
  const allRows = table.getRowModel().rows;
  const visibleRows = showAll ? allRows : allRows.slice(0, minRows);

  return (
    <>
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
                  className="text-main-text hover:text-opacity-85"
                  role="button"
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
          {visibleRows.map((row, i) => (
            <TableRow
              key={i}
              data-state={row.getIsSelected() && "selected"}
              className="hover:bg-inherit"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {allRows.length > minRows && (
        <div className="flex w-full justify-center border-t border-gray-300 text-sm">
          <button
            onClick={() => setShowAll((curr) => !curr)}
            className="text-sm text-white/60 transition-all hover:text-white/80 p-1.5"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </>
  );
}
