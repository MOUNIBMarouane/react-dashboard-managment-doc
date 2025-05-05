
import React from 'react';
import { ActionsTable, ActionsTableProps } from '@/components/actions/ActionsTable';
import { Action } from '@/models/action';

const ActionsTableImplementation = () => {
  const actions: Action[] = [
    { id: 1, actionKey: "ACT-001", title: 'Action 1', description: 'Description 1' },
    { id: 2, actionKey: "ACT-002", title: 'Action 2', description: 'Description 2' },
    { id: 3, actionKey: "ACT-003", title: 'Action 3', description: 'Description 3' },
  ];

  const handleEdit = (action: Action) => {
    console.log('Edit action:', action);
  };

  const handleDelete = (action: Action) => {
    console.log('Delete action:', action);
  };

  const handleAssign = (action: Action) => {
    console.log('Assign action:', action);
  };

  // Mock selection functions
  const [selectedActions, setSelectedActions] = React.useState<Action[]>([]);

  const handleSelectionChange = (newSelection: Action[]) => {
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
