
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, RefreshCw } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { userValidationService } from "@/services/auth/user-validation-service";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current verification code:", verificationCode);
  }, [verificationCode]);

  // Handle verification submission
  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit code sent to your email",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Make API call to verify the email with verification code
      const success = await userValidationService.verifyEmail(email || "", verificationCode);
      
      if (success) {
        toast({
          title: "Success!",
          description: "Your email has been verified successfully",
        });
        
        // Navigate to login page after successful verification
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast({
        title: "Verification failed",
        description: error.message || "Failed to verify email. Please check your code and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email address is missing",
        variant: "destructive"
      });
      return;
    }
    
    setIsResending(true);
    try {
      // Call the resend-code endpoint using the validation service
      const success = await userValidationService.resendVerificationCode(email);
      
      if (success) {
        toast({
          title: "Code resent",
          description: "A new verification code has been sent to your email"
        });
        // Reset the verification code field
        setVerificationCode("");
      }
    } catch (error: any) {
      console.error("Resend code error:", error);
      toast({
        title: "Failed to resend code",
        description: error.message || "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsResending(false);
    }
  };

  // Handle OTP input change
  const handleOTPChange = (value: string) => {
    console.log("OTP changing to:", value);
    setVerificationCode(value);
  };

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-indigo-950 to-gray-900">
      {/* Left side - Verification form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">Email Verification</h1>
          
          <div className="flex justify-center mb-8">
            <motion.div 
              className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: ["0 0 0 rgba(59, 130, 246, 0.4)", "0 0 20px rgba(59, 130, 246, 0.6)", "0 0 0 rgba(59, 130, 246, 0.4)"]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Mail className="h-12 w-12 text-blue-400" />
            </motion.div>
          </div>
          
          <p className="text-center text-white mb-2">We've sent a verification code to</p>
          <p className="text-center text-blue-400 font-medium mb-8">{email}</p>
          
          <div className="mb-8">
            <div className="text-white mb-4 text-center font-medium">Verification Code</div>
            
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
                        className={verificationCode[index] ? "border-blue-500 bg-blue-500/20 text-white" : ""}
                      />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            
            <p className="text-center text-gray-400 text-sm mt-2">
              Enter the 6-digit code sent to your email
            </p>
          </div>
          
          <Button
            onClick={handleVerify}
            disabled={verificationCode.length !== 6 || isLoading}
            className="w-full py-6 h-auto text-base transition-all duration-300 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : "Verify Email"}
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">Didn't receive a code?</p>
            <Button
              variant="ghost"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-blue-400 hover:text-blue-300 flex items-center justify-center mx-auto mt-1"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>Resend Code</span>
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Right side - Background image & message (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop')] bg-cover bg-center">
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-indigo-950/90 to-gray-900/30">
          <div className="max-w-md p-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Verify Your Email Address
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-xl text-white/80"
            >
              Please check your inbox for the verification code we sent you
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
