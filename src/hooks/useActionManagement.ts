
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import actionService from '@/services/actionService';
import { Action, CreateActionDto, UpdateActionDto } from '@/models/action';

export function useActionManagement() {
  const queryClient = useQueryClient();
  const [actions, setActions] = useState<Action[]>([]);
  
  // Fetch actions
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['actions'],
    queryFn: () => actionService.getAllActions(),
  });

  useEffect(() => {
    if (data) {
      setActions(data);
    }
  }, [data]);

  // Create action mutation
  const { mutateAsync: createAction, isPending: isCreating } = useMutation({
    mutationFn: async (actionData: CreateActionDto) => {
      return await actionService.createAction(actionData);
    },
    onSuccess: (newAction) => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action created successfully');
    },
    onError: (error) => {
      console.error('Error creating action:', error);
      toast.error('Failed to create action');
    }
  });

  // Update action mutation
  const { mutateAsync: updateAction, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, action }: { id: number, action: UpdateActionDto }) => {
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

  // Delete action mutation
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

  // Toggle action status mutation  
  const { mutateAsync: toggleActionStatus, isPending: isToggling } = useMutation({
    mutationFn: async (id: number) => {
      return await actionService.toggleActionStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action status updated');
    },
    onError: (error) => {
      console.error('Error toggling action status:', error);
      toast.error('Failed to update action status');
    }
  });

  return {
    actions,
    isLoading,
    isError,
    error,
    refetch,
    createAction,
    updateAction,
    deleteAction,
    toggleActionStatus,
    isCreating,
    isUpdating,
    isDeleting,
    isToggling
  };
}
