import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Action } from "@/models/action"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, UserPlus } from "lucide-react"
import { Theme } from "@/context/SettingsContext"

// Add onAssignAction to the interface
export interface ActionsTableProps {
  actions: Action[];
  onEditAction: (action: Action) => void;
  onDeleteAction: (action: Action) => void;
  onAssignAction: (action: Action) => void;
  selectedActions: React.Dispatch<React.SetStateAction<Action[]>>;
  onSelectionChange: React.Dispatch<React.SetStateAction<Action[]>>;
  theme: Theme;
}

export const ActionsTable = ({
  actions,
  onEditAction,
  onDeleteAction,
  onAssignAction,
  selectedActions,
  onSelectionChange,
  theme,
}: ActionsTableProps) => {
  const isItemSelected = (id: number) => selectedActions.some((action) => action.id === id);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSelectionChange(actions);
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (action: Action) => {
    const isSelected = isItemSelected(action.id);
    if (isSelected) {
      onSelectionChange(selectedActions.filter((a) => a.id !== action.id));
    } else {
      onSelectionChange([...selectedActions, action]);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader className={theme === "dark" ? "bg-blue-950/30" : "bg-blue-50/80"}>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedActions.length === actions.length}
                onChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.map((action) => {
            const isSelected = isItemSelected(action.id);
            return (
              <TableRow key={action.id} className={theme === "dark" ? "hover:bg-blue-950/30" : "hover:bg-blue-50/80"}>
                <TableCell className="w-[50px]">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleSelectItem(action)}
                    aria-label={`Select action ${action.title}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{action.title}</TableCell>
                <TableCell>{action.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAssignAction(action)}
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditAction(action)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteAction(action)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
