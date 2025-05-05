
import { useState, useEffect } from 'react';
import { Step } from '@/models/step';
import StepFormDialog from '@/components/steps/dialogs/StepFormDialog';
import { Button } from '@/components/ui/button';
import circuitService from '@/services/circuitService';

export const EditStepDialog = ({ open, onOpenChange, editStep, circuitId, onSuccess, title }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editStep: Step;
  circuitId: number;
  onSuccess?: () => void;
  title: string;
}) => {
  return (
    <StepFormDialog
      open={open}
      onOpenChange={onOpenChange}
      step={editStep}
      title={title}
      circuitId={circuitId}
      onSuccess={onSuccess}
    >
      {/* Add form content here */}
      <div>Step edit form content</div>
    </StepFormDialog>
  );
};
