
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalInfoStep from "./PersonalInfoStep";
import AccountInfoStep from "./AccountInfoStep";
import SecretKeyStep from "./SecretKeyStep";
import { SignupData } from "../SignupForm";

interface StepContentProps {
  currentStep: number;
  formData: SignupData;
  errors: {[key: string]: string};
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StepContent = ({
  currentStep,
  formData,
  errors,
  handleChange
}: StepContentProps) => {
  const fadeVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <AnimatePresence mode="wait">
      {currentStep === 1 && (
        <motion.div
          key="step1"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
        >
          <PersonalInfoStep
            firstName={formData.firstName}
            lastName={formData.lastName}
            username={formData.username}
            errors={errors}
            handleChange={handleChange}
          />
        </motion.div>
      )}

      {currentStep === 2 && (
        <motion.div
          key="step2"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
        >
          <AccountInfoStep
            email={formData.email}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            errors={errors}
            handleChange={handleChange}
          />
        </motion.div>
      )}

      {currentStep === 3 && (
        <motion.div
          key="step3"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
        >
          <SecretKeyStep 
            secretKey={formData.secretKey}
            handleChange={handleChange}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StepContent;
