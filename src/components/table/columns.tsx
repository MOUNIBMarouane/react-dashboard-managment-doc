
import { Document } from "@/models/document";
import { CircuitDto } from "@/models/circuit";

// Define columns for various tables
export const documentColumns = [
  { key: "documentKey", header: "Document Key" },
  { key: "title", header: "Title" },
  { key: "status", header: "Status" },
  { key: "createdAt", header: "Created At" },
];

export const circuitColumns = [
  { key: "circuitKey", header: "Circuit Key" },
  { key: "title", header: "Title" },
  { key: "isActive", header: "Status" },
  { key: "createdAt", header: "Created At" },
];

// Add more column definitions as needed
