import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isValidUrl = (url: string | undefined) => {
  try {
    if (!url) return false;
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export function formatDate(inputDate: string): string {
  if (!inputDate) return "N/V";
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options).replace(",", ".");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
