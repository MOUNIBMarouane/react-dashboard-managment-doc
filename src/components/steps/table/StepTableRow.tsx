
import { useState } from 'react';
import { MoreVertical, Edit, Trash2, AlertCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Step } from '@/models/circuit';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AssignActionDialog } from '@/components/actions/dialogs/AssignActionDialog';

interface StepTableRowProps {
  step: Step;
  isSelected: boolean;
  onSelectStep: (stepId: number, checked: boolean) => void;
  onDeleteStep: (stepId: number) => void;
  onEditStep: (step: Step) => void;
  disabled?: boolean;
  onActionsRefresh: () => void;
}

export const StepTableRow = ({
  step,
  isSelected,
  onSelectStep,
  onDeleteStep,
  onEditStep,
  disabled = false,
  onActionsRefresh
}: StepTableRowProps) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignActionDialogOpen, setIsAssignActionDialogOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteStep(step.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditStep(step);
  };

  const handleAssignActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAssignActionDialogOpen(true);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <tr
            onClick={() => onSelectStep(step.id, !isSelected)}
            className={`group data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-secondary/50 cursor-pointer ${
              isSelected ? 'bg-secondary' : ''
            }`}
          >
            <td className="p-4 align-middle">
              <Checkbox
                id={step.id.toString()}
                checked={isSelected}
                onCheckedChange={(checked) => onSelectStep(step.id, !!checked)}
                disabled={disabled}
                aria-label="Select step"
              />
            </td>
            <td className="p-4 align-middle">{step.stepKey}</td>
            <td className="p-4 align-middle">{step.title}</td>
            <td className="p-4 align-middle">{step.descriptif}</td>
            <td className="p-4 align-middle">{step.orderIndex}</td>
            <td className="p-4 align-middle">
              {step.responsibleRole ? step.responsibleRole.roleName : 'N/A'}
            </td>
            <td className="p-4 align-middle">
              {step.isFinalStep ? (
                <Badge variant="outline">Yes</Badge>
              ) : (
                <Badge variant="secondary">No</Badge>
              )}
            </td>
            <td className="p-4 align-middle">
              {step.createdAt ? formatDate(step.createdAt, 'MMM dd, yyyy') : 'N/A'}
            </td>
            <td className="p-4 align-middle">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleEditClick}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAssignActionClick}>
                    <Plus className="mr-2 h-4 w-4" /> Assign Action
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {disabled ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DropdownMenuItem className="text-red-600 cursor-not-allowed opacity-50">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                            <AlertCircle className="ml-auto h-4 w-4" />
                          </DropdownMenuItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Cannot delete steps from active circuit</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <DropdownMenuItem onClick={handleDeleteClick} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        </TooltipTrigger>
        <TooltipContent>
          <p>Select step to perform bulk actions</p>
        </TooltipContent>
      </Tooltip>

      <AssignActionDialog
        open={isAssignActionDialogOpen}
        onOpenChange={setIsAssignActionDialogOpen}
        stepId={step.id}
        step={step}
        onActionAssigned={onActionsRefresh}
      />
    </TooltipProvider>
  );
};
