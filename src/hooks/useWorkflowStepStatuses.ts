
import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import workflowService from '@/services/workflowService';
import { DocumentStatusDto } from '@/models/documentCircuit';

export const useWorkflowStepStatuses = (documentId: number) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    data: statuses,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['document-statuses', documentId],
    queryFn: () => workflowService.getDocumentStepStatuses(documentId),
    enabled: documentId > 0,
  });
  
  // Add isError property for compatibility
  const isError = !!error;
  
  const completeStatus = async (statusId: number, isComplete: boolean, comments: string = '') => {
    setIsSubmitting(true);
    try {
      await workflowService.completeDocumentStatus({
        documentId,
        statusId,
        isComplete,
        comments,
      });
      
      toast.success(`Status ${isComplete ? 'completed' : 'uncompleted'} successfully`);
      
      // Invalidate multiple queries to ensure all data is refreshed
      queryClient.invalidateQueries({ queryKey: ['document-statuses', documentId] });
      queryClient.invalidateQueries({ queryKey: ['document-workflow-status', documentId] });
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to ${isComplete ? 'complete' : 'uncomplete'} status`);
      console.error('Error updating status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const checkAllStatusesComplete = useCallback(() => {
    if (!statuses) return false;
    
    const requiredStatuses = statuses.filter(s => s.isRequired);
    return requiredStatuses.every(s => s.isComplete);
  }, [statuses]);
  
  return {
    statuses,
    isLoading,
    error,
    isError,
    completeStatus,
    isSubmitting,
    checkAllStatusesComplete,
    refetch,
  };
};
