
import React, { ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';
import { Building2, MapPin, Globe } from 'lucide-react';

interface CompanyAddressFieldsProps {
  address: string;
  city: string;
  country: string;
  errors: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CompanyAddressFields: React.FC<CompanyAddressFieldsProps> = ({
  address,
  city,
  country,
  errors,
  onChange
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-1">
        <Label htmlFor="address">Company Address</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <CustomInput
            id="address"
            name="address"
            placeholder="Enter company address"
            className="pl-10"
            error={!!errors.address}
            value={address}
            onChange={onChange}
          />
        </div>
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="city">City</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <CustomInput
            id="city"
            name="city"
            placeholder="Enter city"
            className="pl-10"
            error={!!errors.city}
            value={city}
            onChange={onChange}
          />
        </div>
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="country">Country</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <CustomInput
            id="country"
            name="country"
            placeholder="Enter country"
            className="pl-10"
            error={!!errors.country}
            value={country}
            onChange={onChange}
          />
        </div>
        {errors.country && (
          <p className="text-xs text-red-500">{errors.country}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyAddressFields;
