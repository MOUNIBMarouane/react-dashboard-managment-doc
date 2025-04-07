import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, RefreshCw } from "lucide-react";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const email = "marouan.mounib33@gmail.com"; // Replace with dynamic email from your route params

  // Simulate verification process
  const handleVerify = () => {
    if (verificationCode.join("").length !== 6) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate or show success message
    }, 1500);
  };

  // Simulate resend code process
  const handleResendCode = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      // Show toast or message about code resent
    }, 1500);
  };

  // Handle input changes with focus management
  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(0); // Only take the first character
    }
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace for better UX
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newCode = [...verificationCode];
        newCode[index - 1] = "";
        setVerificationCode(newCode);
      }
    }
  };

  // Handle paste functionality
  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setVerificationCode(newCode);
    }
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
            
            <div className="flex justify-center gap-2">
              {verificationCode.map((digit, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={false}
                  animate={{ 
                    scale: digit ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    id={`code-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-12 h-16 text-center text-xl md:text-2xl border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                      ${digit ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-gray-700 bg-gray-800/50 text-white'}
                      transition-all duration-300`}
                  />
                  {digit && (
                    <motion.div
                      className="absolute inset-0 rounded-md pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.5, 0],
                        boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 15px rgba(59, 130, 246, 0.7)", "0 0 0px rgba(59, 130, 246, 0)"],
                      }}
                      transition={{ duration: 1 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            
            <p className="text-center text-gray-400 text-sm mt-2">
              Enter the 6-digit code sent to your email
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleVerify}
            disabled={verificationCode.join("").length !== 6 || isLoading}
            className={`w-full py-3 rounded-md font-medium transition-all duration-300 disabled:opacity-50
              ${verificationCode.join("").length === 6 && !isLoading 
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600" 
                : "bg-blue-500/50 text-white/70"}`}
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
          </motion.button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">Didn't receive a code?</p>
            <button
              onClick={handleResendCode}
              disabled={isResending}
              className="mt-1 text-blue-400 hover:text-blue-300 flex items-center justify-center mx-auto"
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
            </button>
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