import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Modules/Providers/Providers";
import { Toaster } from "@/components/ui/sonner"
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
export const metadata: Metadata = {
  title: "Your Website Title | Best Services & Solutions",
  description:
    "Discover top-notch services and solutions at Your Website. We provide expert advice, high-quality content, and seamless experiences.",

  keywords: [
    "Next.js",
    "SEO Optimization",
    "Web Development",
    "Digital Marketing",
    "Modern UI/UX",
  ],

  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en"  cz-shortcut-listen="true">
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <Providers>
          <div className="">
            <div className="min-h-screen">{children}
            <Toaster />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
