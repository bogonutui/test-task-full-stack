import { ColumnDef } from "@tanstack/react-table";

function formatHeader(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase());
}

export function generateColumns<T extends Record<string, unknown>>(
  data: T[]
): ColumnDef<T>[] {
  if (!data || data.length === 0) {
    return [];
  }

  const sampleRow = data[0];
  const keys = Object.keys(sampleRow) as (keyof T)[];

  return keys
    .filter((key) => {
      const keyString = key.toString().toLowerCase();
      return (
        !keyString.startsWith("_") &&
        !["createdat", "updatedat"].includes(keyString)
      );
    })
    .map((key) => {
      const header = formatHeader(key.toString());

      return {
        accessorKey: key as string,
        header,
        cell: ({ row }) => row.original[key] ?? "",
      };
    });
}
