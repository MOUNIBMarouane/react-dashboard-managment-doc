
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Circuit } from '@/models/circuit';
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from 'lucide-react';

// Define the form schema
const circuitFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  descriptif: z.string().optional(),
  hasOrderedFlow: z.boolean().default(true),
  allowBacktrack: z.boolean().default(false),
  isActive: z.boolean().default(false),
});

type CircuitFormValues = z.infer<typeof circuitFormSchema>;

interface CreateCircuitFormProps {
  onSubmit: (data: Omit<Circuit, 'id' | 'circuitKey' | 'crdCounter'>) => void;
  isSubmitting: boolean;
  error: string | null;
}

export const CreateCircuitForm = ({ 
  onSubmit, 
  isSubmitting, 
  error 
}: CreateCircuitFormProps) => {
  const form = useForm<CircuitFormValues>({
    resolver: zodResolver(circuitFormSchema),
    defaultValues: {
      title: '',
      descriptif: '',
      hasOrderedFlow: true,
      allowBacktrack: false,
      isActive: false,
    },
  });

  const handleSubmit = (values: CircuitFormValues) => {
    onSubmit({
      title: values.title,
      descriptif: values.descriptif || '',
      hasOrderedFlow: values.hasOrderedFlow,
      allowBacktrack: values.allowBacktrack,
      isActive: values.isActive,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <h2 className="text-xl font-semibold">Create New Circuit</h2>
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter circuit title" {...field} className="bg-[#0a1033] border-blue-900/40" />
              </FormControl>
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
                  placeholder="Enter circuit description (optional)" 
                  {...field} 
                  className="bg-[#0a1033] border-blue-900/40 min-h-[100px]" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hasOrderedFlow"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between p-3 border border-blue-900/30 rounded-md bg-[#0a1033]">
                <div>
                  <FormLabel>Ordered Flow</FormLabel>
                  <p className="text-xs text-blue-300">Steps must be completed in sequence</p>
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
          
          <FormField
            control={form.control}
            name="allowBacktrack"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between p-3 border border-blue-900/30 rounded-md bg-[#0a1033]">
                <div>
                  <FormLabel>Allow Backtracking</FormLabel>
                  <p className="text-xs text-blue-300">Allow returning to previous steps</p>
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
        </div>
        
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between p-3 border border-blue-900/30 rounded-md bg-[#0a1033]">
              <div>
                <FormLabel>Activate Circuit</FormLabel>
                <p className="text-xs text-blue-300">Make circuit available for document assignment</p>
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

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 p-3 rounded flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-red-200">{error}</span>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 'Creating...' : 'Create Circuit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
