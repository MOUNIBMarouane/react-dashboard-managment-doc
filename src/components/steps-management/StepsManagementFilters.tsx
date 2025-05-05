
import React from 'react';
import { Input } from '@/components/ui/input';
import { Circuit, StepFilterOptions } from '@/models/circuit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface StepsManagementFiltersProps {
  circuits: Circuit[];
  filterOptions: StepFilterOptions;
  onFilterChange: (newFilters: Partial<StepFilterOptions>) => void;
  onResetFilters: () => void;
  isCircuitIdLocked?: boolean;
}

const StepsManagementFilters: React.FC<StepsManagementFiltersProps> = ({
  circuits,
  filterOptions,
  onFilterChange,
  onResetFilters,
  isCircuitIdLocked = false
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchTerm: e.target.value, search: e.target.value });
  };

  const handleCircuitChange = (value: string) => {
    onFilterChange({ circuit: value ? Number(value) : undefined });
  };

  const handleFinalStepFilterChange = (value: string) => {
    let isFinalStep: boolean | undefined;
    
    if (value === 'yes') {
      isFinalStep = true;
    } else if (value === 'no') {
      isFinalStep = false;
    } else {
      isFinalStep = undefined;
    }
    
    onFilterChange({ isFinalStep });
  };

  const currentFinalStepFilter = (): string => {
    if (filterOptions.isFinalStep === true) return 'yes';
    if (filterOptions.isFinalStep === false) return 'no';
    return 'all';
  };

  return (
    <div className="bg-card border rounded-md p-4 mb-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Input
            placeholder="Search steps..."
            value={filterOptions.searchTerm || filterOptions.search || ''}
            onChange={handleSearchChange}
            className="pl-9"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <div>
          <Select
            value={filterOptions.circuit?.toString() || ''}
            onValueChange={handleCircuitChange}
            disabled={isCircuitIdLocked}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by circuit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Circuits</SelectItem>
              {circuits.map(circuit => (
                <SelectItem key={circuit.id} value={circuit.id.toString()}>
                  {circuit.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <RadioGroup 
            value={currentFinalStepFilter()} 
            onValueChange={handleFinalStepFilterChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Steps</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="final" />
              <Label htmlFor="final">Final Steps</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="not-final" />
              <Label htmlFor="not-final">Non-Final Steps</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={onResetFilters}>
          <X className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default StepsManagementFilters;
