
import { useState, useEffect, useMemo } from "react";
import { Type } from "@/types/type";
import { toast } from "sonner";

// Number of types per page
const TYPES_PER_PAGE = 5;

// Sample types data based on the database schema
const sampleTypes: Type[] = [
  {
    id: "1",
    typename: "Invoice",
    attribute: "Financial"
  },
  {
    id: "2",
    typename: "Quote",
    attribute: "Sales"
  },
  {
    id: "3",
    typename: "Report",
    attribute: "Administrative"
  },
  {
    id: "4",
    typename: "Contract",
    attribute: "Legal"
  },
  {
    id: "5",
    typename: "Proposal",
    attribute: "Marketing"
  },
  {
    id: "6",
    typename: "Receipt",
    attribute: "Financial"
  },
  {
    id: "7",
    typename: "Memo",
    attribute: "Administrative"
  }
];

export const useTypeManagement = (initialTypes: Type[] = sampleTypes) => {
  const [types, setTypes] = useState<Type[]>(initialTypes);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddTypeDialogOpen, setIsAddTypeDialogOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter types based on search query
  const filteredTypes = useMemo(() => {
    if (!searchQuery.trim()) return types;
    
    const query = searchQuery.toLowerCase().trim();
    return types.filter(type => 
      type.typename.toLowerCase().includes(query) || 
      type.attribute?.toLowerCase().includes(query)
    );
  }, [types, searchQuery]);
  
  // Calculate total pages based on filtered types array length
  const totalPages = Math.ceil(filteredTypes.length / TYPES_PER_PAGE);
  
  // Get current page data
  const paginatedTypes = useMemo(() => {
    const startIndex = (currentPage - 1) * TYPES_PER_PAGE;
    const endIndex = startIndex + TYPES_PER_PAGE;
    return filteredTypes.slice(startIndex, endIndex);
  }, [filteredTypes, currentPage]);
  
  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedTypes([]);
  }, [searchQuery]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedTypes([]);
  };
  
  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle select all checkbox (only for current page)
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTypes(paginatedTypes.map(type => type.id));
    } else {
      setSelectedTypes([]);
    }
  };
  
  // Handle individual type selection
  const handleSelectType = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId]);
    } else {
      setSelectedTypes(selectedTypes.filter(id => id !== typeId));
    }
  };
  
  // Delete selected types
  const deleteSelectedTypes = () => {
    setTypes(types.filter(type => !selectedTypes.includes(type.id)));
    setSelectedTypes([]);
    setIsDeleteDialogOpen(false);
    toast.success(`${selectedTypes.length} types deleted successfully`);
    
    if (currentPage > 1 && currentPage > Math.ceil((filteredTypes.length - selectedTypes.length) / TYPES_PER_PAGE)) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle single document deletion
  const handleSingleDelete = (typeId: string) => {
    setSelectedTypes([typeId]);
    setIsDeleteDialogOpen(true);
  };
  
  // Add new type
  const handleAddType = (newType: Type) => {
    setTypes([...types, {
      ...newType,
      id: (types.length + 1).toString()
    }]);
    toast.success(`Type "${newType.typename}" created successfully`);
  };

  // Edit type
  const handleEditType = (updatedType: Type) => {
    setTypes(types.map(type => 
      type.id === updatedType.id 
        ? { ...updatedType } 
        : type
    ));
    toast.success(`Type "${updatedType.typename}" updated successfully`);
  };

  return {
    types,
    selectedTypes,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isAddTypeDialogOpen,
    setIsAddTypeDialogOpen,
    searchQuery,
    currentPage,
    filteredTypes,
    totalPages,
    paginatedTypes,
    handlePageChange,
    handleSearchChange,
    handleSelectAll,
    handleSelectType,
    deleteSelectedTypes,
    handleSingleDelete,
    handleAddType,
    handleEditType
  };
};
