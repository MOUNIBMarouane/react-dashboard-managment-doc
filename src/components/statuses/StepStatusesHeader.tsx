
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepStatusesHeaderProps {
  circuitTitle: string;
  stepTitle: string;
  stepKey: string;
  circuitId: number | string;
}

export function StepStatusesHeader({ 
  circuitTitle, 
  stepTitle, 
  stepKey,
  circuitId 
}: StepStatusesHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/circuits/${circuitId}/steps`}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-200 to-purple-200 text-transparent bg-clip-text truncate">
          {stepTitle} - Statuses
        </h1>
      </div>
      <p className="text-gray-400 mt-1 text-sm">
        Circuit: <span className="text-blue-300">{circuitTitle}</span> | 
        Step: <span className="font-mono text-blue-300">{stepKey}</span>
      </p>
    </div>
  );
}
