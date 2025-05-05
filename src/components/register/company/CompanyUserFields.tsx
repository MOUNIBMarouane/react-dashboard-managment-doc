
import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';

interface CompanyUserFieldsProps {
  formData: {
    companyName: string;
    companyRC?: string;
    companyAddress?: string;
    companyPhone?: string;
    companyEmail?: string;
  };
  localErrors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyUserFields: React.FC<CompanyUserFieldsProps> = ({
  formData,
  localErrors,
  handleChange
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mb-2">
      {/* Company Name Field */}
      <div className="space-y-1">
        <Label htmlFor="companyName">Company Name*</Label>
        <CustomInput
          id="companyName"
          name="companyName"
          placeholder="Enter company name"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.companyName}
          value={formData.companyName || ''}
          onChange={handleChange}
        />
        {localErrors.companyName && (
          <p className="text-xs text-red-500">{localErrors.companyName}</p>
        )}
      </div>

      {/* Company Registration Field */}
      <div className="space-y-1">
        <Label htmlFor="companyRC">Registration Number (Optional)</Label>
        <CustomInput
          id="companyRC"
          name="companyRC"
          placeholder="Enter company registration number"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.companyRC}
          value={formData.companyRC || ''}
          onChange={handleChange}
        />
        {localErrors.companyRC && (
          <p className="text-xs text-red-500">{localErrors.companyRC}</p>
        )}
      </div>

      {/* Company Phone Field */}
      <div className="space-y-1">
        <Label htmlFor="companyPhone">Company Phone (Optional)</Label>
        <CustomInput
          id="companyPhone"
          name="companyPhone"
          placeholder="Enter company phone"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.companyPhone}
          value={formData.companyPhone || ''}
          onChange={handleChange}
        />
        {localErrors.companyPhone && (
          <p className="text-xs text-red-500">{localErrors.companyPhone}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyUserFields;
