
import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VerificationStepProps {
  email: string;
  verificationCode: string;
  isLoading: boolean;
  handleVerifyCode: () => void;
  handleResendCode: () => void;
  setVerificationCode: (code: string) => void;
}

const VerificationStep = ({
  email,
  verificationCode,
  isLoading,
  handleVerifyCode,
  handleResendCode,
  setVerificationCode
}: VerificationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-dashboard-blue-light rounded-full flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Mail className="w-10 h-10 text-dashboard-accent" />
          </motion.div>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Verification Needed</h2>
        <p className="text-gray-400 mb-6">
          We've sent a verification code to your email at {email}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="verificationCode" className="text-sm font-medium text-gray-200">
            Verification Code
          </label>
          <Input
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="bg-dashboard-blue-light text-white border-dashboard-blue-light text-center text-lg tracking-widest"
            maxLength={6}
          />
        </div>

        <Button
          type="button"
          onClick={handleVerifyCode}
          className="w-full bg-dashboard-accent hover:bg-dashboard-accent-light"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Verify Email
            </span>
          )}
        </Button>
        
        <div className="text-center text-sm text-gray-400">
          <p>
            Didn't receive a code?{" "}
            <button 
              type="button" 
              className="text-dashboard-accent hover:underline"
              onClick={handleResendCode}
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationStep;
