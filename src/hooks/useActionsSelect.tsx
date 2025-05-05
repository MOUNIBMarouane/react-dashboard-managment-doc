
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Action } from '@/models/action';
import actionService from '@/services/actionService';

export const useActionsSelect = () => {
  const [availableActions, setAvailableActions] = useState<Action[]>([]);

  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['actions'],
    queryFn: () => actionService.getAllActions()
  });

  useEffect(() => {
    if (data) {
      setAvailableActions(data);
    }
  }, [data]);

  return {
    actions: availableActions,
    isLoading,
    error
  };
};

export default useActionsSelect;
