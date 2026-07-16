import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

// Be Vietnam Pro replaces Geist for headings: it's the same face used across
// the Government Platform design system, and (unlike Geist) ships full
// Vietnamese diacritic coverage -- this app serves Vietnamese citizens.
const headingFont = Be_Vietnam_Pro({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAIOS — Citizen AI Case Manager",
  description: "AI-assisted government case management for citizens and officers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
