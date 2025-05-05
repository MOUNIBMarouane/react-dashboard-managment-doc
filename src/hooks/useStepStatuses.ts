
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import statusService from '@/services/statusService';
import { Status } from '@/models/circuit';

export const useStepStatuses = (stepId: number) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    data: statuses,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['statuses', stepId],
    queryFn: () => statusService.getStatusesForStep(stepId),
    enabled: stepId > 0,
  });
  
  const createStatus = async (status: Partial<Status>) => {
    setIsSubmitting(true);
    try {
      await statusService.createStatus({
        stepId,
        title: status.title || '',
        isRequired: status.isRequired ?? true,
      });
      toast.success('Status created successfully');
      queryClient.invalidateQueries({ queryKey: ['statuses', stepId] });
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create status');
      console.error('Error creating status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const updateStatus = async (statusId: number, status: Partial<Status>) => {
    setIsSubmitting(true);
    try {
      await statusService.updateStatus(statusId, status);
      toast.success('Status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['statuses', stepId] });
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
      console.error('Error updating status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const deleteStatus = async (statusId: number) => {
    setIsSubmitting(true);
    try {
      await statusService.deleteStatus(statusId);
      toast.success('Status deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['statuses', stepId] });
      refetch();
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data?.includes('in use by documents')) {
        toast.error('Cannot delete status that is in use by documents');
      } else {
        toast.error(error.message || 'Failed to delete status');
      }
      console.error('Error deleting status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    statuses,
    isLoading,
    error,
    createStatus,
    updateStatus,
    deleteStatus,
    refetch,
    isSubmitting,
  };
};
