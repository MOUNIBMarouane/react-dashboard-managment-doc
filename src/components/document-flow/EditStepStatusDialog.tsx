
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useStepStatuses } from '@/hooks/useStepStatuses';

interface EditStepStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId: number;
  statusId: number;
  statusTitle: string;
  isComplete: boolean;
}

export function EditStepStatusDialog({
  open,
  onOpenChange,
  documentId,
  statusId,
  statusTitle,
  isComplete: initialIsComplete
}: EditStepStatusDialogProps) {
  const [isComplete, setIsComplete] = useState(initialIsComplete);
  const [comments, setComments] = useState('');
  const { completeStatus, isCompletingStatus } = useStepStatuses(documentId);

  const handleSubmit = async () => {
    await completeStatus(statusId, isComplete, comments);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => {
      if (!isCompletingStatus) {
        onOpenChange(value);
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>
            Edit the completion status for "{statusTitle}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="status-complete" 
              checked={isComplete}
              onCheckedChange={(checked) => setIsComplete(checked as boolean)}
            />
            <Label htmlFor="status-complete">Mark as complete</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comments">Comments (optional)</Label>
            <Textarea
              id="comments"
              placeholder="Add any additional comments..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isCompletingStatus}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isCompletingStatus}>
            {isCompletingStatus ? 'Updating...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
