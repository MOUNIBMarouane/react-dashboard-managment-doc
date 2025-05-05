
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubTypeForm } from '../SubTypeFormProvider';

export const SubTypeDocType: React.FC = () => {
  const { formData, setFormData, errors, documentTypes } = useSubTypeForm();

  const handleDocTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      documentTypeId: parseInt(value)
    }));
  };

  return (
    <div className="space-y-1.5">
      <FormLabel className="text-blue-300">Document Type</FormLabel>
      <Select
        value={formData.documentTypeId ? String(formData.documentTypeId) : undefined}
        onValueChange={handleDocTypeChange}
      >
        <SelectTrigger
          className="w-full bg-blue-950/40 border-blue-900/40 text-white"
        >
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent className="bg-[#0a1033] border-blue-900/30 text-white">
          {documentTypes && documentTypes.length > 0 ? (
            documentTypes.map(docType => (
              <SelectItem
                key={docType.id}
                value={String(docType.id)}
                className="hover:bg-blue-900/20"
              >
                {docType.typeName}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="none" disabled>
              No document types available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      {errors.documentTypeId && (
        <p className="text-red-400 text-xs mt-1">{errors.documentTypeId}</p>
      )}
    </div>
  );
};
