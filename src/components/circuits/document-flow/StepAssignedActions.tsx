
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import actionService from "@/services/actionService";
import { toast } from "sonner";

interface StepAssignedActionsProps {
  stepId: number;
  isCurrentStep?: boolean;
  onActionClick?: (actionId: number) => void;
}

export const StepAssignedActions = ({
  stepId,
  isCurrentStep,
  onActionClick,
}: StepAssignedActionsProps) => {
  const [actions, setActions] = useState<any[]>([]);

  // Fetch actions assigned to this step
  const {
    data: stepActions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["step-actions", stepId],
    queryFn: () => actionService.getActionsByStep(stepId),
    enabled: !!stepId,
  });

  useEffect(() => {
    if (stepActions) {
      setActions(stepActions);
    }
  }, [stepActions]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-20 bg-blue-900/20" />
        <Skeleton className="h-8 w-24 bg-blue-900/20" />
      </div>
    );
  }

  if (isError) {
    console.error("Error loading step actions:", error);
    return (
      <div className="text-sm text-red-400">
        Failed to load available actions
      </div>
    );
  }

  if (!actions || actions.length === 0) {
    return (
      <div className="text-sm text-gray-400 italic">
        No actions assigned to this step
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-blue-300">Available actions:</p>
      <div className="flex flex-wrap gap-1">
        {actions.map((action) => (
          <Button
            key={action.actionId}
            size="sm"
            variant="outline"
            className={`text-xs h-7 ${isCurrentStep 
              ? "bg-blue-900/20 border-blue-800/30 hover:bg-blue-800/30" 
              : "bg-blue-900/10 border-blue-800/20 hover:bg-blue-800/20"}`}
            onClick={() => {
              if (onActionClick) {
                onActionClick(action.actionId);
              } else {
                toast.info(`Action: ${action.title}`);
              }
            }}
          >
            {action.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
