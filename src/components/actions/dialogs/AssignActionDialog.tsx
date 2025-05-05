
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ActionDto, StatusEffectDto, AssignActionToStepDto } from "@/models/documentCircuit"; 
import { CircleCheck, CircleX, PlusCircle } from "lucide-react";
import { FormError } from "@/components/ui/form-error";

interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableActions: ActionDto[];
  availableStatuses: any[];
  stepId: number;
  onAssign: (data: AssignActionToStepDto) => Promise<void>;
}

export function AssignActionDialog({
  open,
  onOpenChange,
  availableActions,
  availableStatuses,
  stepId,
  onAssign,
}: AssignActionDialogProps) {
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusEffects, setStatusEffects] = useState<StatusEffectDto[]>([]);

  // Reset form when dialog opens/closes
  const resetForm = () => {
    setSelectedActionId(null);
    setStatusEffects([]);
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedActionId) {
      setError("Please select an action");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onAssign({
        stepId,
        actionId: selectedActionId,
        statusEffects: statusEffects.length > 0 ? statusEffects : undefined
      });
      
      // Close dialog on success
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to assign action to step");
    } finally {
      setLoading(false);
    }
  };

  // Toggle a status effect
  const toggleStatusEffect = (statusId: number, checked: boolean) => {
    setStatusEffects(prev => {
      const existingIndex = prev.findIndex(effect => effect.statusId === statusId);
      
      if (existingIndex >= 0) {
        // Update existing effect
        const newEffects = [...prev];
        newEffects[existingIndex] = {
          ...newEffects[existingIndex],
          setsComplete: checked
        };
        return newEffects;
      } else {
        // Add new effect
        return [...prev, { 
          statusId: statusId,
          setsComplete: checked 
        }];
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetForm();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[500px] bg-[#0f1642] border-blue-900/30 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-white">Assign Action to Step</DialogTitle>
            <DialogDescription className="text-gray-400">
              Select an action and configure how it affects statuses.
            </DialogDescription>
          </DialogHeader>

          {error && <FormError message={error} />}

          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="action" className="text-gray-200">Action</Label>
              <Select 
                onValueChange={(value) => setSelectedActionId(Number(value))}
                value={selectedActionId?.toString() || ""}
              >
                <SelectTrigger id="action" className="bg-[#0a1033] border-blue-900/50">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a1033] border-blue-900/50">
                  {availableActions.map((action) => (
                    <SelectItem key={action.actionId} value={action.actionId.toString()}>
                      {action.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {availableStatuses.length > 0 && (
              <div className="space-y-3">
                <Label className="text-gray-200">Status Effects</Label>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {availableStatuses.map((status) => (
                    <div key={status.id} className="flex items-center space-x-2 p-2 bg-[#0a1033]/50 border border-blue-900/30 rounded-md">
                      <Checkbox 
                        id={`status-${status.id}`}
                        className="data-[state=checked]:bg-blue-600"
                        onCheckedChange={(checked) => {
                          toggleStatusEffect(status.id, Boolean(checked));
                        }}
                      />
                      <div className="flex flex-col">
                        <Label 
                          htmlFor={`status-${status.id}`}
                          className="font-normal text-sm cursor-pointer"
                        >
                          {status.title}
                        </Label>
                        <span className="text-xs text-gray-400">
                          {status.isRequired ? "Required" : "Optional"}
                        </span>
                      </div>
                      
                      <div className="ml-auto flex items-center space-x-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className={`h-7 ${
                            statusEffects.some(effect => effect.statusId === status.id && effect.setsComplete)
                            ? 'text-green-500 hover:text-green-400' : 'text-gray-400 hover:text-white'
                          }`}
                          onClick={() => toggleStatusEffect(status.id, true)}
                        >
                          <CircleCheck className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className={`h-7 ${
                            statusEffects.some(effect => effect.statusId === status.id && !effect.setsComplete)
                            ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-white'
                          }`}
                          onClick={() => toggleStatusEffect(status.id, false)}
                        >
                          <CircleX className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-blue-900/50 hover:bg-blue-900/20"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Assigning..." : "Assign Action"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
