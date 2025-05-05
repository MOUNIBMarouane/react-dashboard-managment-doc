import { useEffect, useState } from "react";
import { useSubTypes } from "@/hooks/useSubTypes";
import { SubType } from "@/models/subtype";
import { SubTypesTable } from "./SubTypesTable";
import SubTypeListHeader from "./SubTypeListHeader";
import { SubTypeFilterBar } from "./SubTypeFilterBar";
import { useToast } from "@/hooks/use-toast";
import { SubTypeDialogs } from "./SubTypeDialogs";
import { DocumentType } from "@/models/document";
import { subTypeService } from "@/services/subtype";

interface SubTypesListProps {
  documentType: DocumentType;
}

export default function SubTypesList({ documentType }: SubTypesListProps) {
  const { toast } = useToast();

  // SubTypes state from hook
  const {
    subTypes,
    isLoading,
    error,
    fetchSubTypes,
    handleCreate,
    handleEdit,
    handleDelete,
    createDialogOpen,
    setCreateDialogOpen,
    editDialogOpen,
    setEditDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedSubType,
    setSelectedSubType,
  } = useSubTypes(documentType.id);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);
  const [filteredSubTypes, setFilteredSubTypes] = useState<SubType[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Initial load
  useEffect(() => {
    fetchSubTypes();
  }, [documentType.id, fetchSubTypes]);

  // Apply filters
  useEffect(() => {
    if (!subTypes) return;

    setIsFiltering(true);

    // Apply filters logic
    let filtered = [...subTypes];

    // Filter by active status
    if (activeOnly) {
      filtered = filtered.filter((subType) => subType.isActive);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (subType) =>
          subType.name?.toLowerCase().includes(query) ||
          subType.description?.toLowerCase().includes(query)
      );
    }

    // Filter by start date
    if (startDateFilter) {
      filtered = filtered.filter((subType) => {
        const startDate = subType.startDate
          ? new Date(subType.startDate)
          : null;
        return startDate && startDate >= startDateFilter;
      });
    }

    // Filter by end date
    if (endDateFilter) {
      filtered = filtered.filter((subType) => {
        const endDate = subType.endDate ? new Date(subType.endDate) : null;
        return endDate && endDate <= endDateFilter;
      });
    }

    setFilteredSubTypes(filtered);
    setIsFiltering(false);
  }, [subTypes, searchQuery, activeOnly, startDateFilter, endDateFilter]);

  const handleCreate = async (formData: any) => {
    try {
      await subTypeService.createSubType(formData);
      toast({
        title: "Success",
        description: "SubType created successfully",
      });
      fetchSubTypes();
      setCreateDialogOpen(false);
    } catch (error: any) {
      console.error('Error creating subtype:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create subtype",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (formData: any) => {
    if (!selectedSubType) return;
    try {
      await subTypeService.updateSubType(selectedSubType.id, formData);
      toast({
        title: "Success",
        description: "SubType updated successfully",
      });
      fetchSubTypes();
      setEditDialogOpen(false);
    } catch (error: any) {
      console.error('Error updating subtype:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update subtype",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedSubType) return;
    try {
      await subTypeService.deleteSubType(selectedSubType.id);
      toast({
        title: "Success",
        description: "SubType deleted successfully",
      });
      fetchSubTypes();
      setDeleteDialogOpen(false);
    } catch (error: any) {
      console.error('Error deleting subtype:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete subtype",
        variant: "destructive",
      });
    }
  };

  const applyFilters = () => {
    // Filters are applied automatically via useEffect
    toast({
      title: "Filters Applied",
      description: "The table has been filtered based on your criteria.",
      variant: "default",
    });
  };

  const resetFilters = () => {
    setActiveOnly(false);
    setStartDateFilter(null);
    setEndDateFilter(null);
    setSearchQuery("");
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
      variant: "default",
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <SubTypeListHeader
        documentTypeName={documentType.typeName}
        onCreateClick={handleCreateClick}
      />

      <SubTypeFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeOnly={activeOnly}
        setActiveOnly={setActiveOnly}
        startDateFilter={startDateFilter}
        setStartDateFilter={setStartDateFilter}
        endDateFilter={endDateFilter}
        setEndDateFilter={setEndDateFilter}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />

      <SubTypesTable
        subTypes={filteredSubTypes}
        isLoading={isLoading || isFiltering}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <SubTypeDialogs
        createDialogOpen={createDialogOpen}
        setCreateDialogOpen={setCreateDialogOpen}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        selectedSubType={selectedSubType}
        documentTypeId={documentType.id}
        onCreateSubmit={handleCreate}
        onEditSubmit={handleEdit}
        onDeleteConfirm={handleDelete}
      />
    </div>
  );
}
