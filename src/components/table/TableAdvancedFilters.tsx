import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { X } from 'lucide-react';

export interface FilterOption {
  label: string;
  value: string;
  id?: string;
}

export interface FilterState {
  statusFilter?: string;
  typeFilter?: string;
  dateRange?: any;
  searchQuery?: string;
  searchField?: string;
  numericFilters?: Record<string, number>;
  booleanFilters?: Record<string, boolean>;
}

export interface TableAdvancedFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  statusOptions: FilterOption[];
  typeOptions: FilterOption[];
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
}

export const TableAdvancedFilters = ({
  filters,
  setFilters,
  statusOptions,
  typeOptions,
  onClose,
  onApply,
  onClear,
}: TableAdvancedFiltersProps) => {
  return (
    <div className="space-y-4 rounded-lg border p-4 shadow-sm mt-2">
      {/* Header with close button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Advanced Filters</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status filter */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={filters.statusFilter || "any"}
            onValueChange={(value) =>
              setFilters({ ...filters, statusFilter: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Status</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type filter */}
        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={filters.typeFilter || "any"}
            onValueChange={(value) =>
              setFilters({ ...filters, typeFilter: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date range picker */}
      <div className="space-y-2">
        <Label>Date Range</Label>
        <DateRangePicker
          date={filters.dateRange}
          onDateChange={(range) => setFilters({ ...filters, dateRange: range })}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={onClear}>
          Clear Filters
        </Button>
        <Button onClick={onApply}>Apply Filters</Button>
      </div>
    </div>
  );
};
