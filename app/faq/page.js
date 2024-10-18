"use client"; // Ensure this is a client-side component

import { useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import FaqList from "../../components/FaqList";
import TawkMessengerReact from "@/components/TawkMessengerReact";
import Disclaimer from "@/components/Disclaimer";

export default function FAQ() {
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FAQ - Insurance Advisor</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'Nunito', sans-serif;
          }
        `}</style>
      </Head>
      <Navbar /> {/* Include Navbar */}
      <TawkMessengerReact />
      <main className="container mx-auto my-8 px-6 min-h-screen">
        <h1 className="text-3xl font-bold text-primaryBlack mb-10">
          Frequently Asked Questions
        </h1>
        <FaqList activePage={activePage} setActivePage={setActivePage} />
      </main>

      <Disclaimer />
    </>
  );
}
