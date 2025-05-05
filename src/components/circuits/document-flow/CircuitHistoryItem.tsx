
import { Badge } from '@/components/ui/badge';
import { Clock, Check, X } from 'lucide-react';
import { DocumentCircuitHistory } from '@/models/documentCircuit';
import { formatDistanceToNow } from 'date-fns';

interface CircuitHistoryItemProps {
  history: DocumentCircuitHistory;
}

export const CircuitHistoryItem = ({ history }: CircuitHistoryItemProps) => {
  const formattedDate = formatDistanceToNow(new Date(history.processedAt), { addSuffix: true });
  
  return (
    <div 
      className={`p-2 rounded-md border ${
        history.isApproved 
          ? 'border-green-500/30 bg-green-950/20' 
          : 'border-red-500/30 bg-red-950/20'
      }`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            {history.isApproved ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-red-500" />
            )}
            <span className="font-medium text-xs">
              {history.actionTitle || history.statusTitle || "Process"}
            </span>
          </div>
          
          <Badge 
            variant={history.isApproved ? "outline" : "destructive"}
            className="text-[10px] px-1.5 py-0"
          >
            {history.isApproved ? "Approved" : "Rejected"}
          </Badge>
        </div>
        
        <div className="mt-1 flex items-center text-[10px] text-gray-400">
          <Clock className="h-2.5 w-2.5 mr-1" />
          <span>{formattedDate} by {history.userName || history.processedBy || "System"}</span>
        </div>
        
        {history.comments && (
          <p className="mt-1 text-[10px] text-gray-400 italic">"{history.comments}"</p>
        )}
      </div>
    </div>
  );
};
