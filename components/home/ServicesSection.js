'use client'
import React, { useEffect, useState } from "react";
import { Phone, FileText, UserCheck } from "lucide-react";
import Image from "next/image";
import titleShape from "../../public/assets/title-shape.svg";
import { useTawkMessengerRef } from "@/context/TawkContext";
import {PHONE_NUMBER} from "@/utils/constants";


const ServicesSection = ({ setTrigger }) => {
  const tawkMessengerRef = useTawkMessengerRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const expandTawkMessenger = () => {
    if (tawkMessengerRef.current) {
      tawkMessengerRef.current.maximize();
    }
  };

  function openDialer() {
    // Ensure the phone number is valid and doesn't contain special characters
    const sanitizedNumber = PHONE_NUMBER.replace(/[^0-9+]/g, '');
    window.location.href = `tel:${sanitizedNumber}`;
  }

  function openChat() {
    // Scroll to the chat section with id "chat-textarea"
    document.getElementById("chat-textarea").scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  
    setTrigger("Help me to find a Medicare Plan");
  }
  

  const tiles = [
    ["Speak to an Advisor", UserCheck, expandTawkMessenger], // "UserCheck" gives a solid, confident advisor look
    ["Find Medicare Plan", FileText, openChat], // "FileText" for a clearer document icon
    ["Free about Medicare Plans", UserCheck, isMobile? openDialer : expandTawkMessenger], // Reusing "UserCheck" for consistent advising theme
  ];

  return (
    <section className="container mx-auto py-12 px-4 max-w-7xl">
      <h2 className="md:text-center md:text-3xl font-bold  mx-auto">
        Need Medical Guidance? Call Us for Personalized Support
      </h2>
      <div className="flex justify-center mb-8 my-5"><Image src={titleShape} alt="Title Shape" /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiles.map(([title, Icon, Call], index) => (
          <button
          type="button"
          onClick={Call}
            key={index + title}
            className="group flex flex-row md:flex-col items-center justify-center md:items-center md:justify-center text-left md:text-center rounded-lg border p-1 md:p-6 shadow-sm transition-colors duration-300 hover:bg-blue-600 hover:text-white border-blue-600"
          >
            <div className="flex-shrink-0 mr-4 md:mr-0 mb-0 md:mb-4 rounded-full p-3 transition-colors duration-100 text-blue-600 group-hover:text-white">
              <Icon className="md:h-10 md:w-10" />
            </div>
            <h3 className="font-semibold transition-colors duration-100">
              {title}
            </h3>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
