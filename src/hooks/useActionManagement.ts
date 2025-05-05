import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import actionService from "@/services/actionService";
import { Action, ActionItem, CreateActionDto, UpdateActionDto } from "@/models/action";

export const useActionManagement = () => {
  const [action, setAction] = useState<Action | null>(null);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Error handling function
  const handleActionError = (error: any, operation: string) => {
    console.error(`Error ${operation} action:`, error);
    setError(`Failed to ${operation} action. Please try again.`);
    toast.error(`Failed to ${operation} action. Please try again.`);
  };

  // Fetch all actions
  const { data: fetchedActions, isLoading: isFetching } = useQuery({
    queryKey: ["actions"],
    queryFn: actionService.getAllActions,
    onError: (error) => {
      console.error("Error fetching actions:", error);
      toast.error("Failed to fetch actions.");
    },
  });

  // Update actions state when fetchedActions changes
  useState(() => {
    if (fetchedActions) {
      setActions(fetchedActions);
    }
  }, [fetchedActions]);

  // Create action mutation
  const createAction = async (data: CreateActionDto): Promise<Action> => {
    setIsLoading(true);
    try {
      const newAction = await actionService.createAction(data);
      setActions((prev) => [...prev, newAction]);
      toast.success("Action created successfully");
      return newAction;
    } catch (error) {
      handleActionError(error, "creating");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update action mutation
  const updateAction = async (id: number, data: Partial<UpdateActionDto>) => {
    setIsLoading(true);
    try {
      const updatedAction = await actionService.updateAction(id, data);
      setActions(prev => prev.map(action => action.id === id ? updatedAction : action));
      setAction(updatedAction);
      toast.success('Action updated successfully');
      return updatedAction;
    } catch (error) {
      handleActionError(error, 'updating');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete action mutation
  const deleteAction = async (id: number): Promise<void> => {
    setIsLoading(true);
    try {
      await actionService.deleteAction(id);
      setActions((prev) => prev.filter((action) => action.id !== id));
      toast.success("Action deleted successfully");
    } catch (error) {
      handleActionError(error, "deleting");
    } finally {
      setIsLoading(false);
    }
  };

  const assignAction = async (actionId: number, stepId: number): Promise<void> => {
    setIsLoading(true);
    try {
      //await actionService.assignActionToStep(actionId, stepId);
      toast.success("Action assigned successfully");
    } catch (error) {
      handleActionError(error, "assigning");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    action,
    actions,
    isLoading,
    isFetching,
    error,
    setAction,
    setActions,
    createAction,
    updateAction,
    deleteAction,
    assignAction,
  };
};
