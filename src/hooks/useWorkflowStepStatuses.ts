
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCallback } from 'react';
import circuitService from '@/services/circuitService';

interface UpdateStatusParams {
  statusId: number; 
  title: string; 
  isRequired: boolean; 
  isComplete: boolean;
}

export function useWorkflowStepStatuses(documentId?: number) {
  const queryClient = useQueryClient();

  // Main query for workflow statuses
  const { 
    data: workflowStatuses,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['document-workflow-statuses', documentId],
    queryFn: () => documentId ? circuitService.getStepStatuses(documentId) : [],
    enabled: !!documentId,
    staleTime: 30000, // Consider data fresh for 30 seconds
  });

  // Mutation for completing a status
  const { mutate: completeStatus } = useMutation({
    mutationFn: (data: { 
      statusId: number, 
      isComplete: boolean, 
      comments: string 
    }) => circuitService.completeStatus({
      documentId: documentId || 0,
      ...data
    }),
    onSuccess: () => {
      // Only invalidate queries after a successful status update
      if (documentId) {
        queryClient.invalidateQueries({ 
          queryKey: ['document-workflow-statuses', documentId] 
        });
        queryClient.invalidateQueries({ 
          queryKey: ['document-workflow', documentId] 
        });
      }
      toast.success('Status updated successfully');
    },
    onError: (error) => {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  });

  // Mutation for updating a status
  const { mutate: updateStatus } = useMutation({
    mutationFn: (data: UpdateStatusParams) => {
      // This is a workaround until the appropriate endpoint exists in circuitService
      return Promise.resolve(data);
    },
    onSuccess: () => {
      if (documentId) {
        queryClient.invalidateQueries({ 
          queryKey: ['document-workflow-statuses', documentId] 
        });
        queryClient.invalidateQueries({ 
          queryKey: ['document-workflow', documentId] 
        });
      }
      toast.success('Status updated successfully');
    },
    onError: (error) => {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  });

  // Prefetch next status on hover
  const prefetchNextStatus = useCallback(() => {
    if (documentId) {
      queryClient.prefetchQuery({
        queryKey: ['document-workflow-statuses', documentId],
        queryFn: () => circuitService.getStepStatuses(documentId),
      });
    }
  }, [documentId, queryClient]);

  return {
    workflowStatuses,
    isLoading,
    isError,
    error,
    refetch,
    completeStatus,
    updateStatus,
    prefetchNextStatus
  };
}
