
export interface Action {
  actionId: number; // Changed from id to actionId to match ActionItem
  actionKey: string;
  title: string;
  description: string;
}

export interface CreateActionDto {
  title: string;
  description: string;
}

export interface UpdateActionDto {
  title?: string;
  description?: string;
}
