
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { ActionDto } from '@/models/action';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface StepAction {
  id: number;
  stepId: number;
  actionId: number;
  action?: ActionDto;
}

export const useStepActions = (stepId: number, skip = false) => {
  const queryClient = useQueryClient();
  
  const {
    data: actions = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['step-actions', stepId],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/api/steps/${stepId}/actions`);
      return response.data;
    },
    enabled: !!stepId && !skip
  });
  
  const { mutateAsync: assignAction, isPending: isAssigning } = useMutation({
    mutationFn: async (data: { stepId: number, actionId: number }) => {
      const response = await axios.post(`${API_BASE_URL}/api/actions/assign-to-step`, data);
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
      const response = await axios.delete(`${API_BASE_URL}/api/steps/${stepId}/actions/${actionId}`);
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
  
  const { mutateAsync: toggleAction, isPending: isToggling } = useMutation({
    mutationFn: async (actionId: number) => {
      const response = await axios.post(`${API_BASE_URL}/api/steps/${stepId}/actions/${actionId}/toggle`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['step-actions', stepId] });
      toast.success('Action updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update action');
    }
  });
  
  return {
    actions,
    isLoading,
    isError,
    error,
    refetch,
    assignAction,
    unassignAction,
    isAssigning,
    isUnassigning,
    toggleAction,
    isToggling
  };
};
