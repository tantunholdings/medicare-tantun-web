import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Disclaimer from "../components/Disclaimer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Medicare Insurance Assistance - Find the Best Medicare Plan",
  description: "Get free, expert Medicare enrollment guidance based on your preferred doctors, prescriptions, and dental coverage. Contact us today!",
  openGraph: {
    title: "Medicare Insurance Assistance - Find the Best Medicare Plan",
    description: "Free Medicare help to find the right plan for your healthcare needs. Contact our team for personalized assistance.",
    url: "https://tantunai.com",
    images: [
      {
        url: "https://www.tantunai.com/assets/Logo.png",
        width: 1200,
        height: 630,
        alt: "Medicare assistance experts ready to help",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* This ensures metadata is injected correctly */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://tantunai.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Navbar />
        <main>{children}</main>
       <Disclaimer />
      </body>
    </html>
  );
}
