
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { SubType } from "@/models/subtype";
import { CheckedState } from "@radix-ui/react-checkbox";

export const columns: ColumnDef<SubType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() 
            ? true
            : table.getIsSomePageRowsSelected() 
              ? "indeterminate" as CheckedState
              : false
        }
        onCheckedChange={(value: CheckedState) => {
          if (value !== "indeterminate") {
            table.toggleAllPageRowsSelected(!!value);
          }
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: CheckedState) => {
          if (value !== "indeterminate") {
            row.toggleSelected(!!value);
          }
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "subTypeKey",
    header: "Key",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.subTypeKey}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "success" : "secondary"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.original.startDate),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => formatDate(row.original.endDate),
  },
];
