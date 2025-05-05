
import React from 'react';
import { DocumentWorkflowStatus, DocumentStatusDto } from '@/models/documentCircuit';
import StepRequirementsCard from './StepRequirementsCard';

interface WorkflowStatusSectionProps {
  workflowStatus: DocumentWorkflowStatus;
}

const WorkflowStatusSection: React.FC<WorkflowStatusSectionProps> = ({ workflowStatus }) => {
  return (
    <div>
      <StepRequirementsCard 
        statuses={workflowStatus.statuses} 
        canComplete={workflowStatus.canAdvanceToNextStep}
        onStatusComplete={() => {}}
        isReadOnly={false}
      />
    </div>
  );
};

export default WorkflowStatusSection;
