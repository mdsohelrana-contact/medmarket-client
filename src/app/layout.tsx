import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Modules/Providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";
// Title font (Montserrat)
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  weight: ["700", "800"],
});

// Description font (Open Sans)
const openSans = Open_Sans({
  variable: "--font-openSans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  weight: ["400", "500"],
});

// Metadata
// Metadata
export const metadata: Metadata = {
  title: "MedStore | Buy Medicines Online with Ease",
  description:
    "Shop for all your medicine needs at Medicine Ecommerce. We offer a wide range of medications, health products, and wellness solutions with fast delivery and excellent customer service.",

  keywords: [
    "Medicine e-commerce",
    "Online Pharmacy",
    "Health Products",
    "Buy Medicines Online",
    "Wellness Solutions",
    "Fast Delivery",
  ],

  authors: [{ name: "Md Sohel Rana", url: "https://next-assignment-six-alpha.vercel.app/" }],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" cz-shortcut-listen="true">
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <Providers>
          <div className="">
            <div className="min-h-screen">
              {children}
              <Toaster />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
