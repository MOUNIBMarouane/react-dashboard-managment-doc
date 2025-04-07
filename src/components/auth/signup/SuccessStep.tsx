
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessStepProps {
  firstName: string;
  handleFinish: () => void;
}

const SuccessStep = ({ firstName, handleFinish }: SuccessStepProps) => {
  return (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.2 
        }}
        className="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
      >
        <CheckCircle2 size={50} className="text-green-500" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-bold text-white mb-2">
          Welcome, {firstName}!
        </h2>
        <p className="text-gray-400 mb-8">
          Your account has been created successfully
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          type="button"
          onClick={handleFinish}
          className="w-full bg-dashboard-accent hover:bg-dashboard-accent-light"
        >
          Go to Login
        </Button>
      </motion.div>
    </div>
  );
};

export default SuccessStep;
