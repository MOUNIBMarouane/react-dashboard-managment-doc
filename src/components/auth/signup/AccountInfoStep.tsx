
import React from "react";
import { Input } from "@/components/ui/input";

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
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-200">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-200">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className={`bg-dashboard-blue-light text-white border-dashboard-blue-light ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
};

export default AccountInfoStep;
