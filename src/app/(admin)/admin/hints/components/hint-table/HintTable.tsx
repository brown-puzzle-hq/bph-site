"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
import { FollowUpHint, HintClaimer } from "./Columns";

interface HintTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function HintTable<TData, TValue>({
  columns,
  data,
}: HintTableProps<TData, TValue>) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "claimer", desc: true },
  ]);
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
        status: false,
        followUps: false,
        teamId: false,
      },
    },
    sortingFns: {
      sortHintByStatus: (rowA, rowB, _columnId) => {
        const claimerA: HintClaimer | null = rowA.getValue("claimer");
        const claimerB: HintClaimer | null = rowB.getValue("claimer");
        const statusA: string = rowA.getValue("status");
        const statusB: string = rowB.getValue("status");
        const followUpsA: FollowUpHint[] | null = rowA.getValue("followUps");
        const followUpsB: FollowUpHint[] | null = rowB.getValue("followUps");
        const dateA: Date = new Date(rowA.getValue("requestTime"));
        const dateB: Date = new Date(rowB.getValue("requestTime"));

        const hasFollowUpA = !!(
          followUpsA &&
          followUpsA[followUpsA.length - 1]?.userId === rowA.getValue("teamId")
        );
        const hasFollowUpB = !!(
          followUpsB &&
          followUpsB[followUpsB.length - 1]?.userId === rowB.getValue("teamId")
        );

        const getPriority = (
          claimerId: string | undefined,
          status: string,
          hasFollowUp: boolean,
        ): number => {
          if (claimerId === userId && status === "no_response") return 0; // Unanswered for current user
          if (claimerId === userId && hasFollowUp) return 1; // Follow-up for current user
          if (!claimerId) return 2; // Unclaimed
          if (hasFollowUp) return 3; // Follow-up for another user
          if (status === "no_response") return 4; // Unanswered for another user
          if (claimerId !== userId && status === "answered") return 5; // Answered by another user
          if (claimerId !== userId) return 6; // Refunded by another user
          if (status === "refunded") return 7; // Refunded by current user
          return 8; // Answered by current user
        };

        const priorityA = getPriority(claimerA?.id, statusA, hasFollowUpA);
        const priorityB = getPriority(claimerB?.id, statusB, hasFollowUpB);

        return priorityB - priorityA || dateA.getTime() - dateB.getTime();
      },
    },
    pageCount: Math.ceil(data.length / pageSize),
  });

  if (!userId) return null;

  return (
    <div className="mb-6 px-4">
      <div className="flex items-center justify-between space-x-2 pb-2">
        <Input
          placeholder="Filter hints..."
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()}>
            Next
          </Button>
        </div>
      </div>
      <div className="flex overflow-auto rounded-md border">
        <div className="w-full overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={`header-${headerGroup.id}`}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={() =>
                        header.column.toggleSorting(
                          header.column.getIsSorted() === "asc",
                        )
                      }
                      className="hover:underline"
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    onClick={(event) => {
                      if (
                        event.target instanceof HTMLElement &&
                        event.target.classList.contains("hint-button")
                      )
                        return;
                      if (event.metaKey || event.ctrlKey) {
                        // Open in new tab
                        window.open(
                          `/admin/hints/${row.getValue("id")}`,
                          "_blank",
                        );
                      } else {
                        // Move to hint page
                        router.push(`/admin/hints/${row.getValue("id")}`);
                        router.refresh();
                      }
                    }}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
