import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "dark:border-transparent dark:bg-primary dark:text-primary-foreground dark:shadow hover:dark:bg-primary/80 border-blue-200 bg-blue-100 text-blue-800 shadow-sm hover:bg-blue-200",
        secondary:
          "dark:border-transparent dark:bg-[#1a2765] dark:text-white dark:shadow hover:dark:bg-[#1a2765]/80 border-gray-200 bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-200",
        destructive:
          "dark:border-transparent dark:bg-red-900/30 dark:text-red-400 dark:shadow hover:dark:bg-red-900/20 border-red-200 bg-red-100 text-red-800 shadow-sm hover:bg-red-200",
        success:
          "dark:border-transparent dark:bg-green-900/30 dark:text-green-400 dark:shadow hover:dark:bg-green-900/20 border-green-200 bg-green-100 text-green-800 shadow-sm hover:bg-green-200",
        outline:
          "dark:text-foreground dark:border-blue-900/60 dark:bg-blue-900/20 border-blue-300 text-blue-800 bg-transparent",
        warning:
          "dark:border-transparent dark:bg-yellow-900/30 dark:text-yellow-400 dark:shadow hover:dark:bg-yellow-900/20 border-yellow-200 bg-yellow-100 text-yellow-800 shadow-sm hover:bg-yellow-200",
        info: "dark:border-transparent dark:bg-cyan-900/30 dark:text-cyan-400 dark:shadow hover:dark:bg-cyan-900/20 border-cyan-200 bg-cyan-100 text-cyan-800 shadow-sm hover:bg-cyan-200",
        pending:
          "dark:border-transparent dark:bg-purple-900/30 dark:text-purple-400 dark:shadow hover:dark:bg-purple-900/20 border-purple-200 bg-purple-100 text-purple-800 shadow-sm hover:bg-purple-200",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-1.5 py-0.25 text-[10px]",
        lg: "px-3 py-0.75 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
