
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import circuitService from '@/services/circuitService';
import { DocumentWorkflowStatus } from '@/models/documentCircuit';

export function useDocumentWorkflow(documentId: number) {
  const queryClient = useQueryClient();
  
  // Fetch the current workflow status
  const { 
    data: workflowStatus, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['document-workflow', documentId],
    queryFn: () => circuitService.getDocumentCurrentStatus(documentId),
    enabled: !!documentId,
    meta: {
      onSettled: (data, err) => {
        if (err) {
          const errorMessage = err instanceof Error 
            ? err.message 
            : 'Failed to load document workflow status.';
          console.error('Document workflow error:', err);
          toast.error(errorMessage);
        }
      }
    }
  });

  // Move document to the next step
  const { mutateAsync: moveToNextStep, isPending: isMovingToNext } = useMutation({
    mutationFn: (comments: string = '') => {
      return circuitService.moveToNextStep({
        documentId,
        comments
      });
    },
    onSuccess: () => {
      toast.success('Document moved to next step successfully');
      refreshAllData();
    },
    onError: (error: any) => {
      const message = error?.response?.data || 'Failed to move document';
      toast.error(message);
    }
  });

  // Return to the previous step
  const { mutateAsync: returnToPreviousStep, isPending: isReturning } = useMutation({
    mutationFn: (comments: string = '') => {
      return circuitService.returnToPreviousStep({
        documentId,
        comments
      });
    },
    onSuccess: () => {
      toast.success('Document returned to previous step');
      refreshAllData();
    },
    onError: (error: any) => {
      const message = error?.response?.data || 'Failed to return document';
      toast.error(message);
    }
  });

  // Complete a status
  const { mutateAsync: completeStatus, isPending: isCompletingStatus } = useMutation({
    mutationFn: ({ statusId, isComplete = true, comments = '' }: { statusId: number, isComplete?: boolean, comments?: string }) => {
      return circuitService.completeDocumentStatus({
        documentId,
        statusId,
        isComplete,
        comments
      });
    },
    onSuccess: () => {
      toast.success('Status updated successfully');
      refreshAllData();
    },
    onError: (error: any) => {
      const message = error?.response?.data || 'Failed to update status';
      toast.error(message);
    }
  });

  // Perform action
  const { mutateAsync: performAction, isPending: isPerformingAction } = useMutation({
    mutationFn: ({ actionId, comments = '', isApproved = true }: { actionId: number, comments?: string, isApproved?: boolean }) => {
      return circuitService.performAction({
        documentId,
        actionId,
        comments,
        isApproved
      });
    },
    onSuccess: () => {
      toast.success('Action performed successfully');
      refreshAllData();
    },
    onError: (error: any) => {
      const message = error?.response?.data || 'Failed to perform action';
      toast.error(message);
    }
  });

  // Helper function to refresh all relevant data
  const refreshAllData = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['document', documentId] });
    queryClient.invalidateQueries({ queryKey: ['document-history', documentId] });
    queryClient.invalidateQueries({ queryKey: ['document-statuses', documentId] });
  };

  return {
    workflowStatus,
    isLoading,
    isError,
    error,
    refetch,
    moveToNextStep,
    isMovingToNext,
    returnToPreviousStep,
    isReturning,
    completeStatus,
    isCompletingStatus,
    performAction,
    isPerformingAction,
    refreshAllData
  };
}
