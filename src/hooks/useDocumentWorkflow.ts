import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import workflowService from '@/services/workflowService';
import { MoveDocumentRequest } from '@/models/documentCircuit';

export const useDocumentWorkflow = (documentId: number) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: workflowStatus, isLoading: isLoadingStatus, refetch: refetchStatus } = 
    useQuery({
      queryKey: ['document-workflow-status', documentId],
      queryFn: () => workflowService.getDocumentWorkflowStatus(documentId),
      enabled: !!documentId,
    });
    
  const { data: workflowHistory, isLoading: isLoadingHistory, refetch: refetchHistory } = 
    useQuery({
      queryKey: ['document-workflow-history', documentId],
      queryFn: () => workflowService.getDocumentWorkflowHistory(documentId),
      enabled: !!documentId,
    });
    
  const moveToNextStep = async () => {
    if (!workflowStatus || !workflowStatus.currentStepId) return;
    
    setIsSubmitting(true);
    try {
      const moveRequest: MoveDocumentRequest = {
        documentId,
        currentStepId: workflowStatus.currentStepId,
        nextStepId: 0, // Will be determined server-side for "move next"
        comments: 'Moving document to next step'
      };
      
      await workflowService.moveToNextStep(moveRequest);
      toast.success('Document advanced to the next step');
      refetchStatus();
      refetchHistory();
      queryClient.invalidateQueries({ queryKey: ['pending-documents'] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to move document');
      console.error('Error moving document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const moveToPreviousStep = async () => {
    if (!workflowStatus || !workflowStatus.currentStepId) return;
    
    setIsSubmitting(true);
    try {
      const moveRequest: MoveDocumentRequest = {
        documentId,
        currentStepId: workflowStatus.currentStepId,
        nextStepId: -1, // Will be determined server-side for "move previous"
        comments: 'Moving document to previous step'
      };
      
      await workflowService.moveToPreviousStep(moveRequest);
      toast.success('Document returned to the previous step');
      refetchStatus();
      refetchHistory();
      queryClient.invalidateQueries({ queryKey: ['pending-documents'] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to move document');
      console.error('Error moving document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const moveDocument = async (moveRequest: MoveDocumentRequest) => {
    setIsSubmitting(true);
    try {
      await workflowService.moveDocument(moveRequest);
      toast.success('Document moved successfully');
      refetchStatus();
      refetchHistory();
      queryClient.invalidateQueries({ queryKey: ['pending-documents'] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to move document');
      console.error('Error moving document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const processDocument = async (isApproved: boolean, comments: string) => {
    if (!workflowStatus || !workflowStatus.currentStepId) return;
    
    setIsSubmitting(true);
    try {
      await workflowService.processDocument({
        documentId,
        isApproved,
        comments,
      });
      
      toast.success('Document processed successfully');
      refetchStatus();
      refetchHistory();
      queryClient.invalidateQueries({ queryKey: ['pending-documents'] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to process document');
      console.error('Error processing document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    workflowStatus,
    workflowHistory,
    isLoading: isLoadingStatus || isLoadingHistory,
    isSubmitting,
    moveToNextStep,
    moveToPreviousStep,
    moveDocument,
    processDocument,
    refetchStatus,
    refetchHistory,
  };
};
