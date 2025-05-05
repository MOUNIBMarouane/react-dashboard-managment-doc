import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';
import { useFormContext } from 'react-hook-form';

interface StepThreeCompanyCredentialsProps {
  localErrors: Record<string, string>;
}

const StepThreeCompanyCredentials: React.FC<StepThreeCompanyCredentialsProps> = ({
  localErrors
}) => {
  const { register } = useFormContext();

  return (
    <div className="grid grid-cols-1 gap-4 mb-2">
      {/* Company Email Field */}
      <div className="space-y-1">
        <Label htmlFor="companyEmail">Company Email</Label>
        <CustomInput
          id="companyEmail"
          placeholder="company@example.com"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.companyEmail}
          {...register("companyEmail")}
        />
        {localErrors.companyEmail && (
          <p className="text-xs text-red-500">{localErrors.companyEmail}</p>
        )}
      </div>

      {/* Company Website Field */}
      <div className="space-y-1">
        <Label htmlFor="companyWebsite">Company Website</Label>
        <CustomInput
          id="companyWebsite"
          placeholder="www.company.com"
          className="bg-gray-950 border-gray-800"
          {...register("companyWebsite")}
        />
      </div>
    </div>
  );
};

export default StepThreeCompanyCredentials;
