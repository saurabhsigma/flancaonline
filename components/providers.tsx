"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            className:
              "border border-border bg-card text-card-foreground shadow-soft",
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
