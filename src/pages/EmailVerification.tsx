
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, AlertCircle, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { userValidationService } from "@/services/auth/user-validation-service";
import AuthBackground from "@/components/auth/AuthBackground";

const EmailVerification = () => {
  const {
    email
  } = useParams<{
    email: string;
  }>();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  const handleVerifyCode = async () => {
    if (!verificationCode.trim() || verificationCode.length !== 6) {
      setError("Please enter the 6-digit verification code from your email");
      return;
    }
    if (!email) {
      setError("Email address is missing");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await userValidationService.verifyEmail(email, verificationCode);
      if (result) {
        setVerified(true);
        toast({
          title: "Verification successful",
          description: "Your account has been verified. You can now log in."
        });
      } else {
        setError("Invalid verification code. Please try again or request a new code.");
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "The verification code is incorrect or has expired."
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || "There was an error during verification. Please try again.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Email address is missing");
      return;
    }
    setIsResending(true);
    setError(null);
    try {
      await userValidationService.resendVerificationCode(email);
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email"
      });
      setVerificationCode("");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to resend verification code. Please try again later.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Failed to resend code",
        description: errorMessage
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Auth Form Side */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md space-y-8">
          {!verified ? (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-dashboard-accent mb-8">Email Verification</h1>
                <div className="w-24 h-24 mx-auto mb-8 bg-dashboard-blue-light/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-dashboard-accent/30">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1]
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
                <p className="text-gray-300 mb-6 text-lg">
                  We've sent a verification code to <span className="text-dashboard-accent font-medium">{email}</span>
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
                      onChange={setVerificationCode}
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-4 mx-auto">
                          {slots.map((slot, index) => (
                            <InputOTPSlot 
                              key={index} 
                              index={index}
                              className={`
                                w-14 h-16 text-2xl font-bold rounded-lg transition-all 
                                ${verificationCode.length > index 
                                  ? "bg-dashboard-accent/20 border-dashboard-accent text-white shadow-lg shadow-dashboard-accent/10" 
                                  : "bg-dashboard-blue-light/50 backdrop-blur-sm border-dashboard-blue-light/70 text-white"}
                                ${verificationCode.length === index ? "ring-2 ring-dashboard-accent" : ""}
                              `}
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
                      onClick={handleResendCode}
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
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-8 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500/30">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-6">Verification Successful!</h2>
                <p className="text-gray-300 mb-8">
                  Your email has been verified successfully. You can now log in to your account.
                </p>
                <Button onClick={handleGoToLogin} className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 py-6 text-lg rounded-md shadow-lg shadow-dashboard-accent/20">
                  Go to Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Background Side */}
      <AuthBackground isSignup={false} title="Verify Your Email Address" description="Please check your inbox for the verification code we sent you" />
    </div>
  );
};

export default EmailVerification;
