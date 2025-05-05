import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDocumentTypes } from "@/hooks/useDocumentTypes";
import { useSettings } from "@/context/SettingsContext";
import {
  Filter,
  Search,
  X,
  ChevronsUpDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DocumentType } from "@/models/document";
import { DateRange } from "react-day-picker";

interface DocumentTypeFiltersProps {
  filters?: any;
  onChange?: (filters: any) => void;
  onClose?: () => void;
  onFilterChange?: (filters: any) => void;
}

export const DocumentTypeFilters: React.FC<DocumentTypeFiltersProps> = ({
  filters,
  onChange,
  onClose,
  onFilterChange
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [sortKey, setSortKey] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { theme } = useSettings();
  const isDark = theme === "dark";
  const { types, isLoading } = useDocumentTypes();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!types) return;
    if (onChange) onChange({ ...filters, search: searchQuery });
  };

  const handleFilterSubmit = () => {
    const newFilters = {
      minPrice,
      maxPrice,
      isFeatured,
      isArchived,
      dateRange,
    };
    
    if (onFilterChange) onFilterChange(newFilters);
    if (onChange) onChange({ ...filters, ...newFilters });
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setIsFeatured(false);
    setIsArchived(false);
    setDateRange(undefined);
    
    if (onChange) onChange({});
    if (onFilterChange) onFilterChange({});
    setIsFilterOpen(false);
  };

  const handleSortChange = (key: string) => {
    if (sortKey === key) {
      // Toggle sort order if the same key is clicked
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort key and default to ascending order
      setSortKey(key);
      setSortOrder("asc");
    }
    
    if (onChange) onChange({ ...filters, sortKey: key, sortOrder: sortOrder === "asc" ? "desc" : "asc" });
  };

  const formatDate = (date: Date | string) => {
    return format(new Date(date), "MMM d, yyyy");
  };

  const getDocumentTypeCount = () => {
    if (isLoading) {
      return <Loader2 className="h-4 w-4 animate-spin mr-2" />;
    }

    if (!types) {
      return <AlertCircle className="h-4 w-4 mr-2" />;
    }

    return types?.length;
  };

  return (
    <div
      className={`flex flex-col gap-4 p-4 rounded-lg ${
        isDark ? "bg-[#0a1033]/60 border border-blue-900/30" : "bg-gray-50"
      }`}
    >
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search document types..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={isDark ? "bg-blue-900/30 border-blue-800" : "bg-white"}
        />
        {searchQuery ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              setSearchQuery("");
              if (onChange) onChange({ ...filters, search: "" });
            }}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        )}
        <Button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 rounded-full px-3"
        >
          Search
        </Button>
      </form>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between">
        {/* Filter Button */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80"
            align="start"
            sideOffset={10}
          >
            <div className="flex flex-col space-y-4">
              {/* Price Range */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Price Range</h4>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice.toString()}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-24"
                  />
                  -
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice.toString()}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-24"
                  />
                </div>
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  min={0}
                  max={1000}
                  step={10}
                  value={[minPrice, maxPrice]}
                  onValueChange={(values: number[]) => {
                    setMinPrice(values[0]);
                    setMaxPrice(values[1]);
                  }}
                  className="mt-2"
                />
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Date Range</h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      {dateRange?.from ? (
                        dateRange.to ? (
                          `${format(dateRange.from, "MMM d, yyyy")} - ${format(
                            dateRange.to,
                            "MMM d, yyyy"
                          )}`
                        ) : (
                          format(dateRange.from, "MMM d, yyyy")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    side="bottom"
                  >
                    <Calendar
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      pagedNavigation
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <Label htmlFor="featured">
                  <Checkbox
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={() => setIsFeatured(!isFeatured)}
                    className="mr-2"
                  />
                  Featured
                </Label>
                <Label htmlFor="archived">
                  <Checkbox
                    id="archived"
                    checked={isArchived}
                    onCheckedChange={() => setIsArchived(!isArchived)}
                    className="mr-2"
                  />
                  Archived
                </Label>
              </div>

              {/* Filter Buttons */}
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Clear
                </Button>
                <Button size="sm" onClick={handleFilterSubmit}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Sort Dropdown */}
        <div className="relative">
          <Button variant="outline" size="sm">
            <ChevronsUpDown className="h-4 w-4 mr-2" />
            Sort By
          </Button>
          <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                onClick={() => handleSortChange("typeName")}
              >
                Name
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                onClick={() => handleSortChange("createdAt")}
              >
                Date Created
              </button>
              {/* Add more sorting options here */}
            </div>
          </div>
        </div>
      </div>

      {/* Document Types Count */}
      <div
        className={`text-sm ${
          isDark ? "text-blue-300" : "text-gray-600"
        } font-medium`}
      >
        Document Types:{" "}
        {isLoading ? (
          <Loader2 className="inline-block h-4 w-4 animate-spin mr-2" />
        ) : types ? (
          types.length
        ) : (
          <AlertCircle className="inline-block h-4 w-4 mr-2" />
        )}
      </div>
    </div>
  );
};

// Default export for backwards compatibility
export default DocumentTypeFilters;
