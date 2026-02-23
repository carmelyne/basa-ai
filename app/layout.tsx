import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Basa — Matuto Magbasa",
  description:
    "Matuto magbasa sa Filipino. Libre, madaling gamitin, para sa lahat. Learn to read in Filipino — free, easy to use, for everyone.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Basa",
  },
  openGraph: {
    title: "Basa — Matuto Magbasa",
    description: "Libre na pagtuturo sa pagbabasa para sa mga Pilipino.",
    locale: "fil_PH",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2d6a5b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fil">
      <body className={`${geist.variable} font-sans min-h-screen bg-cream`}>
        {children}
      </body>
    </html>
  );
}
