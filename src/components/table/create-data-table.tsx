
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  key: string;
  cell?: (item: T) => React.ReactNode;
  width?: string;
}

export interface Action<T> {
  label: string;
  onClick: (item: T) => void;
  icon?: React.ReactNode;
  color?: "blue" | "green" | "red" | "amber" | "purple";
  show?: (item: T) => boolean;
}

export interface BulkAction {
  label: string;
  onClick: (ids: any[]) => void;
  icon?: React.ReactNode;
  color?: "blue" | "green" | "red" | "amber" | "purple";
  disabled?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowId: (item: T) => any;
  actions?: Action<T>[];
  bulkActions?: BulkAction[];
  isSimpleUser?: boolean;
  selectedItems?: T[];
  onSelectionChange?: (selectedItems: T[]) => void;
  className?: string;
}

export function createDataTable<T>() {
  return function DataTable({
    data,
    columns,
    getRowId,
    actions,
    bulkActions,
    isSimpleUser = false,
    selectedItems,
    onSelectionChange,
    className
  }: DataTableProps<T>) {
    const [selectedIds, setSelectedIds] = useState<any[]>(
      selectedItems ? selectedItems.map(getRowId) : []
    );

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const newSelectedIds = data.map(getRowId);
        setSelectedIds(newSelectedIds);
        if (onSelectionChange) {
          onSelectionChange(data);
        }
      } else {
        setSelectedIds([]);
        if (onSelectionChange) {
          onSelectionChange([]);
        }
      }
    };

    const handleSelectItem = (item: T, checked: boolean) => {
      const id = getRowId(item);
      let newSelectedIds: any[];
      
      if (checked) {
        newSelectedIds = [...selectedIds, id];
      } else {
        newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
      }
      
      setSelectedIds(newSelectedIds);
      
      if (onSelectionChange) {
        const newSelectedItems = data.filter((dataItem) => 
          newSelectedIds.includes(getRowId(dataItem))
        );
        onSelectionChange(newSelectedItems);
      }
    };

    const showBulkActions = !isSimpleUser && bulkActions && bulkActions.length > 0;
    const showActions = actions && actions.length > 0;
    const showCheckboxes = !isSimpleUser && showBulkActions;

    return (
      <div className={cn("w-full", className)}>
        {showBulkActions && selectedIds.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-blue-950/50 rounded-md mb-2">
            <span className="text-sm text-blue-200">
              {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex-1"></div>
            <div className="flex items-center gap-2">
              {bulkActions.map((action, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant="outline"
                  className={cn(
                    "text-xs h-7 px-2 py-0",
                    action.color === "red" && "border-red-500/30 text-red-500 hover:bg-red-950/50",
                    action.color === "blue" && "border-blue-500/30 text-blue-500 hover:bg-blue-950/50",
                    action.color === "green" && "border-green-500/30 text-green-500 hover:bg-green-950/50",
                    action.color === "amber" && "border-amber-500/30 text-amber-500 hover:bg-amber-950/50",
                    action.color === "purple" && "border-purple-500/30 text-purple-500 hover:bg-purple-950/50"
                  )}
                  onClick={() => action.onClick(selectedIds)}
                  disabled={action.disabled}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="border border-blue-900/30 rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-950/50">
              <tr>
                {showCheckboxes && (
                  <th className="p-2 w-[50px] text-left">
                    <Checkbox
                      checked={selectedIds.length === data.length && data.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "p-2 text-left font-medium text-blue-200",
                      column.width
                    )}
                  >
                    {column.header}
                  </th>
                ))}
                {showActions && <th className="p-2 w-[60px]"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/30">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={(showCheckboxes ? 1 : 0) + columns.length + (showActions ? 1 : 0)}
                    className="p-4 text-center text-gray-400"
                  >
                    No items found
                  </td>
                </tr>
              ) : (
                data.map((item, i) => {
                  const id = getRowId(item);
                  const isSelected = selectedIds.includes(id);
                  
                  return (
                    <tr
                      key={id}
                      className={cn(
                        "hover:bg-blue-950/30",
                        isSelected && "bg-blue-900/20"
                      )}
                    >
                      {showCheckboxes && (
                        <td className="p-2">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleSelectItem(item, checked as boolean)
                            }
                            aria-label={`Select row ${i}`}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td key={column.key} className="p-2">
                          {column.cell
                            ? column.cell(item)
                            : (item as any)[column.key]}
                        </td>
                      ))}
                      {showActions && (
                        <td className="p-2">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-[#111633] border-blue-900/50">
                                {actions
                                  ?.filter(action => action.show ? action.show(item) : true)
                                  .map((action, i) => (
                                    <DropdownMenuItem
                                      key={i}
                                      onClick={() => action.onClick(item)}
                                      className={cn(
                                        "gap-2",
                                        action.color === "red" && "text-red-500 hover:text-red-500",
                                        action.color === "blue" && "text-blue-500 hover:text-blue-500",
                                        action.color === "green" && "text-green-500 hover:text-green-500",
                                        action.color === "amber" && "text-amber-500 hover:text-amber-500",
                                        action.color === "purple" && "text-purple-500 hover:text-purple-500"
                                      )}
                                    >
                                      {action.icon}
                                      {action.label}
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}
