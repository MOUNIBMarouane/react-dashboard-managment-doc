
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import actionService from '@/services/actionService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { AssignActionToStepDto } from '@/models/documentCircuit';
import { Step } from '@/models/circuit';

const formSchema = z.object({
  actionId: z.string().min(1, { message: 'You must select an action' }),
});

export interface AssignActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stepId: number;
  onSuccess?: () => void;
  skipStepsFetch?: boolean;
}

export default function AssignActionDialog({
  open,
  onOpenChange,
  stepId,
  onSuccess,
  skipStepsFetch = false,
}: AssignActionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all available actions
  const { data: actions, isLoading: isLoadingActions } = useQuery({
    queryKey: ['actions'],
    queryFn: () => actionService.getAllActions(),
    enabled: open,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      actionId: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!stepId) {
      toast.error("No step selected");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: AssignActionToStepDto = {
        stepId,
        actionId: parseInt(values.actionId),
      };

      await actionService.assignActionToStep(payload);
      
      toast.success("Action assigned to step successfully");
      form.reset();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error assigning action to step:", error);
      toast.error("Failed to assign action to step");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Action</DialogTitle>
          <DialogDescription>
            Assign an action to this step.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="actionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingActions}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {actions?.map((action) => (
                        <SelectItem key={action.actionId} value={action.actionId.toString()}>
                          {action.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              <Button type="submit" disabled={isSubmitting || isLoadingActions}>
                {isSubmitting ? "Assigning..." : "Assign Action"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
