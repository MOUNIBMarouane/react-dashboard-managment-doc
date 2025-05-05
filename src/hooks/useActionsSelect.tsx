
import { useState, useEffect } from 'react';
import { Action } from '@/models/action';
import { actionService } from '@/services/actionService';

export function useActionsSelect() {
  const [actions, setActions] = useState<Action[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const actionData = await actionService.getAllActions();
        setActions(actionData);
      } catch (err: any) {
        console.error('Error fetching actions:', err);
        setError(err.message || 'Failed to fetch actions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActions();
  }, []);

  return actions;
}
