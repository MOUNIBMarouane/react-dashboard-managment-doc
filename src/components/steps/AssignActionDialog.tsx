import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSteps } from '@/hooks/useSteps';
import { useStepActions } from '@/hooks/useStepActions';
import { Action } from '@/models/action';
import { Step } from '@/models/step';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Theme } from '@/context/SettingsContext';

interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: Action;
  theme?: Theme;
  skipStepsFetch?: boolean;
}

export function AssignActionDialog({ 
  open, 
  onOpenChange,
  action,
  theme = 'dark',
  skipStepsFetch = false
}: AssignActionDialogProps) {
  const [selectedSteps, setSelectedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { steps, isLoading: isLoadingSteps } = useSteps({
    skip: skipStepsFetch
  });
  
  const { assignAction } = useStepActions(0);
  
  // Reset selected steps when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setSelectedSteps([]);
    }
  }, [open]);
  
  const handleStepToggle = (stepId: number) => {
    setSelectedSteps(prev => {
      if (prev.includes(stepId)) {
        return prev.filter(id => id !== stepId);
      } else {
        return [...prev, stepId];
      }
    });
  };
  
  const handleSubmit = async () => {
    if (selectedSteps.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      // Process each selected step
      for (const stepId of selectedSteps) {
        await assignAction({
          stepId,
          actionId: action.actionId
        });
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error assigning action to steps:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isDarkTheme = theme === 'dark';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isDarkTheme ? 'bg-[#0a1033] border-blue-900/30 text-white' : 'bg-white'}>
        <DialogHeader>
          <DialogTitle className={isDarkTheme ? 'text-white' : 'text-gray-900'}>
            Assign Action to Steps
          </DialogTitle>
          <DialogDescription className={isDarkTheme ? 'text-blue-300' : 'text-gray-500'}>
            Select the steps where you want to assign the action "{action?.title}".
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className={`rounded-md border ${isDarkTheme ? 'border-blue-900/30 bg-[#111633]' : 'border-gray-200'} p-4 max-h-[300px] overflow-y-auto`}>
            {isLoadingSteps ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="ml-2">Loading steps...</span>
              </div>
            ) : steps && steps.length > 0 ? (
              <div className="space-y-3">
                {steps.map((step: Step) => (
                  <div key={step.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={`step-${step.id}`}
                      checked={selectedSteps.includes(step.id)}
                      onCheckedChange={() => handleStepToggle(step.id)}
                      className={isDarkTheme ? 'border-blue-800' : 'border-gray-300'}
                    />
                    <div className="grid gap-0.5">
                      <Label 
                        htmlFor={`step-${step.id}`}
                        className={isDarkTheme ? 'text-white cursor-pointer' : 'text-gray-900 cursor-pointer'}
                      >
                        {step.title}
                      </Label>
                      <p className={`text-xs ${isDarkTheme ? 'text-blue-400' : 'text-gray-500'}`}>
                        {step.circuit?.title || 'No circuit'} • Step {step.orderIndex}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={isDarkTheme ? 'text-blue-300' : 'text-gray-500'}>
                No steps available to assign this action to.
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className={isDarkTheme ? 'border-blue-900/30 text-white hover:bg-blue-900/20' : ''}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={selectedSteps.length === 0 || isSubmitting}
            className={isDarkTheme ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning...
              </>
            ) : (
              `Assign to ${selectedSteps.length} step${selectedSteps.length !== 1 ? 's' : ''}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
