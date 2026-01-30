import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import Provider from "./provider"; // Import your custom Provider
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip"; // Rename if needed

const appFont = DM_Sans({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "UIUX Mockup Generator App",
  description: "Generate high quality Mockup for UI IX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={appFont.className}>
          <Provider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

