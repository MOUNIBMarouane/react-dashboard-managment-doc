
import React, { useState } from 'react';
import { ActionsTable } from '@/components/actions/ActionsTable';
import { ActionItem } from '@/models/action';

export const ActionsTableImplementation: React.FC = () => {
  // Define actions with the correct ActionItem interface structure
  const [actions, setActions] = useState<ActionItem[]>([
    {
      id: 1,
      actionId: 1,
      actionKey: 'ACT-001',
      title: 'Sign Document',
      description: 'Digitally sign the document with your signature'
    },
    {
      id: 2,
      actionId: 2,
      actionKey: 'ACT-002',
      title: 'Approve',
      description: 'Approve the document for the next workflow step'
    },
    {
      id: 3,
      actionId: 3,
      actionKey: 'ACT-003',
      title: 'Reject',
      description: 'Reject the document and provide feedback'
    }
  ]);

  const handleEdit = (action: ActionItem) => {
    console.log('Edit action:', action);
  };

  const handleDelete = (action: ActionItem) => {
    console.log('Delete action:', action);
    setActions(actions.filter(a => a.id !== action.id));
  };

  return (
    <div className="p-4 bg-slate-100 rounded-md">
      <h1 className="text-xl font-bold mb-4">Actions Management</h1>
      <ActionsTable 
        actions={actions} 
        onEditAction={handleEdit} 
        onDeleteAction={handleDelete} 
        theme="light"
      />
    </div>
  );
};
