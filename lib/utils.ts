/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using `clsx` and resolves conflicts using `tailwind-merge`.
 * Useful for managing conditional class names with Tailwind CSS.
 *
 * @param inputs - A list of class names or class name conditions.
 * @returns A merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a value to JSON and parses it back, effectively creating a deep copy.
 * Note: This method does not preserve functions or undefined values.
 *
 * @param value - The value to deep copy.
 * @returns A new deep-copied object or value.
 */
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

/**
 * Converts a `File` object into a temporary URL for file preview or processing.
 *
 * @param file - The file object to convert.
 * @returns A string representing the temporary URL for the file.
 */
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

/**
 * Formats a given date string into different formats such as full date-time,
 * day-specific date, date-only, and time-only. Allows specification of a timezone.
 *
 * @param dateString - The date to format, as a string or Date object.
 * @param timeZone - The timezone to use for formatting (default is the user's local timezone).
 * @returns An object containing formatted strings for various date-time formats.
 */
export const formatDateTime = (
  dateString: Date | string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // Abbreviated month name (e.g., 'Oct')
    day: 'numeric', // Numeric day of the month (e.g., '25')
    year: 'numeric', // Numeric year (e.g., '2023')
    hour: 'numeric', // Numeric hour (e.g., '8')
    minute: 'numeric', // Numeric minute (e.g., '30')
    hour12: true, // 12-hour clock format
    timeZone: timeZone,
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // Abbreviated weekday name (e.g., 'Mon')
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timeZone,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
    timeZone: timeZone,
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: timeZone,
  };

  return {
    dateTime: new Date(dateString).toLocaleString('en-US', dateTimeOptions),
    dateDay: new Date(dateString).toLocaleString('en-US', dateDayOptions),
    dateOnly: new Date(dateString).toLocaleString('en-US', dateOptions),
    timeOnly: new Date(dateString).toLocaleString('en-US', timeOptions),
  };
};

/**
 * Encrypts a string by encoding it to Base64.
 * This is a simple and reversible operation, not secure for sensitive data.
 *
 * @param passkey - The string to encrypt.
 * @returns The Base64-encoded string.
 */
export function encryptKey(passkey: string) {
  return btoa(passkey);
}

/**
 * Decrypts a Base64-encoded string back to its original form.
 * This is a simple and reversible operation.
 *
 * @param passkey - The Base64-encoded string to decrypt.
 * @returns The original decoded string.
 */
export function decryptKey(passkey: string) {
  return atob(passkey);
}
