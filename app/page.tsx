// pages/index.js
import Head from "next/head";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AssistanceSection from "../components/AssistanceSection";
import TawkMessengerReact from "../components/TawkMessengerReact";
import Disclaimer from "../components/Disclaimer";
import Script from "next/script";

export default function InsuranceAdvisor() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Insurance Advisor</title>
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
      <Navbar />
      <main className="container mx-auto my-8 px-6 min-h-screen">
        <HeroSection />
        <AssistanceSection />
        <TawkMessengerReact />
        
      </main>
      <Disclaimer />
    </>
  );
}
