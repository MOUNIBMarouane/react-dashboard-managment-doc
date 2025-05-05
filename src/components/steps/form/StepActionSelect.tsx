
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useActionsSelect } from '@/hooks/useActionsSelect';
import { Action } from '@/models/circuit';
import { Loader2 } from 'lucide-react';

interface StepActionSelectProps {
  control: any;
  name: string;
  label: string;
  required?: boolean;
}

export function StepActionSelect({ control, name, label, required = false }: StepActionSelectProps) {
  const { actions, isLoading, error } = useActionsSelect();
  const [availableActions, setAvailableActions] = useState<Action[]>([]);

  useEffect(() => {
    if (actions) {
      setAvailableActions(actions);
    }
  }, [actions]);

  const getActionById = (id: string) => {
    return availableActions.find(action => action.actionId === parseInt(id));
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading actions...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Failed to load actions</div>;
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{required && <span className="text-red-500 ml-1">*</span>}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {availableActions.map(action => (
                  <SelectItem key={action.actionId} value={action.actionId.toString()}>
                    {action.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
