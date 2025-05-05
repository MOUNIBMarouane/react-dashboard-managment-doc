
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface Status {
  statusId: number;
  title: string;
  isRequired: boolean;
  isComplete: boolean;
  completedBy?: string | null;
  completedAt?: string | null;
}

interface StepRequirementsCardProps {
  statuses: Status[];
  isSimpleUser: boolean;
  onCompleteStatus: (statusId: number) => void;
  isLoading?: boolean;
}

export function StepRequirementsCard({
  statuses,
  isSimpleUser,
  onCompleteStatus,
  isLoading = false,
}: StepRequirementsCardProps) {
  // Format date in a readable way
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Group statuses by completion status and required status
  const incompleteRequired = statuses.filter(s => s.isRequired && !s.isComplete);
  const incompleteOptional = statuses.filter(s => !s.isRequired && !s.isComplete);
  const completed = statuses.filter(s => s.isComplete);
  
  // Check overall completion status
  const allRequiredComplete = statuses.filter(s => s.isRequired).every(s => s.isComplete);
  const hasStatuses = statuses.length > 0;
  
  return (
    <Card className="bg-[#0a1033] border border-blue-900/30 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between border-b border-blue-900/30 bg-blue-900/20 p-3">
        <CardTitle className="text-base font-semibold text-white flex items-center">
          <CheckCircle className="mr-1.5 h-4 w-4" /> Step Requirements
        </CardTitle>
        
        {hasStatuses && (
          <div className="flex items-center">
            {allRequiredComplete ? (
              <div className="bg-green-600/20 text-green-400 text-xs py-1 px-2 rounded-full border border-green-600/30 flex items-center">
                <CheckCircle className="mr-1 h-3 w-3" /> All required items complete
              </div>
            ) : (
              <div className="bg-yellow-600/20 text-yellow-400 text-xs py-1 px-2 rounded-full border border-yellow-600/30 flex items-center">
                <AlertTriangle className="mr-1 h-3 w-3" /> Required items pending
              </div>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-3">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : !hasStatuses ? (
          <div className="bg-blue-900/20 border border-blue-900/30 p-3 rounded-md text-center text-sm">
            <p>No required actions defined for this step.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {incompleteRequired.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-blue-300 mb-2">Required</h3>
                <div className="space-y-2">
                  {incompleteRequired.map(status => (
                    <div key={status.statusId} className="bg-blue-900/20 border border-blue-900/40 p-2 rounded-md flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-white">{status.title}</div>
                      </div>
                      {!isSimpleUser && (
                        <Button 
                          size="sm"
                          variant="outline"
                          className="h-7 bg-blue-600/20 border-blue-600/30 text-blue-400 hover:bg-blue-600/30"
                          onClick={() => onCompleteStatus(status.statusId)}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {incompleteOptional.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-blue-300 mb-2">Optional</h3>
                <div className="space-y-2">
                  {incompleteOptional.map(status => (
                    <div key={status.statusId} className="bg-blue-900/20 border border-blue-900/30 p-2 rounded-md flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-white">{status.title}</div>
                      </div>
                      {!isSimpleUser && (
                        <Button 
                          size="sm"
                          variant="outline"
                          className="h-7 bg-blue-600/20 border-blue-600/30 text-blue-400 hover:bg-blue-600/30"
                          onClick={() => onCompleteStatus(status.statusId)}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {completed.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-blue-300 mb-2">Completed</h3>
                <div className="space-y-2">
                  {completed.map(status => (
                    <div key={status.statusId} className="bg-green-900/10 border border-green-900/20 p-2 rounded-md">
                      <div className="text-sm font-medium text-white flex justify-between items-center">
                        <div>{status.title}</div>
                        <div className="bg-green-600/20 text-green-400 text-xs px-1.5 py-0.5 rounded flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" /> Completed
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {status.completedBy ? `Completed by ${status.completedBy}` : 'Completed'} 
                        {status.completedAt ? ` at ${formatDate(status.completedAt)}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
