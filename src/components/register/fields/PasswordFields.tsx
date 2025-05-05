
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordFieldsProps {
  formData: {
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  localErrors: Record<string, string>;
  passwordStrength: number;
}

export const PasswordFields = ({
  formData,
  onChange,
  localErrors,
  passwordStrength
}: PasswordFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getStrengthColor = (strength: number) => {
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
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="bg-gray-950 border-gray-800 pr-10"
            value={formData.password}
            onChange={onChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {localErrors.password && (
          <p className="text-xs text-red-500">{localErrors.password}</p>
        )}
        
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Password strength</span>
              <span 
                className={`text-xs ${
                  passwordStrength < 30 ? 'text-red-400' :
                  passwordStrength < 60 ? 'text-yellow-400' : 'text-green-400'
                }`}
              >
                {passwordStrength < 30 ? 'Weak' :
                 passwordStrength < 60 ? 'Medium' : 'Strong'}
              </span>
            </div>
            <Progress 
              value={passwordStrength}
              className="h-1 bg-gray-800"
            >
              <div 
                className={`h-full ${getStrengthColor(passwordStrength)}`} 
                style={{ width: `${passwordStrength}%` }}
              />
            </Progress>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="bg-gray-950 border-gray-800 pr-10"
            value={formData.confirmPassword}
            onChange={onChange}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {localErrors.confirmPassword && (
          <p className="text-xs text-red-500">{localErrors.confirmPassword}</p>
        )}
      </div>
    </>
  );
};
