import type { Metadata, Viewport } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "OneClick3D by Caparison Lab — Turn anything into 3D",
  description: "Instantly turn images, SVG, and text into interactive 3D objects with a single click. High-quality rendering and export for professionals.",
  metadataBase: new URL("https://oneclick3d.caparisonlab.com"),
  openGraph: {
    title: "OneClick3D by Caparison Lab",
    description: "Instantly turn images, SVG, and text into interactive 3D objects with a single click.",
    url: "https://oneclick3d.caparisonlab.com",
    siteName: "OneClick3D",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneClick3D by Caparison Lab",
    description: "Instantly turn images, SVG, and text into interactive 3D objects with a single click.",
  },
  keywords: ["3d", "svg", "caparison lab", "three.js", "embed", "webgl", "text to 3d", "svg to 3d"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider delayDuration={700}>{children}</TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
