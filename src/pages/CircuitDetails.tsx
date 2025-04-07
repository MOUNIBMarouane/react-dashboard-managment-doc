
import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CircuitDetailsCard from "@/components/circuit-details/CircuitDetailsCard";
import AddEditCircuitDetailDialog from "@/components/circuit-details/AddEditCircuitDetailDialog";
import DeleteCircuitDetailDialog from "@/components/circuit-details/DeleteCircuitDetailDialog";
import { useDocumentManagement } from "@/hooks/useDocumentManagement";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CircuitDetailsHeader from "@/components/circuit-details/CircuitDetailsHeader";
import CircuitDetailsTabs from "@/components/circuit-details/CircuitDetailsTabs";
import { useCircuitDetailsPage } from "@/hooks/useCircuitDetailsPage";

const CircuitDetails = () => {
  const { circuitId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const documentId = queryParams.get("documentId");
  const { documents } = useDocumentManagement();
  
  const {
    circuit,
    details,
    isCircuitLoading,
    isDetailsLoading,
    circuitError,
    detailsError,
    isAddEditDialogOpen,
    setIsAddEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    detailToEdit,
    detailToDelete,
    handleEditCircuit,
    handleAddDetail,
    handleEditDetail,
    handleDeleteDetail,
    handleSaveDetail,
    handleConfirmDelete,
  } = useCircuitDetailsPage(circuitId);

  if (isCircuitLoading || isDetailsLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-white/50" />
        </div>
      </Layout>
    );
  }

  if (circuitError || detailsError || !circuit) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12 text-white/60">
            Error loading circuit details
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate('/circuits')} 
              variant="outline"
              className="border-white/10 hover:bg-white/5"
            >
              Back to Circuits
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6">
        <CircuitDetailsHeader title="Circuit Details" />
        
        <CircuitDetailsCard circuit={circuit} onEdit={handleEditCircuit} />
        
        <CircuitDetailsTabs
          defaultTab={documentId ? "documents" : "details"}
          details={details || []}
          documents={documents}
          circuitId={circuitId || ""}
          currentDocumentId={documentId || ""}
          onAddDetail={handleAddDetail}
          onEditDetail={handleEditDetail}
          onDeleteDetail={handleDeleteDetail}
          isLoading={isDetailsLoading}
        />

        {/* Dialogs */}
        <AddEditCircuitDetailDialog
          isOpen={isAddEditDialogOpen}
          onOpenChange={setIsAddEditDialogOpen}
          onSave={handleSaveDetail}
          detailToEdit={detailToEdit}
          circuitId={circuitId || ""}
          isEditing={!!detailToEdit}
        />
        
        <DeleteCircuitDetailDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          detailTitle={detailToDelete?.title || ""}
        />
      </div>
    </Layout>
  );
};

export default CircuitDetails;
