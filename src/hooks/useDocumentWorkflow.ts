
import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import circuitService from '@/services/circuitService';
import { useWorkflowStatus } from './document-workflow/useWorkflowStatus';
import { MoveDocumentStepRequest } from '@/models/action';

export function useDocumentWorkflow(documentId: number) {
  const queryClient = useQueryClient();
  
  const {
    workflowStatus,
    isLoading,
    isError,
    error,
    refetch
  } = useWorkflowStatus(documentId);

  const { mutateAsync: moveToNextStep } = useMutation({
    mutationFn: async ({ currentStepId, nextStepId, comments }: { currentStepId: number, nextStepId: number, comments?: string }) => {
      return await circuitService.moveToNextStep({
        documentId,
        currentStepId: currentStepId || workflowStatus?.currentStepId || 0,
        nextStepId,
        comments: comments || ''
      });
    },
    onSuccess: () => {
      toast.success('Document moved to the next step successfully');
      queryClient.invalidateQueries({ queryKey: ['document-workflow', documentId] });
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      queryClient.invalidateQueries({ queryKey: ['document-circuit-history', documentId] });
    },
    onError: (error: Error) => {
      toast.error(`Error moving document: ${error.message}`);
    }
  });

  const { mutateAsync: moveToStep } = useMutation({
    mutationFn: async ({ currentStepId, nextStepId, comments }: { currentStepId: number, nextStepId: number, comments?: string }) => {
      return await circuitService.moveDocumentToStep({
        documentId,
        currentStepId,
        nextStepId,
        comments: comments || ''
      });
    },
    onSuccess: () => {
      toast.success('Document moved successfully');
      queryClient.invalidateQueries({ queryKey: ['document-workflow', documentId] });
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      queryClient.invalidateQueries({ queryKey: ['document-circuit-history', documentId] });
    },
    onError: (error: Error) => {
      toast.error(`Error moving document: ${error.message}`);
    }
  });

  const refreshAllData = useCallback(() => {
    // Refresh all related document data
    refetch();
    queryClient.invalidateQueries({ queryKey: ['document', documentId] });
    queryClient.invalidateQueries({ queryKey: ['document-circuit-history', documentId] });
    queryClient.invalidateQueries({ queryKey: ['circuit-details'] });
  }, [documentId, queryClient, refetch]);

  return {
    workflowStatus,
    isLoading,
    isError,
    error,
    refetch,
    moveToNextStep,
    moveToStep,
    refreshAllData
  };
}
