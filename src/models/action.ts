
export interface Action {
  id?: number;
  actionId: number;
  actionKey: string;
  title: string;
  description: string;
}

export interface CreateActionDto {
  title: string;
  description?: string;
}

export interface UpdateActionDto {
  title?: string;
  description?: string;
}
