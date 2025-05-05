
import { useStepForm } from "./StepFormProvider";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

const stepSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  descriptif: z
    .string()
    .max(500, { message: "Description must not exceed 500 characters" })
    .optional(),
  isFinalStep: z.boolean().default(false),
});

type FormValues = z.infer<typeof stepSchema>;

export const StepBasicInfo = () => {
  const { formData, setFormData, isEditMode } = useStepForm();

  const form = useForm<FormValues>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      title: formData.title || "",
      descriptif: formData.descriptif || "",
      isFinalStep: formData.isFinalStep || false,
    },
  });

  // Update form values when formData changes (useful for edit mode)
  useEffect(() => {
    form.reset({
      title: formData.title || "",
      descriptif: formData.descriptif || "",
      isFinalStep: formData.isFinalStep || false,
    });
  }, [formData, form]);

  // Update parent form data when this form changes
  const handleFormChange = () => {
    const values = form.getValues();
    setFormData({
      title: values.title,
      descriptif: values.descriptif || "",
      isFinalStep: values.isFinalStep,
    });
  };

  return (
    <Form {...form}>
      <form onChange={handleFormChange} className="space-y-5 pt-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-200">Step Title*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter step title"
                  className="h-10 text-sm bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-400">
                The name of this workflow step
              </FormDescription>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descriptif"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-200">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter step description"
                  className="min-h-20 text-sm bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-400">
                A detailed description of what this step involves
              </FormDescription>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFinalStep"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-sm font-medium text-gray-200">Final Step</FormLabel>
                <FormDescription className="text-xs text-gray-400">
                  Mark this as the final step in the workflow
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly={isEditMode}
                  className={isEditMode ? "cursor-not-allowed" : ""}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
