import React, { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTheme } from 'next-themes';
import { Theme } from 'next-themes/dist/types';
import { ActionsTable } from '@/components/actions/ActionsTable';
import { Action } from '@/models/action';
import { useActionManagement } from '@/hooks/useActionManagement';
import { CreateActionDialog } from '@/components/actions/dialogs/CreateActionDialog';
import { DeleteActionDialog } from '@/components/actions/dialogs/DeleteActionDialog';
import { AssignActionDialog } from '@/components/actions/dialogs/AssignActionDialog';

export default function ActionsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [selectedActions, setSelectedActions] = useState<number[]>([]);
  const { theme } = useTheme();

  const { actions, isLoading, createAction, updateAction, deleteAction, refetchActions } = useActionManagement();

  const handleCreateAction = async (data: any) => {
    try {
      await createAction(data, () => {
        refetchActions();
        toast.success("Action created successfully");
        setCreateDialogOpen(false);
      });
    } catch (error) {
      console.error("Error creating action:", error);
      toast.error("Failed to create action");
    }
  };

  const handleEditAction = async (actionId: number, data: any) => {
    try {
      await updateAction(actionId, data, () => {
        refetchActions();
        toast.success("Action updated successfully");
        setEditDialogOpen(false);
      });
    } catch (error) {
      console.error("Error updating action:", error);
      toast.error("Failed to update action");
    }
  };

  const handleDeleteAction = async (actionId: number) => {
    try {
      await deleteAction(actionId, () => {
        refetchActions();
        toast.success("Action deleted successfully");
      });
    } catch (error) {
      console.error("Error deleting action:", error);
      toast.error("Failed to delete action");
    }
  };

  const handleAssignAction = (action: Action) => {
    setSelectedAction(action);
    setAssignDialogOpen(true);
  };

  const onEditAction = (action: Action) => {
    setSelectedAction(action);
    setEditDialogOpen(true);
  };

  const onDeleteAction = (action: Action) => {
    setSelectedAction(action);
    setDeleteDialogOpen(true);
  };

  const handleSelectionChange: Dispatch<SetStateAction<number[]>> = useCallback(
    (value: SetStateAction<number[]>) => {
      setSelectedActions(value);
    },
    []
  );

  const handleBulkDelete = async () => {
    if (selectedActions.length === 0) {
      toast.error("No actions selected for deletion.");
      return;
    }

    try {
      await Promise.all(
        selectedActions.map(async (actionId) => {
          await deleteAction(actionId, () => {
            refetchActions();
          });
        })
      );
      toast.success("Selected actions deleted successfully");
      setSelectedActions([]); // Clear selected actions after successful deletion
    } catch (error) {
      console.error("Error deleting actions:", error);
      toast.error("Failed to delete selected actions");
    }
  };

  const actionsData = actions ? actions.filter(action =>
    action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (action.description && action.description.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Actions Management</h1>

      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search actions..."
          className="max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => setCreateDialogOpen(true)}>Create Action</Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <ActionsTable
            actions={actionsData}
            onEditAction={onEditAction}
            onDeleteAction={onDeleteAction}
            onAssignAction={handleAssignAction}
            selectedActions={selectedActions}
            onSelectionChange={handleSelectionChange}
            theme={theme}
          />
        </CardContent>
      </Card>

      {selectedActions.length > 0 && (
        <div className="mt-4">
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
          >
            Delete Selected Actions ({selectedActions.length})
          </Button>
        </div>
      )}

      <CreateActionDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateAction}
      />

      {selectedAction && (
        <CreateActionDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          action={selectedAction}
          onSubmit={(data) => handleEditAction(selectedAction.id, data)}
        />
      )}

      {selectedAction && (
        <DeleteActionDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          actionId={selectedAction.id}
          actionTitle={selectedAction.title}
          onConfirm={() => handleDeleteAction(selectedAction.id)}
        />
      )}

      {selectedAction && (
        <AssignActionDialog
          open={assignDialogOpen}
          onOpenChange={setAssignDialogOpen}
          action={selectedAction}
          theme={theme}
          skipStepsFetch={true}
        />
      )}
    </div>
  );
}
