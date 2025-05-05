
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterState {
  query: string;
  field: string;
  status?: string;
  type?: string;
  date?: Date;
  [key: string]: string | boolean | number | Date | undefined;
}

export interface TableAdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  statusOptions: FilterOption[];
  typeOptions: FilterOption[];
  onApply?: () => void;
  onClose?: () => void;
}

export const TableAdvancedFilters = ({
  filters,
  onFiltersChange,
  statusOptions,
  typeOptions,
  onApply,
  onClose
}: TableAdvancedFiltersProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Status</Label>
        <RadioGroup defaultValue={filters.status} onValueChange={(value) => onFiltersChange({ ...filters, status: value })} className="flex flex-col space-y-1">
          {statusOptions.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
              <RadioGroupItem value={option.value} id={`status-${option.value}`} />
              <Label htmlFor={`status-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div>
        <Label>Type</Label>
        <RadioGroup defaultValue={filters.type} onValueChange={(value) => onFiltersChange({ ...filters, type: value })} className="flex flex-col space-y-1">
          {typeOptions.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
              <RadioGroupItem value={option.value} id={`type-${option.value}`} />
              <Label htmlFor={`type-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
