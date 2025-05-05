
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import actionService from '@/services/actionService';
import { Action, CreateActionDto, UpdateActionDto } from '@/models/action';

export const useActionManagement = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createAction, isPending: isCreating } = useMutation({
    mutationFn: async (newAction: CreateActionDto) => {
      return await actionService.createAction(newAction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action created successfully');
    },
    onError: (error) => {
      console.error('Error creating action:', error);
      toast.error('Failed to create action');
    }
  });

  const { mutateAsync: updateAction, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, action }: { id: number; action: UpdateActionDto }) => {
      return await actionService.updateAction(id, action);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action updated successfully');
    },
    onError: (error) => {
      console.error('Error updating action:', error);
      toast.error('Failed to update action');
    }
  });

  const { mutateAsync: deleteAction, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      return await actionService.deleteAction(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting action:', error);
      toast.error('Failed to delete action');
    }
  });

  const { mutateAsync: toggleActionStatus, isPending: isToggling } = useMutation({
    mutationFn: async (id: number) => {
      return await actionService.toggleActionStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action status toggled successfully');
    },
    onError: (error) => {
      console.error('Error toggling action status:', error);
      toast.error('Failed to toggle action status');
    }
  });

  return {
    createAction,
    updateAction,
    deleteAction,
    toggleActionStatus,
    isCreating,
    isUpdating,
    isDeleting,
    isToggling
  };
};
