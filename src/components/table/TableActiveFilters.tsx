
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { FilterOption } from "./TableAdvancedFilters";

export interface TableActiveFiltersProps {
  dateRange?: any;
  onClearDateRange?: () => void;
  statusFilter?: string;
  statusOptions?: FilterOption[];
  onClearStatus?: () => void;
  typeFilter?: string;
  typeOptions?: FilterOption[];
  onClearType?: () => void;
  onClearAll: () => void;
}

export const TableActiveFilters = ({
  dateRange,
  onClearDateRange,
  statusFilter,
  statusOptions = [],
  onClearStatus,
  typeFilter,
  typeOptions = [],
  onClearType,
  onClearAll,
}: TableActiveFiltersProps) => {
  // Check if we have any active filters
  const hasFilters =
    (dateRange && dateRange.from) ||
    (statusFilter && statusFilter !== "any") ||
    (typeFilter && typeFilter !== "any");

  if (!hasFilters) return null;

  // Find label for status and type filters
  const getStatusLabel = () => {
    if (!statusFilter || statusFilter === "any") return "";
    const found = statusOptions.find((option) => option.value === statusFilter);
    return found ? found.label : statusFilter;
  };

  const getTypeLabel = () => {
    if (!typeFilter || typeFilter === "any") return "";
    const found = typeOptions.find((option) => option.value === typeFilter);
    return found ? found.label : typeFilter;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {dateRange && dateRange.from && (
        <Badge variant="outline" className="flex items-center gap-1 pl-2">
          <span>
            Date: {dateRange.from.toLocaleDateString()}
            {dateRange.to && ` - ${dateRange.to.toLocaleDateString()}`}
          </span>
          {onClearDateRange && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={onClearDateRange}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </Badge>
      )}

      {statusFilter && statusFilter !== "any" && (
        <Badge variant="outline" className="flex items-center gap-1 pl-2">
          <span>Status: {getStatusLabel()}</span>
          {onClearStatus && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={onClearStatus}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </Badge>
      )}

      {typeFilter && typeFilter !== "any" && (
        <Badge variant="outline" className="flex items-center gap-1 pl-2">
          <span>Type: {getTypeLabel()}</span>
          {onClearType && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={onClearType}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </Badge>
      )}

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs"
          onClick={onClearAll}
        >
          Clear all
        </Button>
      )}
    </div>
  );
};
