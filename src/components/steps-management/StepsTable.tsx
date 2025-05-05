
import React from 'react';
import { Step } from '@/models/circuit';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2 } from 'lucide-react';

interface StepsTableProps {
  steps: Step[];
  isLoading: boolean;
  onEdit: (step: Step) => void;
  onDelete: (stepId: number) => void;
  onViewDetails: (step: Step) => void;
}

const StepsTable: React.FC<StepsTableProps> = ({
  steps,
  isLoading,
  onEdit,
  onDelete,
  onViewDetails
}) => {
  if (isLoading) {
    return <div className="w-full text-center py-4">Loading steps...</div>;
  }

  if (!steps || steps.length === 0) {
    return <div className="w-full text-center py-4">No steps found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Step Key</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Circuit</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>Is Final</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {steps.map((step) => (
          <TableRow key={step.id}>
            <TableCell className="font-mono">{step.stepKey}</TableCell>
            <TableCell>{step.title}</TableCell>
            <TableCell>Circuit {step.circuitId}</TableCell>
            <TableCell>{step.orderIndex}</TableCell>
            <TableCell>{step.isFinalStep ? 'Yes' : 'No'}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(step)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEdit(step)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() => onDelete(step.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StepsTable;
