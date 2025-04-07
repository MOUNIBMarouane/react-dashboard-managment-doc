
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
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const validateEmail = async () => {
      if (email && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setIsValidatingEmail(true);
        setEmailValidated(false);
        try {
          const isValid = await userValidationService.validateEmail(email);
          if (!isValid) {
            setEmailError("Email is already taken");
          } else {
            setEmailError(null);
            setEmailValidated(true);
          }
        } catch (error: any) {
          setEmailError(error.message || "Error validating email");
        } finally {
          setIsValidatingEmail(false);
        }
      } else {
        setEmailValidated(false);
        setEmailError(email ? "Please enter a valid email address" : null);
      }
    };

    // Debounce the validation to prevent too many API calls
    const timeoutId = setTimeout(() => {
      if (email && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        validateEmail();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [email]);

  // Create a modified handleChange to capture email errors
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmailValidated(false);
      setEmailError(null);
    }
    handleChange(e);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, text: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthText = [
      "Very weak",
      "Weak",
      "Fair",
      "Good",
      "Strong",
      "Very strong"
    ][strength];

    const strengthColor = [
      "bg-red-500",
      "bg-red-400",
      "bg-yellow-500",
      "bg-yellow-300",
      "bg-green-400",
      "bg-green-500"
    ][strength];

    return { 
      strength: (strength / 5) * 100, 
      text: strengthText,
      color: strengthColor
    };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-200">
          Email Address
        </label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="john.doe@example.com"
            required
            className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
              emailError || errors.email ? "border-red-500" : emailValidated ? "border-green-500" : ""
            }`}
          />
          {isValidatingEmail && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
            </div>
          )}
          {!isValidatingEmail && emailValidated && !emailError && !errors.email && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {emailError && (
          <p className="text-sm text-red-500 mt-1">{emailError}</p>
        )}
        {errors.email && !emailError && (
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
            placeholder="••••••••••••"
            required
            className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {password && (
          <div className="space-y-1">
            <div className="h-1 w-full bg-gray-700 rounded-full">
              <div 
                className={`h-full rounded-full ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.strength}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400">{passwordStrength.text}</p>
          </div>
        )}
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
        <ul className="text-xs text-gray-400 space-y-1 mt-1">
          <li className={`flex items-center ${password.length >= 8 ? 'text-green-400' : ''}`}>
            <span className="mr-1">{password.length >= 8 ? '✓' : '•'}</span> At least 8 characters
          </li>
          <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-400' : ''}`}>
            <span className="mr-1">{/[A-Z]/.test(password) ? '✓' : '•'}</span> Contains uppercase letter
          </li>
          <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-400' : ''}`}>
            <span className="mr-1">{/[a-z]/.test(password) ? '✓' : '•'}</span> Contains lowercase letter
          </li>
          <li className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-400' : ''}`}>
            <span className="mr-1">{/[0-9]/.test(password) ? '✓' : '•'}</span> Contains number
          </li>
          <li className={`flex items-center ${/[^A-Za-z0-9]/.test(password) ? 'text-green-400' : ''}`}>
            <span className="mr-1">{/[^A-Za-z0-9]/.test(password) ? '✓' : '•'}</span> Contains special character
          </li>
        </ul>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleChange}
            placeholder="••••••••••••"
            required
            className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
};

export default AccountInfoStep;
