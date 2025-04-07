
import { useState, useEffect, useMemo } from "react";
import { Circuit } from "@/types/circuit";
import { toast } from "sonner";
import { CIRCUITS_PER_PAGE, sampleCircuits } from "@/config/circuitConfig";
import { filterCircuits, paginateCircuits, calculateTotalPages } from "@/utils/circuitUtils";
import { 
  fetchCircuits, 
  deleteCircuits, 
  addCircuit, 
  updateCircuit 
} from "@/services/circuitService";

export const useCircuitManagement = () => {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [selectedCircuits, setSelectedCircuits] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddCircuitDialogOpen, setIsAddCircuitDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch circuits from Supabase
  useEffect(() => {
    const loadCircuits = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCircuits();
        setCircuits(data);
      } catch (error) {
        console.error('Error fetching circuits:', error);
        toast.error('Failed to load circuits');
        setCircuits(sampleCircuits);
      } finally {
        setIsLoading(false);
      }
    };

    loadCircuits();
  }, []);
  
  // Filter circuits based on search query
  const filteredCircuits = useMemo(() => {
    return filterCircuits(circuits, searchQuery);
  }, [circuits, searchQuery]);
  
  // Calculate total pages based on filtered circuits array length
  const totalPages = useMemo(() => {
    return calculateTotalPages(filteredCircuits.length, CIRCUITS_PER_PAGE);
  }, [filteredCircuits]);
  
  // Get current page data
  const paginatedCircuits = useMemo(() => {
    return paginateCircuits(filteredCircuits, currentPage, CIRCUITS_PER_PAGE);
  }, [filteredCircuits, currentPage]);
  
  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedCircuits([]);
  }, [searchQuery]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedCircuits([]);
  };
  
  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle select all checkbox (only for current page)
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCircuits(paginatedCircuits.map(circuit => circuit.id));
    } else {
      setSelectedCircuits([]);
    }
  };
  
  // Handle individual circuit selection
  const handleSelectCircuit = (circuitId: string, checked: boolean) => {
    if (checked) {
      setSelectedCircuits([...selectedCircuits, circuitId]);
    } else {
      setSelectedCircuits(selectedCircuits.filter(id => id !== circuitId));
    }
  };
  
  // Delete selected circuits
  const deleteSelectedCircuits = async () => {
    try {
      // Delete from Supabase
      await deleteCircuits(selectedCircuits);
      
      // Update local state
      setCircuits(circuits.filter(circuit => !selectedCircuits.includes(circuit.id)));
      setSelectedCircuits([]);
      setIsDeleteDialogOpen(false);
      toast.success(`${selectedCircuits.length} circuits deleted successfully`);
      
      if (currentPage > 1 && currentPage > Math.ceil((filteredCircuits.length - selectedCircuits.length) / CIRCUITS_PER_PAGE)) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error('Error deleting circuits:', error);
      toast.error('Failed to delete circuits');
    }
  };

  // Handle single circuit deletion
  const handleSingleDelete = (circuitId: string) => {
    setSelectedCircuits([circuitId]);
    setIsDeleteDialogOpen(true);
  };
  
  // Add new circuit
  const handleAddCircuit = async (newCircuit: Omit<Circuit, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const addedCircuit = await addCircuit(newCircuit);
      
      // Update local state
      setCircuits([addedCircuit, ...circuits]);
      toast.success(`Circuit "${newCircuit.title}" created successfully`);
      return addedCircuit;
    } catch (error) {
      console.error('Error adding circuit:', error);
      toast.error('Failed to create circuit');
      return null;
    }
  };

  // Edit circuit
  const handleEditCircuit = async (updatedCircuit: Circuit) => {
    try {
      await updateCircuit(updatedCircuit);
      
      // Update local state
      setCircuits(circuits.map(circuit => 
        circuit.id === updatedCircuit.id 
          ? { ...updatedCircuit } 
          : circuit
      ));
      toast.success(`Circuit "${updatedCircuit.title}" updated successfully`);
      return updatedCircuit;
    } catch (error) {
      console.error('Error updating circuit:', error);
      toast.error('Failed to update circuit');
      return null;
    }
  };

  return {
    circuits,
    selectedCircuits,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isAddCircuitDialogOpen,
    setIsAddCircuitDialogOpen,
    searchQuery,
    currentPage,
    filteredCircuits,
    totalPages,
    paginatedCircuits,
    handlePageChange,
    handleSearchChange,
    handleSelectAll,
    handleSelectCircuit,
    deleteSelectedCircuits,
    handleSingleDelete,
    handleAddCircuit,
    handleEditCircuit,
    isLoading
  };
};
