import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Edit,
  MoreHorizontal,
  Trash,
  Eye,
  CircleCheck,
  GripVertical,
  AlertCircle,
  ListTodo,
} from "lucide-react";
import { useDrag, useDrop } from "react-dnd";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AssignActionDialog } from "../AssignActionDialog";
import { useSettings } from "@/context/SettingsContext";

interface StepTableRowProps {
  step: Step;
  isSelected: boolean;
  onSelectStep: (id: number, checked: boolean) => void;
  onDeleteStep?: (step: Step) => void;
  onEditStep?: (step: Step) => void;
  circuitName?: string;
  circuitKey?: string;
  isCircuitActive?: boolean;
  index?: number;
  onReorder?: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: number;
  type: string;
}

export const StepTableRow = ({
  step,
  isSelected,
  onSelectStep,
  onDeleteStep,
  onEditStep,
  circuitName,
  circuitKey,
  isCircuitActive = false,
  index,
  onReorder,
}: StepTableRowProps) => {
  const navigate = useNavigate();
  const ref = React.useRef<HTMLTableRowElement>(null);
  const [isAssignActionDialogOpen, setIsAssignActionDialogOpen] =
    useState(false);
  const { theme } = useSettings();
  const isDark = theme === "dark";

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: string | symbol | null }
  >({
    accept: "step",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (
        !ref.current ||
        !onReorder ||
        index === undefined ||
        isCircuitActive
      ) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onReorder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "step",
    item: () => ({ id: step.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => !!onReorder && !isCircuitActive,
  });

  const handleManageStatuses = () => {
    navigate(`/circuits/${step.circuitId}/steps/${step.id}/statuses`);
  };

  const handleAssignAction = () => {
    setIsAssignActionDialogOpen(true);
  };

  const handleActionAssigned = () => {
    // Refresh the step data or trigger a callback if needed
  };

  drag(drop(ref));

  const displayCircuit = () => {
    if (circuitKey && circuitName) {
      return `${circuitKey} - ${circuitName}`;
    } else if (circuitKey) {
      return circuitKey;
    } else if (circuitName) {
      return circuitName;
    } else {
      return `Circuit #${step.circuitId}`;
    }
  };

  return (
    <>
      <TableRow
        ref={ref}
        className={cn(
          isSelected ? (isDark ? "bg-muted/30" : "bg-blue-50") : undefined,
          isDragging ? "opacity-50" : "opacity-100",
          onReorder && !isCircuitActive ? "cursor-move" : "",
          isCircuitActive ? (isDark ? "bg-blue-900/5" : "bg-green-50/50") : "",
          !isDark && "hover:bg-gray-50"
        )}
        data-handler-id={handlerId}
      >
        <TableCell className="px-4 py-2">
          <div className="flex items-center gap-2">
            {onReorder && !isCircuitActive && (
              <GripVertical
                className={`h-4 w-4 ${
                  isDark ? "text-muted-foreground" : "text-gray-400"
                }`}
              />
            )}
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelectStep(step.id, !!checked)}
              disabled={isCircuitActive}
            />
          </div>
        </TableCell>
        <TableCell className={`px-4 py-2 ${isDark ? "" : "text-gray-600"}`}>
          {step.stepKey}
        </TableCell>
        <TableCell
          className={`px-4 py-2 font-medium ${isDark ? "" : "text-gray-800"}`}
        >
          {step.title}
        </TableCell>
        <TableCell
          className={`px-4 py-2 hidden md:table-cell max-w-[200px] truncate ${
            isDark ? "" : "text-gray-600"
          }`}
        >
          {step.descriptif}
        </TableCell>
        <TableCell className="px-4 py-2 hidden lg:table-cell">
          <div className="flex items-center gap-2">
            <span className={isDark ? "" : "text-gray-700"}>
              {displayCircuit()}
            </span>
            {isCircuitActive && (
              <Badge
                variant="outline"
                className={
                  isDark
                    ? "bg-green-700/10 text-green-400 border-green-700/30"
                    : "bg-green-100 text-green-700 border-green-200"
                }
              >
                Active
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell
          className={`px-4 py-2 hidden md:table-cell text-center ${
            isDark ? "" : "text-gray-600"
          }`}
        >
          {step.orderIndex}
        </TableCell>
        <TableCell className="px-4 py-2 hidden lg:table-cell">
          <div className="flex items-center gap-2">
            {step.isFinalStep ? (
              <Badge
                variant="success"
                className={isDark ? "text-white" : "bg-green-600 text-white"}
              >
                Final Step
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className={
                  isDark
                    ? "text-gray-300"
                    : "text-gray-500 border-gray-300 bg-gray-50"
                }
              >
                Intermediate
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell className="px-4 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={
                isDark
                  ? "bg-background border-blue-900/30"
                  : "bg-white border-gray-200"
              }
            >
              {onEditStep && (
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <DropdownMenuItem
                        onClick={() => !isCircuitActive && onEditStep(step)}
                        disabled={isCircuitActive}
                        className={
                          isCircuitActive
                            ? isDark
                              ? "text-muted-foreground cursor-not-allowed"
                              : "text-gray-400 cursor-not-allowed"
                            : ""
                        }
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                        {isCircuitActive && (
                          <AlertCircle className="ml-2 h-3 w-3 text-amber-400" />
                        )}
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    {isCircuitActive && (
                      <TooltipContent side="left">
                        <p className="text-xs">
                          Cannot edit steps in active circuits
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )}
              <DropdownMenuItem onClick={handleManageStatuses}>
                <CircleCheck className="mr-2 h-4 w-4" />
                Manage Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAssignAction}>
                <ListTodo className="mr-2 h-4 w-4" />
                Assign Action
              </DropdownMenuItem>
              {onEditStep && onDeleteStep && <DropdownMenuSeparator />}
              {onDeleteStep && (
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <DropdownMenuItem
                        onClick={() => !isCircuitActive && onDeleteStep(step)}
                        disabled={isCircuitActive}
                        className={
                          isCircuitActive
                            ? isDark
                              ? "text-muted-foreground cursor-not-allowed"
                              : "text-gray-400 cursor-not-allowed"
                            : "text-destructive focus:text-destructive"
                        }
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                        {isCircuitActive && (
                          <AlertCircle className="ml-2 h-3 w-3 text-amber-400" />
                        )}
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    {isCircuitActive && (
                      <TooltipContent side="left">
                        <p className="text-xs">
                          Cannot delete steps in active circuits
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <AssignActionDialog
        step={step}
        isOpen={isAssignActionDialogOpen}
        onClose={() => setIsAssignActionDialogOpen(false)}
        onActionAssigned={handleActionAssigned}
      />
    </>
  );
};
