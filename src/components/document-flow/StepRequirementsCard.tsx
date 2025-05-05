
import React from "react";
import { DocumentStatusDto, DocumentWorkflowStatus } from "@/models/documentCircuit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface StepRequirementsCardProps {
  statuses?: DocumentStatusDto[];
  workflowStatus?: DocumentWorkflowStatus;
  canManageStatus?: boolean;
  onToggleStatus?: (statusId: number, isComplete: boolean) => void;
  isLoading?: boolean;
}

export const StepRequirementsCard: React.FC<StepRequirementsCardProps> = ({
  statuses = [],
  workflowStatus,
  canManageStatus = false,
  onToggleStatus,
  isLoading = false,
}) => {
  // Use statuses from props or from workflowStatus if provided
  const statusesToRender = statuses.length > 0 
    ? statuses 
    : (workflowStatus?.statuses || []);

  const handleToggleStatus = (statusId: number, currentState: boolean) => {
    if (onToggleStatus && canManageStatus) {
      onToggleStatus(statusId, !currentState);
    }
  };

  if (statusesToRender.length === 0) {
    return (
      <Card className="bg-[#0d1642] border-blue-900/30">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-400 text-sm">No requirements for this step</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0d1642] border-blue-900/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Requirements</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {statusesToRender.map((status) => (
            <div
              key={status.statusId}
              className={`p-3 rounded-md border flex justify-between items-center ${
                status.isComplete
                  ? "bg-green-900/10 border-green-900/30"
                  : status.isRequired
                  ? "bg-blue-900/10 border-blue-900/30"
                  : "bg-gray-900/10 border-gray-900/30"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  {status.isComplete ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <XCircle
                      className={
                        status.isRequired
                          ? "text-red-500 h-5 w-5"
                          : "text-gray-500 h-5 w-5"
                      }
                    />
                  )}
                  <span
                    className={`font-medium ${
                      status.isComplete
                        ? "text-green-300"
                        : status.isRequired
                        ? "text-blue-300"
                        : "text-gray-400"
                    }`}
                  >
                    {status.title}
                  </span>
                </div>
                {status.isComplete && status.completedBy && (
                  <p className="text-xs text-green-400 mt-1 ml-7">
                    Completed by {status.completedBy}
                  </p>
                )}
              </div>

              {canManageStatus && (
                <Button
                  size="sm"
                  variant={status.isComplete ? "outline" : "default"}
                  className={
                    status.isComplete
                      ? "border-green-900/50 bg-green-900/10 hover:bg-green-900/20 text-green-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                  onClick={() => handleToggleStatus(status.statusId, status.isComplete)}
                  disabled={isLoading}
                >
                  {status.isComplete ? "Mark Incomplete" : "Mark Complete"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
