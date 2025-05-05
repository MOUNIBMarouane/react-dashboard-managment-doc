
// Import from the ui/toast
import { type ToastActionElement, type ToastProps } from "@/components/ui/toast";

// Re-export the types
export type { ToastActionElement, ToastProps };

// Create a useToast hook that manages toast state
export const useToast = () => {
  // Return functions to show different types of toasts
  return {
    toast: {
      // Default toast
      default: (props: ToastProps) => {
        // Implementation will be handled by the Toaster component
        window.dispatchEvent(
          new CustomEvent("toast", {
            detail: {
              ...props,
              variant: props.variant || "default"
            }
          })
        );
      },
      // Success toast
      success: (message: string) => {
        window.dispatchEvent(
          new CustomEvent("toast", {
            detail: {
              title: "Success",
              description: message,
              variant: "success"
            }
          })
        );
      },
      // Error toast
      error: (message: string) => {
        window.dispatchEvent(
          new CustomEvent("toast", {
            detail: {
              title: "Error",
              description: message,
              variant: "destructive"
            }
          })
        );
      },
      // Warning toast
      warning: (message: string) => {
        window.dispatchEvent(
          new CustomEvent("toast", {
            detail: {
              title: "Warning",
              description: message,
              variant: "warning"
            }
          })
        );
      },
      // Info toast
      info: (message: string) => {
        window.dispatchEvent(
          new CustomEvent("toast", {
            detail: {
              title: "Info",
              description: message,
              variant: "info"
            }
          })
        );
      }
    },
    // Function to dismiss a toast
    dismiss: (toastId?: string) => {
      window.dispatchEvent(
        new CustomEvent("toast-dismiss", {
          detail: { toastId }
        })
      );
    },
    // State functions to track toasts
    toasts: [] as ToastProps[]
  };
};

// Export a simplified toast function for direct usage
export const toast = {
  default: (props: ToastProps) => {
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: {
          ...props,
          variant: props.variant || "default"
        }
      })
    );
  },
  success: (message: string) => {
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: {
          title: "Success",
          description: message,
          variant: "success"
        }
      })
    );
  },
  error: (message: string) => {
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: {
          title: "Error",
          description: message,
          variant: "destructive"
        }
      })
    );
  },
  warning: (message: string) => {
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: {
          title: "Warning",
          description: message,
          variant: "warning"
        }
      })
    );
  },
  info: (message: string) => {
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: {
          title: "Info",
          description: message,
          variant: "info"
        }
      })
    );
  }
};
