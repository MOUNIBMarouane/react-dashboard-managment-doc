
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

interface DocumentTypeFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  quantityRange: [number, number];
  setQuantityRange: (range: [number, number]) => void;
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onClose?: () => void;
  onFilterChange?: (filters: any) => void;
}

export const DocumentTypeFilters = ({
  searchQuery,
  onSearchChange,
  quantityRange,
  setQuantityRange,
  dateRange,
  setDateRange,
  onApplyFilters,
  onResetFilters,
  onClose,
  onFilterChange
}: DocumentTypeFiltersProps) => {
  const [tempQuantityRange, setTempQuantityRange] = useState<[number, number]>(quantityRange);
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(dateRange);

  useEffect(() => {
    setTempQuantityRange(quantityRange);
  }, [quantityRange]);

  useEffect(() => {
    setTempDateRange(dateRange);
  }, [dateRange]);

  const handleApply = () => {
    setQuantityRange(tempQuantityRange);
    setDateRange(tempDateRange);
    if (onFilterChange) {
      onFilterChange({
        searchQuery,
        quantityRange: tempQuantityRange,
        dateRange: tempDateRange
      });
    }
    onApplyFilters();
    if (onClose) onClose();
  };

  const handleReset = () => {
    setTempQuantityRange([0, 100]);
    setTempDateRange(undefined);
    onResetFilters();
  };

  const handleSliderChange = useCallback((value: number[]) => {
    setTempQuantityRange([value[0], value[1]] as [number, number]);
  }, []);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-white">
          Search
        </Label>
        <Input
          type="search"
          id="search"
          placeholder="Search document types..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 text-sm bg-[#0A0E2E] border-blue-900/40 focus:border-blue-500 text-white"
        />
      </div>

      {/* Quantity Range Slider */}
      <div>
        <Label htmlFor="quantity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-white">
          Quantity Range
        </Label>
        <div className="flex items-center space-x-2 mt-2">
          <Input
            type="number"
            id="quantity-min"
            value={tempQuantityRange[0]}
            onChange={(e) => setTempQuantityRange([Number(e.target.value), tempQuantityRange[1]])}
            className="w-24 h-9 text-sm bg-[#0A0E2E] border-blue-900/40 focus:border-blue-500 text-white"
          />
          <span className="text-white">-</span>
          <Input
            type="number"
            id="quantity-max"
            value={tempQuantityRange[1]}
            onChange={(e) => setTempQuantityRange([tempQuantityRange[0], Number(e.target.value)])}
            className="w-24 h-9 text-sm bg-[#0A0E2E] border-blue-900/40 focus:border-blue-500 text-white"
          />
        </div>
        <Slider
          id="quantity"
          defaultValue={tempQuantityRange}
          max={100}
          step={1}
          onValueChange={handleSliderChange}
          className="mt-2"
        />
      </div>

      {/* Date Range Picker */}
      <div>
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-white">
          Date Range
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal text-white bg-transparent border-blue-900/40 h-9 text-sm",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-blue-400" />
              {dateRange?.from ? (
                dateRange.to ? (
                  `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                ) : (
                  format(dateRange.from, "MMM dd, yyyy")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#0f1642] border-blue-900/30 text-white pointer-events-auto" align="center">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={tempDateRange}
              onSelect={setTempDateRange}
              numberOfMonths={2}
              pagedNavigation
              className="border-none rounded-md pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Apply and Reset Buttons */}
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-blue-800/50 hover:bg-blue-900/30 text-gray-300 h-9 text-sm"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm"
          onClick={handleApply}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

// Export a default for compatibility with existing code
export default DocumentTypeFilters;
