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

export const metadata = {
  title: "Furvana — Smart Self-Grooming Arch",
  description:
    "The smart grooming arch that pampers your cat or small dog automatically. Join the waitlist for early access.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${mulish.variable} ${fraunces.variable}`}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
