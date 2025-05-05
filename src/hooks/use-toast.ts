
import { useToast as useToastOriginal } from "@/components/ui/toast";

export const useToast = useToastOriginal;

export const toast = {
  ...useToastOriginal().toast,
  success: (message: string) => {
    return useToastOriginal().toast({
      title: "Success",
      description: message,
      variant: "success",
    });
  },
  error: (message: string) => {
    return useToastOriginal().toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  },
  warning: (message: string) => {
    return useToastOriginal().toast({
      title: "Warning",
      description: message,
      variant: "warning",
    });
  },
  info: (message: string) => {
    return useToastOriginal().toast({
      title: "Info",
      description: message,
      variant: "info",
    });
  },
};
