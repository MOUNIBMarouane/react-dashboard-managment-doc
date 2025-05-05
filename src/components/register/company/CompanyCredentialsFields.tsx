
import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';
import { PasswordFields } from '../fields/PasswordFields';

interface CompanyCredentialsFieldsProps {
  formData: {
    email: string;
    companyName: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  localErrors: Record<string, string>;
  passwordStrength: number;
}

const CompanyCredentialsFields: React.FC<CompanyCredentialsFieldsProps> = ({
  formData,
  onChange,
  localErrors,
  passwordStrength
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="companyName">Company Name</Label>
        <CustomInput
          id="companyName"
          name="companyName"
          placeholder="Enter company name"
          className="bg-gray-950 border-gray-800"
          value={formData.companyName}
          error={!!localErrors.companyName}
          onChange={onChange}
        />
        {localErrors.companyName && (
          <p className="text-xs text-red-500">{localErrors.companyName}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email Address</Label>
        <CustomInput
          id="email"
          name="email"
          type="email"
          placeholder="company@example.com"
          className="bg-gray-950 border-gray-800"
          value={formData.email}
          error={!!localErrors.email}
          onChange={onChange}
        />
        {localErrors.email && (
          <p className="text-xs text-red-500">{localErrors.email}</p>
        )}
      </div>

      <PasswordFields 
        formData={{
          password: formData.password,
          confirmPassword: formData.confirmPassword
        }}
        onChange={onChange}
        localErrors={localErrors}
        passwordStrength={passwordStrength}
      />
    </div>
  );
};

export default CompanyCredentialsFields;
