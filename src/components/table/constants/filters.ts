
import { FilterOption } from "../TableAdvancedFilters";

export const statusOptions: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
  { label: "Rejected", value: "rejected" }
];

export const typeOptions: FilterOption[] = [
  { label: "All Types", value: "all" }
];

export const DEFAULT_STATUS_FILTERS: FilterOption[] = [
  { label: "All Statuses", value: "any" },
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Completed", value: "completed" },
  { label: "Rejected", value: "rejected" }
];

export const DEFAULT_TYPE_FILTERS: FilterOption[] = [
  { label: "All Types", value: "any" },
  { label: "Document", value: "document" },
  { label: "Task", value: "task" },
  { label: "Report", value: "report" }
];
