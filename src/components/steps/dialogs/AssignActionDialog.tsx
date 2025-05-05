
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Step } from "@/models/step";

export interface AssignActionDialogProps {
  stepId: number;
  step: Step;
  isOpen: boolean;
  onClose: () => void;
  onActionAssigned: () => void;
}

const AssignActionDialog = ({ 
  stepId,
  step, 
  isOpen, 
  onClose, 
  onActionAssigned 
}: AssignActionDialogProps) => {
  const [assignedActions, setAssignedActions] = useState<any[]>([]);
  const [availableActions, setAvailableActions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Load assigned and available actions
      // This would be replaced with API calls to fetch actual data
      setAssignedActions([]);
      setAvailableActions([
        { id: 1, title: "Approve", description: "Approve the document" },
        { id: 2, title: "Reject", description: "Reject the document" }
      ]);
    }
  }, [isOpen]);

  const handleAssignAction = async (actionId: number) => {
    try {
      setIsLoading(true);
      // Call API to assign action
      console.log(`Assigning action ${actionId} to step ${stepId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onActionAssigned();
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to assign action:", error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Actions to Step: {step.title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="text-sm font-medium mb-2">Available Actions</h3>
          {availableActions.map(action => (
            <div 
              key={action.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <p className="font-medium">{action.title}</p>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAssignAction(action.id)}
                disabled={isLoading}
              >
                Assign
              </Button>
            </div>
          ))}
          
          <h3 className="text-sm font-medium mt-4 mb-2">Assigned Actions</h3>
          {assignedActions.length > 0 ? (
            assignedActions.map(action => (
              <div 
                key={action.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {}}
                  disabled={isLoading}
                >
                  Remove
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No actions assigned yet.</p>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignActionDialog;
