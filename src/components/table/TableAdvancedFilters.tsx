import { Button } from '@/components/ui/button';

export interface FilterOption {
  id: number | string;
  label: string;
  value: string;
}

export interface FilterState {
  query: string;
  field: string;
  status?: string;
  type?: string;
  dateRange?: any;
}

export interface TableAdvancedFiltersProps {
  filterOptions: Record<string, FilterOption[]>;
  onFilterChange: (filterName: string, value: any) => void;
  onResetFilters: () => void;
}

export const TableAdvancedFilters = ({
  filterOptions,
  onFilterChange,
  onResetFilters
}: TableAdvancedFiltersProps) => {
  return (
    <div className="space-y-4">
      {Object.entries(filterOptions).map(([filterName, options]) => (
        <div key={filterName} className="space-y-2">
          <h3 className="text-sm font-medium">{filterName}</h3>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => onFilterChange(filterName.toLowerCase(), option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onResetFilters}
        className="text-blue-500 hover:text-blue-600 p-0 h-auto"
      >
        Reset all filters
      </Button>
    </div>
  );
};
