
import { useCallback } from 'react';
import { Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircuitStepFooter } from './CircuitStepFooter';
import { CircuitStepHistory } from './CircuitStepHistory';
import { DocumentCircuitHistory } from '@/models/documentCircuit';
import { StepAssignedActions } from './StepAssignedActions';

export interface CircuitStepCardProps {
  title: string;
  description?: string;
  detail: any;
  number?: number;
  isSimpleUser?: boolean;
  isCurrentStep?: boolean;
  currentStepId?: number;
  historyForStep: DocumentCircuitHistory[];
  onMoveClick?: () => void;
  onProcessClick?: () => void;
  onEditClick?: () => void;
  onDeleteStep?: () => void;
  isDraggedOver?: boolean;
  children?: React.ReactNode;
  stepId: number;
}

export const CircuitStepCard = ({
  title,
  description,
  detail,
  number,
  isSimpleUser = false,
  isCurrentStep = false,
  currentStepId,
  historyForStep = [],
  onEditClick,
  onMoveClick,
  onProcessClick,
  onDeleteStep,
  isDraggedOver = false,
  children,
  stepId
}: CircuitStepCardProps) => {
  
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteStep) onDeleteStep();
  }, [onDeleteStep]);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditClick) onEditClick();
  }, [onEditClick]);

  return (
    <Card
      className={`mb-4 flex flex-col border-blue-800/30 ${
        isCurrentStep ? 'bg-blue-900/20 ring-2 ring-blue-500/30' : 'bg-[#0a1033]'
      } ${isDraggedOver ? 'border-blue-500' : ''} relative overflow-hidden`}
    >
      {isCurrentStep && (
        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
      )}
      
      <CardHeader className="pb-2 relative">
        {number !== undefined && (
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-900 text-blue-100 rounded-bl-md rounded-tr-md flex items-center justify-center font-mono text-sm">
            {number}
          </div>
        )}
        
        <CardTitle className="text-lg font-semibold text-blue-100">
          {title}
        </CardTitle>
        
        {!isSimpleUser && (
          <div className="absolute top-3 right-4 flex space-x-1">
            <Button 
              onClick={handleEdit} 
              size="sm" 
              variant="ghost"
              className="h-7 w-7 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/40"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span className="sr-only">Edit Step</span>
            </Button>
            
            <Button 
              onClick={handleDelete} 
              size="sm" 
              variant="ghost"
              className="h-7 w-7 p-0 text-blue-400 hover:text-red-400 hover:bg-blue-900/40"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only">Delete Step</span>
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        {description && <p className="text-sm text-blue-300/80 mb-3">{description}</p>}
        
        {children}
        
        <StepAssignedActions stepId={stepId} isCurrentStep={isCurrentStep} />
        
        {historyForStep.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-blue-400 mb-1">Recent Activity</p>
            <CircuitStepHistory historyForStep={historyForStep} />
          </div>
        )}
      </CardContent>
      
      <CircuitStepFooter 
        isSimpleUser={isSimpleUser} 
        isCurrentStep={isCurrentStep}
        onMoveClick={onMoveClick}
        onProcessClick={onProcessClick}
      />
    </Card>
  );
};
