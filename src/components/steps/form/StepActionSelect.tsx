
import React, { useEffect } from 'react';
import { useActionsSelect } from '@/hooks/useActionsSelect';
import { Action } from '@/models/action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStepFormContext } from '@/context/step-form-context';

interface StepActionSelectProps {
  
}

const StepActionSelect: React.FC<StepActionSelectProps> = () => {
  const actions = useActionsSelect();
  const { formData, setFormData } = useStepFormContext();

  // If the problem is with using the form property, ensure we're using formData directly
  const handleActionChange = (actionId: string) => {
    const selectedAction = actions.find(action => action.id.toString() === actionId);
    if (selectedAction) {
      setFormData({
        actions: [...(formData.actions || []), selectedAction]
      });
    }
  };

  return (
    <div>
      <Select onValueChange={(value) => handleActionChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select action" />
        </SelectTrigger>
        <SelectContent>
          {actions.map((action) => (
            <SelectItem key={action.id} value={action.id.toString()}>
              {action.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StepActionSelect;
