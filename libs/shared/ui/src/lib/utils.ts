import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn
 * @description
 * cn is a function that merges classnames with tailwindcss classes
 * @param inputs - The classnames to merge
 * @returns The merged classnames
 *
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
