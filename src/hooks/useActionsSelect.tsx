
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ActionDto } from '@/models/action';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useActionsSelect() {
  const [actionDtos, setActionDtos] = useState<ActionDto[]>([]);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['actions'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/actions`);
      return response.data as ActionDto[];
    },
  });

  useEffect(() => {
    if (data) {
      const mappedActions = data.map((action: any) => ({
        actionId: action.actionId,
        actionKey: action.actionKey,
        title: action.title,
        description: action.description
      }));
      setActionDtos(mappedActions);
    }
  }, [data]);

  return { actions: actionDtos, isLoading, error };
}
