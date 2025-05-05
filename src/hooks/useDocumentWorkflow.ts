
import { useCallback } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import circuitService from '@/services/circuitService';

export function useDocumentWorkflow(documentId: number) {
  const queryClient = useQueryClient();
  
  // Mutation for moving to next step
  const { mutate: moveToNextStep } = useMutation({
    mutationFn: async (params: { 
      nextStepId: number, 
      comments?: string 
    }) => {
      if (!documentId) throw new Error('No document ID');
      
      const workflowStatus = await circuitService.getDocumentCurrentStatus(documentId);
      if (!workflowStatus?.currentStepId) throw new Error('No current step');
      
      return circuitService.moveDocumentToNextStep({
        documentId,
        comments: params.comments,
        currentStepId: workflowStatus.currentStepId,
        nextStepId: params.nextStepId
      });
    },
    onSuccess: () => {
      refreshAllData();
      toast.success('Document moved to next step successfully');
    },
    onError: (error) => {
      console.error('Error moving to next step:', error);
      toast.error('Failed to move document to next step');
    }
  });

  // Mutation for moving to any step
  const { mutate: moveToStep } = useMutation({
    mutationFn: async (params: { 
      targetStepId: number,
      currentStep: any,
      targetStep: any,
      comments?: string 
    }) => {
      const { targetStepId, currentStep, targetStep, comments } = params;
      
      if (!documentId) {
        throw new Error('No document ID');
      }
      
      const workflowStatus = await circuitService.getDocumentCurrentStatus(documentId);
      if (!workflowStatus?.currentStepId) {
        throw new Error('No current step');
      }

      // Determine if moving forward or backward based on step order
      const isMovingForward = targetStep.orderIndex > currentStep.orderIndex;
      
      if (isMovingForward) {
        return circuitService.moveDocumentToNextStep({
          documentId,
          comments,
          currentStepId: workflowStatus.currentStepId,
          nextStepId: targetStepId
        });
      } else {
        return circuitService.moveDocumentToStep({
          documentId,
          comments
        });
      }
    },
    onSuccess: () => {
      refreshAllData();
      toast.success('Document moved successfully');
    },
    onError: (error) => {
      console.error('Error moving document:', error);
      toast.error('Failed to move document');
    }
  });

  const refreshAllData = useCallback(() => {
    // Invalidate relevant queries to refresh data
    queryClient.invalidateQueries({ queryKey: ['document-workflow', documentId] });
    queryClient.invalidateQueries({ queryKey: ['document', documentId] });
    queryClient.invalidateQueries({ queryKey: ['document-circuit-history', documentId] });
    queryClient.invalidateQueries({ queryKey: ['document-workflow-statuses', documentId] });
  }, [documentId, queryClient]);

  return {
    moveToNextStep,
    moveToStep,
    refreshAllData
  };
}
