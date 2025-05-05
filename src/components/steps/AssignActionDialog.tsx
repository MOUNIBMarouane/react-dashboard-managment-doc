import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { Action } from "@/models/action";
import { ActionService } from "@/services/actionService";
import { AssignActionToStepDto } from "@/models/documentCircuit";

interface AssignActionDialogProps {
  stepId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (data: AssignActionToStepDto) => Promise<void>;
}

const AssignActionDialog: React.FC<AssignActionDialogProps> = ({ stepId, open, onOpenChange, onAssign }) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [selectedActionId, setSelectedActionId] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const actionService = new ActionService();

  useEffect(() => {
    if (open) {
      fetchActions();
    }
  }, [open]);

  const fetchActions = async () => {
    try {
      const actionsList = await actionService.getAllActions();
      setActions(actionsList);
    } catch (error) {
      console.error("Error fetching actions:", error);
      setError("Failed to load actions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignAction = async () => {
    if (!selectedActionId) {
      toast({
        title: "Error",
        description: "Please select an action to assign.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onAssign({ stepId: stepId, actionId: selectedActionId });
      toast({
        title: "Success",
        description: "Action assigned to step successfully.",
      });
      onOpenChange(false); // Close the dialog after successful assignment
    } catch (error) {
      console.error("Error assigning action:", error);
      toast({
        title: "Error",
        description: "Failed to assign action to step.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Assign Action to Step</AlertDialogTitle>
          <AlertDialogDescription>
            Select an action to assign to step {stepId}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="action">Action</Label>
            <Select onValueChange={(value) => setSelectedActionId(parseInt(value))} defaultValue={selectedActionId?.toString()}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-72 w-full">
                  {actions.map((action) => (
                    <SelectItem key={action.actionId} value={action.actionId.toString()}>
                      {action.title}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAssignAction}>Assign Action</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AssignActionDialog;
