
import { useQuery } from '@tanstack/react-query';
import { Action, CreateActionDto } from '@/models/action';
import actionService from '@/services/actionService';
import { toast } from 'sonner';

export function useActionManagement() {
  const { 
    data: actions, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery<Action[]>({
    queryKey: ['actions'],
    queryFn: () => actionService.getAllActions(),
    meta: {
      onSettled: (data, error) => {
        if (error) {
          console.error('Failed to fetch actions:', error);
          toast.error('Failed to load actions');
        }
      }
    }
  });

  const createAction = async (action: CreateActionDto) => {
    try {
      const result = await actionService.createAction(action);
      toast.success('Action created successfully');
      refetch();
      return result;
    } catch (error) {
      console.error('Failed to create action:', error);
      toast.error('Failed to create action');
      throw error;
    }
  };

  const updateAction = async (id: number, action: Partial<Action>) => {
    try {
      // Make sure we're only passing what's expected by the API
      const updateData: CreateActionDto = {
        title: action.title || '',
        description: action.description
      };
      
      const result = await actionService.updateAction(id, updateData);
      toast.success('Action updated successfully');
      refetch();
      return result;
    } catch (error) {
      console.error('Failed to update action:', error);
      toast.error('Failed to update action');
      throw error;
    }
  };

  const deleteAction = async (id: number) => {
    try {
      await actionService.deleteAction(id);
      toast.success('Action deleted successfully');
      refetch();
    } catch (error) {
      console.error('Failed to delete action:', error);
      toast.error('Failed to delete action');
      throw error;
    }
  };

  return {
    actions: actions || [],
    isLoading,
    isError,
    error,
    refetch,
    createAction,
    updateAction,
    deleteAction
  };
}
