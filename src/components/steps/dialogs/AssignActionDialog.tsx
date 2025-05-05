
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Step } from '@/models/step';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import workflowStepService from '@/services/workflowStepService';
import { ActionItem } from '@/models/actionItem';
import { Loader2 } from 'lucide-react';

export interface AssignActionDialogProps {
  stepId: number;
  step?: Step;
  isOpen: boolean;
  onClose: () => void;
  onActionAssigned?: () => void;
  action?: any;
}

const AssignActionDialog: React.FC<AssignActionDialogProps> = ({ 
  stepId, 
  step,
  isOpen, 
  onClose, 
  onActionAssigned,
  action
}) => {
  const [selectedActionId, setSelectedActionId] = useState<string>("");

  const { data: availableActions, isLoading } = useQuery({
    queryKey: ['step-actions', stepId],
    queryFn: () => workflowStepService.getActionsForStep(stepId),
    enabled: isOpen && !!stepId
  });

  // Reset selection when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedActionId("");
    }
  }, [isOpen]);

  const handleAssign = () => {
    if (selectedActionId && onActionAssigned) {
      // In a real app, you'd save this assignment here first
      console.log(`Assigning action ${selectedActionId} to step ${stepId}`);
      onActionAssigned();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Assign Action to Step</AlertDialogTitle>
          <AlertDialogDescription>
            Select an action to assign to step {step ? step.title : stepId}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="action">Action</Label>
                <Select
                  value={selectedActionId}
                  onValueChange={setSelectedActionId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an action" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableActions?.map((action: ActionItem) => (
                      <SelectItem 
                        key={action.id || action.actionId} 
                        value={action.id?.toString() || action.actionId.toString()}
                      >
                        {action.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedActionId && availableActions?.find((a: ActionItem) => 
                (a.id?.toString() || a.actionId?.toString()) === selectedActionId
              )?.description && (
                <div className="text-sm text-gray-500">
                  {availableActions.find((a: ActionItem) => 
                    (a.id?.toString() || a.actionId?.toString()) === selectedActionId
                  )?.description}
                </div>
              )}
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleAssign}
            disabled={!selectedActionId}
          >
            Assign
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AssignActionDialog;
