
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import circuitService from '@/services/circuitService';
import { StatusFormDialog } from '@/components/statuses/dialogs/StatusFormDialog';
import { DeleteStatusDialog } from '@/components/statuses/dialogs/DeleteStatusDialog';
import { useAuth } from '@/context/AuthContext';
import { DocumentStatus } from '@/models/documentCircuit';
import { useStepStatuses } from '@/hooks/useStepStatuses';
import { StepStatusesHeader } from '@/components/statuses/StepStatusesHeader';
import { StepStatusActions } from '@/components/statuses/StepStatusActions';
import { StepStatusError } from '@/components/statuses/StepStatusError';
import { StepStatusLoading } from '@/components/statuses/StepStatusLoading';
import { StepStatusContent } from '@/components/statuses/StepStatusContent';

export default function StepStatusesPage() {
  const { circuitId, stepId } = useParams<{ circuitId: string; stepId: string }>();
  const { user } = useAuth();
  const isSimpleUser = user?.role === 'SimpleUser';
  
  const [apiError, setApiError] = useState('');
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<DocumentStatus | null>(null);
  
  // Fetch circuit details
  const { 
    data: circuit,
    isLoading: isCircuitLoading,
    isError: isCircuitError
  } = useQuery({
    queryKey: ['circuit', circuitId],
    queryFn: () => circuitService.getCircuitById(Number(circuitId)),
    enabled: !!circuitId
  });

  // Fetch step details
  const {
    data: steps = [],
    isLoading: isStepsLoading,
    isError: isStepsError
  } = useQuery({
    queryKey: ['circuit-steps', circuitId],
    queryFn: () => circuitService.getCircuitDetailsByCircuitId(Number(circuitId)),
    enabled: !!circuitId
  });

  // Find the current step
  const currentStep = steps.find(s => s.id === Number(stepId));

  // Fetch statuses for the step using the updated approach
  const {
    statuses = [],
    isLoading: isStatusesLoading,
    isError: isStatusesError,
    refetch: refetchStatuses
  } = useStepStatuses(Number(stepId));

  const handleAddStatus = () => {
    setSelectedStatus(null);
    setFormDialogOpen(true);
  };

  const handleEditStatus = (status: DocumentStatus) => {
    setSelectedStatus(status);
    setFormDialogOpen(true);
  };

  const handleDeleteStatus = (status: DocumentStatus) => {
    setSelectedStatus(status);
    setDeleteDialogOpen(true);
  };

  const isLoading = isCircuitLoading || isStepsLoading || isStatusesLoading;
  const isError = isCircuitError || isStepsError || isStatusesError;

  if (isLoading) {
    return <StepStatusLoading />;
  }

  if (isError) {
    return (
      <StepStatusError 
        message={apiError || 'Failed to load step statuses. Please try again later.'} 
        returnPath={`/circuits/${circuitId}/steps`}
        returnLabel="Back to Steps"
      />
    );
  }

  // If circuit or step not found
  if (!circuit || !currentStep) {
    return (
      <StepStatusError
        message="The circuit or step you're looking for doesn't exist or has been removed."
        returnPath="/circuits"
        returnLabel="Back to Circuits"
      />
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <StepStatusesHeader 
          circuitTitle={circuit.title}
          stepTitle={currentStep.title}
          stepKey={currentStep.circuitDetailKey}
          circuitId={circuitId as string}
        />
        
        <StepStatusActions 
          onAddStatus={handleAddStatus}
          isSimpleUser={isSimpleUser}
        />
      </div>
      
      {apiError && (
        <Alert variant="destructive" className="mb-4 border-red-800 bg-red-950/50 text-red-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {apiError}
          </AlertDescription>
        </Alert>
      )}
      
      <StepStatusContent
        statuses={statuses}
        onEdit={handleEditStatus}
        onDelete={handleDeleteStatus}
        isSimpleUser={isSimpleUser}
      />
      
      {/* Status Form Dialog */}
      {!isSimpleUser && (
        <>
          <StatusFormDialog
            open={formDialogOpen}
            onOpenChange={setFormDialogOpen}
            onSuccess={refetchStatuses}
            status={selectedStatus}
            stepId={Number(stepId)}
          />
          
          {/* Delete Status Dialog */}
          <DeleteStatusDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            status={selectedStatus}
            onSuccess={refetchStatuses}
          />
        </>
      )}
    </div>
  );
}
