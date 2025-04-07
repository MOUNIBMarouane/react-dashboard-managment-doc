
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Circuit, CircuitDetail } from "@/types/circuit";
import { useCircuitManagement } from "@/hooks/useCircuitManagement";
import CircuitDetailsCard from "@/components/circuit-details/CircuitDetailsCard";
import AddEditCircuitDialog from "@/components/circuits/AddEditCircuitDialog";
import { toast } from "sonner";
import { fetchCircuitById } from "@/services/circuitService";
import CircuitDetailsList from "@/components/circuit-details/CircuitDetailsList";
import AddEditCircuitDetailDialog from "@/components/circuit-details/AddEditCircuitDetailDialog";
import DeleteCircuitDetailDialog from "@/components/circuit-details/DeleteCircuitDetailDialog";
import { 
  fetchCircuitDetails,
  addCircuitDetail,
  updateCircuitDetail,
  deleteCircuitDetail
} from "@/services/circuitDetailService";

const CircuitDetails = () => {
  const { circuitId } = useParams();
  const { circuits, handleEditCircuit } = useCircuitManagement();
  const [circuit, setCircuit] = useState<Circuit | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Circuit Details state
  const [circuitDetails, setCircuitDetails] = useState<CircuitDetail[]>([]);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDetailDialogOpen, setIsDeleteDetailDialogOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<CircuitDetail | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  // Fetch circuit data
  useEffect(() => {
    const loadCircuit = async () => {
      if (!circuitId) return;
      
      setIsLoading(true);
      try {
        const data = await fetchCircuitById(circuitId);
        
        if (data) {
          setCircuit(data as Circuit);
        } else {
          // Fallback to local state if not found in Supabase
          const foundCircuit = circuits.find(circuit => circuit.id === circuitId);
          setCircuit(foundCircuit || null);
        }
      } catch (error) {
        console.error("Error fetching circuit:", error);
        toast.error("Failed to load circuit details");
        
        // Fallback to local state on error
        const foundCircuit = circuits.find(circuit => circuit.id === circuitId);
        setCircuit(foundCircuit || null);
      } finally {
        setIsLoading(false);
      }
    };

    loadCircuit();
  }, [circuitId, circuits]);

  // Fetch circuit details
  useEffect(() => {
    const loadCircuitDetails = async () => {
      if (!circuitId) return;
      
      setIsLoadingDetails(true);
      try {
        const data = await fetchCircuitDetails(circuitId);
        setCircuitDetails(data);
      } catch (error) {
        console.error("Error fetching circuit details:", error);
        toast.error("Failed to load circuit details");
      } finally {
        setIsLoadingDetails(false);
      }
    };

    loadCircuitDetails();
  }, [circuitId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/10 rounded w-1/3"></div>
            <div className="h-40 bg-white/10 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!circuit) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12 text-white/60">
            Circuit not found
          </div>
        </div>
      </Layout>
    );
  }

  // Handle add circuit detail
  const handleAddDetail = () => {
    setSelectedDetail(null);
    setIsDetailDialogOpen(true);
  };

  // Handle edit circuit detail
  const handleEditDetail = (detailId: string) => {
    const detail = circuitDetails.find(d => d.id === detailId);
    if (detail) {
      setSelectedDetail(detail);
      setIsDetailDialogOpen(true);
    }
  };

  // Handle delete circuit detail
  const handleDeleteDetail = (detailId: string) => {
    const detail = circuitDetails.find(d => d.id === detailId);
    if (detail) {
      setSelectedDetail(detail);
      setIsDeleteDetailDialogOpen(true);
    }
  };

  // Handle save circuit detail (add or edit)
  const handleSaveDetail = async (detailData: Omit<CircuitDetail, 'id' | 'circuit_id' | 'created_at' | 'updated_at'>) => {
    try {
      if (selectedDetail) {
        // Edit existing detail
        const updatedDetail = await updateCircuitDetail({
          ...selectedDetail,
          ...detailData
        });
        
        setCircuitDetails(current => 
          current.map(d => d.id === selectedDetail.id ? updatedDetail : d)
        );
        
        toast.success(`Detail "${detailData.title}" updated successfully`);
      } else {
        // Add new detail
        const newDetail = await addCircuitDetail({
          ...detailData,
          circuit_id: circuitId || ''
        });
        
        setCircuitDetails(current => [newDetail, ...current]);
        toast.success(`Detail "${detailData.title}" added successfully`);
      }
      
      setIsDetailDialogOpen(false);
    } catch (error) {
      console.error("Error saving circuit detail:", error);
      toast.error(selectedDetail ? "Failed to update detail" : "Failed to add detail");
    }
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedDetail) return;
    
    try {
      await deleteCircuitDetail(selectedDetail.id);
      setCircuitDetails(current => current.filter(d => d.id !== selectedDetail.id));
      toast.success(`Detail "${selectedDetail.title}" deleted successfully`);
      setIsDeleteDetailDialogOpen(false);
    } catch (error) {
      console.error("Error deleting circuit detail:", error);
      toast.error("Failed to delete detail");
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-8">
        <h1 className="text-2xl font-bold text-white">Circuit Details</h1>
        
        <CircuitDetailsCard 
          circuit={circuit} 
          onEdit={handleOpenEditDialog}
        />
        
        <div className="pt-4">
          <CircuitDetailsList 
            details={circuitDetails}
            onAddDetail={handleAddDetail}
            onEditDetail={handleEditDetail}
            onDeleteDetail={handleDeleteDetail}
            isLoading={isLoadingDetails}
          />
        </div>
      </div>

      {/* Circuit Edit Dialog */}
      <AddEditCircuitDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveCircuit}
        circuitToEdit={circuit}
        isEditing={true}
      />

      {/* Circuit Detail Dialogs */}
      <AddEditCircuitDetailDialog 
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        onSave={handleSaveDetail}
        circuitId={circuitId || ''}
        detailToEdit={selectedDetail || undefined}
        isEditing={!!selectedDetail}
      />

      <DeleteCircuitDetailDialog 
        isOpen={isDeleteDetailDialogOpen}
        onOpenChange={setIsDeleteDetailDialogOpen}
        onConfirm={handleConfirmDelete}
        detailTitle={selectedDetail?.title}
      />
    </Layout>
  );

  function handleOpenEditDialog(circuitId: string) {
    setIsEditDialogOpen(true);
  }

  function handleSaveCircuit(updatedCircuitData: Omit<Circuit, 'id' | 'created_at' | 'updated_at'>) {
    if (!circuit) return;
    
    const updatedCircuit: Circuit = {
      ...circuit,
      ...updatedCircuitData,
      updated_at: new Date().toISOString()
    };
    
    const result = handleEditCircuit(updatedCircuit);
    if (result) {
      setCircuit(updatedCircuit);
    }
    setIsEditDialogOpen(false);
  }
};

export default CircuitDetails;
