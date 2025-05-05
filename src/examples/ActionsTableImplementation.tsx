
import React from 'react';
import { ActionsTable, ActionsTableProps } from '@/components/actions/ActionsTable';

interface ActionItem {
  id: number;
  title: string;
  description: string;
}

const ActionsTableImplementation = () => {
  const actions: ActionItem[] = [
    { id: 1, title: 'Action 1', description: 'Description 1' },
    { id: 2, title: 'Action 2', description: 'Description 2' },
    { id: 3, title: 'Action 3', description: 'Description 3' },
  ];

  const handleEdit = (action: ActionItem) => {
    console.log('Edit action:', action);
  };

  const handleDelete = (action: ActionItem) => {
    console.log('Delete action:', action);
  };

  const handleAssign = (action: ActionItem) => {
    console.log('Assign action:', action);
  };

  // Mock selection functions
  const [selectedActions, setSelectedActions] = React.useState<ActionItem[]>([]);

  const handleSelectionChange = (newSelection: ActionItem[]) => {
    setSelectedActions(newSelection);
  };

  return (
    <ActionsTable
      actions={actions}
      onEditAction={handleEdit}
      onDeleteAction={handleDelete}
      onAssignAction={handleAssign}
      selectedActions={selectedActions}
      onSelectionChange={handleSelectionChange}
      theme="light"
    />
  );
};

export default ActionsTableImplementation;
