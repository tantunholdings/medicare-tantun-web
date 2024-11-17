"use client";

import { useEffect } from "react";
import webBg from "../../public/assets/40a038eed81bf9f58ccaf0e3eecf548a.jpeg";
import mobileBg from "../../public/assets/f05bcbe3b42b9c4b34e983517e340eb9.jpeg";

export function ClientLogic({ setBg, setCurrentBlogIndex,
    setArrowDirection,
    setCurrentSectionIndex,
    sections,
 }) {
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
  }, [setBg]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBlogIndex((prevIndex) => (prevIndex + 1) % 3); // Rotate between 3 blog posts
    }, 3000); // Change rotation time as needed

    return () => clearInterval(interval);
  }, [setCurrentBlogIndex]);

  // Handle scroll and arrow direction
  useEffect(() => {
    const handleScrollCheck = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
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
  }, [setArrowDirection, setCurrentSectionIndex, sections]);

  return null; // This component is used purely for client-side effects
}
