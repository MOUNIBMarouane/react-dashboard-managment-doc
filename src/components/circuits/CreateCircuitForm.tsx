
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  descriptif: z.string().optional(),
  hasOrderedFlow: z.boolean().default(true),
  allowBacktrack: z.boolean().default(false),
  isActive: z.boolean().default(false)
});

type FormValues = z.infer<typeof formSchema>;

interface CreateCircuitFormProps {
  onSubmit: (data: FormValues) => void;
  isSubmitting: boolean;
  error?: string | null;
}

export function CreateCircuitForm({
  onSubmit,
  isSubmitting,
  error
}: CreateCircuitFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      descriptif: '',
      hasOrderedFlow: true,
      allowBacktrack: false,
      isActive: false
    }
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-white text-xl">Create New Circuit</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-300">Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter circuit title" 
                    {...field}
                    className="bg-blue-950/50 border-blue-900/50 text-white"
                  />
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
                <FormLabel className="text-blue-300">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Circuit description"
                    {...field}
                    value={field.value || ''}
                    className="bg-blue-950/50 border-blue-900/50 text-white min-h-24"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <FormField
              control={form.control}
              name="hasOrderedFlow"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-3 border border-blue-900/30 rounded-md bg-blue-900/10">
                  <div>
                    <FormLabel className="text-blue-300">Ordered Flow</FormLabel>
                    <p className="text-xs text-blue-400/70">Steps must be completed in sequence</p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allowBacktrack"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-3 border border-blue-900/30 rounded-md bg-blue-900/10">
                  <div>
                    <FormLabel className="text-blue-300">Allow Backtracking</FormLabel>
                    <p className="text-xs text-blue-400/70">Allow returning to previous steps</p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
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
              <FormItem className="flex flex-row items-center justify-between p-3 border border-blue-900/30 rounded-md bg-blue-900/10">
                <div>
                  <FormLabel className="text-blue-300">Active Circuit</FormLabel>
                  <p className="text-xs text-blue-400/70">Circuit is available for use</p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-green-600"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 p-2 rounded flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-200">{error}</span>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="border-blue-800 text-blue-300"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Circuit"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
