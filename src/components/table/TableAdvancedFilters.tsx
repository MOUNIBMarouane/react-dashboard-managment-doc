import { useState } from 'react';
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FilterState } from './hooks/useTableFilters';

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
    numericFilters,
    booleanFilters
  } = filterState;
  
  const handleDateChange = (range: DateRange | undefined) => {
    onFilterChange({ ...filterState, dateRange: range });
  };
  
  const handleInputChange = (field: string, value: string) => {
    onFilterChange({
      ...filterState,
      numericFilters: {
        ...numericFilters,
        [field]: value
      }
    });
  };
  
  const handleBooleanChange = (field: string, checked: boolean) => {
    onFilterChange({
      ...filterState,
      booleanFilters: {
        ...booleanFilters,
        [field]: checked
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
          value={numericFilters.amount || ""}
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
            checked={booleanFilters.isActive || false}
            onChange={(e) => handleBooleanChange("isActive", e.target.checked)}
            className="h-4 w-4"
          />
          <span>Active</span>
        </div>
      </div>
    </div>
  );
};
