
import { useState, useEffect, useMemo } from "react";
import { Circuit } from "@/types/circuit";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Number of circuits per page
const CIRCUITS_PER_PAGE = 5;

// Sample circuits data (will be replaced with actual data from Supabase)
const sampleCircuits: Circuit[] = [
  {
    id: "1",
    circuit_key: "CIR-001",
    title: "Approval Workflow",
    descriptif: "Standard document approval workflow",
    is_active: true,
    crd_counter: 3
  },
  {
    id: "2",
    circuit_key: "CIR-002", 
    title: "Review Process",
    descriptif: "Document review process for legal team",
    is_active: true,
    crd_counter: 2
  },
  {
    id: "3",
    circuit_key: "CIR-003",
    title: "Financial Validation",
    descriptif: "Workflow for financial document validation",
    is_active: false,
    crd_counter: 4
  }
];

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
    const fetchCircuits = async () => {
      try {
        setIsLoading(true);
        
        // Using any to bypass TypeScript errors until Supabase types are updated
        const { data, error } = await (supabase as any)
          .from('circuit')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          // Convert numeric IDs to strings for consistency
          setCircuits(data.map((circuit: any) => ({
            ...circuit,
            id: circuit.id.toString()
          })));
        } else {
          setCircuits(sampleCircuits);
        }
      } catch (error) {
        console.error('Error fetching circuits:', error);
        toast.error('Failed to load circuits');
        setCircuits(sampleCircuits);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCircuits();
  }, []);
  
  // Filter circuits based on search query
  const filteredCircuits = useMemo(() => {
    if (!searchQuery.trim()) return circuits;
    
    const query = searchQuery.toLowerCase().trim();
    return circuits.filter(circuit => 
      circuit.title.toLowerCase().includes(query) || 
      circuit.circuit_key.toLowerCase().includes(query) ||
      circuit.descriptif.toLowerCase().includes(query)
    );
  }, [circuits, searchQuery]);
  
  // Calculate total pages based on filtered circuits array length
  const totalPages = Math.ceil(filteredCircuits.length / CIRCUITS_PER_PAGE);
  
  // Get current page data
  const paginatedCircuits = useMemo(() => {
    const startIndex = (currentPage - 1) * CIRCUITS_PER_PAGE;
    const endIndex = startIndex + CIRCUITS_PER_PAGE;
    return filteredCircuits.slice(startIndex, endIndex);
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
      const { error } = await (supabase as any)
        .from('circuit')
        .delete()
        .in('id', selectedCircuits.map(id => parseInt(id)));

      if (error) throw error;
      
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
      // Add to Supabase
      const { data, error } = await (supabase as any)
        .from('circuit')
        .insert([newCircuit])
        .select();

      if (error) throw error;
      
      if (data && data.length > 0) {
        const addedCircuit: Circuit = { 
          ...data[0], 
          id: data[0].id.toString() 
        };
        
        // Update local state
        setCircuits([addedCircuit, ...circuits]);
        toast.success(`Circuit "${newCircuit.title}" created successfully`);
        return addedCircuit;
      }
      
      throw new Error('No data returned from insert operation');
    } catch (error) {
      console.error('Error adding circuit:', error);
      toast.error('Failed to create circuit');
      return null;
    }
  };

  // Edit circuit
  const handleEditCircuit = async (updatedCircuit: Circuit) => {
    try {
      const { error } = await (supabase as any)
        .from('circuit')
        .update({
          circuit_key: updatedCircuit.circuit_key,
          title: updatedCircuit.title,
          descriptif: updatedCircuit.descriptif,
          is_active: updatedCircuit.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', parseInt(updatedCircuit.id));

      if (error) throw error;
      
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
