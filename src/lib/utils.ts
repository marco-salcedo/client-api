import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Simulates a fetch API call with a 1-second delay
 * @param url - The URL to make the request to
 * @param method - The HTTP method to use (GET, POST, etc.)
 * @param body - Optional request body
 * @returns A Promise that resolves to a mock Response object
 * @throws Error when the URL includes "error"
 */
export const mockFetch = async (url: string, method: string, body?: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (url.includes("error")) {
    throw new Error("API Error");
  }

  return {
    ok: true,
    status: 200,
    json: async () => ({ message: "Success", data: { url, method, body } }),
  };
};
