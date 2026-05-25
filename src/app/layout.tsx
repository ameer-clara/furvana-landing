import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Mulish, Fraunces } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://furvana.com";
const TITLE = "Furvana — Smart Self-Grooming Arch";
const DESCRIPTION =
  "The smart grooming arch that pampers your cat or small dog automatically. Live HD camera, two-way audio, and a gentle reciprocating massage. Join the waitlist for early access.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Furvana",
  },
  description: DESCRIPTION,
  applicationName: "Furvana",
  category: "technology",
  keywords: [
    "Furvana",
    "smart pet grooming",
    "self-grooming arch",
    "cat grooming",
    "small dog grooming",
    "pet tech",
    "pet camera",
    "two-way audio pet",
    "shedding",
  ],
  authors: [{ name: "Furvana" }],
  creator: "Furvana",
  publisher: "Furvana",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Furvana",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@furvana",
    site: "@furvana",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F2E7" },
    { media: "(prefers-color-scheme: dark)", color: "#2B2620" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${mulish.variable} ${fraunces.variable}`}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
