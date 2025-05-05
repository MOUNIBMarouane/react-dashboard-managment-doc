
import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';

interface CompanyAddressFieldsProps {
  formData: {
    address: string;
    city: string;
    zipCode: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const CompanyAddressFields: React.FC<CompanyAddressFieldsProps> = ({
  formData,
  onChange,
  errors
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mb-2">
      {/* Address Field */}
      <div className="space-y-1">
        <Label htmlFor="address">Street Address</Label>
        <CustomInput
          id="address"
          name="address"
          placeholder="123 Main St"
          className="bg-gray-950 border-gray-800"
          error={!!errors.address}
          value={formData.address}
          onChange={onChange}
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address}</p>
        )}
      </div>

      {/* City Field */}
      <div className="space-y-1">
        <Label htmlFor="city">City</Label>
        <CustomInput
          id="city"
          name="city"
          placeholder="City"
          className="bg-gray-950 border-gray-800"
          error={!!errors.city}
          value={formData.city}
          onChange={onChange}
        />
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city}</p>
        )}
      </div>

      {/* Zip Code Field */}
      <div className="space-y-1">
        <Label htmlFor="zipCode">Zip Code</Label>
        <CustomInput
          id="zipCode"
          name="zipCode"
          placeholder="Zip Code"
          className="bg-gray-950 border-gray-800"
          error={!!errors.zipCode}
          value={formData.zipCode}
          onChange={onChange}
        />
        {errors.zipCode && (
          <p className="text-xs text-red-500">{errors.zipCode}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyAddressFields;
