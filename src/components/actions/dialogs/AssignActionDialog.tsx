
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Theme } from '@/context/SettingsContext';
import { Action } from '@/models/action';
// Removed the Status import since it's not needed in this component

export interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  action: Action | null;
  theme: Theme;
  skipStepsFetch: boolean;
}

const AssignActionDialog: React.FC<AssignActionDialogProps> = ({
  open,
  onOpenChange,
  action,
  theme,
  skipStepsFetch,
}) => {
  if (!action) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Action</DialogTitle>
          <DialogDescription>
            Assign the action "{action.title}" to a specific step.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Action ID: {action.id}</p>
          <p>Action Title: {action.title}</p>
          {/* Add any additional UI elements here for assigning the action */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignActionDialog;
