import axios from "axios";
import { signIn } from "next-auth/react";

/**
 * Registers a new user and auto-signs them in if successful.
 * @param email - User's email
 * @param password - User's password
 * @returns Registered user data or null on error
 */
export const registerUser = async (email: string, password: string,name:string): Promise<object | null> => {
  try {
    const res = await axios.post("/api/signin", { email, password ,name});

    if (res.data?.token) {
      await signIn("credentials", { email, password, redirect: false }); // Auto login after signup
    }

    return res.data;
  } catch (error: any) {
    console.error("Registration error:", error?.response?.data || error.message);
    return null;
  }
};

/**
 * Logs in manually using NextAuth's credentials provider.
 * @param email - User's email
 * @param password - User's password
 * @returns True if login succeeds, False otherwise.
 */
export const manualLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    const res = await signIn("credentials", { email, password, redirect: false });
    return res?.ok || false;
  } catch (error: any) {
    console.error("Login error:", error?.response?.data || error.message);
    return false;
  }
};