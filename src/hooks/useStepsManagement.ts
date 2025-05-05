
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import stepService from '@/services/stepService';
import { toast } from 'sonner';
import { Step, StepFilterOptions } from '@/models/circuit';

interface UseStepsManagementOptions {
  circuitId?: number;
  pageSize?: number;
  initialSearchQuery?: string;
  initialFilterOptions?: StepFilterOptions;
}

export function useStepsManagement(options: UseStepsManagementOptions = {}) {
  const { circuitId, pageSize = 10, initialSearchQuery = '', initialFilterOptions = {} } = options;
  
  // State for steps management
  const [selectedSteps, setSelectedSteps] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filterOptions, setFilterOptions] = useState<StepFilterOptions>(initialFilterOptions);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  
  // Fetch steps data
  const {
    data: allSteps = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['steps', circuitId],
    queryFn: () => circuitId 
      ? stepService.getStepsByCircuitId(circuitId) 
      : stepService.getAllSteps(),
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast.error('Failed to load steps data');
        }
      }
    }
  });
  
  // Fetch circuits for filtering
  const { data: circuits = [] } = useQuery({
    queryKey: ['circuits-list'],
    queryFn: () => stepService.getAllCircuits()
  });
  
  // Filter, sort, and paginate steps
  const filteredSteps = useMemo(() => {
    let result = [...allSteps];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(step => 
        step.title.toLowerCase().includes(query) ||
        step.descriptif?.toLowerCase().includes(query) ||
        step.stepKey?.toLowerCase().includes(query)
      );
    }
    
    // Apply other filters
    if (filterOptions.circuit && filterOptions.circuit > 0) {
      result = result.filter(step => step.circuitId === filterOptions.circuit);
    }
    
    if (filterOptions.responsibleRole && filterOptions.responsibleRole > 0) {
      result = result.filter(step => step.responsibleRoleId === filterOptions.responsibleRole);
    }
    
    if (filterOptions.isFinalStep !== undefined) {
      result = result.filter(step => step.isFinalStep === filterOptions.isFinalStep);
    }
    
    // Apply sorting
    if (sortField) {
      result = [...result].sort((a, b) => {
        const valueA = a[sortField as keyof Step];
        const valueB = b[sortField as keyof Step];
        
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortDirection === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
        
        // Default comparison for non-string values
        if (valueA == null) return sortDirection === 'asc' ? -1 : 1;
        if (valueB == null) return sortDirection === 'asc' ? 1 : -1;
        
        return sortDirection === 'asc'
          ? (valueA > valueB ? 1 : -1)
          : (valueA < valueB ? 1 : -1);
      });
    }
    
    return result;
  }, [allSteps, searchQuery, filterOptions, sortField, sortDirection]);
  
  // Paginate the filtered steps
  const paginatedSteps = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSteps.slice(startIndex, startIndex + pageSize);
  }, [filteredSteps, currentPage, pageSize]);
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredSteps.length / pageSize));
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterOptions, sortField, sortDirection]);
  
  // Handle step selection
  const handleSelectStep = (id: number, checked: boolean) => {
    setSelectedSteps(prev => 
      checked 
        ? [...prev, id]
        : prev.filter(stepId => stepId !== id)
    );
  };
  
  const handleSelectAll = (checked: boolean) => {
    setSelectedSteps(checked ? paginatedSteps.map(step => step.id) : []);
  };
  
  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilterOptions({});
    setSearchQuery('');
    setSortField(null);
    setSortDirection('asc');
    setCurrentPage(1);
  };
  
  return {
    // Data
    allSteps,
    steps: paginatedSteps,
    circuits,
    selectedSteps,
    isLoading,
    error,
    
    // Pagination
    currentPage,
    totalPages,
    
    // Filtering & Sorting
    searchQuery,
    filterOptions,
    sortField,
    sortDirection,
    viewMode,
    
    // Actions
    setSearchQuery,
    setFilterOptions,
    handleSelectStep,
    handleSelectAll,
    handleSort,
    setCurrentPage,
    setViewMode,
    resetFilters,
    refetch
  };
}
