
import React from "react";
import { CircleIcon, AlertCircle, Lock } from "lucide-react";
import ActionButton from "./ActionButton";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SecretKeyStepProps {
  secretKey: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAdminAccount: boolean;
  handleCheckboxChange: (checked: boolean) => void;
  errors: { [key: string]: string };
}

const SecretKeyStep = ({
  secretKey,
  handleChange,
  isAdminAccount,
  handleCheckboxChange,
  errors
}: SecretKeyStepProps) => {
  if (!isAdminAccount) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <div className="w-20 h-20 bg-dashboard-blue-light/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-dashboard-accent/30 mb-6">
          <Lock className="w-10 h-10 text-dashboard-accent" />
        </div>
        
        <h3 className="text-xl text-white font-medium mb-2">Standard Account</h3>
        <p className="text-gray-400 mb-6 text-center">
          You're creating a standard account with regular user permissions.
        </p>
        
        <Card className="bg-dashboard-blue-light/10 border-dashboard-blue-light/20 text-white mb-6 w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CircleIcon className="w-4 h-4 mr-2 text-dashboard-accent" />
              Access Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4 text-sm text-gray-300">
            <p>Standard accounts have access to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>View and manage personal profile</li>
              <li>Access standard dashboard features</li>
              <li>Limited data management capabilities</li>
            </ul>
          </CardContent>
        </Card>
        
        <div className="flex space-x-4 w-full mt-4">
          <ActionButton 
            type="back" 
            onClick={() => handleCheckboxChange(true)} 
            className="w-full"
          >
            Switch to Admin
          </ActionButton>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-20 h-20 bg-dashboard-blue-light/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-dashboard-accent/30 mb-6">
        <Lock className="w-10 h-10 text-dashboard-accent" />
      </div>
      
      <h3 className="text-xl text-white font-medium mb-2">Admin Access Required</h3>
      <p className="text-gray-400 mb-6 text-center">
        Please enter the admin secret key to create an administrator account.
      </p>
      
      <div className="space-y-4 w-full">
        <div className="space-y-2">
          <Label htmlFor="secretKey" className="text-gray-300">Admin Secret Key</Label>
          <Input
            id="secretKey"
            name="secretKey"
            type="password"
            placeholder="Enter admin secret key"
            value={secretKey}
            onChange={handleChange}
            className={`bg-dashboard-blue-dark border border-dashboard-blue-light/30 text-white ${
              errors.secretKey ? "border-red-500" : ""
            }`}
          />
          {errors.secretKey && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.secretKey}
            </div>
          )}
        </div>
      </div>
      
      <Card className="bg-dashboard-blue-light/10 border-dashboard-blue-light/20 text-white my-6 w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <CircleIcon className="w-4 h-4 mr-2 text-dashboard-accent" />
            Admin Privileges
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4 text-sm text-gray-300">
          <p>Administrator accounts have access to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>All system features and settings</li>
            <li>User management capabilities</li>
            <li>Full data management and configuration</li>
            <li>System monitoring and maintenance</li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="flex space-x-4 w-full mt-4">
        <ActionButton 
          type="back" 
          onClick={() => handleCheckboxChange(false)} 
          className="w-full"
        >
          Switch to Standard
        </ActionButton>
      </div>
    </div>
  );
};

export default SecretKeyStep;
