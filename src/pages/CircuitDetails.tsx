
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { fetchCircuitById } from "@/services/circuitService";
import { fetchCircuitDetails } from "@/services/circuitDetailService";
import { Circuit, CircuitDetail } from "@/types/circuit";
import CircuitDetailsCard from "@/components/circuit-details/CircuitDetailsCard";
import CircuitDetailsList from "@/components/circuit-details/CircuitDetailsList";
import AddEditCircuitDetailDialog from "@/components/circuit-details/AddEditCircuitDetailDialog";
import DeleteCircuitDetailDialog from "@/components/circuit-details/DeleteCircuitDetailDialog";
import CircuitDocumentBoard from "@/components/circuit-details/CircuitDocumentBoard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocumentManagement } from "@/hooks/useDocumentManagement";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CircuitDetails = () => {
  const { circuitId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const documentId = queryParams.get("documentId");
  const { documents } = useDocumentManagement();
  
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [detailToEdit, setDetailToEdit] = useState(null);
  const [detailToDelete, setDetailToDelete] = useState(null);

  // Fetch circuit
  const { 
    data: circuit,
    isLoading: isCircuitLoading,
    error: circuitError 
  } = useQuery({
    queryKey: ['circuit', circuitId],
    queryFn: () => fetchCircuitById(circuitId as string),
  });

  // Fetch circuit details
  const { 
    data: details,
    isLoading: isDetailsLoading,
    error: detailsError,
    refetch: refetchDetails
  } = useQuery({
    queryKey: ['circuitDetails', circuitId],
    queryFn: () => fetchCircuitDetails(circuitId as string),
  });

  // Handle editing circuit
  const handleEditCircuit = (id: string) => {
    // Implementation would go here
    toast.info("Edit circuit functionality would go here");
  };

  // Handle adding circuit detail
  const handleAddDetail = () => {
    setDetailToEdit(null);
    setIsAddEditDialogOpen(true);
  };

  // Handle editing circuit detail
  const handleEditDetail = (detailId: string) => {
    const detail = details?.find(d => d.id === detailId);
    if (detail) {
      setDetailToEdit(detail);
      setIsAddEditDialogOpen(true);
    }
  };

  // Handle deleting circuit detail
  const handleDeleteDetail = (detailId: string) => {
    const detail = details?.find(d => d.id === detailId);
    if (detail) {
      setDetailToDelete(detail);
      setIsDeleteDialogOpen(true);
    }
  };

  // Save detail handler
  const handleSaveDetail = async (detail) => {
    // This would be implemented with actual logic to save the detail
    toast.success(`Detail ${detailToEdit ? 'updated' : 'added'} successfully`);
    setIsAddEditDialogOpen(false);
    refetchDetails();
  };

  // Delete detail handler
  const handleConfirmDelete = async () => {
    // This would be implemented with actual logic to delete the detail
    toast.success("Detail deleted successfully");
    setIsDeleteDialogOpen(false);
    refetchDetails();
  };

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
              <ArrowLeft className="mr-2 h-4 w-4" />
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
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/circuits')} 
            className="border-white/10 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Circuits
          </Button>
          <h1 className="text-2xl font-bold text-white">Circuit Details</h1>
        </div>
        
        <CircuitDetailsCard circuit={circuit} onEdit={handleEditCircuit} />
        
        <Tabs defaultValue={documentId ? "documents" : "details"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-dashboard-blue-dark/50 border border-white/10">
            <TabsTrigger value="details" className="text-white data-[state=active]:bg-dashboard-accent">
              Circuit Steps
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-white data-[state=active]:bg-dashboard-accent">
              Document Board
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-4">
            <CircuitDetailsList
              details={details || []}
              onAddDetail={handleAddDetail}
              onEditDetail={handleEditDetail}
              onDeleteDetail={handleDeleteDetail}
              isLoading={isDetailsLoading}
            />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-4">
            <CircuitDocumentBoard
              circuitId={circuitId || ""}
              circuitDetails={details || []}
              documents={documents}
              currentDocumentId={documentId || ""}
            />
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        {/* These would be properly implemented with actual functionality */}
        <AddEditCircuitDetailDialog
          isOpen={isAddEditDialogOpen}
          onOpenChange={setIsAddEditDialogOpen}
          onSave={handleSaveDetail}
          detailToEdit={detailToEdit}
          circuitId={circuitId || ""}
        />
        
        <DeleteCircuitDetailDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onDelete={handleConfirmDelete}
          detailName={detailToDelete?.title || ""}
        />
      </div>
    </Layout>
  );
};

export default CircuitDetails;
