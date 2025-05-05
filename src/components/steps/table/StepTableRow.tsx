
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Step } from "@/models/step";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";

export interface StepTableRowProps {
  step: Step;
  isOpen?: boolean;
  onClose?: () => void;
  onActionAssigned?: () => void;
  isSelected?: boolean;
  onSelectStep?: (id: number, checked: boolean) => void;
  onDeleteStep?: (step: Step) => void;
  onEditStep?: (step: Step) => void;
  circuitName?: string;
  circuitKey?: string;
  isCircuitActive?: boolean;
  index?: number;
  onReorder?: (dragIndex: number, hoverIndex: number) => void;
}

const StepTableRow: React.FC<StepTableRowProps> = ({
  step,
  isSelected,
  onSelectStep,
  onDeleteStep,
  onEditStep,
  circuitName,
  circuitKey,
  isCircuitActive,
  index,
  onReorder,
}) => {
  const { theme } = useTheme();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteStep) {
      onDeleteStep(step);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditStep) {
      onEditStep(step);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectStep) {
      onSelectStep(step.id, e.target.checked);
    }
  };

  return (
    <TableRow key={step.id} className="cursor-pointer">
      {onSelectStep && (
        <TableCell className="w-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            onClick={(e) => e.stopPropagation()}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </TableCell>
      )}
      <TableCell className="font-medium">{step.stepKey}</TableCell>
      <TableCell>{step.title}</TableCell>
      <TableCell>{step.descriptif}</TableCell>
      <TableCell>{step.orderIndex}</TableCell>
      <TableCell>{step.isFinalStep ? "Yes" : "No"}</TableCell>
      {circuitName && <TableCell>{circuitName}</TableCell>}
      <TableCell className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default StepTableRow;
