
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    console.log("VerificationStep - Current code:", verificationCode);
  }, [verificationCode]);

  const handleResendClick = () => {
    setShowConfirmDialog(true);
  };

  const confirmResend = () => {
    setShowConfirmDialog(false);
    handleResendCode();
  };

  const handleOTPChange = (value: string) => {
    console.log("VerificationStep - OTP changing to:", value);
    setVerificationCode(value);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-8 bg-dashboard-blue-light/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-dashboard-accent/30">
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
            <Mail className="w-12 h-12 text-dashboard-accent" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Verification Needed</h2>
        <p className="text-gray-300 mb-6">
          We've sent a verification code to your email at <span className="text-dashboard-accent font-medium">{email}</span>
        </p>
      </div>
      
      {error && (
        <Alert className="bg-red-500/10 border-red-500/30 text-red-400">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-6">
        <div className="space-y-4">
          <label htmlFor="verificationCode" className="text-base font-medium text-gray-200 block text-center">
            Verification Code
          </label>
          <div className="flex justify-center">
            <InputOTP 
              maxLength={6} 
              value={verificationCode} 
              onChange={handleOTPChange}
              render={({ slots }) => (
                <InputOTPGroup className="gap-2">
                  {slots.map((slot, index) => (
                    <InputOTPSlot 
                      key={index} 
                      index={index}
                      className={verificationCode[index] ? "border-dashboard-accent bg-dashboard-accent/20 text-white" : ""}
                    />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          <p className="text-sm text-center text-gray-400 mt-4">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Button
          type="button"
          onClick={handleVerifyCode}
          className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 transition-all py-6 text-lg rounded-md shadow-lg shadow-dashboard-accent/20"
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
              className="text-dashboard-accent hover:text-dashboard-accent-light hover:underline flex items-center justify-center mx-auto mt-2"
              onClick={handleResendClick}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
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
                className="bg-dashboard-accent hover:bg-dashboard-accent/90"
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
