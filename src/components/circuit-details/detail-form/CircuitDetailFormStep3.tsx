
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CircuitDetailFormStep3Props {
  form: UseFormReturn<any>;
}

const CircuitDetailFormStep3: React.FC<CircuitDetailFormStep3Props> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="descriptif"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input 
              placeholder="Detail description" 
              {...field} 
              autoFocus 
            />
          </FormControl>
          <FormMessage />
          <p className="text-xs text-muted-foreground mt-1">
            Provide a detailed description of this circuit detail
          </p>
        </FormItem>
      )}
    />
  );
};

export default CircuitDetailFormStep3;
