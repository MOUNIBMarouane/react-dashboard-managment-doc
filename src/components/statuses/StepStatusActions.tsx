
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepStatusActionsProps {
  onAddStatus: () => void;
  isSimpleUser: boolean;
}

export function StepStatusActions({ onAddStatus, isSimpleUser }: StepStatusActionsProps) {
  if (isSimpleUser) return null;
  
  return (
    <Button 
      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" 
      onClick={onAddStatus}
    >
      <Plus className="mr-2 h-4 w-4" /> Add Status
    </Button>
  );
}
