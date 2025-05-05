
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'sonner';
import { ActionDto } from '@/models/circuit';

export interface StepAction {
  id: number;
  stepId: number;
  actionId: number;
  action?: ActionDto;
}

export const useStepActions = (stepId: number, skip = false) => {
  const queryClient = useQueryClient();
  
  const {
    data: stepActions = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['step-actions', stepId],
    queryFn: async () => {
      const response = await api.get(`/steps/${stepId}/actions`);
      return response.data;
    },
    enabled: !!stepId && !skip
  });
  
  const { mutateAsync: assignAction, isPending: isAssigning } = useMutation({
    mutationFn: async (actionId: number) => {
      const response = await api.post(`/steps/${stepId}/actions`, { actionId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['step-actions', stepId] });
      toast.success('Action assigned successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to assign action');
    }
  });
  
  const { mutateAsync: unassignAction, isPending: isUnassigning } = useMutation({
    mutationFn: async (actionId: number) => {
      const response = await api.delete(`/steps/${stepId}/actions/${actionId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['step-actions', stepId] });
      toast.success('Action unassigned successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to unassign action');
    }
  });
  
  return {
    stepActions,
    isLoading,
    isError,
    error,
    refetch,
    assignAction,
    unassignAction,
    isAssigning,
    isUnassigning
  };
};
