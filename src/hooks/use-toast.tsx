
import * as React from "react";
import { useToast as useShadcnToast } from "@/components/ui/use-toast";
import { toast as sonnerToast } from "sonner";

type ToastProps = React.ComponentPropsWithoutRef<typeof useShadcnToast>;

// Combine toast functionality from shadcn/ui and sonner
export function useToast() {
  const shadcnToast = useShadcnToast();

  // Enhanced toast function that works with both systems
  const toast = React.useMemo(
    () => ({
      ...shadcnToast,
      // Override the default toast with our enhanced version
      toast: (props: ToastProps["toast"]) => {
        // Use sonner for specific variants
        if (props.variant === "destructive") {
          return sonnerToast.error(props.title, {
            description: props.description,
            id: props.id,
            duration: props.duration,
          });
        }
        
        if (props.variant === "success") {
          return sonnerToast.success(props.title, {
            description: props.description,
            id: props.id,
            duration: props.duration,
          });
        }
        
        if (props.variant === "info") {
          return sonnerToast.info(props.title, {
            description: props.description,
            id: props.id, 
            duration: props.duration,
          });
        }
        
        // Use shadcn toast for other variants
        return shadcnToast.toast(props);
      },
      // Specialized toast methods
      error: (title: string, description?: string) => {
        sonnerToast.error(title, { description });
      },
      success: (title: string, description?: string) => {
        sonnerToast.success(title, { description });
      },
      info: (title: string, description?: string) => {
        sonnerToast.info(title, { description });
      },
      warning: (title: string, description?: string) => {
        sonnerToast.warning(title, { description });
      },
    }),
    [shadcnToast]
  );

  return toast;
}

// Direct toast function for simpler imports
export const toast = {
  error: (title: string, description?: string | { description?: string }) => {
    if (typeof description === "string") {
      sonnerToast.error(title, { description });
    } else {
      sonnerToast.error(title, description);
    }
  },
  success: (title: string, description?: string | { description?: string }) => {
    if (typeof description === "string") {
      sonnerToast.success(title, { description });
    } else {
      sonnerToast.success(title, description);
    }
  },
  info: (title: string, description?: string | { description?: string }) => {
    if (typeof description === "string") {
      sonnerToast.info(title, { description });
    } else {
      sonnerToast.info(title, description);
    }
  },
  warning: (title: string, description?: string | { description?: string }) => {
    if (typeof description === "string") {
      sonnerToast.warning(title, { description });
    } else {
      sonnerToast.warning(title, description);
    }
  },
  custom: sonnerToast,
};
