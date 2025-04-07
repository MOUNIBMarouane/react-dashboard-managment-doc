
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VerificationStepProps {
  email: string;
  verificationCode: string;
  isLoading: boolean;
  isResending: boolean;
  error: string | null;
  handleVerifyCode: () => void;
  handleResendCode: () => void;
  setVerificationCode: (code: string) => void;
}

const VerificationStep = ({
  email,
  verificationCode,
  isLoading,
  isResending,
  error,
  handleVerifyCode,
  handleResendCode,
  setVerificationCode
}: VerificationStepProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleResendClick = () => {
    setShowConfirmDialog(true);
  };

  const confirmResend = () => {
    setShowConfirmDialog(false);
    handleResendCode();
  };

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
          We've sent a verification code to your email at <span className="text-dashboard-accent">{email}</span>
        </p>
      </div>
      
      {error && (
        <Alert className="bg-red-500/10 border-red-500/30 text-red-500">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="verificationCode" className="text-sm font-medium text-gray-200">
            Verification Code
          </label>
          <div className="flex justify-center">
            <InputOTP 
              maxLength={6} 
              value={verificationCode} 
              onChange={setVerificationCode}
              render={({ slots }) => (
                <InputOTPGroup className="gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot 
                      key={i} 
                      index={i}
                      className={`w-10 h-12 text-lg font-bold bg-dashboard-blue-light border-dashboard-blue-light text-white ${
                        verificationCode.length > i ? "border-dashboard-accent" : ""
                      }`}
                    />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Button
          type="button"
          onClick={handleVerifyCode}
          className="w-full bg-dashboard-accent hover:bg-dashboard-accent-light"
          disabled={isLoading || verificationCode.length !== 6}
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
            <span>Verify Email</span>
          )}
        </Button>
        
        <div className="text-center text-sm text-gray-400">
          <p>
            Didn't receive a code?{" "}
            <button 
              type="button" 
              className="text-dashboard-accent hover:underline flex items-center justify-center mx-auto mt-1"
              onClick={handleResendClick}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Resend Code
                </>
              )}
            </button>
          </p>
        </div>
      </div>

      {/* Confirmation Dialog for Resending Code */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-dashboard-blue border-dashboard-blue-light">
          <DialogHeader>
            <DialogTitle className="text-white">Resend Verification Code?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <p className="text-gray-300">
              Are you sure you want to resend the verification code to <span className="text-dashboard-accent">{email}</span>?
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmResend}
                className="bg-dashboard-accent hover:bg-dashboard-accent-light"
                disabled={isResending}
              >
                {isResending ? (
                  <span className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Resend Code"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerificationStep;
