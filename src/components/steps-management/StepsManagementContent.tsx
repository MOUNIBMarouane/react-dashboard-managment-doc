
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Step, StepFilterOptions } from "@/models/circuit";
import stepService from "@/services/stepService";
import { Circuit } from "@/models/circuit";
import StepsTable from "./StepsTable";
import StepsManagementFilters from "./StepsManagementFilters";
import { StepsManagementHeader } from "./StepsManagementHeader";

export interface StepsManagementContentProps {
  onEdit?: (step: Step) => void;
  onDelete?: (stepId: number) => void;
  onViewDetails?: (step: Step) => void;
  circuitId?: number;
}

export function StepsManagementContent({
  onEdit,
  onDelete,
  onViewDetails,
  circuitId,
}: StepsManagementContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState<StepFilterOptions>({
    circuit: circuitId,
  });

  // Query to get steps
  const {
    data: steps = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["steps", filterOptions],
    queryFn: async () => {
      if (circuitId) {
        return stepService.getStepsByCircuitId(circuitId);
      }
      return stepService.getAllSteps();
    },
  });

  // Query to get circuits for filter
  const { data: circuits = [] } = useQuery({
    queryKey: ["circuits-for-steps"],
    queryFn: () => stepService.getAllCircuits(),
    enabled: !circuitId, // Only fetch if not filtering by a specific circuit
  });

  // Filter steps based on searchQuery
  const filteredSteps = steps.filter((step) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      step.title?.toLowerCase().includes(query) ||
      step.descriptif?.toLowerCase().includes(query) ||
      step.stepKey?.toLowerCase().includes(query)
    );
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<StepFilterOptions>) => {
    setFilterOptions((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilterOptions({
      circuit: circuitId, // Keep the original circuitId if it was provided
    });
    setSearchQuery("");
  };

  useEffect(() => {
    // Update filters when circuitId prop changes
    if (circuitId !== undefined) {
      setFilterOptions((prev) => ({ ...prev, circuit: circuitId }));
    }
  }, [circuitId]);

  return (
    <div className="space-y-4">
      <StepsManagementHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <StepsManagementFilters
        circuits={circuits}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        isCircuitIdLocked={!!circuitId}
      />

      <StepsTable
        steps={filteredSteps}
        isLoading={isLoading}
        isError={isError}
        onEdit={onEdit}
        onDelete={onDelete}
        onViewDetails={onViewDetails}
      />
    </div>
  );
}
