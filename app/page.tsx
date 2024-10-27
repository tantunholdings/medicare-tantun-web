// pages/index.js
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AssistanceSection from "../components/AssistanceSection";
import TawkMessengerReact from "../components/TawkMessengerReact";
import Disclaimer from "../components/Disclaimer";
import Script from "next/script";

// Metadata for the main page
export const metadata = {
  title: "Insurance Advisor - Medicare Insurance Assistance",
  description: "Get free, expert Medicare enrollment guidance based on your preferred doctors, prescriptions, and dental coverage. Contact us today!",
};

export default function InsuranceAdvisor() {
  return (
    <>
      

         {/* Schema Markup */}
         <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Medicare Insurance Assistance",
              "url": "https://www.tantunai.com",
              "image": "https://www.tantunai.com/assets/Logo.png",
              "description": "Get free, expert Medicare enrollment guidance based on your preferred doctors, prescriptions, and dental coverage. Contact us today!",
              "potentialAction": [
                {
                  "@type": "SearchAction",
                  "target": "https://www.tantunai.com/about",
                  "name": "Contact Us"
                },
                {
                  "@type": "SearchAction",
                  "target": "https://www.tantunai.com/blog",
                  "name": "Medicare Blogs"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-917-517-6104", 
                "contactType": "Customer Service",
                "areaServed": "US",
                "availableLanguage": "English"
              }
            }
          `}
        </script>

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
   
      <Navbar />
      <main className="container mx-auto my-8 px-6 min-h-screen">
        <HeroSection />
        <AssistanceSection />
        
        
      </main>
      <Disclaimer />
    </>
  );
}
