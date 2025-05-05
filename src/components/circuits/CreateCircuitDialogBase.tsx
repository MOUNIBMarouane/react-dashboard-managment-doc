import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Circuit } from "@/models/circuit";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  descriptif: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateCircuitDialogBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  createCircuit: (circuit: Omit<Circuit, "id" | "circuitKey" | "crdCounter">) => Promise<Circuit>;
  onSuccess?: (circuit: Circuit) => void;
}

export function CreateCircuitDialogBase({
  open,
  onOpenChange,
  createCircuit,
  onSuccess,
}: CreateCircuitDialogBaseProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    descriptif: "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      descriptif: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateCircuit = async () => {
    if (!formData.title) {
      setFormError("Title is required");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await createCircuit({
        title: formData.title,
        descriptif: formData.descriptif || "",
        isActive: true,
        hasOrderedFlow: false,
        allowBacktrack: false,  // Add the missing property
        // Remove these properties as they are not part of the Circuit type
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString()
      });
      
      toast.success("Circuit created successfully!");
      if (onSuccess) onSuccess(result);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create circuit:", error);
      setFormError("Failed to create circuit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Circuit</DialogTitle>
          <DialogDescription>
            Add a new circuit to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateCircuit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Circuit Title" {...field} onChange={handleInputChange} />
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
                    <Input placeholder="Circuit Description" {...field} onChange={handleInputChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formError && (
              <p className="text-red-500 text-sm">{formError}</p>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
