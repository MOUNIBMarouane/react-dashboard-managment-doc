
import { useQuery } from '@tanstack/react-query';
import circuitService from '@/services/circuitService';
import { Step, StepFilterOptions } from '@/models/step';

export function useSteps(circuitId?: number, filters?: StepFilterOptions) {
  const {
    data: steps,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['steps', circuitId, filters],
    queryFn: async () => {
      if (!circuitId) return [];
      try {
        return await circuitService.getCircuitDetailsByCircuitId(circuitId);
      } catch (error) {
        console.error('Error fetching steps:', error);
        throw error;
      }
    },
    enabled: !!circuitId
  });

  return {
    steps: steps || [],
    isLoading,
    error,
    refetch
  };
}
