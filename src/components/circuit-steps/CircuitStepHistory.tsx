
import { Check, X, Clock, AlertTriangle } from 'lucide-react';
import { DocumentCircuitHistory } from '@/models/documentCircuit';
import { formatDistanceToNow } from 'date-fns';

interface CircuitStepHistoryProps {
  historyForStep: DocumentCircuitHistory[];
}

export const CircuitStepHistory = ({ historyForStep }: CircuitStepHistoryProps) => {
  if (!historyForStep || historyForStep.length === 0) {
    return null;
  }

  const sortedHistory = [...historyForStep].sort(
    (a, b) => new Date(b.processedAt).getTime() - new Date(a.processedAt).getTime()
  );

  return (
    <div className="space-y-1 max-h-32 overflow-y-auto pr-1 pb-1">
      {sortedHistory.map((history) => (
        <div
          key={history.id}
          className={`text-xs p-1 rounded ${
            history.isApproved
              ? 'bg-green-950/20 border border-green-900/30'
              : 'bg-red-950/20 border border-red-900/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              {history.isApproved ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-red-500" />
              )}
              <span>
                {history.actionTitle || history.statusTitle || 'Process'}
              </span>
            </span>

            <span className="text-[10px] text-gray-400 flex items-center">
              <Clock className="h-2 w-2 mr-0.5" />
              {formatDistanceToNow(new Date(history.processedAt), { addSuffix: true })}
            </span>
          </div>

          {history.comments && (
            <p className="mt-0.5 text-[10px] text-gray-400 italic line-clamp-1">
              "{history.comments}"
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
