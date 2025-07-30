import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import { BlogProvider } from "@/context/BlogContext";

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paradise Yatra - Your Trusted Travel Partner",
  description: "Discover the world with Paradise Yatra. We offer customized international and domestic tour packages, trekking adventures, and unforgettable travel experiences.",
  keywords: "travel, tours, international tours, India tours, trekking, adventure, vacation packages",
  authors: [{ name: "Paradise Yatra" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  // Performance optimizations
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Preload critical resources
  other: {
    'theme-color': '#1e40af',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${nunito.variable} antialiased`}
      >
        <BlogProvider>
          {children}
        </BlogProvider>
      </body>
    </html>
  );
}
