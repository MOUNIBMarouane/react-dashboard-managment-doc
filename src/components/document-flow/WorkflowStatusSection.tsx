
import { DocumentWorkflowStatus } from '@/models/documentCircuit';
import { DocumentStatusCard } from './DocumentStatusCard';
import { StepRequirementsCard } from './StepRequirementsCard';

interface WorkflowStatusSectionProps {
  workflowStatus: DocumentWorkflowStatus | null | undefined;
}

export function WorkflowStatusSection({ workflowStatus }: WorkflowStatusSectionProps) {
  if (!workflowStatus) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      <DocumentStatusCard workflowStatus={workflowStatus} />
      <StepRequirementsCard 
        statuses={workflowStatus.statuses} 
        workflowStatus={workflowStatus}
      />
    </div>
  );
}
