
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@/types/user";
import { ChevronRight, ChevronLeft, Check, User as UserIcon } from "lucide-react";

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (newUser: User) => void;
}

// Step 1: Personal details schema
const personalDetailsSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

// Step 2: Account details schema
const accountDetailsSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

// Step 3: Role selection schema
const roleSelectionSchema = z.object({
  role: z.enum(["Admin", "User", "Editor"]),
});

type Step1FormData = z.infer<typeof personalDetailsSchema>;
type Step2FormData = z.infer<typeof accountDetailsSchema>;
type Step3FormData = z.infer<typeof roleSelectionSchema>;

const AddUserDialog: React.FC<AddUserDialogProps> = ({ isOpen, onOpenChange, onAddUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: "Admin" | "User" | "Editor";
  }>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "User",
  });

  // Form for step 1
  const step1Form = useForm<Step1FormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
    },
  });

  // Form for step 2
  const step2Form = useForm<Step2FormData>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.password,
    },
  });

  // Form for step 3
  const step3Form = useForm<Step3FormData>({
    resolver: zodResolver(roleSelectionSchema),
    defaultValues: {
      role: formData.role,
    },
  });

  const resetDialog = () => {
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: "User",
    });
    step1Form.reset();
    step2Form.reset();
    step3Form.reset();
  };

  const handleStep1Submit = (data: Step1FormData) => {
    setFormData(prev => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
    }));
    setStep(2);
  };

  const handleStep2Submit = (data: Step2FormData) => {
    setFormData(prev => ({
      ...prev,
      email: data.email,
      password: data.password,
    }));
    setStep(3);
  };

  const handleStep3Submit = (data: Step3FormData) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11), // Generate a random ID
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: data.role,
      status: "Active",
    };

    onAddUser(newUser);
    onOpenChange(false);
    resetDialog();
  };

  const handleDialogClose = () => {
    resetDialog();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[500px] bg-dashboard-blue-dark border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-dashboard-accent" />
            {step === 1 && "Step 1: Personal Details"}
            {step === 2 && "Step 2: Account Details"}
            {step === 3 && "Step 3: Role Selection"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-dashboard-accent" : "bg-white/20"}`}>
              {step > 1 ? <Check className="h-5 w-5" /> : "1"}
            </div>
            <div className="w-6 h-1 bg-white/20">
              <div className={`h-full ${step > 1 ? "bg-dashboard-accent" : "bg-white/20"}`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-dashboard-accent" : "bg-white/20"}`}>
              {step > 2 ? <Check className="h-5 w-5" /> : "2"}
            </div>
            <div className="w-6 h-1 bg-white/20">
              <div className={`h-full ${step > 2 ? "bg-dashboard-accent" : "bg-white/20"}`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-dashboard-accent" : "bg-white/20"}`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Personal Details Form */}
        {step === 1 && (
          <Form {...step1Form}>
            <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-4">
              <FormField
                control={step1Form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        placeholder="Enter first name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step1Form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        placeholder="Enter last name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step1Form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        placeholder="Enter unique username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="submit" className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {/* Step 2: Account Details Form */}
        {step === 2 && (
          <Form {...step2Form}>
            <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-4">
              <FormField
                control={step2Form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        placeholder="Enter email address"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        placeholder="Enter password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        placeholder="Confirm password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto order-2 sm:order-1"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto bg-dashboard-accent hover:bg-dashboard-accent/90 order-1 sm:order-2"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {/* Step 3: Role Selection Form */}
        {step === 3 && (
          <Form {...step3Form}>
            <form onSubmit={step3Form.handleSubmit(handleStep3Submit)} className="space-y-4">
              <FormField
                control={step3Form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select User Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-md hover:bg-white/10 cursor-pointer">
                          <RadioGroupItem value="User" id="user" className="border-white/30" />
                          <Label htmlFor="user" className="cursor-pointer flex-1">User</Label>
                          <span className="text-white/60 text-sm">Standard access to platform</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-md hover:bg-white/10 cursor-pointer">
                          <RadioGroupItem value="Editor" id="editor" className="border-white/30" />
                          <Label htmlFor="editor" className="cursor-pointer flex-1">Editor</Label>
                          <span className="text-white/60 text-sm">Can edit and publish content</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-md hover:bg-white/10 cursor-pointer">
                          <RadioGroupItem value="Admin" id="admin" className="border-white/30" />
                          <Label htmlFor="admin" className="cursor-pointer flex-1">Admin</Label>
                          <span className="text-white/60 text-sm">Full access to all features</span>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto order-2 sm:order-1"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto bg-dashboard-accent hover:bg-dashboard-accent/90 order-1 sm:order-2"
                >
                  Create User <Check className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
