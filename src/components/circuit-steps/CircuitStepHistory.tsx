
import { DocumentCircuitHistory } from '@/models/documentCircuit';
import { Badge } from '@/components/ui/badge';
import { Clock, Check, X } from 'lucide-react';

interface CircuitStepHistoryProps {
  historyItems: DocumentCircuitHistory[];
}

export const CircuitStepHistory = ({ historyItems }: CircuitStepHistoryProps) => {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">History</h3>
      <div className="space-y-2">
        {historyItems.map((item) => (
          <div 
            key={item.id} 
            className={`p-2 rounded-md border ${
              item.isApproved 
                ? 'border-green-500/30 bg-green-950/20' 
                : 'border-red-500/30 bg-red-950/20'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-1">
                  {item.isApproved ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-red-500" />
                  )}
                  <span className="font-medium text-xs">
                    {item.actionTitle || item.statusTitle || "Process"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {item.processedBy || "System"} • {new Date(item.processedAt).toLocaleString()}
                </p>
                {item.comments && (
                  <p className="text-xs text-gray-300 mt-1 italic">"{item.comments}"</p>
                )}
              </div>
              <Badge 
                variant={item.isApproved ? "outline" : "destructive"}
                className="text-[10px] px-1 py-0"
              >
                {item.isApproved ? "Approved" : "Rejected"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
