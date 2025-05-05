
import { useEffect, useState } from 'react';
import { Action } from '@/models/action';
import actionService from '@/services/actionService';

export const useActionsSelect = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadActions = async () => {
      try {
        setIsLoading(true);
        const data = await actionService.getAllActions();
        setActions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch actions'));
        console.error('Error loading actions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadActions();
  }, []);

  return {
    actions,
    isLoading,
    error
  };
};

export default useActionsSelect;
