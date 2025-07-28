import type { Metadata } from "next";
import { Poppins, Open_Sans, Nunito } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["700"], // Bold for headings
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  weight: ["400"], // Regular for body
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const nunito = Nunito({
  weight: ["300"], // Light weight
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${openSans.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
