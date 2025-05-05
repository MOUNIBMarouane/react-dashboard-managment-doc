
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff, ShieldCheck, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/context/SettingsContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { theme } = useSettings();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // This would normally communicate with your auth service
      await login({ emailOrUsername: email, password });
      // Redirect will happen in AuthContext after successful login
    } catch (error) {
      setErrorMessage(
        "Cannot connect to server. Please check your network connection or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 via-blue-50/70 to-white' : 'bg-gray-950'} flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8`}>
      <div className="w-full max-w-5xl flex flex-col md:flex-row">
        {/* Left side - Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8"
        >
          <Card className="border-0 shadow-light-xl dark:shadow-xl dark:border-gray-800 dark:bg-gray-900/90 dark:backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  D
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              {errorMessage && (
                <div
                  className={`mb-5 p-3 rounded-lg text-sm flex items-center gap-2 ${
                    theme === "dark"
                      ? "bg-red-900/30 border border-red-800 text-red-200"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      theme === "dark" ? "bg-red-800" : "bg-red-100"
                    }`}
                  >
                    <ShieldCheck
                      className={`h-4 w-4 ${
                        theme === "dark" ? "text-red-200" : "text-red-600"
                      }`}
                    />
                  </div>
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                  >
                    Email or username
                  </label>
                  <div className="relative">
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    >
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Enter your email or username"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      className="text-sm font-medium"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className={`text-xs ${
                        theme === "dark"
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-500"
                      }`}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    >
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Sign In
                      <LogIn className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter>
              <p className="text-center text-sm w-full">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className={
                    theme === "dark"
                      ? "text-blue-400 hover:text-blue-300 font-medium"
                      : "text-blue-600 hover:text-blue-500 font-medium"
                  }
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Right side - Info & Features */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 md:pl-8"
        >
          <div className="text-center md:text-left mb-8">
            <h1
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome to Business
              <br />
              Management Platform
            </h1>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Streamline your business operations with our comprehensive
              management solution
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className={`rounded-xl p-4 ${
                theme === "dark" ? "bg-gray-800/50 border border-gray-700" : "bg-white shadow-light-md border border-gray-100"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-md">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Secure Authentication
                  </h3>
                  <p
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  >
                    Enterprise-grade security for your data
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className={`rounded-xl p-4 ${
                theme === "dark" ? "bg-gray-800/50 border border-gray-700" : "bg-white shadow-light-md border border-gray-100"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-md">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Powerful Dashboard
                  </h3>
                  <p
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  >
                    Manage documents and workflows efficiently
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className={`rounded-xl p-4 ${
                theme === "dark" ? "bg-gray-800/50 border border-gray-700" : "bg-white shadow-light-md border border-gray-100"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <div className="bg-gradient-to-br from-green-600 to-green-700 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-md">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Advanced Workflows
                  </h3>
                  <p
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  >
                    Create custom document workflows and circuits
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
