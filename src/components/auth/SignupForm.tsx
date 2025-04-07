import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth/auth-service";
import { UserRegisterRequest } from "@/types/api-types";
import { userValidationService } from "@/services/auth/user-validation-service";
import StepIndicator from "./signup/StepIndicator";
import StepContent from "./signup/StepContent";
import ActionButton from "./signup/ActionButton";
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
  const [isResending, setIsResending] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isAdminAccount, setIsAdminAccount] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
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

  useEffect(() => {
    const validateUsername = async () => {
      if (formData.username && formData.username.length >= 3) {
        try {
          const isValid = await userValidationService.validateUsername(formData.username);
          setIsUsernameValid(isValid);
          if (!isValid) {
            setErrors(prev => ({ ...prev, username: "Username is already taken" }));
          } else {
            setErrors(prev => {
              const newErrors = {...prev};
              delete newErrors.username;
              return newErrors;
            });
          }
        } catch (error) {
          setIsUsernameValid(false);
        }
      } else {
        setIsUsernameValid(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      if (formData.username && formData.username.length >= 3) {
        validateUsername();
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [formData.username]);
  
  useEffect(() => {
    const validateEmail = async () => {
      if (formData.email && formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        try {
          const isValid = await userValidationService.validateEmail(formData.email);
          setIsEmailValid(isValid);
          if (!isValid) {
            setErrors(prev => ({ ...prev, email: "Email is already taken" }));
          } else {
            setErrors(prev => {
              const newErrors = {...prev};
              delete newErrors.email;
              return newErrors;
            });
          }
        } catch (error) {
          setIsEmailValid(false);
        }
      } else {
        setIsEmailValid(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      if (formData.email && formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        validateEmail();
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  const checkPasswordRequirements = (password: string) => {
    return (
      password.length >= 8 && 
      /[A-Z]/.test(password) && 
      /[a-z]/.test(password) && 
      /[0-9]/.test(password) && 
      /[^A-Za-z0-9]/.test(password)
    );
  };

  useEffect(() => {
    switch(currentStep) {
      case 1:
        setIsNextDisabled(
          !formData.firstName.trim() ||
          !formData.lastName.trim() ||
          formData.username.length < 3 ||
          !isUsernameValid ||
          Object.keys(errors).some(key => ['firstName', 'lastName', 'username'].includes(key))
        );
        break;
      case 2:
        const passwordRequirementsMet = checkPasswordRequirements(formData.password);
        const passwordsMatch = formData.password === formData.confirmPassword;
        
        setIsNextDisabled(
          !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
          !isEmailValid ||
          !passwordRequirementsMet ||
          !passwordsMatch ||
          !formData.confirmPassword ||
          Object.keys(errors).some(key => ['email', 'password', 'confirmPassword'].includes(key))
        );
        break;
      case 3:
        setIsNextDisabled(
          isAdminAccount && !formData.secretKey.trim()
        );
        break;
      default:
        setIsNextDisabled(false);
    }
  }, [currentStep, formData, errors, isAdminAccount, isUsernameValid, isEmailValid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'username') {
      if (value.trim().length < 3 && value.trim().length > 0) {
        setErrors(prev => ({ ...prev, username: "Username must be at least 3 characters" }));
        setIsUsernameValid(false);
      } else if (value.trim().length >= 3) {
        setErrors(prev => {
          const newErrors = {...prev};
          if (newErrors.username === "Username must be at least 3 characters") {
            delete newErrors.username;
          }
          return newErrors;
        });
      }
    }
    
    if (name === 'email') {
      if (value.trim() && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
        setIsEmailValid(false);
      } else if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setErrors(prev => {
          const newErrors = {...prev};
          if (newErrors.email === "Please enter a valid email address") {
            delete newErrors.email;
          }
          return newErrors;
        });
      }
    }
    
    if (name === 'password') {
      const newErrors: {[key: string]: string} = {};
      
      if (value.length > 0 && value.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (value && !checkPasswordRequirements(value)) {
        newErrors.password = "Password must include uppercase, lowercase, number and special character";
      }
      
      if (value && checkPasswordRequirements(value)) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.password;
          return newErrors;
        });
      } else {
        setErrors(prev => ({ ...prev, ...newErrors }));
      }
      
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords don't match" }));
      } else if (formData.confirmPassword && value === formData.confirmPassword) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
    
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
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.secretKey;
        return newErrors;
      });
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
        } else if (!isUsernameValid) {
          newErrors.username = "Username is already taken or invalid";
        }
        break;
        
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          newErrors.email = "Please enter a valid email";
        } else if (!isEmailValid) {
          newErrors.email = "Email is already taken or invalid";
        }
        
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (!checkPasswordRequirements(formData.password)) {
          newErrors.password = "Password must include uppercase, lowercase, number and special character";
        }
        
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          if (checkPasswordRequirements(formData.password)) {
            newErrors.confirmPassword = "Passwords don't match";
          }
        }
        break;
        
      case 3:
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

      const options = isAdminAccount ? { 
        headers: { 'AdminSecret': formData.secretKey }
      } : undefined;

      await authService.register(registerData, options);
      
      setVerificationSent(true);
      setVerificationError(null);
      toast({
        title: "Registration successful!",
        description: "Please check your email for the verification code.",
      });
      
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed. Please try again.";
      
      if (errorMessage.toLowerCase().includes("invalid admin secret") || 
          errorMessage.includes("401") ||
          errorMessage.toLowerCase().includes("unauthorized")) {
        setErrors(prev => ({ 
          ...prev, 
          secretKey: "Invalid admin secret key" 
        }));
        toast({
          variant: "destructive",
          title: "Invalid Admin Secret",
          description: "The admin secret key you provided is incorrect.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim() || verificationCode.length !== 6) {
      setVerificationError("Please enter the 6-digit verification code from your email");
      return;
    }
    
    setIsLoading(true);
    setVerificationError(null);
    try {
      const result = await userValidationService.verifyEmail(formData.email, verificationCode);
      
      if (result) {
        setVerified(true);
        toast({
          title: "Verification successful",
          description: "Your account has been verified. You can now log in.",
        });
      } else {
        setVerificationError("Invalid verification code. Please try again or request a new code.");
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "The verification code is incorrect or has expired.",
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || "There was an error during verification. Please try again.";
      setVerificationError(errorMessage);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setVerificationError(null);
    
    try {
      await userValidationService.resendVerificationCode(formData.email);
      
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email",
      });
      
      setVerificationCode("");
      
    } catch (error: any) {
      const errorMessage = error.message || "Failed to resend verification code. Please try again later.";
      setVerificationError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Failed to resend code",
        description: errorMessage,
      });
    } finally {
      setIsResending(false);
    }
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

      {!verified ? (
        <div className="space-y-6">
          {!verificationSent && <StepIndicator currentStep={currentStep} />}
          
          <StepContent 
            currentStep={currentStep}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            isAdminAccount={isAdminAccount}
            handleAdminChange={handleAdminChange}
            verificationStep={verificationSent ? {
              verificationCode,
              isLoading,
              isResending,
              error: verificationError,
              handleVerifyCode,
              handleResendCode,
              setVerificationCode
            } : undefined}
            verificationSent={verificationSent}
          />

          {!verificationSent && (
            <ActionButton 
              isLoading={isLoading}
              currentStep={currentStep}
              onNext={handleNextStep}
              onBack={handlePreviousStep}
              isNextDisabled={isNextDisabled}
            />
          )}
        </div>
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
