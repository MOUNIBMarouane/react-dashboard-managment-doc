
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Step } from '@/models/circuit';

interface StepGridProps {
  steps: Step[];
  onEdit: (step: Step) => void;
  onDelete: (step: Step) => void;
  currentStep?: Step | null;
  isLoading?: boolean;
}

const StepGrid: React.FC<StepGridProps> = ({ steps, onEdit, onDelete, currentStep, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2 w-3/4"></div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!steps || steps.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No steps found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {steps.map((step) => (
        <Card 
          key={step.id} 
          className={`${currentStep?.id === step.id ? 'border-primary' : ''}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              {step.title}
              {step.isFinalStep && (
                <Badge variant="secondary" className="ml-2">Final Step</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {step.descriptif || 'No description provided'}
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                Order: {step.orderIndex}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-2 flex justify-between">
            <Badge variant={step.isFinalStep ? "success" : "default"} className="text-xs">
              {step.isFinalStep ? 'Final' : `Step ${step.orderIndex}`}
            </Badge>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(step)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(step)}>
                <Trash2 className="h-4 w-4 text-red-500" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StepGrid;
