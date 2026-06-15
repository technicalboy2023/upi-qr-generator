import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UPI QR Code Generator - Free, Instant, Works on All UPI Apps",
  description: "Generate UPI QR codes instantly from any UPI ID. Add amount and note. Works on GPay, PhonePe, Paytm, BHIM, and all UPI apps. 100% client-side, no data stored.",
  keywords: ["UPI", "QR code", "payment", "GPay", "PhonePe", "Paytm", "BHIM", "NPCI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}