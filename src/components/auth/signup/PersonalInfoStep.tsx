
import React from "react";
import { Input } from "@/components/ui/input";

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
        <Input
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="johndoe123"
          required
          className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
            errors.username ? "border-red-500" : ""
          }`}
        />
        {errors.username && (
          <p className="text-sm text-red-500 mt-1">{errors.username}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoStep;
