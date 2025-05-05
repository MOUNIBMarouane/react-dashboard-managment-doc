
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { DataTable } from "./DataTable";
import { FilterOption, FilterState, TableAdvancedFilters } from "./TableAdvancedFilters";
import { TableSearchBar } from "./TableSearchBar";
import { statusOptions, typeOptions } from "./constants/filters";
import { TableActiveFilters } from "./TableActiveFilters";

interface ExampleFilteredTableProps {
  data: any[];
  searchPlaceholder?: string;
  className?: string;
  showFilters?: boolean;
}

export function ExampleFilteredTable({
  data = [],
  searchPlaceholder = "Search...",
  className = "",
  showFilters = false,
}: ExampleFilteredTableProps) {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  
  // State for active filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  
  // Show/hide advanced filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Filter state for advanced filters
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: "",
    searchField: "all",
    dateRange: undefined,
    statusFilter: "all",
    typeFilter: "all",
  });

  // Apply filters whenever they change
  useEffect(() => {
    let result = data;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter((item) => {
        return Object.values(item).some(
          (val) => 
            typeof val === "string" && 
            val.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }
    
    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter && typeFilter !== "all") {
      result = result.filter((item) => item.type === typeFilter);
    }
    
    // Apply date range filter
    if (dateRange && dateRange.from) {
      const fromDate = new Date(dateRange.from);
      result = result.filter((item) => {
        const itemDate = new Date(item.date);
        if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          return itemDate >= fromDate && itemDate <= toDate;
        }
        return itemDate >= fromDate;
      });
    }
    
    setFilteredData(result);
  }, [data, searchQuery, statusFilter, typeFilter, dateRange]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setDateRange(undefined);
    setFilterState({
      searchQuery: "",
      searchField: "all",
      dateRange: undefined,
      statusFilter: "all",
      typeFilter: "all",
    });
    toast.info("All filters have been reset");
  };

  // Handle filtered table actions
  const handleAction = (action: string, item: any) => {
    toast.info(`Action ${action} on item ${item.id}`);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and filter controls */}
      <TableSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder={searchPlaceholder}
        showFiltersButton={true}
        onToggleFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
        showFilters={showAdvancedFilters}
        dateRange={dateRange}
        onDateChange={setDateRange}
      />
      
      {/* Advanced filters panel */}
      {showAdvancedFilters && (
        <div className="rounded-md border p-4">
          <TableAdvancedFilters 
            filterState={filterState}
            onFilterChange={setFilterState}
          />
          
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleResetFilters}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Active filters display */}
      <TableActiveFilters
        activeFilters={[
          statusFilter !== "all" ? `Status: ${statusFilter}` : null,
          typeFilter !== "all" ? `Type: ${typeFilter}` : null,
          dateRange?.from 
            ? `Date: ${dateRange.from.toLocaleDateString()}${
                dateRange.to ? ` - ${dateRange.to.toLocaleDateString()}` : ""
              }`
            : null,
        ].filter(Boolean) as string[]}
        onClearFilter={(filter) => {
          if (filter.startsWith("Status:")) setStatusFilter("all");
          if (filter.startsWith("Type:")) setTypeFilter("all");
          if (filter.startsWith("Date:")) setDateRange(undefined);
        }}
        onClearAll={handleResetFilters}
      />

      {/* The data table */}
      <DataTable
        data={filteredData}
        onAction={handleAction}
      />
    </div>
  );
}
