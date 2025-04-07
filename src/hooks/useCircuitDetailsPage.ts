
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCircuitById } from "@/services/circuitService";
import { fetchCircuitDetails } from "@/services/circuitDetailService";
import { toast } from "sonner";
import { CircuitDetail } from "@/types/circuit";

export function useCircuitDetailsPage(circuitId: string | undefined) {
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [detailToEdit, setDetailToEdit] = useState<CircuitDetail | null>(null);
  const [detailToDelete, setDetailToDelete] = useState<CircuitDetail | null>(null);

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

  return {
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
  };
}
