
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Step } from '@/models/step';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import circuitService from '@/services/circuitService';

interface CircuitStepsContentProps {
  circuitId: number;
  onStepSelect?: (step: Step) => void;
  selectedStepId?: number;
  steps?: Step[];
  selectedSteps?: number[];
  onSelectStep?: (id: number, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;
  onEdit?: (step: Step) => void;
  onDelete?: (step: Step) => void;
  viewMode?: 'list' | 'grid';
  onViewModeChange?: (mode: 'list' | 'grid') => void;
  onAddStep?: () => void;
  isSimpleUser?: boolean;
  circuit?: any;
  apiError?: string;
}

export const CircuitStepsContent = ({ 
  circuitId, 
  onStepSelect, 
  selectedStepId,
  steps: initialSteps,
  selectedSteps,
  onSelectStep,
  onSelectAll,
  onEdit,
  onDelete,
  viewMode,
  onViewModeChange,
  onAddStep,
  isSimpleUser,
  circuit,
  apiError
}: CircuitStepsContentProps) => {
  const [steps, setSteps] = useState<Step[]>([]);
  
  const { data: circuitSteps, isLoading, isError, error } = useQuery({
    queryKey: ['circuit-steps', circuitId],
    queryFn: async () => {
      return await circuitService.getCircuitDetailsByCircuitId(circuitId);
    },
    enabled: !!circuitId && !initialSteps
  });
  
  useEffect(() => {
    if (circuitSteps) {
      setSteps(circuitSteps);
    } else if (initialSteps) {
      setSteps(initialSteps);
    }
  }, [circuitSteps, initialSteps]);
  
  if (isLoading && !initialSteps) {
    return <div className="text-center p-4"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  }
  
  if (isError && !initialSteps) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error loading steps: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
  
  if ((!steps || steps.length === 0) && !initialSteps) {
    return <div className="text-gray-500 p-4 text-center">No steps found for this circuit</div>;
  }
  
  return (
    <div className="space-y-2">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`p-3 rounded-md cursor-pointer transition-colors ${
            selectedStepId === step.id 
              ? 'bg-blue-900/40 border border-blue-700'
              : 'bg-blue-900/20 border border-blue-900/30 hover:bg-blue-900/30'
          }`}
          onClick={() => onStepSelect && onStepSelect(step)}
        >
          <h3 className="font-medium text-white">{step.title}</h3>
          <p className="text-sm text-blue-300 mt-1">{step.descriptif}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs bg-blue-900/40 px-2 py-1 rounded text-blue-300">
              Order: {step.orderIndex}
            </span>
            {step.isFinalStep && (
              <span className="text-xs bg-purple-900/40 px-2 py-1 rounded text-purple-300">
                Final Step
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
