
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Step, StepFilterOptions } from '@/models/step';
import circuitService from '@/services/circuitService';
import stepService from '@/services/stepService';

export function useSteps(initialFilter?: StepFilterOptions) {
  const queryClient = useQueryClient();
  const [filterOptions, setFilterOptions] = useState<StepFilterOptions>(initialFilter || {});
  const [selectedSteps, setSelectedSteps] = useState<number[]>([]);

  const {
    data: steps,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['steps', filterOptions],
    queryFn: async () => {
      const allSteps = await stepService.getAllSteps();
      if (!allSteps) return [];
      
      let filteredSteps = [...allSteps];
      
      // Apply filters
      if (filterOptions) {
        // Filter by circuit
        if (filterOptions.circuitId) {
          filteredSteps = filteredSteps.filter(step => 
            step.circuitId === filterOptions.circuitId
          );
        }
        
        // Filter by responsible role
        if (filterOptions.responsibleRoleId) {
          filteredSteps = filteredSteps.filter(step => 
            step.responsibleRoleId === filterOptions.responsibleRoleId
          );
        }
        
        // Filter by final step
        if (filterOptions.isFinalStep !== undefined) {
          filteredSteps = filteredSteps.filter(step => 
            step.isFinalStep === filterOptions.isFinalStep
          );
        }
        
        // Filter by search text
        if (filterOptions.search) {
          const searchLower = filterOptions.search.toLowerCase();
          filteredSteps = filteredSteps.filter(step =>
            step.title.toLowerCase().includes(searchLower) ||
            (step.descriptif?.toLowerCase().includes(searchLower))
          );
        }
      }
      
      return filteredSteps;
    },
  });

  const handleFilterChange = (newFilter: Partial<StepFilterOptions>) => {
    setFilterOptions(prev => ({
      ...prev,
      ...newFilter,
    }));
  };

  const handleCreateStep = async (stepData: Partial<Step>) => {
    try {
      if (!stepData.circuitId) {
        throw new Error('Circuit ID is required');
      }
      
      const createStepDto = {
        circuitId: stepData.circuitId,
        title: stepData.title || '',
        descriptif: stepData.descriptif || '',
        orderIndex: stepData.orderIndex || 0,
        responsibleRoleId: stepData.responsibleRoleId,
        isFinalStep: stepData.isFinalStep || false,
      };
      
      await circuitService.createStep(createStepDto);
      toast.success('Step created successfully');
      refetch();
    } catch (error: any) {
      console.error('Error creating step:', error);
      toast.error(error.message || 'Failed to create step');
      throw error;
    }
  };

  const handleUpdateStep = async (id: number, stepData: Partial<Step>) => {
    try {
      await circuitService.updateStep(id, stepData);
      toast.success('Step updated successfully');
      refetch();
    } catch (error: any) {
      console.error('Error updating step:', error);
      toast.error(error.message || 'Failed to update step');
      throw error;
    }
  };

  const handleDeleteStep = async (id: number) => {
    try {
      await circuitService.deleteStep(id);
      toast.success('Step deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['steps'] });
      refetch();
    } catch (error: any) {
      console.error('Error deleting step:', error);
      toast.error(error.message || 'Failed to delete step');
      throw error;
    }
  };

  const handleSelectStep = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedSteps(prev => [...prev, id]);
    } else {
      setSelectedSteps(prev => prev.filter(stepId => stepId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && steps) {
      setSelectedSteps(steps.map(step => step.id));
    } else {
      setSelectedSteps([]);
    }
  };

  useEffect(() => {
    // Reset selected steps when filter changes
    setSelectedSteps([]);
  }, [filterOptions]);

  return {
    steps: steps || [],
    isLoading,
    error,
    filterOptions,
    setFilterOptions,
    handleFilterChange,
    selectedSteps,
    handleSelectStep,
    handleSelectAll,
    handleCreateStep,
    handleUpdateStep,
    handleDeleteStep,
    refetch,
  };
}
