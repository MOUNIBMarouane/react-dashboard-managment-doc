
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import circuitService from '@/services/circuitService';

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  orderIndex: z.number().min(1),
  responsibleRoleId: z.string().optional(),
  isFinalStep: z.boolean().default(false),
});

interface CreateCircuitDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circuitId: number;
  onSuccess: () => void;
}

export function CreateCircuitDetailDialog({
  open,
  onOpenChange,
  circuitId,
  onSuccess,
}: CreateCircuitDetailDialogProps) {
  const [isCreating, setIsCreating] = useState(false);

  // Get existing steps to determine next order index
  const { data: existingSteps } = useQuery({
    queryKey: ["circuit-details", circuitId],
    queryFn: () => circuitService.getCircuitDetailsByCircuitId(circuitId),
    enabled: open && !!circuitId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      orderIndex: 1,
      responsibleRoleId: undefined,
      isFinalStep: false,
    },
  });

  // Reset form and set initial values when dialog opens
  useState(() => {
    if (open && existingSteps) {
      const nextOrderIndex = existingSteps.length + 1;
      form.reset({
        title: "",
        description: "",
        orderIndex: nextOrderIndex,
        responsibleRoleId: undefined,
        isFinalStep: false,
      });
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!circuitId) return;

    setIsCreating(true);
    try {
      // Here we fix by calling the function with two params instead of one
      await circuitService.createCircuitDetail(circuitId, {
        title: values.title,
        descriptif: values.description,
        orderIndex: values.orderIndex,
        responsibleRoleId: values.responsibleRoleId ? parseInt(values.responsibleRoleId) : undefined,
        isFinalStep: values.isFinalStep,
      });
      
      toast.success("Step created successfully");
      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Error creating step:", error);
      toast.error("Failed to create step");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Step</DialogTitle>
          <DialogDescription>
            Add a new workflow step to your circuit.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter step title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter step description (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="orderIndex"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsibleRoleId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Responsible Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Admin</SelectItem>
                        <SelectItem value="2">User</SelectItem>
                        <SelectItem value="3">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isFinalStep"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Final Step</FormLabel>
                    <FormDescription>
                      Mark this as the final step in the workflow
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Step"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
