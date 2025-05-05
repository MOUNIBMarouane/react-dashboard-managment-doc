
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Step } from '@/models/circuit';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface StepsTableProps {
  steps: Step[];
  onEdit?: (step: Step) => void;
  onDelete?: (stepId: number) => void;
  onViewDetails?: (step: Step) => void;
  isLoading?: boolean;
}

const StepsTable = ({ steps, onEdit, onDelete, onViewDetails, isLoading = false }: StepsTableProps) => {
  return (
    <div className="border border-gray-700 rounded-md">
      <Table>
        <TableHeader className="bg-gray-800">
          <TableRow className="hover:bg-gray-800/50 border-gray-700">
            <TableHead className="text-gray-300">Step Key</TableHead>
            <TableHead className="text-gray-300">Title</TableHead>
            <TableHead className="text-gray-300">Order</TableHead>
            <TableHead className="text-gray-300">Final Step</TableHead>
            <TableHead className="text-right text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Loading steps...
              </TableCell>
            </TableRow>
          ) : steps.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No steps found.
              </TableCell>
            </TableRow>
          ) : (
            steps.map((step) => (
              <TableRow key={step.id} className="border-gray-700 hover:bg-gray-800/30">
                <TableCell className="font-medium">{step.stepKey}</TableCell>
                <TableCell>{step.title}</TableCell>
                <TableCell>{step.orderIndex}</TableCell>
                <TableCell>{step.isFinalStep ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {onViewDetails && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(step)}
                        className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    )}
                    
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(step)}
                        className="h-8 w-8 p-0 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    )}
                    
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(step.id)}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StepsTable;
