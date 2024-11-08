"use client"; // Ensure this is a client-side component
import { PHONE_NUMBER } from "@/utils/constants";
import { useEffect, useState } from "react";
import DetailsPopup from "../DetailsPopup"; // Assuming DetailsPopup is correctly imported
import { Phone, ChevronDown, ChevronUp, PhoneCall } from "lucide-react"; // Import both arrow icons
import webBg from "../../public/assets/40a038eed81bf9f58ccaf0e3eecf548a.jpeg";
import mobileBg from "../../public/assets/f05bcbe3b42b9c4b34e983517e340eb9.jpeg";

export default function HeroSection() {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [bg, setBg] = useState("");
  const [arrowDirection, setArrowDirection] = useState("down");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Section IDs to navigate between
  const sections = ["top", "chat-section", "blog-section", "bottom"];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBg(mobileBg.src);
      } else {
        setBg(webBg.src);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle scrolling to the next section
  const handleScroll = () => {
    let nextIndex;
    if (arrowDirection === "down") {
      nextIndex =
        currentSectionIndex < sections.length - 1 ? currentSectionIndex + 1 : 0;
    } else {
      nextIndex = 0;
    }

    setCurrentSectionIndex(nextIndex);
    const target = sections[nextIndex];

    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "bottom") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  // Check if the user is at the bottom of the page and update the arrow direction
  useEffect(() => {
    const handleScrollCheck = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        setArrowDirection("up");
        setCurrentSectionIndex(sections.length - 1);
      } else if (window.scrollY === 0) {
        setArrowDirection("down");
        setCurrentSectionIndex(0);
      }
    };

    window.addEventListener("scroll", handleScrollCheck);
    handleScrollCheck();

    return () => window.removeEventListener("scroll", handleScrollCheck);
  }, []);

  const handleContactUsClick = () => {
    setShowDetailsPopup(true);
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false);
  };

  return (
    <>
      <section
        id="top"
        className="relative bg-gray-100 mx-5 md:mx-0 px-0 text-white"
      >
        <div className="block md:hidden bg-white text-black py-2">
          
          <div className="font-semibold">
            Free Medicare Enrollment Help - Quick & Easy
          </div>
          <div className="font-thin">
            Call now for free assistance and guidance from our licensed experts.
          </div>
          <button className="w-full md:hidden flex my-4 items-center justify-center bg-primary px-6 py-3 text-md font-semibold text-white hover:bg-blue-700 rounded-lg text-center" data-gtm="call-us-button">
            <Phone className="mr-2 h-5 w-5" />
            <a href={`tel:${PHONE_NUMBER}`}>Call Now for Free Help!</a>
            
          </button>
        </div>
        <div
          className="relative z-0 w-full md:px-20 rounded-lg md:rounded-none h-48 md:h-auto"
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
        >
          <div className="flex flex-col justify-end h-full">
            <div className="backdrop-blur-md bg-black/20 md:bg-transparent md:backdrop-blur-none px-2 py-2 md:px-5 md:py-20 rounded-md">
              <h1 className="text-sm font-bold tracking-tight md:text-5xl md:max-w-xl">
                Need Help with Medicare? We're Just a Call Away!
              </h1>
              <p className="md:mt-6 text-xs md:text-lg font-light">
                Medicare can be confusing, but our licensed experts make it
                easy.
                <br className="hidden md:block" />
                Call now for FREE help enrolling today.
              </p>
              <button
                onClick={handleContactUsClick}
                className="max-w-max hidden md:flex mt-8 items-center bg-primary px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 rounded-3xl"
                data-gtm="contact-us-button"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact us for Free Help!
              </button>
            </div>
          </div>
        </div>

        {/* Blinking and Centered Button */}
        <button
          onClick={handleScroll}
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-full shadow-lg animate-blink z-50"
        >
          {arrowDirection === "down" ? (
            <ChevronDown className="h-6 w-6" />
          ) : (
            <ChevronUp className="h-6 w-6" />
          )}
        </button>
      </section>

      {showDetailsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DetailsPopup closePopup={closeDetailsPopup} />
        </div>
      )}

      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1.5s infinite;
        }
      `}</style>
    </>
  );
}
