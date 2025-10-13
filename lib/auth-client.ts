import { createAuthClient } from "better-auth/react";

// Use environment variable for production, fallback to localhost for development
// In the browser, we can detect the current origin
const getBaseURL = () => {
  // If we're in the browser and not on localhost, use the current origin
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    if (!origin.includes('localhost')) {
      return origin;
    }
  }
  // Otherwise use environment variable or localhost
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL()
});

export const { signIn, signUp, signOut, useSession } = authClient;
