
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import workflowService from '@/services/workflowService';
import { DocumentStatusDto } from '@/models/documentCircuit';

export const useStepStatuses = (documentId: number) => {
  const [isCompletingStatus, setIsCompletingStatus] = useState(false);
  const queryClient = useQueryClient();
  
  const {
    data: statuses,
    isLoading,
    error,
    refetch
  } = useQuery<DocumentStatusDto[]>({
    queryKey: ['step-statuses', documentId],
    queryFn: () => workflowService.getDocumentStepStatuses(documentId),
    enabled: documentId > 0,
  });
  
  const completeStatus = async (statusId: number, isComplete: boolean, comments: string = '') => {
    setIsCompletingStatus(true);
    try {
      await workflowService.completeDocumentStatus({
        documentId,
        statusId,
        isComplete,
        comments
      });
      
      queryClient.invalidateQueries({ queryKey: ['step-statuses', documentId] });
      queryClient.invalidateQueries({ queryKey: ['document-workflow-status', documentId] });
      
      toast.success(`Status ${isComplete ? 'completed' : 'uncompleted'}`);
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update status');
      console.error('Error updating status:', error);
    } finally {
      setIsCompletingStatus(false);
    }
  };
  
  return {
    statuses,
    isLoading,
    error,
    completeStatus,
    isCompletingStatus,
    refetch
  };
};
