
import React, { useState } from "react";
import Layout from "../components/Layout";
import CircuitTable from "@/components/circuits/CircuitTable";
import DeleteCircuitDialog from "@/components/circuits/DeleteCircuitDialog";
import CircuitsHeader from "@/components/circuits/CircuitsHeader";
import UserPagination from "@/components/users/UserPagination";  // Reusing from users
import AddEditCircuitDialog from "@/components/circuits/AddEditCircuitDialog";
import { useCircuitManagement } from "@/hooks/useCircuitManagement";
import { Circuit } from "@/types/circuit";

const Circuits = () => {
  const {
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
  } = useCircuitManagement();

  const [circuitToEdit, setCircuitToEdit] = useState<Circuit | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenAddDialog = () => {
    setIsEditing(false);
    setCircuitToEdit(undefined);
    setIsAddCircuitDialogOpen(true);
  };

  const handleOpenEditDialog = (circuitId: string) => {
    const circuit = circuits.find(c => c.id === circuitId);
    if (circuit) {
      setCircuitToEdit(circuit);
      setIsEditing(true);
      setIsAddCircuitDialogOpen(true);
    }
  };

  const handleSaveCircuit = async (circuit: Omit<Circuit, 'id' | 'created_at' | 'updated_at'>) => {
    if (isEditing && circuitToEdit) {
      await handleEditCircuit({
        ...circuit,
        id: circuitToEdit.id,
        created_at: circuitToEdit.created_at,
        updated_at: new Date().toISOString()
      });
    } else {
      await handleAddCircuit(circuit);
    }
    setIsAddCircuitDialogOpen(false);
  };

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <CircuitsHeader 
          selectedCircuits={selectedCircuits} 
          onOpenDeleteDialog={() => setIsDeleteDialogOpen(true)}
          onOpenAddCircuitDialog={handleOpenAddDialog}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        <CircuitTable 
          circuits={paginatedCircuits}
          selectedCircuits={selectedCircuits}
          onSelectCircuit={handleSelectCircuit}
          onSelectAll={handleSelectAll}
          onSingleDelete={handleSingleDelete}
          onEdit={handleOpenEditDialog}
          isLoading={isLoading}
        />
        
        {filteredCircuits.length === 0 && !isLoading && (
          <div className="text-center py-8 text-white/60">
            No circuits found matching "{searchQuery}"
          </div>
        )}
        
        {filteredCircuits.length > 0 && !isLoading && (
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            filteredCount={filteredCircuits.length}
            totalCount={circuits.length}
          />
        )}
      </div>
      
      <DeleteCircuitDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedCount={selectedCircuits.length}
        onDelete={deleteSelectedCircuits}
      />

      <AddEditCircuitDialog
        isOpen={isAddCircuitDialogOpen}
        onOpenChange={setIsAddCircuitDialogOpen}
        onSave={handleSaveCircuit}
        circuitToEdit={circuitToEdit}
        isEditing={isEditing}
      />
    </Layout>
  );
};

export default Circuits;
