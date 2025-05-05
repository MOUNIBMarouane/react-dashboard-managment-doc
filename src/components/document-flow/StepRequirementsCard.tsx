
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { DocumentStatusDto, DocumentWorkflowStatus } from '@/models/documentCircuit';

export interface StepRequirementsCardProps {
  statuses: DocumentStatusDto[];
  workflowStatus: DocumentWorkflowStatus;
  onStatusComplete: () => void;
  isReadOnly: boolean;
  canComplete?: boolean;
}

export function StepRequirementsCard({
  statuses,
  workflowStatus,
  onStatusComplete,
  isReadOnly,
  canComplete = false
}: StepRequirementsCardProps) {
  const requiredStatuses = statuses.filter(s => s.isRequired);
  const optionalStatuses = statuses.filter(s => !s.isRequired);
  
  // Calculate the completion status for required items
  const requiredCompleted = requiredStatuses.filter(s => s.isComplete).length;
  const requiredTotal = requiredStatuses.length;
  const requiredCompletionPercent = requiredTotal > 0 
    ? Math.round((requiredCompleted / requiredTotal) * 100) 
    : 100;
  
  // Calculate the completion status for optional items
  const optionalCompleted = optionalStatuses.filter(s => s.isComplete).length;
  const optionalTotal = optionalStatuses.length;
  const optionalCompletionPercent = optionalTotal > 0 
    ? Math.round((optionalCompleted / optionalTotal) * 100) 
    : 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Step Requirements</CardTitle>
        <CardDescription>
          Complete these requirements to move to the next step
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Required ({requiredCompleted}/{requiredTotal})</span>
              <span>{requiredCompletionPercent}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${requiredCompletionPercent}%` }}
              />
            </div>
          </div>
          
          {optionalStatuses.length > 0 && (
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>Optional ({optionalCompleted}/{optionalTotal})</span>
                <span>{optionalCompletionPercent}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${optionalCompletionPercent}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="mt-6 space-y-3">
            {statuses.map((status) => (
              <div 
                key={status.statusId}
                className={`flex items-center justify-between p-2 rounded-md ${
                  status.isComplete 
                    ? 'bg-green-500/10 border border-green-500/30' 
                    : 'bg-secondary/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  {status.isComplete ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{status.title}</p>
                    {status.completedBy && status.isComplete && (
                      <p className="text-xs text-gray-500">
                        Completed by {status.completedBy}
                      </p>
                    )}
                  </div>
                </div>
                
                {!isReadOnly && !status.isComplete && canComplete && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onStatusComplete}
                    className="hover:bg-green-500/20"
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          {workflowStatus.canAdvanceToNextStep ? (
            <div className="bg-green-500/20 border border-green-500/30 text-green-500 rounded-md p-3 text-sm">
              All required tasks are complete. This document is ready to move to the next step.
            </div>
          ) : requiredStatuses.length > 0 ? (
            <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 rounded-md p-3 text-sm">
              Complete all required tasks before moving to the next step.
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
