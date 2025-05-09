
export type UserType = 'personal' | 'company';

export interface StepValidation {
  isLoading: boolean;
  errors: {
    username?: string;
    email?: string;
    registration?: string;
    verification?: string;
  };
}

// Add the SetStepValidation type
export type SetStepValidation = React.Dispatch<React.SetStateAction<StepValidation>>;

export interface FormData {
  userType: UserType;
  firstName: string;
  lastName: string;
  cin?: string;
  companyName?: string;
  companyRC?: string;
  companyPhone?: string;
  companyAddress?: string;
  companyCity?: string;
  companyCountry?: string;
  companyEmail?: string;
  companyWebsite?: string;
  personalPhone?: string;
  personalAddress?: string; 
  city?: string;
  country?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  adminSecretKey: string;
  validationError?: string;
  // Add missing fields needed by components
  jobTitle?: string;
  address?: string;
  zipCode?: string;
}

export const initialFormData: FormData = {
  userType: 'personal',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  adminSecretKey: '',
  validationError: '',
  // Initialize added fields
  jobTitle: '',
  address: '',
  zipCode: '',
  city: '',
  country: '',
  companyName: '',
  companyRC: '',
  companyPhone: '',
  companyAddress: '',
  companyCity: '',
  companyCountry: '',
  companyEmail: '',
  companyWebsite: '',
  personalPhone: '',
  personalAddress: '',
  cin: '',
};

// Add the MultiStepFormContextType
export interface MultiStepFormContextType {
  currentStep: number;
  formData: FormData;
  stepValidation: StepValidation;
  nextStep: () => void;
  prevStep: () => void;
  setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<FormData>) => void;
  validateUsername: () => Promise<boolean>;
  validateEmail: () => Promise<boolean>;
  registerUser: () => Promise<boolean>;
  verifyEmail: (code: string) => Promise<boolean>;
  resetForm: () => void;
}
