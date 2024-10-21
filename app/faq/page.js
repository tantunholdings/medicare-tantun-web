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
      <Navbar />
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
