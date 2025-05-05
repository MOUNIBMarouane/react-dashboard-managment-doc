
import { toast as sonnerToast } from "sonner";

type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  icon?: React.ReactNode;
}

// Simple toast wrapper around sonner
export const toast = (options: ToastOptions) => {
  const { variant = "default", title, description, duration, icon } = options;
  
  switch (variant) {
    case "destructive":
      return sonnerToast.error(title, { description, duration, icon });
    case "success":
      return sonnerToast.success(title, { description, duration, icon });
    case "warning":
      return sonnerToast.warning(title, { description, duration, icon });
    case "info":
      return sonnerToast.info(title, { description, duration, icon });
    default:
      return sonnerToast(title, { description, duration, icon });
  }
};

export const useToast = () => {
  return { toast };
};
