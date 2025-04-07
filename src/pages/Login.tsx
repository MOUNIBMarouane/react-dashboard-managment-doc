
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import SignupForm from "@/components/auth/SignupForm";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login Successful",
        description: "Welcome back to the dashboard",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
        <div className="w-full max-w-md space-y-6">
          {!isSignup ? (
            <motion.div 
              key="login"
              initial={{ x: isSignup ? -50 : 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-dashboard-accent">aennaki</h1>
                <p className="mt-2 text-gray-400">Sign in to your account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-200">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-dashboard-blue-light text-white border-dashboard-blue-light"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-gray-200">
                        Password
                      </label>
                      <a href="#" className="text-sm text-dashboard-accent hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-dashboard-blue-light text-white border-dashboard-blue-light"
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-dashboard-accent hover:bg-dashboard-accent-light"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </span>
                  )}
                </Button>
                
                <div className="text-center text-sm text-gray-400">
                  <p>
                    Don't have an account?{" "}
                    <button 
                      type="button" 
                      className="text-dashboard-accent hover:underline"
                      onClick={() => setIsSignup(true)}
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          ) : (
            <SignupForm onBackToLogin={() => setIsSignup(false)} />
          )}
        </div>
      </motion.div>
      
      {/* Image Side */}
      <motion.div 
        className="hidden lg:block flex-1 bg-dashboard-blue-dark relative overflow-hidden"
        animate={{ 
          backgroundImage: isSignup 
            ? "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80')" 
            : "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80')"
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(7, 13, 27, 0.7)"
        }}>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-md text-center">
              <motion.h2 
                className="text-4xl font-bold mb-6"
                key={isSignup ? "signup-title" : "login-title"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {isSignup 
                  ? "Join Our Business Management Platform" 
                  : "Welcome to Business Management Platform"}
              </motion.h2>
              <motion.p 
                className="text-xl opacity-90"
                key={isSignup ? "signup-desc" : "login-desc"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {isSignup 
                  ? "Create an account to start managing your business operations efficiently" 
                  : "Streamline your business operations with our comprehensive management solution"}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
