"use client"; // Wrap SessionProvider in a dedicated client component
import { SessionProvider } from "next-auth/react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}