
import React, { useState } from "react";
import Layout from "../components/Layout";
import TypeTable from "@/components/types/TypeTable";
import DeleteTypeDialog from "@/components/types/DeleteTypeDialog";
import TypesHeader from "@/components/types/TypesHeader";
import UserPagination from "@/components/users/UserPagination";  // Reusing from users
import AddEditTypeDialog from "@/components/types/AddEditTypeDialog";
import { useTypeManagement } from "@/hooks/useTypeManagement";
import { Type } from "@/types/type";

const Types = () => {
  const {
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
  } = useTypeManagement();

  const [typeToEdit, setTypeToEdit] = useState<Type | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenAddDialog = () => {
    setIsEditing(false);
    setTypeToEdit(undefined);
    setIsAddTypeDialogOpen(true);
  };

  const handleOpenEditDialog = (typeId: string) => {
    const type = types.find(t => t.id === typeId);
    if (type) {
      setTypeToEdit(type);
      setIsEditing(true);
      setIsAddTypeDialogOpen(true);
    }
  };

  const handleSaveType = (type: Type) => {
    if (isEditing && typeToEdit) {
      handleEditType({
        ...type,
        id: typeToEdit.id
      });
    } else {
      handleAddType(type);
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <TypesHeader 
          selectedTypes={selectedTypes} 
          onOpenDeleteDialog={() => setIsDeleteDialogOpen(true)}
          onOpenAddTypeDialog={handleOpenAddDialog}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        <TypeTable 
          types={paginatedTypes}
          selectedTypes={selectedTypes}
          onSelectType={handleSelectType}
          onSelectAll={handleSelectAll}
          onSingleDelete={handleSingleDelete}
          onEdit={handleOpenEditDialog}
        />
        
        {filteredTypes.length === 0 && (
          <div className="text-center py-8 text-white/60">
            No types found matching "{searchQuery}"
          </div>
        )}
        
        {filteredTypes.length > 0 && (
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            filteredCount={filteredTypes.length}
            totalCount={types.length}
          />
        )}
      </div>
      
      <DeleteTypeDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedCount={selectedTypes.length}
        onDelete={deleteSelectedTypes}
      />

      <AddEditTypeDialog
        isOpen={isAddTypeDialogOpen}
        onOpenChange={setIsAddTypeDialogOpen}
        onSave={handleSaveType}
        typeToEdit={typeToEdit}
        isEditing={isEditing}
      />
    </Layout>
  );
};

export default Types;
