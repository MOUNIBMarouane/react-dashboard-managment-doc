import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface TableSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFiltersButton?: boolean;
  onToggleFilters?: () => void;
  className?: string;
  placeholder?: string;
  showFilters?: boolean;
  dateRange?: any;
  onDateChange?: any;
}

export const TableSearchBar = ({
  searchQuery,
  onSearchChange,
  showFiltersButton = false,
  onToggleFilters,
  className = '',
  placeholder = "Search...",
  showFilters,
  dateRange,
  onDateChange
}: TableSearchBarProps) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10"
      />
      {showFiltersButton && (
        <Button
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={onToggleFilters}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      )}
    </div>
  );
};
