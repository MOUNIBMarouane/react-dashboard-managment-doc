
import React from 'react';
import { Label } from "@/components/ui/label";
import { CustomInput } from "@/components/ui/custom-input";
import { FormError } from '@/components/ui/form-error';

interface CompanyUserFieldsProps {
  formData: {
    companyName?: string;
    companyRC?: string;
    companyAddress?: string;
    companyPhone?: string;
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
    <div className="space-y-6">
      {/* Company Name Field */}
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-sm font-medium">
          Company Name
        </Label>
        <CustomInput
          id="companyName"
          name="companyName"
          placeholder="Enter company name"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!localErrors.companyName}
          value={formData.companyName || ''}
          onChange={handleChange}
        />
        {localErrors.companyName && <FormError message={localErrors.companyName} />}
      </div>

      {/* Company RC Field */}
      <div className="space-y-2">
        <Label htmlFor="companyRC" className="text-sm font-medium">
          Company RC
        </Label>
        <CustomInput
          id="companyRC"
          name="companyRC"
          placeholder="Enter company registration code"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!localErrors.companyRC}
          value={formData.companyRC || ''}
          onChange={handleChange}
        />
        {localErrors.companyRC && <FormError message={localErrors.companyRC} />}
      </div>

      {/* Company Address Field */}
      <div className="space-y-2">
        <Label htmlFor="companyAddress" className="text-sm font-medium">
          Company Address
        </Label>
        <CustomInput
          id="companyAddress"
          name="companyAddress"
          placeholder="Enter company address"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!localErrors.companyAddress}
          value={formData.companyAddress || ''}
          onChange={handleChange}
        />
        {localErrors.companyAddress && <FormError message={localErrors.companyAddress} />}
      </div>

      {/* Company Phone Field */}
      <div className="space-y-2">
        <Label htmlFor="companyPhone" className="text-sm font-medium">
          Company Phone
        </Label>
        <CustomInput
          id="companyPhone"
          name="companyPhone"
          placeholder="Enter company phone"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!localErrors.companyPhone}
          value={formData.companyPhone || ''}
          onChange={handleChange}
        />
        {localErrors.companyPhone && <FormError message={localErrors.companyPhone} />}
      </div>
    </div>
  );
};

export default CompanyUserFields;
