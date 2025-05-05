
import React from 'react';
import { DocumentWorkflowStatus } from '@/models/documentCircuit';
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

export default WorkflowStatusSection;
