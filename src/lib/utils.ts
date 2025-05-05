
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, formatStr: string = "PP"): string {
  if (!date) {
    return "N/A";
  }
  
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return "Invalid Date";
    }
    
    return format(dateObj, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Error";
  }
}
