
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { CustomInput } from '@/components/ui/custom-input';

interface CompanyCredentialsFieldsProps {
  formData: {
    email: string;
    companyName: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const CompanyCredentialsFields: React.FC<CompanyCredentialsFieldsProps> = ({
  formData,
  onChange,
  errors
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4 mb-2">
      {/* Email Field */}
      <div className="space-y-1">
        <Label htmlFor="email">Business Email</Label>
        <div className="relative">
          <CustomInput
            id="email"
            name="email"
            type="email"
            placeholder="company@example.com"
            className="bg-gray-950 border-gray-800"
            error={!!errors.email}
            value={formData.email}
            onChange={onChange}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Company Name Field */}
      <div className="space-y-1">
        <Label htmlFor="companyName">Company Name</Label>
        <CustomInput
          id="companyName"
          name="companyName"
          placeholder="Your Company Name"
          className="bg-gray-950 border-gray-800"
          error={!!errors.companyName}
          value={formData.companyName}
          onChange={onChange}
        />
        {errors.companyName && (
          <p className="text-xs text-red-500">{errors.companyName}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <CustomInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="bg-gray-950 border-gray-800 pr-10"
            error={!!errors.password}
            value={formData.password}
            onChange={onChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <CustomInput
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="bg-gray-950 border-gray-800 pr-10"
            error={!!errors.confirmPassword}
            value={formData.confirmPassword}
            onChange={onChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyCredentialsFields;
