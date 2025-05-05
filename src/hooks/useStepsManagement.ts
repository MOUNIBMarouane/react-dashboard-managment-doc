
import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Step } from '@/models/circuit';
import stepService from '@/services/stepService';
import circuitService from '@/services/circuitService';
import { StepFilterOptions } from '@/models/circuit';

interface UseStepsManagementProps {
  initialFilters?: StepFilterOptions;
}

export function useStepsManagement({ initialFilters = {} }: UseStepsManagementProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState<StepFilterOptions>(initialFilters);
  const [selectedSteps, setSelectedSteps] = useState<number[]>([]);
  const [sortField, setSortField] = useState<string | null>('orderIndex');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const queryClient = useQueryClient();

  // Reset selected items when filters change
  useEffect(() => {
    setSelectedSteps([]);
  }, [filterOptions, searchQuery]);

  // Fetch steps with search and filters
  const {
    data: steps = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['steps', filterOptions, searchQuery],
    queryFn: async () => {
      // Apply filters, search, and sorting
      const filteredSteps = await stepService.getAllSteps();
      
      // Apply search
      let results = searchQuery
        ? filteredSteps.filter(
            (step) =>
              step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              step.descriptif?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : filteredSteps;
      
      // Apply filters
      if (filterOptions.circuitId) {
        results = results.filter((step) => step.circuitId === filterOptions.circuitId);
      }
      
      if (filterOptions.responsibleRoleId) {
        results = results.filter(
          (step) => step.responsibleRoleId === filterOptions.responsibleRoleId
        );
      }
      
      if (filterOptions.isFinalStep !== undefined) {
        results = results.filter((step) => step.isFinalStep === filterOptions.isFinalStep);
      }
      
      return results;
    },
  });

  // Fetch circuits for filtering
  const { data: circuits = [] } = useQuery({
    queryKey: ['circuits'],
    queryFn: circuitService.getAllCircuits,
  });

  // Sort steps based on field and direction
  const sortedSteps = useMemo(() => {
    if (!steps || steps.length === 0) return [];
    
    const sorted = [...steps];
    
    if (sortField) {
      sorted.sort((a, b) => {
        if (sortField === 'title' || sortField === 'descriptif') {
          const aValue = (a as any)[sortField]?.toLowerCase() || '';
          const bValue = (b as any)[sortField]?.toLowerCase() || '';
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        } else if (sortField === 'orderIndex') {
          return sortDirection === 'asc' 
            ? a.orderIndex - b.orderIndex 
            : b.orderIndex - a.orderIndex;
        } else if (sortField === 'isFinalStep') {
          return sortDirection === 'asc' 
            ? (a.isFinalStep ? 1 : 0) - (b.isFinalStep ? 1 : 0)
            : (b.isFinalStep ? 1 : 0) - (a.isFinalStep ? 1 : 0);
        }
        return 0;
      });
    }
    
    return sorted;
  }, [steps, sortField, sortDirection]);

  // CRUD operations
  const createStepMutation = useMutation({
    mutationFn: stepService.createStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
      toast.success('Step created successfully');
    },
    onError: (error) => {
      console.error('Error creating step:', error);
      toast.error('Failed to create step');
    },
  });

  const updateStepMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => stepService.updateStep(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
      toast.success('Step updated successfully');
    },
    onError: (error) => {
      console.error('Error updating step:', error);
      toast.error('Failed to update step');
    },
  });

  const deleteStepMutation = useMutation({
    mutationFn: stepService.deleteStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
      toast.success('Step deleted successfully');
      setSelectedSteps([]);
    },
    onError: (error) => {
      console.error('Error deleting step:', error);
      toast.error('Failed to delete step');
    },
  });

  const deleteMultipleStepsMutation = useMutation({
    mutationFn: stepService.deleteMultipleSteps,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
      toast.success('Steps deleted successfully');
      setSelectedSteps([]);
    },
    onError: (error) => {
      console.error('Error deleting steps:', error);
      toast.error('Failed to delete steps');
    },
  });

  // Selection handlers
  const handleSelectStep = (stepId: number, checked: boolean) => {
    if (checked) {
      setSelectedSteps((prev) => [...prev, stepId]);
    } else {
      setSelectedSteps((prev) => prev.filter((id) => id !== stepId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = sortedSteps.map((step) => step.id);
      setSelectedSteps(allIds);
    } else {
      setSelectedSteps([]);
    }
  };

  // Sorting handler
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter handler
  const resetFilters = () => {
    setFilterOptions({});
    setSearchQuery('');
  };

  return {
    steps: sortedSteps,
    isLoading: isLoading || isFetching,
    selectedSteps,
    sortField,
    sortDirection,
    searchQuery,
    filterOptions,
    circuits,
    handleSelectStep,
    handleSelectAll,
    handleSort,
    setSearchQuery,
    setFilterOptions,
    resetFilters,
    createStep: createStepMutation.mutateAsync,
    updateStep: updateStepMutation.mutateAsync,
    deleteStep: deleteStepMutation.mutateAsync,
    deleteMultipleSteps: deleteMultipleStepsMutation.mutateAsync,
    refetch,
  };
}
