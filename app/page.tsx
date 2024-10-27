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
              "sameAs": [
                "https://www.tantunai.com/blog",
                "https://www.tantunai.com/about"
             
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-917-517-6104", 
                "contactType": "Customer Service",
                "areaServed": "US",
                "availableLanguage": "English"
              },
              "mainEntity": {
                "@type": "WebPage",
                "name": "Home",
                "url": "https://www.tantunai.com",
                "description": "Welcome to Medicare Insurance Assistance. Get expert guidance for your Medicare needs.",
                "image": "https://www.tantunai.com/assets/Logo.png",
                
              },
              "service": {
                "@type": "Service",
                "serviceType": "Medicare Enrollment Assistance",
                "provider": {
                  "@type": "Organization",
                  "name": "Tantun Holdings",
                  "url": "https://www.tantunai.com"
                },
                "description": "Assistance with Medicare enrollment based on individual health needs."
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.tantunai.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "https://www.tantunai.com/blog"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "About Us",
                    "item": "https://www.tantunai.com/about"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "FAQ",
                    "item": "https://www.tantunai.com/faq"
                  }
                ]
              }
            }
          `}
        </script>

        
      <Navbar />
      <main className="container mx-auto my-8 px-6 min-h-screen">
        <HeroSection />
        <AssistanceSection />
        
        
      </main>
      <Disclaimer />
    </>
  );
}
