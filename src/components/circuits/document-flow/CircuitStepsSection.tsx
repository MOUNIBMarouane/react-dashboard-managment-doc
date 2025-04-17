
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircuitStepCard } from './CircuitStepCard';
import { DocumentCircuitHistory, DocumentWorkflowStatus } from '@/models/documentCircuit';
import { Document } from '@/models/document';
import { DraggableDocumentCard } from './DraggableDocumentCard';
import { useDocumentMovement } from '@/hooks/useDocumentMovement';
import { CircuitStepsSectionHeader } from './CircuitStepsSectionHeader';

interface CircuitStepsSectionProps {
  circuitDetails: any[];
  circuitHistory: DocumentCircuitHistory[];
  document: Document;
  workflowStatus: DocumentWorkflowStatus;
  isSimpleUser: boolean;
  onMoveClick: () => void;
  onProcessClick: () => void;
  onNextStepClick: () => void;
  onDocumentMoved: () => void;
}

export const CircuitStepsSection = ({
  circuitDetails,
  circuitHistory,
  document,
  workflowStatus,
  isSimpleUser,
  onMoveClick,
  onProcessClick,
  onNextStepClick,
  onDocumentMoved
}: CircuitStepsSectionProps) => {
  const [showHelp, setShowHelp] = useState(false);
  const [draggedOverStepId, setDraggedOverStepId] = useState<number | null>(null);
  const currentStepId = workflowStatus?.currentStepId;
  
  const { isMoving, moveDocument } = useDocumentMovement({
    onMoveSuccess: onDocumentMoved
  });
  
  if (!circuitDetails || circuitDetails.length === 0) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No steps defined for this circuit. The circuit may be improperly configured.
        </AlertDescription>
      </Alert>
    );
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, stepId: number) => {
    e.preventDefault();
    if (stepId !== currentStepId && !isSimpleUser) {
      setDraggedOverStepId(stepId);
    }
  };

  const handleDragLeave = () => {
    setDraggedOverStepId(null);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, stepId: number) => {
    e.preventDefault();
    setDraggedOverStepId(null);
    
    // Prevent drops for simple users or if dropping onto current step
    if (isSimpleUser || stepId === currentStepId || !currentStepId) {
      return;
    }

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.documentId && document?.id === data.documentId) {
        // Get current and target step information
        const currentStep = circuitDetails.find(step => step.id === currentStepId);
        const targetStep = circuitDetails.find(step => step.id === stepId);
        
        await moveDocument({
          documentId: document.id,
          currentStepId,
          targetStepId: stepId,
          currentStep,
          targetStep,
          comments: `Moved document from drag and drop to step #${stepId}`
        });
      }
    } catch (error) {
      console.error('Error moving document:', error);
    }
  };
  
  return (
    <div>
      <CircuitStepsSectionHeader 
        showHelp={showHelp}
        setShowHelp={setShowHelp}
        isSimpleUser={isSimpleUser}
        availableActions={workflowStatus.availableActions || []}
        canAdvanceToNextStep={workflowStatus.canAdvanceToNextStep}
        canReturnToPreviousStep={workflowStatus.canReturnToPreviousStep}
        isMoving={isMoving}
        onProcessClick={onProcessClick}
        onNextStepClick={onNextStepClick}
        onMoveClick={onMoveClick}
      />
      
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-6 min-w-full p-2">
          {circuitDetails?.map((detail) => {
            const historyForStep = circuitHistory?.filter(h => h.circuitDetailId === detail.id) || [];
            const isOver = draggedOverStepId === detail.id;
            const isCurrentStep = detail.id === currentStepId;
            
            return (
              <div 
                key={detail.id} 
                className={`w-80 flex-shrink-0 transition-all duration-300 ${isOver ? 'scale-105 transform' : ''}`}
                onDragOver={(e) => handleDragOver(e, detail.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, detail.id)}
              >
                <CircuitStepCard 
                  detail={detail}
                  currentStepId={currentStepId}
                  historyForStep={historyForStep}
                  isSimpleUser={isSimpleUser}
                  onMoveClick={onMoveClick}
                  onProcessClick={onProcessClick}
                  isDraggedOver={isOver}
                >
                  {isCurrentStep && document && (
                    <div className="mt-4 mb-2">
                      <DraggableDocumentCard 
                        document={document} 
                        onDragStart={() => console.log('Dragging document', document.id)} 
                      />
                    </div>
                  )}
                </CircuitStepCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
