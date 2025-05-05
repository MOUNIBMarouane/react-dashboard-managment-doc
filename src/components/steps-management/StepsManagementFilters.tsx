
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Circuit, StepFilterOptions } from "@/models/circuit";

interface StepsManagementFiltersProps {
  circuits: Circuit[];
  filterOptions: StepFilterOptions;
  onFilterChange: (newFilters: Partial<StepFilterOptions>) => void;
  onResetFilters: () => void;
  isCircuitIdLocked?: boolean;
}

export function StepsManagementFilters({
  circuits,
  filterOptions,
  onFilterChange,
  onResetFilters,
  isCircuitIdLocked = false
}: StepsManagementFiltersProps) {
  return (
    <div className="bg-card border rounded-md p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {!isCircuitIdLocked && (
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium mb-1">Circuit</label>
            <Select
              value={filterOptions.circuitId ? String(filterOptions.circuitId) : ''}
              onValueChange={(value) => onFilterChange({ circuitId: value ? Number(value) : undefined })}
              disabled={isCircuitIdLocked}
            >
              <SelectTrigger>
                <SelectValue placeholder="All circuits" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All circuits</SelectItem>
                {circuits.map((circuit) => (
                  <SelectItem key={circuit.id} value={String(circuit.id)}>
                    {circuit.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Final step</label>
          <Select
            value={filterOptions.isFinalStep !== undefined ? String(filterOptions.isFinalStep) : ''}
            onValueChange={(value) => {
              if (value === '') {
                onFilterChange({ isFinalStep: undefined });
              } else {
                onFilterChange({ isFinalStep: value === 'true' });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All steps" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All steps</SelectItem>
              <SelectItem value="true">Final steps</SelectItem>
              <SelectItem value="false">Non-final steps</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button variant="outline" onClick={onResetFilters}>
            Reset filters
          </Button>
        </div>
      </div>
    </div>
  );
}
