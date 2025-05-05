import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import circuitService from '@/services/circuitService';
import actionService from '@/services/actionService';
import { DocumentStatusDto } from '@/models/documentCircuit';

interface StatusUpdate {
  statusId: number;
  isComplete: boolean;
  comments: string;
}

export const useStepStatuses = (stepId: number) => {
  const queryClient = useQueryClient();
  const [isCompleting, setIsCompleting] = useState(false);

  const {
    data: statuses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['step-statuses', stepId],
    queryFn: () => circuitService.getStepStatuses(stepId),
    enabled: !!stepId,
  });

  const { mutate: completeStatus } = useMutation({
    mutationFn: async ({ statusId, isComplete, comments }: StatusUpdate) => {
      setIsCompleting(true);
      return circuitService.completeStatus({
        documentId: 1, // TODO: replace with actual documentId
        statusId,
        isComplete,
        comments,
      });
    },
    onSuccess: () => {
      toast.success('Status updated successfully');
      queryClient.invalidateQueries(['step-statuses', stepId]);
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update status');
    },
    onSettled: () => {
      setIsCompleting(false);
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ statusId, isComplete, comments }: StatusUpdate) => {
      return circuitService.updateStepStatus(stepId, statusId, {
        isComplete,
        comments,
      });
    },
    onSuccess: () => {
      toast.success('Status updated successfully');
      queryClient.invalidateQueries(['step-statuses', stepId]);
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update status');
    },
  });

  return {
    statuses,
    isLoading,
    error,
    completeStatus,
    updateStatus,
    isCompleting,
  };
};
