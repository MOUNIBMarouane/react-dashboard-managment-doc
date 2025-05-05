import { useState } from 'react';
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterState {
  searchQuery: string;
  searchField: string;
  dateRange?: DateRange;
  statusFilter?: string;
  typeFilter?: string;
  customFilters?: Record<string, string>;
}

interface TableAdvancedFiltersProps {
  filterState: FilterState;
  onFilterChange: (newFilterState: FilterState) => void;
  className?: string;
}

export const TableAdvancedFilters = ({
  filterState,
  onFilterChange,
  className = ""
}: TableAdvancedFiltersProps) => {
  const {
    searchQuery,
    searchField,
    dateRange,
    statusFilter,
    typeFilter,
    customFilters
  } = filterState;
  
  const handleDateChange = (range: DateRange | undefined) => {
    onFilterChange({ ...filterState, dateRange: range });
  };
  
  const handleInputChange = (field: string, value: string) => {
    onFilterChange({
      ...filterState,
      customFilters: {
        ...filterState.customFilters,
        [field]: value
      }
    });
  };
  
  const handleBooleanChange = (field: string, checked: boolean) => {
    onFilterChange({
      ...filterState,
      customFilters: {
        ...filterState.customFilters,
        [field]: checked ? 'true' : 'false'
      }
    });
  };
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {/* Date Range Filter */}
      <div>
        <Label htmlFor="date" className="text-sm text-muted-foreground">
          Date Range:
        </Label>
        <DateRangePicker
          date={dateRange}
          onChange={handleDateChange}
          className="w-auto"
        />
      </div>
      
      {/* Numeric Filters Example */}
      <div>
        <Label htmlFor="amount" className="text-sm text-muted-foreground">
          Amount:
        </Label>
        <Input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={customFilters?.amount || ""}
          onChange={(e) => handleInputChange("amount", e.target.value)}
          className="w-full"
        />
      </div>
      
      {/* Boolean Filters Example */}
      <div>
        <Label htmlFor="isActive" className="text-sm text-muted-foreground">
          Is Active:
        </Label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            checked={customFilters?.isActive === 'true'}
            onChange={(e) => handleBooleanChange("isActive", e.target.checked)}
            className="h-4 w-4"
          />
          <span>Active</span>
        </div>
      </div>
    </div>
  );
};
