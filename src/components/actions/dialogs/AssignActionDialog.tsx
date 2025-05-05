
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Step } from '@/models/step';

export interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stepId: number;
  step: Step;
  onActionAssigned?: () => void;
}

export const AssignActionDialog = ({
  open,
  onOpenChange,
  stepId,
  step,
  onActionAssigned
}: AssignActionDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // Add your action assignment logic here
      
      // Call the callback to refresh actions
      if (onActionAssigned) {
        onActionAssigned();
      }
      
      // Close the dialog
      onOpenChange(false);
    } catch (error) {
      console.error('Error assigning action:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Action to Step</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Step: {step.title}
          </p>
          {/* Add action selection UI here */}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Assigning...' : 'Assign Action'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
