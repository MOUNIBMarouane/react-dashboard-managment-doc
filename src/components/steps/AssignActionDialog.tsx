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
  const [statusEffects, setStatusEffects] = useState<{ statusId: number; setsComplete: boolean; }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: actions = [], isLoading: isLoadingActions } = useQuery({
    queryKey: ['actions'],
    queryFn: () => actionService.getAllActions(),
    onError: (error) => {
      toast.error(`Failed to load actions: ${error.message}`);
    },
  });

  const { data: statuses = [], isLoading: isLoadingStatuses } = useQuery({
    queryKey: ['statuses', stepId],
    queryFn: () => actionService.getStatusesByStep(stepId),
    enabled: !!stepId,
    onError: (error) => {
      toast.error(`Failed to load statuses: ${error.message}`);
    },
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
      const statusEffectsPayload = statusEffects.map(({ statusId, setsComplete }) => ({
        statusId,
        setsComplete,
      }));

      await actionService.assignActionToStep({
        stepId: stepId,
        actionId: actionId,
        statusEffects: statusEffectsPayload,
      });

      toast.success('Action assigned to step successfully!');
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(`Failed to assign action: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f1642] border-blue-900/50 text-white sm:max-w-[500px]">
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
