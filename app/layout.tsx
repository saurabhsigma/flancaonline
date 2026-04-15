import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Flanca | Premium Digital Agency",
    template: "%s | Flanca",
  },
  description:
    "Flanca is a modern digital agency building websites, apps, UI/UX systems, and custom software for ambitious businesses.",
  keywords: [
    "digital agency",
    "web development",
    "ui ux design",
    "custom software",
    "next.js agency website",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
