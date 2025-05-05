import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Action } from '@/models/action';
import { Step } from '@/models/circuit';
import { useSettings } from '@/context/SettingsContext';
import actionService from '@/services/actionService';
import stepService from '@/services/stepService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: Action;
  theme: string; 
  skipStepsFetch?: boolean;
  onSuccess?: () => void;
}

const formSchema = z.object({
  stepId: z.string().min(1, { message: 'Please select a step' }),
});

export const AssignActionDialog = ({ 
  open, 
  onOpenChange, 
  action,
  skipStepsFetch = false,
  onSuccess
}: AssignActionDialogProps) => {
  const { theme } = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stepId: '',
    },
  });

  // Fetch steps
  const { data: stepsData, isLoading: isLoadingSteps } = useQuery({
    queryKey: ['steps'],
    queryFn: () => stepService.getAllSteps(),
    enabled: open && !skipStepsFetch,
  });

  useEffect(() => {
    if (stepsData) {
      setSteps(stepsData);
    }
  }, [stepsData]);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        stepId: '',
      });
    }
  }, [open, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await actionService.assignActionToStep({
        actionId: action.id,
        stepId: parseInt(values.stepId),
      });
      
      toast.success(`Action "${action.title}" assigned to step successfully`);
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error assigning action to step:', error);
      toast.error('Failed to assign action to step');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[425px] ${theme === 'dark' ? 'bg-slate-900 text-white' : ''}`}>
        <DialogHeader>
          <DialogTitle>Assign Action to Step</DialogTitle>
          <DialogDescription>
            Select a step to assign the action "{action.title}" to.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="stepId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoadingSteps}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a step" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingSteps ? (
                          <div className="flex items-center justify-center p-2">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>Loading steps...</span>
                          </div>
                        ) : steps.length === 0 ? (
                          <div className="p-2 text-center text-sm">
                            No steps available
                          </div>
                        ) : (
                          steps.map((step) => (
                            <SelectItem key={step.id} value={step.id.toString()}>
                              {step.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isLoadingSteps}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  'Assign'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
