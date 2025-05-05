
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import actionService from "@/services/actionService";
import { ActionDto } from "@/models/documentCircuit";
import { AssignActionToStepDto, StatusEffectDto } from "@/models/action";
import { Step, Status } from "@/models/step"; // Update import from step model
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CheckboxWithLabel } from "@/components/ui/checkbox-with-label";
import { toast } from "sonner";

export interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stepId: number;
  onActionAssigned: () => void;
  step?: Step; // Make step optional to fix the prop error
}

export function AssignActionDialog({
  open,
  onOpenChange,
  stepId,
  onActionAssigned,
  step
}: AssignActionDialogProps) {
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);
  const [statusEffects, setStatusEffects] = useState<StatusEffectDto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available actions
  const {
    data: actions,
    isLoading: isLoadingActions,
    error: actionsError,
  } = useQuery({
    queryKey: ["actions"],
    queryFn: () => actionService.getAllActions(),
    enabled: open,
  });

  // Fetch statuses for this step
  const {
    data: statuses,
    isLoading: isLoadingStatuses,
    error: statusesError,
  } = useQuery({
    queryKey: ["step-statuses", stepId],
    queryFn: () => actionService.getStatusesByStep(stepId),
    enabled: open && stepId > 0,
  });

  const handleActionSelect = (actionId: number) => {
    setSelectedActionId(selectedActionId === actionId ? null : actionId);
    setStatusEffects([]);
  };

  const handleStatusEffectChange = (statusId: number, setsComplete: boolean) => {
    setStatusEffects((prev) => {
      const existing = prev.findIndex((se) => se.statusId === statusId);
      if (existing >= 0) {
        return prev.map((se) =>
          se.statusId === statusId ? { ...se, setsComplete } : se
        );
      } else {
        return [...prev, { statusId, setsComplete }];
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedActionId) {
      toast.error("Please select an action to assign");
      return;
    }

    setIsSubmitting(true);
    try {
      const assignData: AssignActionToStepDto = {
        stepId,
        actionId: selectedActionId,
        statusEffects: statusEffects.length > 0 ? statusEffects : undefined,
      };

      await actionService.assignToStep(assignData);
      toast.success("Action assigned successfully");
      onOpenChange(false);
      onActionAssigned();
    } catch (error) {
      console.error("Error assigning action:", error);
      toast.error("Failed to assign action");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isError = actionsError || statusesError;
  const isLoading = isLoadingActions || isLoadingStatuses;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Assign Action to Step</DialogTitle>
          <DialogDescription>
            {step ? (
              <>Assign an action to the step <strong>{step.title}</strong></>
            ) : (
              <>Assign an action to this step</>
            )}
          </DialogDescription>
        </DialogHeader>

        {isError ? (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md">
            <p className="text-red-500 text-sm">
              Error loading data. Please try again.
            </p>
          </div>
        ) : isLoading ? (
          <div className="py-6">
            <p className="text-center text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Select an action:</h3>
                <div className="border rounded-md overflow-hidden max-h-[200px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {actions?.map((action) => (
                        <TableRow
                          key={action.id}
                          className={
                            selectedActionId === action.id
                              ? "bg-primary/10"
                              : undefined
                          }
                          onClick={() => handleActionSelect(action.id)}
                        >
                          <TableCell className="p-2">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                selectedActionId === action.id
                                  ? "bg-primary"
                                  : "border border-muted"
                              }`}
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{action.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {action.description}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {actions?.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={2} className="h-24 text-center">
                            No actions available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {selectedActionId && statuses && statuses.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Status Effects (Optional):
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Select which statuses this action will affect
                  </p>
                  <div className="border rounded-md p-3 space-y-2">
                    {statuses.map((status) => (
                      <div key={status.id} className="flex items-center">
                        <CheckboxWithLabel
                          label={status.title}
                          description={
                            status.isRequired
                              ? "Required status"
                              : "Optional status"
                          }
                          checked={
                            statusEffects.find(
                              (se) => se.statusId === status.id
                            )?.setsComplete || false
                          }
                          onCheckedChange={(checked) =>
                            handleStatusEffectChange(status.id, !!checked)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0 mt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none"
              >
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={!selectedActionId || isSubmitting}
                className="flex-1 sm:flex-none"
              >
                {isSubmitting ? (
                  "Assigning..."
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Assign Action
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
