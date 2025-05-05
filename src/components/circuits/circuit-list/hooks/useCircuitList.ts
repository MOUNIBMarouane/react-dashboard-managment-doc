import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import circuitService from '@/services/circuitService';
import { DateRange } from 'react-day-picker';

// Define the search column type
type SearchColumn = "code" | "title" | "description";

interface UseCircuitListProps {
  onApiError?: (errorMessage: string) => void;
  searchQuery: string;
  dateRange?: DateRange;
  flowType?: string;
  searchColumns?: SearchColumn[];
  refreshTrigger?: number;
}

export function useCircuitList({ 
  onApiError, 
  searchQuery, 
  dateRange, 
  flowType,
  searchColumns = ["code", "title", "description"],
  refreshTrigger = 0
}: UseCircuitListProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);
  const [noSearchResults, setNoSearchResults] = useState(false);

  const { 
    data: circuits, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ['circuits'],
    queryFn: async () => {
      console.log('Fetching all circuits from API');
      try {
        const data = await circuitService.getAllCircuits();
        console.log(`Successfully fetched ${data.length} circuits`);
        return data;
      } catch (error) {
        console.error('Error fetching circuits:', error);
        throw error;
      }
    },
    staleTime: 0, // Always consider data stale for fresh fetch
    gcTime: 5 * 60 * 1000, // Garbage collection after 5 minutes of inactivity
    refetchOnMount: true, // Refetch when the component mounts
    refetchOnWindowFocus: true, // Refetch when window gets focus
    meta: {
      onSettled: (data, err) => {
        if (err) {
          const errorMessage = err instanceof Error 
            ? err.message 
            : 'Failed to load circuits. Please try again later.';
          console.error('Circuit list error:', err);
          if (onApiError) onApiError(errorMessage);
        }
      }
    }
  });

  // Force refetch when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger > 0) {
      console.log('Refresh trigger activated, refetching circuits');
      refetch();
    }
  }, [refreshTrigger, refetch]);

  // Filter circuits based on search query, date range, and flow type
  const filteredCircuits = circuits
    ? circuits.filter(circuit => {
        // Text search filter - only search in selected columns
        const matchesSearch = !searchQuery || searchColumns.some(column => {
          if (column === "code" && circuit.circuitKey) {
            return circuit.circuitKey.toLowerCase().includes(searchQuery.toLowerCase());
          }
          if (column === "title" && circuit.title) {
            return circuit.title.toLowerCase().includes(searchQuery.toLowerCase());
          }
          if (column === "description" && circuit.descriptif) {
            return circuit.descriptif.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        });
        
        // Date range filter
        let matchesDateRange = true;
        if (dateRange && dateRange.from) {
          const circuitDate = new Date(circuit.createdAt); // Using createdAt as the date field
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);

          if (dateRange.to) {
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999);
            matchesDateRange = circuitDate >= fromDate && circuitDate <= toDate;
          } else {
            matchesDateRange = circuitDate >= fromDate;
          }
        }
        
        // Flow type filter
        let matchesFlowType = true;
        if (flowType) {
          matchesFlowType = flowType === 'sequential' 
            ? circuit.hasOrderedFlow 
            : !circuit.hasOrderedFlow;
        }
        
        return matchesSearch && matchesDateRange && matchesFlowType;
      })
    : [];
    
  // Set a flag when search has results
  const hasSearchResults = searchQuery !== '' && filteredCircuits && filteredCircuits.length > 0;
  
  // Set a flag when search has no results
  const hasNoSearchResults = searchQuery !== '' && filteredCircuits && filteredCircuits.length === 0;

  // Dialog handlers
  const handleEdit = (circuit: Circuit) => {
    setSelectedCircuit(circuit);
    setEditDialogOpen(true);
  };

  const handleDelete = (circuit: Circuit) => {
    setSelectedCircuit(circuit);
    setDeleteDialogOpen(true);
  };

  const handleViewDetails = (circuit: Circuit) => {
    setSelectedCircuit(circuit);
    setDetailsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCircuit) return;
    
    try {
      await circuitService.deleteCircuit(selectedCircuit.id);
      setDeleteDialogOpen(false);
      toast.success("Circuit deleted successfully");
      refetch();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to delete circuit';
      toast.error(errorMessage);
      if (onApiError) onApiError(errorMessage);
      console.error(error);
    }
  };

  return {
    circuits: filteredCircuits,
    isLoading,
    isError,
    selectedCircuit,
    editDialogOpen,
    setEditDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    detailsDialogOpen,
    setDetailsDialogOpen,
    handleEdit,
    handleDelete,
    handleViewDetails,
    confirmDelete,
    refetch,
    hasSearchResults,
    hasNoSearchResults,
    searchQuery
  };
}
