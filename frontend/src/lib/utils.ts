import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This function merges Tailwind classes intelligently
// Example: cn("bg-red-500", "bg-blue-500") -> "bg-blue-500" (Last one wins)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}