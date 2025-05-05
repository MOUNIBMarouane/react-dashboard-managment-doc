
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import actionService from '@/services/actionService';
import { ActionDto } from '@/models/documentCircuit';

export interface StepAssignedActionsProps {
  stepId: number;
  isCurrentStep?: boolean;
}

export const StepAssignedActions = ({ stepId, isCurrentStep = false }: StepAssignedActionsProps) => {
  const [actions, setActions] = useState<ActionDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchActions = async () => {
      setIsLoading(true);
      try {
        // Use a function that will be implemented in the actionService
        // This is a placeholder for now
        const response = await actionService.getAllActions();
        // Filter actions by stepId when API support is available
        setActions(response.filter((a: any) => a.stepId === stepId) || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching actions for step:', err);
        setError('Failed to load actions');
        setActions([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchActions();
  }, [stepId]);

  if (isLoading) {
    return <div className="text-xs text-blue-400/60">Loading actions...</div>;
  }
  
  if (error) {
    return <div className="text-xs text-red-400">{error}</div>;
  }
  
  if (!actions.length) {
    return null;
  }

  return (
    <div className="mt-2">
      <div className="text-xs font-medium text-blue-400 mb-1.5">Available Actions</div>
      <div className="flex flex-wrap gap-1.5">
        {actions.map((action) => (
          <Badge 
            key={action.actionId} 
            variant={isCurrentStep ? "secondary" : "outline"}
            className={`text-xs ${
              isCurrentStep 
                ? "bg-blue-900/60 text-blue-200 hover:bg-blue-900" 
                : "bg-transparent text-blue-300 border-blue-900/50"
            }`}
          >
            <ArrowRight className="mr-1 h-3 w-3" />
            {action.title}
          </Badge>
        ))}
      </div>
    </div>
  );
};
