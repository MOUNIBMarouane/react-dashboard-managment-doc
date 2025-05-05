
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DocumentStatusDto } from "@/models/documentCircuit";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isRequired: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface StatusFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: DocumentStatusDto | null;
  stepId: number;
  onSuccess: () => void;
}

export function StatusFormDialog({
  open,
  onOpenChange,
  status,
  stepId,
  onSuccess,
}: StatusFormDialogProps) {
  const isEditing = !!status;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: status?.title || "",
      isRequired: status?.isRequired ?? true,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      // Mock API call
      console.log("Submitting status:", values);
      
      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Failed to save status:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Status" : "Add Status"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the status details below."
              : "Create a new status for this step."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter status title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Required</FormLabel>
                    <FormDescription>
                      Is this status required to proceed to the next step?
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

            <DialogFooter>
              <Button type="submit">
                {isEditing ? "Update Status" : "Create Status"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface FormDescription {
  children: React.ReactNode;
}

function FormDescription({ children }: FormDescription) {
  return (
    <p className="text-sm text-muted-foreground">{children}</p>
  );
}
