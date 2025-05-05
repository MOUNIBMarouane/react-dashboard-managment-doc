
import React from 'react';

export interface FilterState {
  query: string;
  field: string;
  status: string;
  type: string;
}

export interface TableAdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (newFilters: FilterState) => void;
  statusOptions: { label: string; value: string; }[];
  typeOptions: { label: string; value: string; }[];
  onApply: () => void;
  onClose: () => void;
}

export const TableAdvancedFilters: React.FC<TableAdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  statusOptions,
  typeOptions,
  onApply,
  onClose
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow">
      <div className="text-sm mb-2 font-medium">Advanced Filters</div>
      
      {/* Filter form would go here */}
      <div className="grid gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <button 
          className="px-3 py-1 text-sm border rounded-md"
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
          onClick={onApply}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
