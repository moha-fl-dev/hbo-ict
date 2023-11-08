import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

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

export function formatDate(input: Date | string): string {
  const date = typeof input === 'string' ? new Date(input) : input;

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date input');
  }

  const pad = (num: number) => num.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export function formatDateWithRelativeTime(date: Date | string) {
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  // Format the date as 'dd-MMM-yy'
  const formattedDate = () => format(dateObject, 'dd-MMM-yy');

  // Format the date as 'x ago'
  const relativeTime = () =>
    formatDistanceToNow(dateObject, { addSuffix: true });

  // Format the date as 'HH:mm:ss'
  const formattedTime = () => format(dateObject, 'HH:mm:ss');

  // Format the date as 'dd-MMM-yy HH:mm:ss'
  const formattedDateTime = () => `${formattedDate()} ${formattedTime()}`;

  return {
    formattedDate,
    relativeTime,
    formattedTime,
    formattedDateTime,
  };
}

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    // Return the first two letters if there's only one part
    // cases where employee hasnt set a name
    return name.substring(0, 2).toUpperCase();
  }

  // return initials
  const initials = parts[0][0] + parts[parts.length - 1][0];
  return initials.toUpperCase();
}
