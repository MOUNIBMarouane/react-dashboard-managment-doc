
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { userValidationService } from "@/services/auth/user-validation-service";
import { Loader2, Eye, EyeOff } from "lucide-react";

interface AccountInfoStepProps {
  email: string;
  password: string;
  confirmPassword: string;
  errors: {[key: string]: string};
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountInfoStep = ({
  email,
  password,
  confirmPassword,
  errors,
  handleChange
}: AccountInfoStepProps) => {
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });

  useEffect(() => {
    // Validate email
    const validateEmail = async () => {
      if (email && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setIsValidatingEmail(true);
        try {
          const isValid = await userValidationService.validateEmail(email);
          if (!isValid) {
            // Add an error if email is already taken
            const event = {
              target: {
                name: 'email',
                value: email
              }
            } as React.ChangeEvent<HTMLInputElement>;
            
            // Force error on email
            handleChange(event);
            // This will be caught by SignupForm's handleChange method
            throw new Error("Email is already taken");
          }
          setEmailValidated(true);
        } catch (error) {
          // The error will be handled by the parent component
        } finally {
          setIsValidatingEmail(false);
        }
      } else {
        setEmailValidated(false);
      }
    };

    // Debounce the validation to prevent too many API calls
    const timeoutId = setTimeout(() => {
      if (email && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        validateEmail();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [email, handleChange]);

  useEffect(() => {
    // Check password strength
    const strength = {
      score: 0,
      hasLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password)
    };

    // Calculate score
    let score = 0;
    if (strength.hasLength) score++;
    if (strength.hasUppercase) score++;
    if (strength.hasLowercase) score++;
    if (strength.hasNumber) score++;
    if (strength.hasSpecial) score++;
    
    strength.score = score;
    setPasswordStrength(strength);
  }, [password]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-200">
          Email
        </label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
              errors.email ? "border-red-500" : emailValidated ? "border-green-500" : ""
            }`}
          />
          {isValidatingEmail && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
            </div>
          )}
          {!isValidatingEmail && emailValidated && !errors.email && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-200">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          <button 
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
        
        {/* Password strength indicator */}
        {password.length > 0 && (
          <div className="mt-2">
            <div className="flex space-x-1 mb-1">
              {[1, 2, 3, 4, 5].map((segment) => (
                <div 
                  key={segment}
                  className={`h-1.5 flex-1 rounded-full ${
                    passwordStrength.score >= segment 
                    ? passwordStrength.score < 3 
                      ? 'bg-red-500' 
                      : passwordStrength.score < 5 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                    : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">
              <p className={passwordStrength.hasLength ? "text-green-500" : "text-gray-400"}>
                • At least 8 characters
              </p>
              <p className={passwordStrength.hasUppercase ? "text-green-500" : "text-gray-400"}>
                • At least one uppercase letter
              </p>
              <p className={passwordStrength.hasLowercase ? "text-green-500" : "text-gray-400"}>
                • At least one lowercase letter
              </p>
              <p className={passwordStrength.hasNumber ? "text-green-500" : "text-gray-400"}>
                • At least one number
              </p>
              <p className={passwordStrength.hasSpecial ? "text-green-500" : "text-gray-400"}>
                • At least one special character
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
};

export default AccountInfoStep;
