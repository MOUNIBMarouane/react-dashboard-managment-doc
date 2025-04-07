
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CircuitDetailFormStep2Props {
  form: UseFormReturn<any>;
}

const CircuitDetailFormStep2: React.FC<CircuitDetailFormStep2Props> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input 
              placeholder="Detail title" 
              {...field} 
              autoFocus 
            />
          </FormControl>
          <FormMessage />
          <p className="text-xs text-muted-foreground mt-1">
            Enter a descriptive title for this circuit detail
          </p>
        </FormItem>
      )}
    />
  );
};

export default CircuitDetailFormStep2;
