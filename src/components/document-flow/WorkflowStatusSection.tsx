
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentWorkflowStatus } from '@/models/documentCircuit';
import { StepRequirementsCard } from './StepRequirementsCard';
import { Button } from '@/components/ui/button';
import { MoveRight, Check, ArrowRight } from 'lucide-react';

export interface WorkflowStatusSectionProps {
  workflowStatus: DocumentWorkflowStatus;
  onProcessClick: () => void;
  onMoveClick: () => void;
  onNextStepClick: () => void;
  isSimpleUser: boolean;
  isMoving: boolean;
}

export function WorkflowStatusSection({
  workflowStatus,
  onProcessClick,
  onMoveClick,
  onNextStepClick,
  isSimpleUser,
  isMoving
}: WorkflowStatusSectionProps) {
  if (!workflowStatus) {
    return null;
  }

  return (
    <div className="space-y-4">
      <StepRequirementsCard 
        statuses={workflowStatus.statuses} 
        workflowStatus={workflowStatus}
        canComplete={!isSimpleUser && workflowStatus.canAdvanceToNextStep}
        onStatusComplete={onProcessClick}
        isReadOnly={isSimpleUser}
      />

      {!isSimpleUser && (
        <div className="flex flex-col sm:flex-row gap-2">
          {workflowStatus.canAdvanceToNextStep && (
            <Button 
              className="flex-1" 
              onClick={onNextStepClick}
              disabled={isMoving}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Move to Next Step
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onMoveClick}
            disabled={isMoving}
          >
            <MoveRight className="mr-2 h-4 w-4" />
            Move to Any Step
          </Button>
        </div>
      )}
    </div>
  );
}
