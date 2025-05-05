
import React from 'react';
import { Label } from "@/components/ui/label";
import { CustomInput } from "@/components/ui/custom-input";
import PasswordStrengthMeter from '../fields/PasswordStrengthMeter';
import { FormError } from '@/components/ui/form-error';
import { User } from 'lucide-react';

interface CompanyCredentialsFieldsProps {
  formData: {
    companyEmail?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
  localErrors: Record<string, string>;
  validationErrors?: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordStrength?: number;
}

const CompanyCredentialsFields: React.FC<CompanyCredentialsFieldsProps> = ({
  formData,
  localErrors,
  validationErrors,
  handleChange,
  passwordStrength = 0,
}) => {
  // Combine local validation errors with server validation errors
  const errors = {
    ...localErrors,
    ...(validationErrors || {}),
  };

  return (
    <div className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <div className="relative">
          <CustomInput
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="bg-black/5 border-blue-900/20 h-11 pl-10"
            error={!!errors.email}
            value={formData.companyEmail || ''}
            onChange={handleChange}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <User className="h-4 w-4" />
          </div>
        </div>
        {errors.email && <FormError message={errors.email} />}
      </div>

      {/* Username Field */}
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Username
        </Label>
        <CustomInput
          id="username"
          name="username"
          placeholder="Choose a username"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!errors.username}
          value={formData.username || ''}
          onChange={handleChange}
        />
        {errors.username && <FormError message={errors.username} />}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <CustomInput
          id="password"
          name="password"
          type="password"
          placeholder="Choose a strong password"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!errors.password}
          value={formData.password || ''}
          onChange={handleChange}
        />
        {passwordStrength > 0 && <PasswordStrengthMeter strength={passwordStrength} />}
        {errors.password && <FormError message={errors.password} />}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </Label>
        <CustomInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="bg-black/5 border-blue-900/20 h-11"
          error={!!errors.confirmPassword}
          value={formData.confirmPassword || ''}
          onChange={handleChange}
        />
        {errors.confirmPassword && <FormError message={errors.confirmPassword} />}
      </div>
    </div>
  );
};

export default CompanyCredentialsFields;
