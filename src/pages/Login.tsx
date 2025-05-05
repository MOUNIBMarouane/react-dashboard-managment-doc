
import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { CustomInput } from "@/components/ui/custom-input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  // Login form handlers would go here
  const handleLogin = () => {
    // Login logic would go here
  };

  return (
    <div className="login-container">
      <CustomInput
        id="username"
        type="text"
        placeholder="Username or Email"
        error={errorUsername}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="relative">
        <CustomInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          error={errorPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Login;
