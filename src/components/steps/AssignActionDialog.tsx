
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import actionService from '@/services/actionService'; // Fixed import
import { Step } from '@/models/circuit';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';

interface AssignActionDialogProps {
  step: Step;
  isOpen: boolean;
  onClose: () => void;
  onActionAssigned: () => void;
}

export const AssignActionDialog: React.FC<AssignActionDialogProps> = ({
  step,
  isOpen,
  onClose,
  onActionAssigned
}) => {
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: actions, isLoading } = useQuery({
    queryKey: ['actions'],
    queryFn: actionService.getAllActions,
    enabled: isOpen
  });

  const handleAssign = async () => {
    if (!selectedActionId) return;

    setIsSubmitting(true);
    try {
      await actionService.assignToStep({
        stepId: step.id,
        actionId: parseInt(selectedActionId)
      });
      
      toast.success('Action assigned successfully');
      onActionAssigned();
      onClose();
    } catch (error) {
      toast.error('Failed to assign action');
      console.error('Error assigning action:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f1642] border-blue-900/30 text-white">
        <DialogHeader>
          <DialogTitle>Assign Action to Step</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-blue-300">Step</label>
            <div className="text-white font-medium">{step.title}</div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-blue-300">Select Action</label>
            <Select
              disabled={isLoading}
              onValueChange={setSelectedActionId}
              value={selectedActionId || undefined}
            >
              <SelectTrigger className="bg-blue-950/50 border-blue-900/50">
                <SelectValue placeholder="Choose an action" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1033] border-blue-900/30 text-white">
                {isLoading ? (
                  <SelectItem value="loading" disabled>Loading actions...</SelectItem>
                ) : actions && actions.length > 0 ? (
                  actions.map(action => (
                    <SelectItem key={action.id} value={action.id.toString()}>
                      {action.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>No actions available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter className="pt-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="bg-transparent border-blue-800/50 hover:bg-blue-900/30 text-gray-300"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAssign} 
            disabled={!selectedActionId || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Assigning..." : "Assign Action"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
