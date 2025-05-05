
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentStatusDto, DocumentWorkflowStatus } from '@/models/documentCircuit';
import { CheckCircle2, AlertCircle, Clock, HelpCircle } from 'lucide-react';

interface StepRequirementsCardProps {
  statuses: DocumentStatusDto[];
  workflowStatus?: DocumentWorkflowStatus;
}

const StepRequirementsCard = ({ statuses, workflowStatus }: StepRequirementsCardProps) => {
  if (!statuses || statuses.length === 0) {
    return (
      <Card className="bg-blue-900/20 border-blue-900/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-blue-400" />
            Step Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-blue-300 italic">
            No requirements defined for this step.
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const requiredStatuses = statuses.filter(status => status.isRequired);
  const optionalStatuses = statuses.filter(status => !status.isRequired);
  
  const completedRequiredCount = requiredStatuses.filter(status => status.isComplete).length;
  const totalRequiredCount = requiredStatuses.length;
  const completedOptionalCount = optionalStatuses.filter(status => status.isComplete).length;
  const totalOptionalCount = optionalStatuses.length;
  
  const getStatusIcon = (status: DocumentStatusDto) => {
    if (status.isComplete) {
      return <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />;
    }
    
    if (status.isRequired) {
      return <AlertCircle className="h-5 w-5 text-amber-400 mr-2" />;
    }
    
    return <Clock className="h-5 w-5 text-blue-400 mr-2" />;
  };
  
  return (
    <Card className="bg-blue-900/20 border-blue-900/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5 text-blue-400" />
          Step Requirements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requiredStatuses.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium text-blue-200">Required Items</h4>
                <Badge variant={completedRequiredCount === totalRequiredCount ? "success" : "default"} className="bg-blue-700/40 text-xs">
                  {completedRequiredCount}/{totalRequiredCount} complete
                </Badge>
              </div>
              <div className="space-y-2">
                {requiredStatuses.map(status => (
                  <div key={status.statusId} className="flex items-start bg-blue-950/50 rounded-md p-2 border border-blue-900/30">
                    {getStatusIcon(status)}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h5 className="text-sm font-medium text-white">{status.title}</h5>
                        <span className={`text-xs ${status.isComplete ? 'text-green-400' : 'text-amber-400'}`}>
                          {status.isComplete ? 'Complete' : 'Incomplete'}
                        </span>
                      </div>
                      {status.completedBy && status.isComplete && (
                        <p className="text-xs text-blue-400 mt-1">
                          Completed by {status.completedBy}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {optionalStatuses.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium text-blue-200">Optional Items</h4>
                <Badge variant="outline" className="text-xs">
                  {completedOptionalCount}/{totalOptionalCount} complete
                </Badge>
              </div>
              <div className="space-y-2">
                {optionalStatuses.map(status => (
                  <div key={status.statusId} className="flex items-start bg-blue-950/50 rounded-md p-2 border border-blue-900/30">
                    {getStatusIcon(status)}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h5 className="text-sm font-medium text-white">{status.title}</h5>
                        <span className={`text-xs ${status.isComplete ? 'text-green-400' : 'text-gray-400'}`}>
                          {status.isComplete ? 'Complete' : 'Optional'}
                        </span>
                      </div>
                      {status.completedBy && status.isComplete && (
                        <p className="text-xs text-blue-400 mt-1">
                          Completed by {status.completedBy}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StepRequirementsCard;
