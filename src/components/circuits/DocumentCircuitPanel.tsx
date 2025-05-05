
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import documentService from '@/services/documentService';
import circuitService from '@/services/circuitService';
import { Document } from '@/models/document';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import CircuitDetailsList, { CircuitDetail } from "./CircuitDetailsList";
import AssignCircuitDialog from "./AssignCircuitDialog";

const DocumentCircuitPanel = () => {
  const { id } = useParams();
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const {
    data: document,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['document', Number(id)],
    queryFn: () => documentService.getDocumentById(Number(id)),
    enabled: !!id,
  });

  const {
    data: circuitDetails,
    isLoading: isLoadingCircuitDetails,
    isError: isCircuitDetailsError,
  } = useQuery({
    queryKey: ['circuit-details', document?.circuitId],
    queryFn: () => circuitService.getCircuitDetailsByCircuitId(document?.circuitId || 0),
    enabled: !!document?.circuitId
  });

  const handleAssignSuccess = () => {
    refetch();
    toast.success('Circuit assigned successfully');
  };

  if (isLoading) {
    return <div>Loading document...</div>;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load document. Please check the document ID.
        </AlertDescription>
      </Alert>
    );
  }

  if (!document) {
    return <div>Document not found.</div>;
  }

  // Transform service model to component model for CircuitDetailsList
  const transformedDetails: CircuitDetail[] = circuitDetails ? 
    circuitDetails.map(detail => ({
      id: detail.id,
      circuitDetailKey: detail.circuitDetailKey || "",
      circuitId: detail.circuitId,
      title: detail.title,
      descriptif: detail.descriptif || "",
      orderIndex: detail.orderIndex,
      responsibleRoleId: detail.responsibleRoleId || undefined,
      isFinalStep: detail.isFinalDetail || false,
      isFinalDetail: detail.isFinalDetail || false
    })) : [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Document Circuit</h2>
      
      {document.circuitId ? (
        <>
          <p>
            Current Circuit: {document.circuit?.title} (ID: {document.circuitId})
          </p>
          
          {isLoadingCircuitDetails ? (
            <div>Loading circuit details...</div>
          ) : isCircuitDetailsError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load circuit details.
              </AlertDescription>
            </Alert>
          ) : (
            <CircuitDetailsList 
              circuitDetails={transformedDetails} 
            />
          )}
        </>
      ) : (
        <p>No circuit assigned to this document.</p>
      )}

      <button onClick={() => setIsAssignDialogOpen(true)} className="underline">
        {document.circuitId ? 'Change Circuit' : 'Assign Circuit'}
      </button>

      <AssignCircuitDialog
        documentId={document.id}
        documentTitle={document.title}
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        onSuccess={handleAssignSuccess}
      />
    </div>
  );
};

export default DocumentCircuitPanel;
