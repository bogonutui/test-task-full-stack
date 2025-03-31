import { ReactNode } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  rowCount?: number;
  isFetching: boolean;
  error: Error | null;
  pagination: PaginationState;
  enableSorting?: boolean;
  height?: string;
  tableToolbar?: ReactNode;
  setPagination: OnChangeFn<PaginationState>;
}

const TableComponent = <T,>({
  data,
  columns,
  isFetching,
  error,
  pagination,
  setPagination,
  rowCount,
  enableSorting = false,
  tableToolbar,
  height = "500px",
}: TableProps<T>) => {
  const isEmptyData = data.length === 0;

  const table = useReactTable({
    rowCount,
    columns,
    data,
    manualPagination: true,
    enableSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const renderContent = () => {
    let message: ReactNode = table.getRowModel().rows.map((row) => {
      const visibleCells = row.getVisibleCells();

      return (
        <tr key={row.id} className=" border-b">
          {visibleCells.map((cell) => (
            <td key={cell.id} className="p-4 text-sm text-gray-700">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      );
    });

    if (isFetching) {
      message = (
        <tr>
          <td colSpan={columns.length} className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500 mx-auto"></div>
          </td>
        </tr>
      );
    } else if (error) {
      message = (
        <tr>
          <td colSpan={columns.length} className="text-center py-4">
            <div className="bg-red-100 text-red-700 p-4 rounded">
              Error data fetching
            </div>
          </td>
        </tr>
      );
    } else if (isEmptyData) {
      message = (
        <tr>
          <td colSpan={columns.length} className="text-center py-4">
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
              No data available
            </div>
          </td>
        </tr>
      );
    }

    return message;
  };

  return (
    <div className="mt-6 px-4">
      <div className="flex flex-col h-full border rounded shadow">
        {tableToolbar && <div className="p-4 border-b">{tableToolbar}</div>}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: height, minHeight: height }}
        >
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`p-4 text-left ${
                        header.column.getCanSort() ? "cursor-pointer" : ""
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>{renderContent()}</tbody>
          </table>
        </div>
        <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex justify-center sm:justify-start gap-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={pagination.pageIndex === 0}
              onClick={() => table.previousPage()}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </button>
          </div>
          <div className="text-center sm:text-left">
            <span>
              Page {pagination.pageIndex + 1} of{" "}
              {Math.ceil((rowCount || 0) / pagination.pageSize)}
            </span>
          </div>
          <div className="flex justify-center sm:justify-end">
            <select
              className="p-2 border rounded disabled:opacity-50"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageIndex(0);
                table.setPageSize(Number(e.target.value));
              }}
              disabled={(rowCount ?? 0) <= 5}
            >
              {[5, 10, 15].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
