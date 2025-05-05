
import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';

interface CompanyAddressFieldsProps {
  formData: {
    address: string;
    city: string;
    zipCode: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  localErrors: Record<string, string>;
}

const CompanyAddressFields: React.FC<CompanyAddressFieldsProps> = ({
  formData,
  handleChange,
  localErrors
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
          error={!!localErrors.address}
          value={formData.address}
          onChange={handleChange}
        />
        {localErrors.address && (
          <p className="text-xs text-red-500">{localErrors.address}</p>
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
          error={!!localErrors.city}
          value={formData.city}
          onChange={handleChange}
        />
        {localErrors.city && (
          <p className="text-xs text-red-500">{localErrors.city}</p>
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
          error={!!localErrors.zipCode}
          value={formData.zipCode}
          onChange={handleChange}
        />
        {localErrors.zipCode && (
          <p className="text-xs text-red-500">{localErrors.zipCode}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyAddressFields;
