
import { useState, useEffect } from 'react';
import stepService from '@/services/stepService';
import { Step, StepFilterOptions } from '@/models/circuit';
import { toast } from 'sonner';

export const useSteps = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [filteredSteps, setFilteredSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<StepFilterOptions>({});

  const fetchSteps = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await stepService.getAllSteps();
      
      if (Array.isArray(data)) {
        setSteps(data);
        applyFilters(data, filterOptions);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to fetch steps');
      toast.error('Failed to load steps');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (stepsData: Step[], options: StepFilterOptions) => {
    let filtered = [...stepsData];
    
    if (options.circuit) {
      filtered = filtered.filter(step => step.circuitId === options.circuit);
    }
    
    if (options.isFinalStep !== undefined) {
      filtered = filtered.filter(step => step.isFinalStep === options.isFinalStep);
    }
    
    if (options.searchTerm || options.search) {
      const search = (options.searchTerm || options.search || '').toLowerCase();
      filtered = filtered.filter(step => 
        step.title.toLowerCase().includes(search) ||
        (step.descriptif && step.descriptif.toLowerCase().includes(search))
      );
    }
    
    setFilteredSteps(filtered);
  };

  const updateFilters = (newFilters: Partial<StepFilterOptions>) => {
    const updatedFilters = { ...filterOptions, ...newFilters };
    setFilterOptions(updatedFilters);
    applyFilters(steps, updatedFilters);
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  useEffect(() => {
    applyFilters(steps, filterOptions);
  }, [filterOptions]);

  return {
    steps: filteredSteps,
    allSteps: steps,
    isLoading,
    error,
    fetchSteps,
    updateFilters,
    filterOptions
  };
};
