"use client";
import HeroSectionSSR from './HeroSectionSSR';
import { ClientLogic } from './HeroSectionClientLogic';
import { useState } from "react";
import webBg from "../../public/assets/40a038eed81bf9f58ccaf0e3eecf548a.jpeg";
import DetailsPopup from "../DetailsPopup"; // Ensure this is correctly imported

export default function HeroSection() {
  const [bg, setBg] = useState(webBg.src); // Initial state
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [arrowDirection, setArrowDirection] = useState("down");
  const sections = ["top", "chat-section", "blog-section", "bottom"];

  const handleContactUsClick = () => {
    setShowDetailsPopup(true);
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false);
  };

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
  return (
    <>
      <HeroSectionSSR 
      bg={bg} 
      currentBlogIndex={currentBlogIndex} 
      handleContactUsClick={handleContactUsClick} 
      arrowDirection={arrowDirection}  
      handleScroll = {handleScroll} />
      
      <ClientLogic 
      setBg={setBg} 
      setCurrentBlogIndex={setCurrentBlogIndex} 
      setCurrentSectionIndex={setCurrentSectionIndex} 
      sections={sections} 
      handleContactUsClick={handleContactUsClick} 
      setArrowDirection={setArrowDirection}
     
      />
      {showDetailsPopup && (
        <DetailsPopup closePopup={closeDetailsPopup} />
      )}
    </>
  );
}
