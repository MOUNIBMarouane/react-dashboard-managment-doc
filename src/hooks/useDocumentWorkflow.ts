
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { MoveDocumentStepRequest } from '@/models/action';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useDocumentWorkflow = (documentId: number) => {
  const queryClient = useQueryClient();
  
  const { data: workflowStatus, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['document-workflow', documentId],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/workflow/document/${documentId}/current-status`);
      return response.data;
    },
    enabled: !!documentId
  });
  
  const { mutateAsync: moveToNextStep } = useMutation({
    mutationFn: async ({ nextStepId, comments = '' }: { nextStepId: number, comments?: string }) => {
      const response = await axios.post(`${API_URL}/api/workflow/move-next`, {
        documentId,
        comments
      });
      return response.data;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      toast.success('Document moved to next step successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data || 'Failed to move document to next step');
    },
  });
  
  const { mutateAsync: moveToStep } = useMutation({
    mutationFn: async ({ 
      targetStepId, 
      currentStep,
      targetStep,
      comments = '' 
    }: { 
      targetStepId: number, 
      currentStep: any, 
      targetStep: any,
      comments?: string 
    }) => {
      const payload: MoveDocumentStepRequest = {
        documentId,
        currentStepId: currentStep.id,
        nextStepId: targetStepId,
        comments
      };
      
      const response = await axios.post(`${API_URL}/api/workflow/change-step`, payload);
      return response.data;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      toast.success('Document moved to selected step successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data || 'Failed to move document to selected step');
    },
  });
  
  const refreshAllData = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['document', documentId] });
  };
  
  return {
    workflowStatus,
    isLoading,
    isError,
    error,
    refetch,
    moveToNextStep,
    moveToStep,
    refreshAllData
  };
};
