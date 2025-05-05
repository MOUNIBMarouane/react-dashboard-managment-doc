
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ActionDto, CreateActionDto, UpdateActionDto, Action, AssignActionToStepDto } from '@/models/action';
import actionService from '@/services/actionService';
import { toast } from 'sonner';

export const useActionManagement = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isAssigning, setIsAssigning] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState<boolean>(false);
  
  const queryClient = useQueryClient();
  
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['actions'],
    queryFn: actionService.getAllActions
  });
  
  useEffect(() => {
    if (data) {
      // Map ActionDto to Action with required id field
      const mappedActions = data.map((actionDto: ActionDto) => ({
        id: actionDto.actionId,
        actionId: actionDto.actionId,
        actionKey: actionDto.actionKey || '',
        title: actionDto.title,
        description: actionDto.description
      }));
      setActions(mappedActions);
    }
  }, [data]);
  
  const createAction = useMutation({
    mutationFn: (newAction: CreateActionDto) => actionService.createAction(newAction),
    onMutate: () => {
      setIsCreating(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create action');
    },
    onSettled: () => {
      setIsCreating(false);
    }
  });
  
  const updateAction = useMutation({
    mutationFn: ({ id, action }: { id: number, action: UpdateActionDto }) => actionService.updateAction(id, action),
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update action');
    },
    onSettled: () => {
      setIsUpdating(false);
    }
  });
  
  const deleteAction = useMutation({
    mutationFn: (id: number) => actionService.deleteAction(id),
    onMutate: () => {
      setIsDeleting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete action');
    },
    onSettled: () => {
      setIsDeleting(false);
    }
  });
  
  const assignAction = useMutation({
    mutationFn: ({ stepId, actionId }: { stepId: number, actionId: number }) => 
      actionService.assignActionToStep(stepId, actionId),
    onMutate: () => {
      setIsAssigning(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
      toast.success('Action assigned successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to assign action');
    },
    onSettled: () => {
      setIsAssigning(false);
    }
  });

  const toggleActionStatus = useMutation({
    mutationFn: (actionId: number) => actionService.toggleActionStatus(actionId),
    onMutate: () => {
      setIsToggling(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action status toggled successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to toggle action status');
    },
    onSettled: () => {
      setIsToggling(false);
    }
  });
  
  return {
    actions,
    isLoading,
    isError,
    error,
    refetch,
    createAction: createAction.mutate,
    updateAction: updateAction.mutate,
    deleteAction: deleteAction.mutate,
    assignAction: assignAction.mutate,
    toggleActionStatus: toggleActionStatus.mutate,
    isCreating,
    isUpdating,
    isDeleting,
    isAssigning,
    isToggling
  };
};
