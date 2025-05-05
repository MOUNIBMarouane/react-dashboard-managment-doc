
import React from "react";
import { Label } from "@/components/ui/label";
import { CustomInput } from "@/components/ui/custom-input";
import { FormError } from "@/components/ui/form-error";

export interface CompanyAddressFieldsProps {
  address: string;
  city: string;
  country: string;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyAddressFields: React.FC<CompanyAddressFieldsProps> = ({
  address,
  city,
  country,
  errors,
  onChange
}) => {
  return (
    <div className="space-y-6">
      {/* Address Field */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium">
          Address
        </Label>
        <CustomInput
          id="address"
          name="address"
          placeholder="Enter company address"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!errors.address}
          value={address}
          onChange={onChange}
        />
        {errors.address && <FormError message={errors.address} />}
      </div>

      {/* City Field */}
      <div className="space-y-2">
        <Label htmlFor="city" className="text-sm font-medium">
          City
        </Label>
        <CustomInput
          id="city"
          name="city"
          placeholder="Enter city"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!errors.city}
          value={city}
          onChange={onChange}
        />
        {errors.city && <FormError message={errors.city} />}
      </div>

      {/* Country Field */}
      <div className="space-y-2">
        <Label htmlFor="country" className="text-sm font-medium">
          Country
        </Label>
        <CustomInput
          id="country"
          name="country"
          placeholder="Enter country"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!errors.country}
          value={country}
          onChange={onChange}
        />
        {errors.country && <FormError message={errors.country} />}
      </div>
    </div>
  );
};

export default CompanyAddressFields;
