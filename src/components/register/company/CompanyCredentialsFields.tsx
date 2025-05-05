
import React from 'react';
import { Label } from '@/components/ui/label';
import { Mail, User, Check, X } from 'lucide-react';
import PasswordFields from '../fields/PasswordFields';
import { CustomInput } from '@/components/ui/custom-input';

interface CompanyCredentialsFieldsProps {
  formData: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  localErrors: Record<string, string>;
  validationErrors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordStrength: number;
}

const CompanyCredentialsFields: React.FC<CompanyCredentialsFieldsProps> = ({
  formData,
  localErrors,
  validationErrors,
  handleChange,
  passwordStrength
}) => {
  const hasEmailError = !!(localErrors.email || validationErrors.email);
  const hasUsernameError = !!(localErrors.username || validationErrors.username);
  const isEmailValid = formData.email && !hasEmailError;
  const isUsernameValid = formData.username && !hasUsernameError;
  
  return (
    <div className="space-y-6">
      {/* Email Field */}
      <div className="space-y-1">
        <Label htmlFor="email">Company Email*</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <CustomInput
            id="email"
            name="email"
            type="email"
            placeholder="company@example.com"
            className="pl-10 pr-10"
            error={hasEmailError}
            value={formData.email}
            onChange={handleChange}
          />
          {isEmailValid && (
            <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
          )}
          {formData.email && hasEmailError && (
            <X className="absolute right-3 top-3 h-4 w-4 text-red-500" />
          )}
        </div>
        {localErrors.email && (
          <p className="text-xs text-red-500">{localErrors.email}</p>
        )}
        {validationErrors.email && (
          <p className="text-xs text-red-500">{validationErrors.email}</p>
        )}
      </div>
      
      {/* Username Field */}
      <div className="space-y-1">
        <Label htmlFor="username">Username*</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <CustomInput
            id="username"
            name="username"
            placeholder="Choose a username for your company"
            className="pl-10 pr-10"
            error={hasUsernameError}
            value={formData.username}
            onChange={handleChange}
          />
          {isUsernameValid && (
            <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
          )}
          {formData.username && hasUsernameError && (
            <X className="absolute right-3 top-3 h-4 w-4 text-red-500" />
          )}
        </div>
        {localErrors.username && (
          <p className="text-xs text-red-500">{localErrors.username}</p>
        )}
        {validationErrors.username && (
          <p className="text-xs text-red-500">{validationErrors.username}</p>
        )}
      </div>
      
      {/* Password Fields */}
      <PasswordFields
        password={formData.password}
        confirmPassword={formData.confirmPassword}
        onChange={handleChange}
        localErrors={localErrors}
        passwordStrength={passwordStrength}
      />
      
      <div className="text-xs text-gray-400 pt-2">
        <p>Your login credentials will be used to access your company account.</p>
      </div>
    </div>
  );
};

export default CompanyCredentialsFields;
