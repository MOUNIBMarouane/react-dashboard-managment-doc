
export interface ActionItem {
  id: number;
  actionId: number;
  actionKey: string;
  title: string;
  description?: string;
}

// Add conversion functions to help with type compatibility
export const actionToActionItem = (action: any): ActionItem => {
  return {
    id: action.id || action.actionId,
    actionId: action.actionId || action.id,
    actionKey: action.actionKey || '',
    title: action.title,
    description: action.description
  };
};

export const actionItemToAction = (actionItem: ActionItem): any => {
  return {
    actionId: actionItem.actionId || actionItem.id,
    id: actionItem.id || actionItem.actionId,
    actionKey: actionItem.actionKey,
    title: actionItem.title,
    description: actionItem.description
  };
};
