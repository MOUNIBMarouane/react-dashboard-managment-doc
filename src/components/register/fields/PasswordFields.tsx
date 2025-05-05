
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/ui/custom-input';

interface PasswordFieldsProps {
  password: string;
  confirmPassword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  localErrors: Record<string, string>;
  passwordStrength: number;
}

const PasswordFields: React.FC<PasswordFieldsProps> = ({
  password,
  confirmPassword,
  onChange,
  localErrors,
  passwordStrength
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get progress color based on password strength
  const getProgressColor = (strength: number) => {
    if (strength < 30) return 'bg-red-500';
    if (strength < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <>
      {/* Password Field */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <CustomInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="pl-10 pr-10"
            error={!!localErrors.password}
            value={password}
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
        {localErrors.password && (
          <p className="text-xs text-red-500">{localErrors.password}</p>
        )}
        {password && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Password strength:</span>
              <span className={`font-medium ${passwordStrength > 60 ? 'text-green-500' : passwordStrength > 30 ? 'text-yellow-500' : 'text-red-500'}`}>
                {passwordStrength > 60 ? 'Strong' : passwordStrength > 30 ? 'Medium' : 'Weak'}
              </span>
            </div>
            <Progress 
              value={passwordStrength} 
              className="h-1.5 bg-gray-700"
              indicatorClassName={getProgressColor(passwordStrength)}
            />
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <CustomInput
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="pl-10 pr-10"
            error={!!localErrors.confirmPassword}
            value={confirmPassword}
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
        {localErrors.confirmPassword && (
          <p className="text-xs text-red-500">{localErrors.confirmPassword}</p>
        )}
      </div>
    </>
  );
};

export default PasswordFields;
