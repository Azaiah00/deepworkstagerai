import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepWork AI | All-in-One Automotive Sales Platform - Increase Sales by 300%",
  description: "The complete AI-powered platform for auto dealers: Professional photo staging, intelligent CRM, automated social media, and 24/7 AI sales assistant. Sell more cars faster with marketing automation that actually works. Join 500+ dealerships increasing sales by 156%.",
  keywords: [
    "automotive sales platform",
    "car dealership CRM",
    "AI car sales",
    "auto dealer software",
    "car dealership marketing automation",
    "automotive lead management",
    "AI car staging",
    "auto sales CRM",
    "car dealership automation",
    "automotive social media marketing",
    "AI sales assistant for dealerships",
    "car inventory management",
    "auto dealer leads",
    "car sales software",
    "dealership management system",
    "automotive marketing platform",
    "AI-powered auto sales",
    "car dealership ROI",
    "vehicle listing automation",
    "automotive CRM software"
  ],
  authors: [{ name: "DeepWork AI" }],
  creator: "DeepWork AI",
  publisher: "DeepWork AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://deepwork-ai-car-staging.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "DeepWork AI | All-in-One Automotive Sales Platform",
    description: "Join 500+ dealerships increasing sales by 156% with AI-powered marketing automation, intelligent CRM, and 24/7 AI sales assistant. The complete platform for modern auto dealers.",
    url: 'https://deepwork-ai-car-staging.netlify.app',
    siteName: 'DeepWork AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DeepWork AI - All-in-One Automotive Sales Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "DeepWork AI | Automotive Sales Platform - Sell 3x More Cars",
    description: "Complete AI-powered platform for auto dealers: Photo staging, CRM, social automation & AI sales rep. 500+ dealers increasing sales by 156%.",
    images: ['/og-image.jpg'],
    creator: '@deepworkai',
  },
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
  verification: {
    google: 'your-google-verification-code',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
