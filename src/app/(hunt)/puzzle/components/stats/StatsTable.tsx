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
        replies: false,
        teamId: false,
      },
    },
  });

  return (
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
        {table.getRowModel().rows.map((row, i) => (
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
  );
}
