
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { userValidationService } from "@/services/auth/user-validation-service";
import { Loader2 } from "lucide-react";

interface PersonalInfoStepProps {
  firstName: string;
  lastName: string;
  username: string;
  errors: {[key: string]: string};
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoStep = ({
  firstName,
  lastName,
  username,
  errors,
  handleChange
}: PersonalInfoStepProps) => {
  const [isValidatingUsername, setIsValidatingUsername] = useState(false);
  const [usernameValidated, setUsernameValidated] = useState(false);

  useEffect(() => {
    const validateUsername = async () => {
      if (username.length >= 3) {
        setIsValidatingUsername(true);
        try {
          const isValid = await userValidationService.validateUsername(username);
          if (!isValid) {
            // Add an error if username is already taken
            const event = {
              target: {
                name: 'username',
                value: username
              }
            } as React.ChangeEvent<HTMLInputElement>;
            
            // Force error on username
            handleChange(event);
            // This will be caught by SignupForm's handleChange method
            throw new Error("Username is already taken");
          }
          setUsernameValidated(true);
        } catch (error: any) {
          // The error will be handled by the parent component
        } finally {
          setIsValidatingUsername(false);
        }
      } else {
        setUsernameValidated(false);
      }
    };

    // Debounce the validation to prevent too many API calls
    const timeoutId = setTimeout(() => {
      if (username && username.length >= 3) {
        validateUsername();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username, handleChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="firstName" className="text-sm font-medium text-gray-200">
          First Name
        </label>
        <Input
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="John"
          required
          className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
            errors.firstName ? "border-red-500" : ""
          }`}
        />
        {errors.firstName && (
          <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="lastName" className="text-sm font-medium text-gray-200">
          Last Name
        </label>
        <Input
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder="Doe"
          required
          className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
            errors.lastName ? "border-red-500" : ""
          }`}
        />
        {errors.lastName && (
          <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium text-gray-200">
          Username
        </label>
        <div className="relative">
          <Input
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="johndoe123"
            required
            className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
              errors.username ? "border-red-500" : usernameValidated ? "border-green-500" : ""
            }`}
          />
          {isValidatingUsername && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
            </div>
          )}
          {!isValidatingUsername && usernameValidated && !errors.username && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {errors.username && (
          <p className="text-sm text-red-500 mt-1">{errors.username}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoStep;
