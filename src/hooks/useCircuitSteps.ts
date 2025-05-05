import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import circuitService from '@/services/circuitService';
import stepService from '@/services/stepService';

export function useCircuitSteps(circuitId: string) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSteps, setSelectedSteps] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [apiError, setApiError] = useState('');
  
  // Fetch the circuit
  const {
    data: circuit,
    isLoading: isCircuitLoading,
    isError: isCircuitError,
    error: circuitError,
    refetch: refetchCircuit
  } = useQuery({
    queryKey: ['circuit', circuitId],
    queryFn: () => circuitService.getCircuitById(Number(circuitId)),
    enabled: !!circuitId && circuitId !== '0',
    staleTime: 1000, // Consider data stale after 1 second
    gcTime: 5 * 60 * 1000, // Garbage collection after 5 minutes of inactivity
    refetchOnMount: true, // Refetch when the component mounts
    refetchOnWindowFocus: true,
    meta: {
      onSettled: (data, err) => {
        if (err) {
          const errorMessage = err instanceof Error 
            ? err.message 
            : 'Failed to load circuit';
          setApiError(errorMessage);
        }
      }
    }
  });
  
  // Fetch the steps for this circuit
  const {
    data: circuitSteps = [],
    isLoading: isStepsLoading,
    isError: isStepsError,
    error: stepsError,
    refetch: refetchStepsQuery
  } = useQuery({
    queryKey: ['circuit-steps', circuitId],
    queryFn: () => {
      if (circuitId && circuitId !== '0') {
        return stepService.getStepsByCircuitId(Number(circuitId));
      }
      return Promise.resolve([]);
    },
    enabled: !!circuitId && circuitId !== '0' && !isCircuitError,
    staleTime: 1000, // Consider data stale after 1 second
    gcTime: 5 * 60 * 1000, // Garbage collection after 5 minutes of inactivity
    refetchOnMount: true, // Refetch when the component mounts
    refetchOnWindowFocus: true,
    retry: 2,
    meta: {
      onSettled: (data, err) => {
        if (err) {
          const errorMessage = err instanceof Error 
            ? err.message 
            : 'Failed to load steps';
          setApiError(errorMessage);
        }
      }
    }
  });
  
  // Combine both refetch functions into one
  const refetchSteps = useCallback(() => {
    refetchCircuit();
    refetchStepsQuery();
  }, [refetchCircuit, refetchStepsQuery]);
  
  // Explicitly refetch data when circuit ID changes
  useEffect(() => {
    if (circuitId && circuitId !== '0') {
      refetchSteps();
    }
  }, [circuitId, refetchSteps]);
  
  // Filter steps based on search query
  const steps = circuitSteps?.filter(step => {
    if (!searchQuery) return true;
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      step.title.toLowerCase().includes(lowerCaseQuery) ||
      step.descriptif?.toLowerCase().includes(lowerCaseQuery) ||
      step.stepKey.toLowerCase().includes(lowerCaseQuery)
    );
  }) || [];
  
  // Reset selections when changing circuits
  useEffect(() => {
    setSelectedSteps([]);
  }, [circuitId]);
  
  // Handle step selection
  const handleStepSelection = (id: number, checked: boolean) => {
    setSelectedSteps(prev => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter(stepId => stepId !== id);
      }
    });
  };
  
  // Handle select all steps
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allStepIds = steps.map(step => step.id);
      setSelectedSteps(allStepIds);
    } else {
      setSelectedSteps([]);
    }
  };
  
  const isLoading = isCircuitLoading || isStepsLoading;
  const isError = isCircuitError || isStepsError;
  
  return {
    circuit,
    steps,
    searchQuery,
    selectedSteps,
    apiError,
    viewMode,
    isLoading,
    isError,
    setSearchQuery,
    handleStepSelection,
    handleSelectAll,
    setViewMode,
    setSelectedSteps,
    refetchSteps
  };
}
