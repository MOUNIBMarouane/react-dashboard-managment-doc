
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import circuitService from '@/services/circuitService';
import { Step } from '@/models/circuit';

export function useStepsManagement() {
  const queryClient = useQueryClient();

  const { mutateAsync: createStep, isPending: isCreating } = useMutation({
    mutationFn: async ({ circuitId, step }: { circuitId: number; step: Partial<Step> }) => {
      return await circuitService.createCircuitDetail(circuitId, step);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['steps', variables.circuitId] });
      queryClient.invalidateQueries({ queryKey: ['circuits'] });
      toast.success('Step created successfully');
    },
    onError: (error) => {
      console.error('Error creating step:', error);
      toast.error('Failed to create step');
    }
  });

  const { mutateAsync: updateStep, isPending: isUpdating } = useMutation({
    mutationFn: async ({ stepId, step }: { stepId: number; step: Partial<Step> }) => {
      return await circuitService.updateCircuitDetail(stepId, step);
    },
    onSuccess: (data, variables) => {
      // Invalidate both the specific step and the steps list
      queryClient.invalidateQueries({ queryKey: ['step', variables.stepId] });
      queryClient.invalidateQueries({ queryKey: ['steps'] });
      queryClient.invalidateQueries({ queryKey: ['circuits'] });
      toast.success('Step updated successfully');
    },
    onError: (error) => {
      console.error('Error updating step:', error);
      toast.error('Failed to update step');
    }
  });

  const { mutateAsync: deleteStep, isPending: isDeleting } = useMutation({
    mutationFn: async (stepId: number) => {
      return await circuitService.deleteCircuitDetail(stepId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
      queryClient.invalidateQueries({ queryKey: ['circuits'] });
      toast.success('Step deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting step:', error);
      toast.error('Failed to delete step');
    }
  });

  return {
    createStep,
    updateStep,
    deleteStep,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
