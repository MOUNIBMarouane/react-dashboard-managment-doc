
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CircleCheck, CircleAlert, CircleX, Clock } from 'lucide-react';

interface DocumentStatusCardProps {
  workflowStatus: {
    status: number;
    statusText: string;
    circuitTitle?: string;
    currentStepTitle?: string;
  };
}

export function DocumentStatusCard({ workflowStatus }: DocumentStatusCardProps) {
  const getStatusIcon = (status: number) => {
    switch (status) {
      case 0: // Draft
        return <Clock className="h-5 w-5 text-blue-400" />;
      case 1: // In Progress
        return <CircleAlert className="h-5 w-5 text-yellow-400" />;
      case 2: // Completed
        return <CircleCheck className="h-5 w-5 text-green-400" />;
      case 3: // Rejected
        return <CircleX className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-blue-400" />;
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return "bg-blue-500/20 text-blue-200 border-blue-500/30";
      case 1: return "bg-yellow-500/20 text-yellow-200 border-yellow-500/30";
      case 2: return "bg-green-500/20 text-green-200 border-green-500/30";
      case 3: return "bg-red-500/20 text-red-200 border-red-500/30";
      default: return "bg-blue-500/20 text-blue-200 border-blue-500/30";
    }
  };

  return (
    <Card className="bg-[#0a1033] border border-blue-900/30 shadow-md">
      <CardHeader className="bg-blue-950/40 border-b border-blue-900/30 pb-3">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <span>Document Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-300">Status:</span>
            <div className="flex items-center">
              {getStatusIcon(workflowStatus.status)}
              <Badge 
                className={`ml-2 ${getStatusColor(workflowStatus.status)}`}
              >
                {workflowStatus.statusText}
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-300">Circuit:</span>
            <span className="text-white font-medium">{workflowStatus.circuitTitle || 'Not assigned'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-300">Current Step:</span>
            <span className="text-white font-medium">{workflowStatus.currentStepTitle || 'None'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
