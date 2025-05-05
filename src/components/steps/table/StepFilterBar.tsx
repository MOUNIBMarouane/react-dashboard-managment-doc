
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StepFilterOptions } from '@/models/circuit';

interface StepFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterOptions: StepFilterOptions;
  onFilterChange: (options: Partial<StepFilterOptions>) => void;
  onResetFilters: () => void;
  className?: string;
}

const StepFilterBar = ({
  searchTerm,
  onSearchChange,
  filterOptions,
  onFilterChange,
  onResetFilters,
  className = ''
}: StepFilterBarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    onFilterChange({ search: value, searchTerm: value });
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search steps..."
          className="pl-10"
          value={searchTerm || filterOptions.search || filterOptions.searchTerm || ''}
          onChange={handleSearchChange}
        />
      </div>
      
      <Button variant="outline" size="sm" onClick={onResetFilters}>
        Reset Filters
      </Button>
    </div>
  );
};

export default StepFilterBar;
