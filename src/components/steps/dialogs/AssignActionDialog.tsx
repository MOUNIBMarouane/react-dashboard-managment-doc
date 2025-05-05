
import React from 'react';
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
  isOpen, 
  onClose, 
  onActionAssigned,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Assign Action to Step</AlertDialogTitle>
          <AlertDialogDescription>
            Select an action to assign to step {stepId}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            if (onActionAssigned) onActionAssigned();
          }}>Assign</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AssignActionDialog;
