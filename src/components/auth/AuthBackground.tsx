
import React from "react";
import { motion } from "framer-motion";

interface AuthBackgroundProps {
  isSignup: boolean;
  title: string;
  description: string;
}

const AuthBackground: React.FC<AuthBackgroundProps> = ({ 
  isSignup, 
  title, 
  description 
}) => {
  return (
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
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {title}
            </motion.h2>
            <motion.p 
              className="text-xl opacity-90"
              key={description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthBackground;
