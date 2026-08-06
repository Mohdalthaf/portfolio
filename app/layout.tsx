import "devicon/devicon.min.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://mohammedalthaf.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohammed Althaf T K — Frontend Developer",
    template: "%s — Mohammed Althaf T K",
  },
  description:
    "Frontend Developer specializing in React, Next.js, and scalable web applications. Building fast, accessible interfaces and full-stack products.",
  keywords: [
    "Mohammed Althaf",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Full Stack Developer",
    "Kochi Kerala",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Mohammed Althaf T K", url: siteUrl }],
  creator: "Mohammed Althaf T K",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Mohammed Althaf T K — Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and scalable web applications.",
    siteName: "Mohammed Althaf T K",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Althaf T K — Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and scalable web applications.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
