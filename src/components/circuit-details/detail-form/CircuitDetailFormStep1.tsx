
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CircuitDetailFormStep1Props {
  form: UseFormReturn<any>;
}

const CircuitDetailFormStep1: React.FC<CircuitDetailFormStep1Props> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="circuit_detail_key"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Detail Key</FormLabel>
          <FormControl>
            <Input 
              placeholder="CD-001" 
              {...field} 
              autoFocus 
            />
          </FormControl>
          <FormMessage />
          <p className="text-xs text-muted-foreground mt-1">
            Enter a unique identifier for this circuit detail (e.g., CD-001)
          </p>
        </FormItem>
      )}
    />
  );
};

export default CircuitDetailFormStep1;
