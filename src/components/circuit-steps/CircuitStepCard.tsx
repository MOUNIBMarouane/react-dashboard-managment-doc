
import { useState } from 'react';
import { ChevronRight, ChevronLeft, ListChecks } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircuitStepHistory } from './CircuitStepHistory';
import { DocumentCircuitHistory } from '@/models/documentCircuit';
import { StepAssignedActions } from '../circuits/document-flow/StepAssignedActions';

interface CircuitStepCardProps {
  detail: any;
  currentStepId?: number | null;
  children?: React.ReactNode;
  historyForStep: DocumentCircuitHistory[];
  isSimpleUser: boolean;
  onMoveClick: () => void;
  onProcessClick: () => void;
  isDraggedOver?: boolean;
}

export const CircuitStepCard = ({
  detail,
  currentStepId,
  children,
  historyForStep,
  isSimpleUser,
  onMoveClick,
  onProcessClick,
  isDraggedOver = false
}: CircuitStepCardProps) => {
  const [showHistory, setShowHistory] = useState(false);
  
  const isCurrentStep = detail.id === currentStepId;
  
  return (
    <Card className={`h-full flex flex-col overflow-hidden transition-all ${
      isCurrentStep 
        ? 'bg-[#101a59] border-blue-600/60 shadow-lg shadow-blue-900/20' 
        : 'bg-[#0a1033] border-blue-900/30'
      } ${isDraggedOver ? 'border-green-500 shadow-md shadow-green-900/30' : ''}`}
    >
      <CardHeader className={`px-3 py-2 border-b ${
        isCurrentStep ? 'border-blue-600/50 bg-[#0a1550]' : 'border-blue-900/30 bg-[#060927]/50'
      }`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm font-medium">
            {detail.isFinalStep && (
              <Badge variant="outline" className="bg-blue-500/10 text-xs border-blue-500/30 gap-1 items-center">
                <ListChecks className="w-3 h-3" /> Final
              </Badge>
            )}
            <span className="text-white">{detail.title}</span>
          </div>
          
          <Badge variant="outline" className="bg-blue-900/20 border-blue-900/30 text-white text-xs">
            Step #{detail.orderIndex + 1}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col p-2 space-y-2 overflow-hidden">
        {detail.descriptif && (
          <p className="text-xs text-gray-400 line-clamp-2">{detail.descriptif}</p>
        )}
        
        {/* Display assigned actions */}
        {detail.id && (
          <StepAssignedActions
            stepId={detail.id}
            isCurrentStep={isCurrentStep}
          />
        )}
        
        {children}
        
        {/* History toggle */}
        <div className="mt-auto flex flex-col space-y-2">
          {historyForStep && historyForStep.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs justify-start px-1 h-6"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? <ChevronLeft className="h-3 w-3 mr-1" /> : <ChevronRight className="h-3 w-3 mr-1" />}
              {showHistory ? 'Hide history' : `Show history (${historyForStep.length})`}
            </Button>
          )}
          
          {showHistory && (
            <CircuitStepHistory historyForStep={historyForStep} />
          )}
          
          {isCurrentStep && !isSimpleUser && (
            <div className="flex gap-1 pt-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-blue-950/50 border-blue-900/50 hover:bg-blue-900/30"
                onClick={onProcessClick}
              >
                Process
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-blue-950/50 border-blue-900/50 hover:bg-blue-900/30"
                onClick={onMoveClick}
              >
                Move
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
