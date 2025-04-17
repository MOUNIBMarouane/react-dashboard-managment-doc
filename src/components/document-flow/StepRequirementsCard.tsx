
import { Badge } from '@/components/ui/badge';
import { Check, Clock, AlertCircle, Settings, Loader2 } from 'lucide-react';
import { DocumentStatus, DocumentWorkflowStatus } from '@/models/documentCircuit';
import { Button } from '@/components/ui/button';
import { EditStepStatusDialog } from './EditStepStatusDialog';
import { useState } from 'react';
import { useStepStatuses } from '@/hooks/useStepStatuses';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface StepRequirementsCardProps {
  statuses: DocumentStatus[];
  workflowStatus?: DocumentWorkflowStatus;
}

export function StepRequirementsCard({ statuses, workflowStatus }: StepRequirementsCardProps) {
  const [selectedStatus, setSelectedStatus] = useState<DocumentStatus | null>(null);
  
  const { 
    statuses: stepStatuses, 
    isLoading 
  } = useStepStatuses(workflowStatus?.currentStepId);
  
  // Prefer step statuses over workflow status
  const displayStatuses = stepStatuses || workflowStatus?.statuses || statuses;

  const handleEditStatus = (status: DocumentStatus) => {
    setSelectedStatus(status);
  };

  return (
    <Card className="bg-[#0a1033] border border-blue-900/30 shadow-md">
      <CardHeader className="bg-blue-950/40 border-b border-blue-900/30 pb-3">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <span>Step Requirements</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        ) : displayStatuses && displayStatuses.length > 0 ? (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {displayStatuses.map(status => (
              <div 
                key={status.statusId} 
                className={`flex items-center justify-between p-3 rounded-md ${
                  status.isComplete 
                    ? 'bg-green-900/20 border border-green-900/30' 
                    : status.isRequired 
                      ? 'bg-red-900/10 border border-red-900/20' 
                      : 'bg-blue-900/20 border border-blue-900/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {status.isComplete ? (
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                  ) : status.isRequired ? (
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                  )}
                  <span className="text-sm font-medium">{status.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={
                      status.isComplete 
                        ? "success" 
                        : status.isRequired 
                          ? "destructive" 
                          : "outline"
                    }
                    className={
                      status.isComplete 
                        ? "bg-green-500/20 text-green-200 border-green-500/30" 
                        : status.isRequired 
                          ? "bg-red-500/20 text-red-200 border-red-500/30" 
                          : "bg-blue-500/20 text-blue-200 border-blue-500/30"
                    }
                  >
                    {status.isComplete ? "Complete" : status.isRequired ? "Required" : "Optional"}
                  </Badge>
                  
                  {status.isComplete && status.completedBy && (
                    <span className="text-xs text-green-300">by {status.completedBy}</span>
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-blue-900/20"
                    onClick={() => handleEditStatus(status)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-400">
            No requirements for this step
          </div>
        )}
      </CardContent>

      {selectedStatus && (
        <EditStepStatusDialog
          open={!!selectedStatus}
          onOpenChange={(open) => !open && setSelectedStatus(null)}
          status={selectedStatus}
          documentId={workflowStatus?.documentId}
          onSuccess={() => setSelectedStatus(null)}
        />
      )}
    </Card>
  );
}
