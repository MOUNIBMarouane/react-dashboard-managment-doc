
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth/auth-service";
import { UserRegisterRequest } from "@/services/auth/auth-types";
import StepIndicator from "./signup/StepIndicator";
import StepContent from "./signup/StepContent";
import ActionButton from "./signup/ActionButton";
import VerificationStep from "./signup/VerificationStep";
import SuccessStep from "./signup/SuccessStep";

interface SignupFormProps {
  onBackToLogin: () => void;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  secretKey: string;
}

const SignupForm = ({ onBackToLogin }: SignupFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isAdminAccount, setIsAdminAccount] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretKey: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Handle specific errors
    if (name === 'username' && value.trim().length < 3 && value.trim().length > 0) {
      setErrors(prev => ({ ...prev, username: "Username must be at least 3 characters" }));
    } else if (name === 'username') {
      // Clear error for username if it meets the minimum length or is empty
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.username;
        return newErrors;
      });
    }
    
    // Email validation
    if (name === 'email' && value.trim() && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
    } else if (name === 'email') {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.email;
        return newErrors;
      });
    }
    
    // Password validation
    if (name === 'password') {
      const errors: {[key: string]: string} = {};
      if (value.length < 8 && value.length > 0) {
        errors.password = "Password must be at least 8 characters";
      } else if (value && !(/[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value))) {
        errors.password = "Password must include uppercase, lowercase, number and special character";
      }
      
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords don't match";
      } else {
        delete errors.confirmPassword;
      }
      
      setErrors(prev => ({ ...prev, ...errors }));
      
      if (!Object.keys(errors).length) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.password;
          return newErrors;
        });
      }
    }
    
    // Confirm password validation
    if (name === 'confirmPassword') {
      if (formData.password !== value) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords don't match" }));
      } else {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  };

  const handleAdminChange = (checked: boolean) => {
    setIsAdminAccount(checked);
    if (!checked) {
      setFormData(prev => ({ ...prev, secretKey: "" }));
    }
  };

  const validateStep = () => {
    const newErrors: {[key: string]: string} = {};
    
    switch(currentStep) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
        }
        if (!formData.username.trim()) {
          newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
          newErrors.username = "Username must be at least 3 characters";
        }
        break;
        
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          newErrors.email = "Please enter a valid email";
        }
        
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (!(/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) && /[0-9]/.test(formData.password) && /[^A-Za-z0-9]/.test(formData.password))) {
          newErrors.password = "Password must include uppercase, lowercase, number and special character";
        }
        
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords don't match";
        }
        break;
        
      case 3:
        // Secret key is required only if isAdminAccount is true
        if (isAdminAccount && !formData.secretKey.trim()) {
          newErrors.secretKey = "Admin secret key is required";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSignup();
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const registerData: UserRegisterRequest = {
        email: formData.email,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password
      };

      // If admin account, include admin secret in headers
      const options = isAdminAccount ? { 
        headers: { 'AdminSecret': formData.secretKey }
      } : undefined;

      await authService.register(registerData, options);
      
      setVerificationSent(true);
      toast({
        title: "Registration successful!",
        description: "Please check your email for the verification code.",
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "There was an error during signup. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      toast({
        variant: "destructive",
        title: "Verification code required",
        description: "Please enter the verification code from your email",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await authService.verifyEmail(formData.email, verificationCode);
      
      if (result) {
        setVerified(true);
        toast({
          title: "Verification successful",
          description: "Your account has been verified. You can now log in.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "The verification code is incorrect or has expired.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "There was an error during verification. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your email",
    });
  };

  const handleFinish = () => {
    onBackToLogin();
  };

  return (
    <motion.div
      key="signup"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-dashboard-accent">aennaki</h1>
        <div className="flex items-center mt-2">
          <button
            type="button"
            onClick={onBackToLogin}
            className="mr-2 p-1 rounded-full hover:bg-dashboard-blue-light text-gray-400"
          >
            <ChevronLeft size={16} />
          </button>
          <p className="text-gray-400">
            {!verificationSent ? "Create your account" : verified ? "All set!" : "Verify your email"}
          </p>
        </div>
      </div>

      {!verificationSent ? (
        <div className="space-y-6">
          <StepIndicator currentStep={currentStep} />
          
          <StepContent 
            currentStep={currentStep}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            isAdminAccount={isAdminAccount}
            handleAdminChange={handleAdminChange}
          />

          <ActionButton 
            isLoading={isLoading}
            currentStep={currentStep}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            isNextDisabled={isNextDisabled}
          />
        </div>
      ) : !verified ? (
        <VerificationStep 
          email={formData.email}
          verificationCode={verificationCode}
          isLoading={isLoading}
          handleVerifyCode={handleVerifyCode}
          handleResendCode={handleResendCode}
          setVerificationCode={setVerificationCode}
        />
      ) : (
        <SuccessStep 
          firstName={formData.firstName}
          handleFinish={handleFinish}
        />
      )}
    </motion.div>
  );
};

export default SignupForm;
