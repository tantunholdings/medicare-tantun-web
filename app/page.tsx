// pages/index.js
import HeroSection from "../components/home/HeroSection";
import AssistanceSection from "../components/home/AssistanceSection";
import MiddleSection from "../components/home/MiddleSection";
import BlogPreview from "../components/home/BlogPreview";

// Metadata for the main page
export const metadata = {
  title: "Insurance Licensed Agent - Medicare Insurance Assistance",
  description: "Get at no cost, expert Medicare enrollment guidance based on your preferred doctors, prescriptions, and dental coverage. Contact us today!",
};

export default function InsuranceAdvisor() {
  return (
    <>
      

         {/* Schema Markup*/}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ 
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Medicare Insurance Assistance",
              "url": "https://www.tantunai.com",
              "image": "https://www.tantunai.com/assets/Logo.png",
              "description": "Get at no cost, expert Medicare enrollment guidance based on your preferred doctors, prescriptions, and dental coverage. Contact us today!",
              "sameAs": [
                "https://www.tantunai.com/blog",
                "https://www.tantunai.com/about"
             
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "(888)537-1364", 
                "contactType": "Customer Service",
                "areaServed": "US",
                "availableLanguage": "English"
              },
              "mainEntity": {
                "@type": "WebPage",
                "name": "Home",
                "url": "https://www.tantunai.com",
                "description": "Welcome to Medicare Insurance Assistance. Get expert guidance for your Medicare needs.",
                "image": "https://www.tantunai.com/assets/Logo.png"
                
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
              })
          
        }} />
              
    
      <HeroSection />
      <div className="container mb-8 min-h-screen justify-center w-full mx-auto">
        
        <AssistanceSection />
        <MiddleSection />
        <BlogPreview />       
        
      </div>
    </>
  );
}
