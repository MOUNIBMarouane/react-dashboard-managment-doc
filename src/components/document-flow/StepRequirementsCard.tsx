
import React, { useState } from 'react';
import { DocumentStatusDto, DocumentWorkflowStatus } from '@/models/documentCircuit';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StepRequirementsCardProps {
  statuses: DocumentStatusDto[];
  workflowStatus: DocumentWorkflowStatus;
  canComplete?: boolean;
  onStatusComplete?: () => void;
  isReadOnly?: boolean;
}

const StepRequirementsCard = ({
  statuses,
  workflowStatus,
  canComplete = false,
  onStatusComplete = () => {},
  isReadOnly = false
}: StepRequirementsCardProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleComplete = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onStatusComplete();
    } catch (error) {
      console.error('Error completing status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const requiredStatuses = statuses.filter(status => status.isRequired);
  const optionalStatuses = statuses.filter(status => !status.isRequired);
  
  const allRequiredComplete = requiredStatuses.every(status => status.isComplete);

  return (
    <Card className="bg-[#0a1033]/60 border border-blue-900/30">
      <CardHeader className="border-b border-blue-900/30 pb-2">
        <CardTitle className="text-xl text-white">Step Requirements</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        {requiredStatuses.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-white">Required</h3>
            <div className="space-y-1.5">
              {requiredStatuses.map((status) => (
                <div 
                  key={status.statusId} 
                  className={`flex items-center justify-between p-2 rounded-md ${
                    status.isComplete 
                      ? 'bg-green-500/10 border border-green-500/30' 
                      : 'bg-blue-900/20 border border-blue-900/30'
                  }`}
                >
                  <span className="text-sm text-gray-300">{status.title}</span>
                  <div className="flex items-center space-x-2">
                    {status.isComplete && (
                      <span className="text-xs text-green-400">
                        ✓ Completed {status.completedBy ? `by ${status.completedBy}` : ''}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {optionalStatuses.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-white">Optional</h3>
            <div className="space-y-1.5">
              {optionalStatuses.map((status) => (
                <div 
                  key={status.statusId} 
                  className={`flex items-center justify-between p-2 rounded-md ${
                    status.isComplete 
                      ? 'bg-green-500/10 border border-green-500/30' 
                      : 'bg-gray-800/40 border border-gray-700/30'
                  }`}
                >
                  <span className="text-sm text-gray-400">{status.title}</span>
                  <div className="flex items-center space-x-2">
                    {status.isComplete && (
                      <span className="text-xs text-green-400">
                        ✓ Completed {status.completedBy ? `by ${status.completedBy}` : ''}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {statuses.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-400">No requirements defined for this step.</p>
          </div>
        )}
      </CardContent>
      
      {!isReadOnly && canComplete && (
        <CardFooter className="border-t border-blue-900/30 pt-3">
          <Button 
            disabled={!allRequiredComplete || isSubmitting} 
            onClick={handleComplete}
            className="w-full"
          >
            {isSubmitting ? 'Processing...' : 'Complete Requirements'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default StepRequirementsCard;
