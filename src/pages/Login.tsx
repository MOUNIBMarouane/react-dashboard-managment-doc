
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "@/services/auth/auth-service";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import AuthBackground from "@/components/auth/AuthBackground";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page the user was trying to access
  const from = location.state?.from?.pathname || "/";

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          // Verify token is still valid
          await authService.getUserInfo();
          console.log("User is already authenticated, redirecting to dashboard");
          // Force redirect to dashboard with replace: true to prevent back navigation to login
          navigate(from, { replace: true });
        } catch (error) {
          console.error("Token validation failed:", error);
          // If token validation fails, clear it and stay on login page
          authService.logout();
        } finally {
          setIsCheckingAuth(false);
        }
      } else {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [navigate, from]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dashboard-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Auth Form Side */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md space-y-6">
          {!isSignup ? (
            <motion.div 
              key="login"
              initial={{ x: isSignup ? -50 : 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoginForm onSwitchToSignup={() => setIsSignup(true)} />
            </motion.div>
          ) : (
            <SignupForm onBackToLogin={() => setIsSignup(false)} />
          )}
        </div>
      </motion.div>
      
      {/* Background Side */}
      <AuthBackground 
        isSignup={isSignup}
        title={isSignup 
          ? "Join Our Business Management Platform" 
          : "Welcome to Business Management Platform"
        }
        description={isSignup 
          ? "Create an account to start managing your business operations efficiently" 
          : "Streamline your business operations with our comprehensive management solution"
        }
      />
    </div>
  );
};

export default Login;
