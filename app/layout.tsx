import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Disclaimer from "../components/Disclaimer";
import { TawkProvider } from "@/context/TawkContext";

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
  description:
    "Get free, expert Medicare enrollment guidance based on your preferred doctors, prescriptions, and dental coverage. Contact us today!",
  openGraph: {
    title: "Medicare Insurance Assistance - Find the Best Medicare Plan",
    description:
      "Medicare help to find the right plan for your healthcare needs. Contact our team for personalized assistance.",
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
       
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5S3RQDLV')
            `,
          }}
        />
        {/* End Google Tag Manager */}

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        {/* Google Tag Manager (noscript) for body */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-5S3RQDLV`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager */}

        <Navbar />
        <main>
          <TawkProvider>{children}</TawkProvider>
        </main>
        <Disclaimer />
      </body>
    </html>
  );
}
