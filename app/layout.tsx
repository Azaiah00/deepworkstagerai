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
  title: "DeepWork AI | Professional Car Advertisement Generator",
  description: "Transform your car photos into stunning professional advertisements with AI-powered scenery integration. Create luxury showroom, clean studio, and scenic backgrounds instantly. Perfect for car dealers, photographers, and automotive businesses.",
  keywords: [
    "AI car advertisement",
    "car photo editing",
    "automotive marketing",
    "car dealership photos",
    "AI image generation",
    "professional car photography",
    "car ad generator",
    "automotive advertising",
    "car staging",
    "vehicle marketing"
  ],
  authors: [{ name: "DeepWork AI" }],
  creator: "DeepWork AI",
  publisher: "DeepWork AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://deepworkai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "DeepWork AI | Professional Car Advertisement Generator",
    description: "Transform your car photos into stunning professional advertisements with AI-powered scenery integration. Create luxury showroom, clean studio, and scenic backgrounds instantly.",
    url: 'https://deepworkai.com',
    siteName: 'DeepWork AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DeepWork AI - Professional Car Advertisement Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "DeepWork AI | Professional Car Advertisement Generator",
    description: "Transform your car photos into stunning professional advertisements with AI-powered scenery integration.",
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
