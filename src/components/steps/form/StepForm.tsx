
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useStepForm } from './StepFormProvider';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Save, Check } from 'lucide-react';

const stepFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  descriptif: z.string().optional(),
  orderIndex: z.number().min(1, { message: "Order index must be at least 1." }),
  responsibleRoleId: z.number().optional(),
  isFinalStep: z.boolean().default(false),
});

export const StepForm: React.FC = () => {
  const { formData, submitForm, isSubmitting, isEditMode } = useStepForm();
  
  const form = useForm({
    resolver: zodResolver(stepFormSchema),
    defaultValues: {
      title: formData.title || '',
      descriptif: formData.descriptif || '',
      orderIndex: formData.orderIndex || 1,
      responsibleRoleId: formData.responsibleRoleId,
      isFinalStep: formData.isFinalStep || false,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await submitForm();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Step Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter step title" {...field} />
              </FormControl>
              <FormDescription>
                A descriptive name for this step.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descriptif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter step description" 
                  rows={3}
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>
                Provide details about this step's purpose.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="orderIndex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Index</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={1}
                  {...field}
                  onChange={event => field.onChange(Number(event.target.value))}
                />
              </FormControl>
              <FormDescription>
                The order in which this step appears in the workflow.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFinalStep"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Final Step</FormLabel>
                <FormDescription>
                  Mark this as the final step in the workflow.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>Processing...</>
          ) : isEditMode ? (
            <>
              <Save className="mr-2 h-4 w-4" /> 
              Update Step
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> 
              Create Step
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
