
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";

interface TypeDetailsStepProps {
  control: Control<any>;
}

export const TypeDetailsStep = ({ control }: TypeDetailsStepProps) => {
  return (
    <>
      <FormField
        control={control}
        name="typeName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base text-blue-100">Type Name*</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Enter document type name" 
                className="h-11 text-base bg-[#0A0E2E] border-blue-900/40 focus:border-blue-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    
      <FormField
        control={control}
        name="typeAttr"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base text-blue-100">Type Attributes (Optional)</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Enter attributes (optional)" 
                className="h-11 text-base bg-[#0A0E2E] border-blue-900/40 focus:border-blue-500"
              />
            </FormControl>
            <FormDescription className="text-blue-300/70">
              Additional attributes for this document type
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
