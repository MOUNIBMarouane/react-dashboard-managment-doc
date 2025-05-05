
import React from 'react';
import { DocumentWorkflowStatus, DocumentStatusDto } from '@/models/documentCircuit';
import StepRequirementsCard from './StepRequirementsCard';

interface WorkflowStatusSectionProps {
  workflowStatus: DocumentWorkflowStatus;
  canComplete?: boolean;
  onStatusComplete?: () => void;
  isReadOnly?: boolean;
}

export function WorkflowStatusSection({ 
  workflowStatus,
  canComplete = false,
  onStatusComplete = () => {},
  isReadOnly = false
}: WorkflowStatusSectionProps) {
  return (
    <div>
      <StepRequirementsCard 
        statuses={workflowStatus.statuses}
        workflowStatus={workflowStatus}
        canComplete={canComplete}
        onStatusComplete={onStatusComplete}
        isReadOnly={isReadOnly}
      />
    </div>
  );
}

export default WorkflowStatusSection;
