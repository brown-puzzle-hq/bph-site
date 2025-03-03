"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
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

  const [isCompact, setIsCompact] = useState(true);

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
    <div className="px-4">
      {/* Controls */}
      <div className="flex items-center justify-between space-x-2 pb-2 text-neutral-500">
        <div className="flex items-center space-x-2">
          <Filter className="size-7" />
          <input
            name="filterHints"
            placeholder="Filter hints..."
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
                    className={`hover:text-opacity-70 ${isCompact && "py-0"}`}
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
