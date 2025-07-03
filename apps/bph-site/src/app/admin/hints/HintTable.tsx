"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { Reply, HintClaimer } from "./Columns";

interface HintTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

import { getCookie, setCookie } from "typescript-cookie";

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
  const pageSize = 1000;

  const [isCompact, setIsCompact] = useState(true);
  useEffect(() => {
    setIsCompact(getCookie("compact") !== "false");
  }, []);

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
        replies: false,
        teamId: false,
      },
    },
    sortingFns: {
      sortHintByStatus: (rowA, rowB, _columnId) => {
        const claimerA: HintClaimer | null = rowA.getValue("claimer");
        const claimerB: HintClaimer | null = rowB.getValue("claimer");
        const statusA: string = rowA.getValue("status");
        const statusB: string = rowB.getValue("status");
        const repliesA: Reply[] | null = rowA.getValue("replies");
        const repliesB: Reply[] | null = rowB.getValue("replies");
        const dateA: Date = new Date(rowA.getValue("requestTime"));
        const dateB: Date = new Date(rowB.getValue("requestTime"));

        const hasReplyA = !!(
          repliesA &&
          repliesA[repliesA.length - 1]?.userId === rowA.getValue("teamId")
        );
        const hasReplyB = !!(
          repliesB &&
          repliesB[repliesB.length - 1]?.userId === rowB.getValue("teamId")
        );

        const getPriority = (
          claimerId: string | undefined,
          status: string,
          hasReply: boolean,
        ): number => {
          if (claimerId === userId && status === "no_response") return 0; // Unanswered for current user
          if (claimerId === userId && hasReply) return 1; // Reply for current user
          if (!claimerId) return 2; // Unclaimed
          if (hasReply) return 3; // Reply for another user
          if (status === "no_response") return 4; // Unanswered for another user
          if (claimerId !== userId && status === "answered") return 5; // Answered by another user
          if (claimerId !== userId) return 6; // Refunded by another user
          if (status === "refunded") return 7; // Refunded by current user
          return 8; // Answered by current user
        };

        const priorityA = getPriority(claimerA?.id, statusA, hasReplyA);
        const priorityB = getPriority(claimerB?.id, statusB, hasReplyB);

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
          <Filter className="size-5" />
          <input
            name="filterHints"
            placeholder="Filter hints..."
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
          <button className="hover:opacity-70" onClick={() => table.nextPage()}>
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
