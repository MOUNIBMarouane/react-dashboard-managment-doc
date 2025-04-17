
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DocumentStatus } from '@/models/documentCircuit';
import api from '@/services/api';

export function useStepStatuses(stepId: number | undefined) {
  const { 
    data: statuses,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['step-statuses', stepId],
    queryFn: async () => {
      if (!stepId) throw new Error("Step ID is required");
      
      try {
        const response = await api.get(`/Status/step/${stepId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching step statuses:", error);
        throw new Error("Failed to load step statuses");
      }
    },
    enabled: !!stepId,
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    retry: 2, // Retry failed requests up to 2 times
    meta: {
      onSettled: (data, err) => {
        if (err) {
          const errorMessage = err instanceof Error 
            ? err.message 
            : 'Failed to load step statuses';
          console.error('Step statuses error:', err);
          toast.error(errorMessage);
        }
      }
    }
  });

  return {
    statuses,
    isLoading,
    isError,
    error,
    refetch
  };
}
