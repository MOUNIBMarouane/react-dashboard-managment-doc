import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { actionService } from '@/services/actionService';
import { StatusEffectDto } from '@/models/documentCircuit';

interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stepId: number;
  onSuccess?: () => void;
}

export const AssignActionDialog = ({
  open,
  onOpenChange,
  stepId,
  onSuccess,
}: AssignActionDialogProps) => {
  const [actionId, setActionId] = useState<number | null>(null);
  const [statusEffects, setStatusEffects] = useState<StatusEffectDto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: actions = [], isLoading: isLoadingActions } = useQuery({
    queryKey: ['actions'],
    queryFn: () => actionService.getAllActions(),
    enabled: open,
    meta: {
      onSettled: (data, err) => {
        if (err) {
          console.error('Failed to load actions:', err);
          toast.error('Failed to load actions. Please try again.');
        }
      }
    }
  });

  const { data: statuses = [], isLoading: isLoadingStatuses } = useQuery({
    queryKey: ['statuses', stepId],
    queryFn: () => actionService.getStatusesByStepId(stepId),
    enabled: !!stepId && open,
    meta: {
      onSettled: (data, err) => {
        if (err) {
          console.error('Failed to load statuses:', err);
          toast.error('Failed to load statuses. Please try again.');
        }
      }
    }
  });

  const handleActionChange = (id: number) => {
    setActionId(id);
  };

  const handleStatusEffectChange = (statusId: number, setsComplete: boolean) => {
    setStatusEffects(prev => {
      const existing = prev.find(effect => effect.statusId === statusId);
      if (existing) {
        return prev.map(effect =>
          effect.statusId === statusId ? { ...effect, setsComplete } : effect
        );
      } else {
        return [...prev, { statusId, setsComplete }];
      }
    });
  };

  const handleSubmit = async () => {
    if (!actionId) {
      toast.error('Please select an action.');
      return;
    }

    setIsSubmitting(true);
    try {
      await actionService.assignActionToStep({
        stepId,
        actionId,
        statusEffects
      });

      toast.success('Action assigned to step successfully');
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Failed to assign action:', error);
      toast.error('Failed to assign action. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Action to Step</DialogTitle>
          <DialogDescription>
            Select an action and configure status effects for this step.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="action">Action</Label>
            <Input
              type="search"
              id="action"
              placeholder="Search actions..."
              list="action-options"
              className="bg-blue-950/30 border-blue-800/50"
              onChange={(e) => {
                const selectedAction = actions.find(action => action.title === e.target.value);
                if (selectedAction) {
                  handleActionChange(selectedAction.id);
                } else {
                  handleActionChange(0);
                }
              }}
            />
            <datalist id="action-options">
              {actions.map((action) => (
                <option key={action.id} value={action.title} />
              ))}
            </datalist>
          </div>

          <div>
            <Label>Status Effects</Label>
            {isLoadingStatuses ? (
              <p>Loading statuses...</p>
            ) : (
              statuses.map((status) => (
                <div key={status.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status.id}`}
                    checked={statusEffects.find(effect => effect.statusId === status.id)?.setsComplete || false}
                    onCheckedChange={(checked) => handleStatusEffectChange(status.id, !!checked)}
                  />
                  <Label htmlFor={`status-${status.id}`}>{status.title}</Label>
                </div>
              ))
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Assign Action'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
