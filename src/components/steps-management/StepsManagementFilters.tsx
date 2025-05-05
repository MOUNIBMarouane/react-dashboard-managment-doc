
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Circuit, StepFilterOptions } from "@/models/circuit";

export interface StepsManagementFiltersProps {
  circuits: Circuit[];
  filters: StepFilterOptions;  // Changed from filterOptions to filters
  onFilterChange: (newFilters: Partial<StepFilterOptions>) => void;
  onResetFilters: () => void;
  isCircuitIdLocked?: boolean;
}

const StepsManagementFilters: React.FC<StepsManagementFiltersProps> = ({
  circuits,
  filters,  // Changed from filterOptions to filters
  onFilterChange,
  onResetFilters,
  isCircuitIdLocked = false,
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {!isCircuitIdLocked && (
            <div>
              <label className="text-sm font-medium mb-1 block">Circuit</label>
              <Select
                value={filters.circuitId?.toString() || ""}
                onValueChange={(value) => onFilterChange({ circuitId: value ? parseInt(value) : undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Circuits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Circuits</SelectItem>
                  {circuits.map((circuit) => (
                    <SelectItem key={circuit.id} value={circuit.id.toString()}>
                      {circuit.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-1 block">Final Step</label>
            <Select
              value={filters.isFinalStep === undefined ? "" : filters.isFinalStep ? "true" : "false"}
              onValueChange={(value) =>
                onFilterChange({ 
                  isFinalStep: value === "" ? undefined : value === "true" 
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Steps" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Steps</SelectItem>
                <SelectItem value="true">Final Steps</SelectItem>
                <SelectItem value="false">Non-Final Steps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button variant="outline" className="w-full" onClick={onResetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepsManagementFilters;
