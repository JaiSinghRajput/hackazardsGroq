"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import useAuth from "@/context/useAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus } = useAuth();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Conditionally render Navbar based on authStatus */}
        {authStatus && <Navbar />}
        {/* Render the children components (the main content) */}
        <main>{children}</main>
      </body>
    </html>
  );
}
