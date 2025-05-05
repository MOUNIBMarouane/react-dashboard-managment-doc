
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import actionService from '@/services/actionService';
import { Action } from '@/models/circuit';
import { useActionsSelect } from '@/hooks/useActionsSelect';

interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stepId: number;
  onAssignSuccess: () => void;
}

export function AssignActionDialog({
  open,
  onOpenChange,
  stepId,
  onAssignSuccess
}: AssignActionDialogProps) {
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { actions, isLoading, error } = useActionsSelect();
  
  const handleAssign = async () => {
    if (!selectedActionId) {
      toast.error("Please select an action to assign");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await actionService.assignActionToStep(stepId, selectedActionId);
      toast.success("Action assigned to step successfully");
      onAssignSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error assigning action:", error);
      toast.error("Failed to assign action to step");
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
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="action" className="text-right text-sm font-medium">
              Action
            </label>
            <div className="col-span-3">
              <Select
                value={selectedActionId?.toString()}
                onValueChange={(value) => setSelectedActionId(Number(value))}
                disabled={isLoading}
              >
                <SelectTrigger id="action">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  {actions.map((action: Action) => (
                    <SelectItem key={action.id} value={action.actionId.toString()}>
                      {action.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAssign} disabled={isSubmitting || !selectedActionId}>
            {isSubmitting ? "Assigning..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
