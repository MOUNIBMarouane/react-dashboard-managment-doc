
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentStatusDto, DocumentWorkflowStatus } from '@/models/documentCircuit';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface StepRequirementsCardProps {
  statuses: DocumentStatusDto[];
  workflowStatus: DocumentWorkflowStatus;
  canComplete?: boolean;
  onStatusComplete?: () => void;
  isReadOnly?: boolean;
}

export const StepRequirementsCard = ({
  statuses,
  workflowStatus,
  canComplete = false,
  onStatusComplete,
  isReadOnly = false
}: StepRequirementsCardProps) => {
  if (!statuses || statuses.length === 0) {
    return null;
  }

  const requiredStatuses = statuses.filter(status => status.isRequired);
  const optionalStatuses = statuses.filter(status => !status.isRequired);
  const allRequiredComplete = requiredStatuses.every(status => status.isComplete);

  return (
    <Card className="shadow-md bg-card/50 border-card-foreground/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Step Requirements</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-1">
        {requiredStatuses.length > 0 && (
          <div className="mb-2">
            <h4 className="text-xs font-semibold text-muted-foreground mb-1.5">Required</h4>
            <div className="space-y-1">
              {requiredStatuses.map(status => (
                <div key={status.statusId} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {status.isComplete ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground mr-2" />
                    )}
                    <span className={`text-xs ${status.isComplete ? 'text-primary' : 'text-muted-foreground'}`}>
                      {status.title}
                    </span>
                  </div>
                  {status.completedBy && (
                    <span className="text-xs text-muted-foreground">by {status.completedBy}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {optionalStatuses.length > 0 && (
          <div className="mb-2">
            <h4 className="text-xs font-semibold text-muted-foreground mb-1.5">Optional</h4>
            <div className="space-y-1">
              {optionalStatuses.map(status => (
                <div key={status.statusId} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {status.isComplete ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground mr-2" />
                    )}
                    <span className={`text-xs ${status.isComplete ? 'text-primary' : 'text-muted-foreground'}`}>
                      {status.title}
                    </span>
                  </div>
                  {status.completedBy && (
                    <span className="text-xs text-muted-foreground">by {status.completedBy}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!isReadOnly && canComplete && allRequiredComplete && onStatusComplete && (
          <div className="mt-3 mb-1">
            <Button 
              size="sm" 
              className="w-full text-xs" 
              onClick={onStatusComplete}
            >
              Complete All Requirements
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
