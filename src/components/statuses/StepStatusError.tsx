
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface StepStatusErrorProps {
  message?: string;
  returnPath?: string;
  returnLabel?: string;
}

export function StepStatusError({ 
  message = 'Failed to load step statuses. Please try again later.',
  returnPath = '/circuits',
  returnLabel = 'Back to Circuits'
}: StepStatusErrorProps) {
  return (
    <div className="p-4 md:p-6">
      <Alert variant="destructive" className="mb-4 border-red-800 bg-red-950/50 text-red-300">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Button variant="outline" asChild>
        <Link to={returnPath}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {returnLabel}
        </Link>
      </Button>
    </div>
  );
}
