
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import actionService from '@/services/actionService';
import { Action, CreateActionDto, UpdateActionDto } from '@/models/action';
import { toast } from 'sonner';

export const useActionManagement = (onError?: (message: string) => void) => {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  
  const queryClient = useQueryClient();

  // Fetch actions
  const {
    data: actions = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['actions'],
    queryFn: actionService.getAllActions,
    meta: {
      onSettled: (data, error) => {
        if (error && onError) {
          onError(`Failed to load actions: ${error.message}`);
        }
      }
    }
  });

  // Create action mutation
  const createActionMutation = useMutation({
    mutationFn: (newAction: CreateActionDto) => actionService.createAction(newAction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action created successfully');
      setIsCreateDialogOpen(false);
    },
    onError: (error: Error) => {
      const errorMessage = `Failed to create action: ${error.message}`;
      toast.error(errorMessage);
      if (onError) onError(errorMessage);
    }
  });

  // Update action mutation
  const updateActionMutation = useMutation({
    mutationFn: ({ id, action }: { id: number; action: Partial<UpdateActionDto> }) => 
      actionService.updateAction(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action updated successfully');
      setIsEditDialogOpen(false);
    },
    onError: (error: Error) => {
      const errorMessage = `Failed to update action: ${error.message}`;
      toast.error(errorMessage);
      if (onError) onError(errorMessage);
    }
  });

  // Delete action mutation
  const deleteActionMutation = useMutation({
    mutationFn: (id: number) => actionService.deleteAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      toast.success('Action deleted successfully');
      setIsDeleteDialogOpen(false);
    },
    onError: (error: Error) => {
      const errorMessage = `Failed to delete action: ${error.message}`;
      toast.error(errorMessage);
      if (onError) onError(errorMessage);
    }
  });

  const handleCreateAction = (newAction: CreateActionDto) => {
    createActionMutation.mutate(newAction);
  };

  const handleUpdateAction = (id: number, action: Partial<UpdateActionDto>) => {
    updateActionMutation.mutate({ id, action });
  };

  const handleDeleteAction = (id: number) => {
    deleteActionMutation.mutate(id);
  };

  const handleEditAction = (action: Action) => {
    setSelectedAction(action);
    setIsEditDialogOpen(true);
  };

  const handleAssignAction = (action: Action) => {
    setSelectedAction(action);
    setIsAssignDialogOpen(true);
  };

  const handleDeleteActionClick = (action: Action) => {
    setSelectedAction(action);
    setIsDeleteDialogOpen(true);
  };

  return {
    actions,
    isLoading,
    isError,
    refetch,
    selectedAction,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    handleCreateAction,
    handleUpdateAction,
    handleDeleteAction,
    handleEditAction,
    handleAssignAction,
    handleDeleteActionClick,
  };
};
