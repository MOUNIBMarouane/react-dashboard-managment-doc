import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/ui/custom-input';
import { Progress } from '@/components/ui/progress';

interface PasswordFieldsProps {
  localErrors: Record<string, string>;
}

const PasswordFields: React.FC<PasswordFieldsProps> = ({ localErrors }) => {
  const { watch, register } = useFormContext();
  const password = watch("password");

  const getPasswordStrength = (password: string): number => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;

    if (password.length >= minLength) strength += 25;
    if (hasUpperCase) strength += 25;
    if (hasLowerCase) strength += 25;
    if (hasNumbers) strength += 25;
    if (hasSymbols) strength += 25;

    return Math.min(strength, 100);
  };

  const value = getPasswordStrength(password || "");
  let indicatorClassName = "bg-red-500";

  if (value >= 80) {
    indicatorClassName = "bg-green-500";
  } else if (value >= 50) {
    indicatorClassName = "bg-yellow-500";
  } else if (value >= 25) {
    indicatorClassName = "bg-orange-500";
  }

  return (
    <div className="grid grid-cols-1 gap-4 mb-2">
      {/* Password Field */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <CustomInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.password}
          {...register("password")}
        />
        {localErrors.password && (
          <p className="text-xs text-red-500">{localErrors.password}</p>
        )}
        <Progress 
          value={value} 
          className={`h-1.5 ${indicatorClassName || "bg-blue-600"}`} 
        />
        <p className="text-xs text-gray-400">
          Password Strength: {value}%
        </p>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <CustomInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="bg-gray-950 border-gray-800"
          error={!!localErrors.confirmPassword}
          {...register("confirmPassword")}
        />
        {localErrors.confirmPassword && (
          <p className="text-xs text-red-500">{localErrors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
};

export default PasswordFields;
