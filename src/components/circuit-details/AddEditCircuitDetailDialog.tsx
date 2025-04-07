
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircuitDetail } from "@/types/circuit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AddEditCircuitDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (detailData: Omit<CircuitDetail, 'id' | 'circuit_id' | 'created_at' | 'updated_at'>) => void;
  circuitId: string;
  detailToEdit?: CircuitDetail;
  isEditing: boolean;
}

const formSchema = z.object({
  circuit_detail_key: z.string().min(1, "Detail key is required"),
  title: z.string().min(1, "Title is required"),
  descriptif: z.string().min(1, "Description is required"),
});

const AddEditCircuitDetailDialog = ({
  isOpen,
  onOpenChange,
  onSave,
  circuitId,
  detailToEdit,
  isEditing
}: AddEditCircuitDetailDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      circuit_detail_key: detailToEdit?.circuit_detail_key || "",
      title: detailToEdit?.title || "",
      descriptif: detailToEdit?.descriptif || "",
    },
  });

  React.useEffect(() => {
    if (isOpen && detailToEdit) {
      form.reset({
        circuit_detail_key: detailToEdit.circuit_detail_key,
        title: detailToEdit.title,
        descriptif: detailToEdit.descriptif,
      });
    } else if (isOpen && !detailToEdit) {
      form.reset({
        circuit_detail_key: "",
        title: "",
        descriptif: "",
      });
    }
  }, [isOpen, detailToEdit, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Circuit Detail" : "Add Circuit Detail"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the circuit detail information below."
              : "Add a new circuit detail by filling the form below."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="circuit_detail_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detail Key</FormLabel>
                  <FormControl>
                    <Input placeholder="CD-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Detail title" {...field} />
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
                    <Input placeholder="Detail description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Save Changes" : "Add Detail"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditCircuitDetailDialog;
