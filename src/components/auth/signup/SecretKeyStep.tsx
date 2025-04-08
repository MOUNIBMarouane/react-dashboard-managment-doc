
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Key, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import ActionButton from "./ActionButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SecretKeyStepProps {
  adminSecret?: string;
  secretKey: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAdminAccount: boolean;
  handleCheckboxChange: (checked: boolean) => void;
  handleNext?: () => void;
  handlePrev?: () => void;
  errors: {[key: string]: string};
}

const SecretKeyStep = ({
  secretKey,
  handleChange,
  isAdminAccount,
  handleCheckboxChange,
  handleNext,
  handlePrev,
  errors
}: SecretKeyStepProps) => {
  const [showSecret, setShowSecret] = useState(false);

  const toggleShowSecret = () => {
    setShowSecret(!showSecret);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-8 bg-dashboard-blue-light/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-dashboard-accent/30">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1
            }}
          >
            <Key className={`w-12 h-12 ${secretKey ? 'text-dashboard-accent' : 'text-dashboard-accent/70'}`} />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Admin Secret</h2>
        <p className="text-gray-300">
          Enter your admin secret key to complete the registration
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="isAdmin" 
            checked={isAdminAccount}
            onCheckedChange={handleCheckboxChange}
            className="mt-1"
          />
          <Label 
            htmlFor="isAdmin" 
            className="text-sm font-medium text-gray-300 cursor-pointer"
          >
            Register as an admin (requires secret key)
          </Label>
        </div>
        
        {isAdminAccount && (
          <div className="space-y-2">
            <label htmlFor="secretKey" className="text-sm font-medium text-gray-300 block mb-2">
              Admin Secret Key
            </label>
            <div className="relative">
              <Input
                id="secretKey"
                name="secretKey"
                type={showSecret ? "text" : "password"}
                value={secretKey}
                onChange={handleChange}
                className="bg-dashboard-blue-light/50 border-dashboard-blue-light text-white pr-10"
                placeholder="Enter your admin secret key"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={toggleShowSecret}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.secretKey && (
              <p className="text-red-500 text-xs mt-1">{errors.secretKey}</p>
            )}
          </div>
        )}
        
        {handleNext && handlePrev && (
          <div className="pt-4">
            <ActionButton
              type="next"
              onClick={handleNext}
              disabled={isAdminAccount && !secretKey}
            >
              Continue
            </ActionButton>
            <ActionButton
              type="back"
              onClick={handlePrev}
              className="mt-2"
            >
              Back
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretKeyStep;
