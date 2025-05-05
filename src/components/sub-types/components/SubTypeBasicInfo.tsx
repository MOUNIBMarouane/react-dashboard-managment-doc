
import React from 'react';
import { useSubTypeForm } from '../context/SubTypeFormContext';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import documentTypeService from '@/services/documentTypeService';

export const SubTypeBasicInfo: React.FC = () => {
  const { form, updateForm } = useSubTypeForm();

  const { data: documentTypes = [], isLoading } = useQuery({
    queryKey: ['document-types'],
    queryFn: documentTypeService.getAllDocumentTypes,
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Information</h2>
      <p className="text-muted-foreground">Enter the basic details for the subtype.</p>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtype Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter subtype name"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  updateForm({ name: e.target.value });
                }}
              />
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
                placeholder="Enter description (optional)"
                className="min-h-[100px] resize-none"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  updateForm({ description: e.target.value });
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documentTypeId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Document Type</FormLabel>
            <Select
              disabled={isLoading}
              onValueChange={(value) => {
                field.onChange(Number(value));
                updateForm({ documentTypeId: Number(value) });
              }}
              value={field.value?.toString() || ''}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a document type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.typeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
