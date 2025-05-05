import React from 'react';
import { Step } from '@/models/step';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { StepFormProvider } from '@/components/steps/form/StepFormProvider';
import { StepForm } from '@/components/steps/form/StepForm';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export interface StepFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  step?: Step;
  circuitId: number;
  title: string;
  children: React.ReactNode;
}

const StepFormDialog: React.FC<StepFormDialogProps> = ({ 
  open,
  onOpenChange,
  onSuccess,
  step,
  circuitId,
  title,
  children 
}) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {step ? 'Edit the details of this step.' : 'Create a new step for this circuit.'}
          </DialogDescription>
        </DialogHeader>
        
        <StepFormProvider
          editStep={step}
          onSuccess={onSuccess}
          circuitId={circuitId}
        >
          <div className="py-4">
            <StepForm />
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-none"
            >
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            
            {children}
          </DialogFooter>
        </StepFormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default StepFormDialog;
