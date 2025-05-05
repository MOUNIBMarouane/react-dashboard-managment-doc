
import { Document } from "@/models/document";
import { CircuitDto } from "@/models/circuit";
import { ColumnDef } from "@tanstack/react-table";

// Define columns for various tables
export const documentColumns: ColumnDef<Document>[] = [
  { accessorKey: "documentKey", header: "Document Key" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "createdAt", header: "Created At" },
];

export const circuitColumns: ColumnDef<CircuitDto>[] = [
  { accessorKey: "circuitKey", header: "Circuit Key" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "isActive", header: "Status" },
  { accessorKey: "createdAt", header: "Created At" },
];

// Add more column definitions as needed
