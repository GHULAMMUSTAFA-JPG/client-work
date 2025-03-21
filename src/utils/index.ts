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

export function formatDate(
  inputDate: string,
  withTime: boolean = false
): string {
  if (!inputDate) return "N/V";
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  let formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(",", ".");

  if (withTime) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    formattedDate += ` at ${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return formattedDate;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isImageUrl = (url: string) => {
  return (
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) ||
    url.includes("/image") ||
    url.includes("/images") ||
    url.startsWith("data:image/")
  );
};

export const isValidLinkedInUrl = (url: string) => {
  if (!url.trim()) return false;

  try {
    const urlObj = new URL(url);

    if (!urlObj.hostname.includes("linkedin.com")) return false;
    return (
      url.includes("linkedin.com/posts/") ||
      url.includes("linkedin.com/feed/update/") ||
      url.includes("linkedin.com/pulse/")
    );
  } catch (e) {
    return false;
  }
};

export const isValidEmbedCode = (code: string) => {
  if (!code.trim()) return false;
  return (
    code.includes("<iframe") &&
    code.includes("linkedin.com/embed") &&
    code.includes("</iframe>")
  );
};
