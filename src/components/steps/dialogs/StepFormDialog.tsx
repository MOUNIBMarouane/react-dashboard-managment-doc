
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Step } from '@/models/step';

interface StepFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step?: Step;
  title: string;
  children: React.ReactNode;
  circuitId?: number;
  onSuccess?: () => void;
}

const StepFormDialog = ({
  open,
  onOpenChange,
  step,
  title,
  children
}: StepFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {step ? `Edit Step: ${step.title}` : title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default StepFormDialog;
