
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
        workflowStatus={workflowStatus}
      />
    </div>
  );
};

export { WorkflowStatusSection };
export default WorkflowStatusSection;
