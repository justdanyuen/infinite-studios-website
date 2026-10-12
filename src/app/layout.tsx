import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { site, SITE_URL } from "@/lib/site";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${site.name}`,
    default: `${site.name} | ${site.tagline}`,
  },
  description: `${site.name} is a recording studio in Alameda, CA offering tracking, mixing, and mastering.`,
  openGraph: {
    siteName: site.name,
    type: "website",
    images: ["/images/hero/banner1.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-zinc-100">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
    
  );
}
