
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DateRangePicker } from "../ui/date-range-picker";
import { Filter, Search } from "lucide-react";

export interface SearchField {
  label: string;
  value: string;
}

export interface TableSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchField?: string;
  onSearchFieldChange?: (field: string) => void;
  searchFields?: SearchField[];
  showDatePicker?: boolean;
  dateRange?: any;
  onDateRangeChange?: (range: any) => void;
  showFiltersButton?: boolean;
  onToggleFilters?: () => void;
  showAdvancedFilters?: boolean;
  onToggleAdvancedFilters?: () => void;
  placeholderText?: string;
  placeholder?: string;
}

export const TableSearchBar = ({
  searchQuery,
  onSearchChange,
  searchField = "all",
  onSearchFieldChange,
  searchFields = [],
  showDatePicker = false,
  dateRange,
  onDateRangeChange,
  showFiltersButton = true,
  onToggleFilters,
  showAdvancedFilters = false,
  onToggleAdvancedFilters,
  placeholderText = "Search...",
  placeholder = "Search...",
}: TableSearchBarProps) => {
  return (
    <div className="flex gap-2 items-center w-full max-w-md relative">
      {/* Search field selector */}
      {searchFields.length > 0 && onSearchFieldChange && (
        <Select value={searchField} onValueChange={onSearchFieldChange}>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {searchFields.map((field) => (
              <SelectItem key={field.value} value={field.value}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Search input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder || placeholderText}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Date picker (optional) */}
      {showDatePicker && onDateRangeChange && (
        <DateRangePicker
          date={dateRange}
          onDateChange={onDateRangeChange}
          align="start"
          className="w-[300px]"
        />
      )}

      {/* Filters button (optional) */}
      {showFiltersButton && onToggleFilters && (
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleFilters}
          className={showAdvancedFilters ? "bg-accent" : ""}
        >
          <Filter className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
