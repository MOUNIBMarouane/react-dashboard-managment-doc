
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import workflowService from '@/services/workflowService';
import { toast } from 'sonner';
import { DocumentWorkflowStatus } from '@/models/documentCircuit';

export const useDocumentWorkflow = (documentId: number) => {
  const [isMoving, setIsMoving] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: status, isLoading, error, refetch } = useQuery<DocumentWorkflowStatus>({
    queryKey: ['document-workflow-status', documentId],
    queryFn: () => workflowService.getDocumentWorkflowStatus(documentId),
    enabled: documentId > 0,
  });
  
  const moveToNextStep = async (comments: string = '') => {
    if (!documentId || !status?.currentStepId) return;
    
    setIsMoving(true);
    try {
      // For this function, we need to provide a proper MoveDocumentRequest
      await workflowService.moveDocumentToNextStep({
        documentId,
        comments
      });
      
      toast.success('Document moved to next step');
      queryClient.invalidateQueries({ queryKey: ['document-workflow-status'] });
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to move document');
      console.error('Error moving document:', error);
    } finally {
      setIsMoving(false);
    }
  };
  
  const returnToPrevious = async (comments: string = '') => {
    if (!documentId) return;
    
    setIsMoving(true);
    try {
      await workflowService.returnToPreviousStep({
        documentId,
        comments
      });
      
      toast.success('Document returned to previous step');
      queryClient.invalidateQueries({ queryKey: ['document-workflow-status'] });
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to return document');
      console.error('Error returning document:', error);
    } finally {
      setIsMoving(false);
    }
  };
  
  return {
    status,
    isLoading,
    error,
    moveToNextStep,
    returnToPrevious,
    isMoving,
    refetch
  };
};
