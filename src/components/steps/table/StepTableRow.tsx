import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Action } from "@/models/action";
import { Step } from "@/models/step";
import { ActionItem } from "@/models/actionItem";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Copy, Edit, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "@/hooks/use-toast";
import { AssignActionDialog } from "../dialogs/AssignActionDialog";
import { workflowStepService } from "@/services/workflowStepService";
import { useWorkflowStepStatuses } from "@/hooks/useWorkflowStepStatuses";
import { WorkflowStepStatus } from "@/models/workflowStepStatus";
import { WorkflowStepStatusEnum } from "@/enums/WorkflowStepStatusEnum";
import { AssignActionDialogProps } from "@/components/steps/dialogs/AssignActionDialog";

interface StepTableRowProps {
  step: Step;
  isOpen: boolean;
  onClose: () => void;
  onActionAssigned: () => void;
}

const StepTableRow: React.FC<StepTableRowProps> = ({
  step,
  isOpen,
  onClose,
  onActionAssigned,
}) => {
  const [isAssignActionDialogOpen, setIsAssignActionDialogOpen] =
    useState(false);
  const [assignedActions, setAssignedActions] = useState<ActionItem[]>([]);
  const { theme } = useTheme();
  const { updateStepStatus } = useWorkflowStepStatuses();

  useEffect(() => {
    const loadAssignedActions = async () => {
      try {
        const actions = await workflowStepService.getActionsForStep(step.id);
        setAssignedActions(actions);
      } catch (error) {
        console.error("Failed to load assigned actions:", error);
        toast({
          title: "Error",
          description: "Failed to load assigned actions.",
          variant: "destructive",
        });
      }
    };

    loadAssignedActions();
  }, [step.id, isAssignActionDialogOpen]);

  const handleActionAssigned = () => {
    onActionAssigned();
    setIsAssignActionDialogOpen(false);
  };

  const handleStatusChange = async (
    newStatus: WorkflowStepStatusEnum,
    stepId: number
  ) => {
    try {
      await updateStepStatus({ stepId: stepId, status: newStatus });
      toast({
        title: "Success",
        description: "Step status updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update step status:", error);
      toast({
        title: "Error",
        description: "Failed to update step status.",
        variant: "destructive",
      });
    }
  };

  const AssignActionDialogComponent = () => {
    return (
      <AssignActionDialog
        stepId={step.id}
        step={step}
        isOpen={isAssignActionDialogOpen}
        onClose={() => setIsAssignActionDialogOpen(false)}
        onActionAssigned={handleActionAssigned}
      />
    );
  };

  return (
    <TableRow key={step.id}>
      <TableCell className="font-medium">{step.stepKey}</TableCell>
      <TableCell>{step.title}</TableCell>
      <TableCell>{step.description}</TableCell>
      <TableCell>
        {assignedActions && assignedActions.length > 0
          ? assignedActions.map((action) => (
              <div key={action.actionId}>{action.title}</div>
            ))
          : "No actions assigned"}
      </TableCell>
      <TableCell className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setIsAssignActionDialogOpen(true)}
            >
              <Edit className="mr-2 h-4 w-4" /> Assign Actions
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AssignActionDialogComponent />
      </TableCell>
    </TableRow>
  );
};

export default StepTableRow;
