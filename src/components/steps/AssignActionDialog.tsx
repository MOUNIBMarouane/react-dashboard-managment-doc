
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useActionManagement } from '@/hooks/useActionManagement';
import { useActionsSelect } from '@/hooks/useActionsSelect';
import { useStepActions } from '@/hooks/useStepActions';
import { ActionDto } from '@/models/circuit';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stepId: number;
  stepTitle?: string;
  onSuccess?: () => void;
  skipStepsFetch?: boolean;
}

export function AssignActionDialog({
  open,
  onOpenChange,
  stepId,
  stepTitle = "Step",
  onSuccess,
  skipStepsFetch = false
}: AssignActionDialogProps) {
  const [selectedActionIds, setSelectedActionIds] = useState<number[]>([]);
  const { actions, isLoading: isLoadingActions } = useActionsSelect();
  const { stepActions, isLoading: isLoadingStepActions, refetch } = useStepActions(stepId, skipStepsFetch);
  const { assignAction, isAssigning } = useActionManagement();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && !skipStepsFetch) {
      refetch();
    }
  }, [open, refetch, skipStepsFetch]);

  useEffect(() => {
    if (stepActions) {
      setSelectedActionIds(stepActions.map(sa => sa.actionId));
    }
  }, [stepActions]);

  const handleAssign = async () => {
    setIsSubmitting(true);
    
    try {
      // Find actions that need to be assigned (new selections)
      const actionsToAssign = selectedActionIds.filter(
        actionId => !stepActions.some(sa => sa.actionId === actionId)
      );

      // Find actions that need to be unassigned (removed selections)
      const actionsToRemove = stepActions
        .filter(sa => !selectedActionIds.includes(sa.actionId))
        .map(sa => sa.id);

      // Process all assignments
      const assignPromises = actionsToAssign.map(actionId => 
        assignAction(stepId, actionId)
      );

      // Wait for all operations to complete
      await Promise.all(assignPromises);
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Close the dialog after successful operation
      onOpenChange(false);
    } catch (error) {
      console.error('Error assigning actions:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleActionSelection = (actionId: number) => {
    setSelectedActionIds(prev => {
      if (prev.includes(actionId)) {
        return prev.filter(id => id !== actionId);
      } else {
        return [...prev, actionId];
      }
    });
  };

  const isLoading = isLoadingActions || isLoadingStepActions;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f1642] border-blue-900/50 text-white sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Assign Actions to {stepTitle}</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto pr-1">
            <Table>
              <TableHeader>
                <TableRow className="border-blue-900/30">
                  <TableHead className="w-[60px] text-blue-300"></TableHead>
                  <TableHead className="text-blue-300">Action Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actions.map((action: ActionDto) => (
                  <TableRow key={action.actionId} className="border-blue-900/30 hover:bg-blue-900/20">
                    <TableCell>
                      <Checkbox
                        checked={selectedActionIds.includes(action.actionId)}
                        onCheckedChange={() => toggleActionSelection(action.actionId)}
                        className="border-blue-700"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{action.title}</TableCell>
                  </TableRow>
                ))}

                {actions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                      No actions available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
        
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-blue-900/50 text-blue-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Assignments'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
