"use client"; // Ensure this is a client-side component
import { PHONE_NUMBER } from "@/utils/constants";
import { useEffect, useState } from "react";
import DetailsPopup from "../DetailsPopup"; // Assuming DetailsPopup is correctly imported
import { Phone, ChevronDown, ChevronUp, PhoneCall, Lightbulb  } from "lucide-react"; // Import both arrow icons
import webBg from "../../public/assets/40a038eed81bf9f58ccaf0e3eecf548a.jpeg";
import mobileBg from "../../public/assets/f05bcbe3b42b9c4b34e983517e340eb9.jpeg";

export default function HeroSection() {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [bg, setBg] = useState("");
  const [arrowDirection, setArrowDirection] = useState("down");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);


  // Section IDs to navigate between
  const sections = ["top", "chat-section", "blog-section", "bottom"];

 // Example blog posts
 const blogPosts = [
  { title: "Understanding Medicare Advantage Plans", link: "/blog/6e41fa94-cda2-42ef-8aea-7be749f80513" },
  { title: "Key Factors to Consider When Choosing a Medicare Plan", link: "/blog/0c518cea-abb2-40a4-803c-9df224858516" },
  { title: "Navigating Enrollment and Making the Best Choice", link: "/blog/ab2c8360-11d8-4250-b3c7-fbd6107481f2" },
];
// Change the displayed blog post every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBlogIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
    }, 3000); // Change rotation time as needed

    return () => clearInterval(interval);
  }, [blogPosts.length]);

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
            Medicare Plans Enrollment Help - Quick & Easy
          </div>
          <div className="font-thin">
            Call now for Medicare Plans assistance and guidance from our licensed experts.
          </div>
          <button className="w-full md:hidden flex my-4 items-center justify-center bg-primary px-6 py-3 text-md font-semibold text-white hover:bg-blue-700 rounded-lg text-center">
            <Phone className="mr-2 h-5 w-5" />
            <a href={`tel:${PHONE_NUMBER}`}>Call Now for Expert Guidance!</a>
            
          </button>
        </div>
        <div
          className="relative z-0 w-full md:px-20 rounded-lg md:rounded-none h-48 md:h-auto"
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
        >
          <div className="flex flex-col justify-end h-full">
            <div className="backdrop-blur-md bg-black/20 md:bg-transparent md:backdrop-blur-none px-2 py-2 md:px-5 md:py-20 rounded-md">
              <h1 className="text-sm font-bold tracking-tight md:text-5xl md:max-w-xl">
                Need Help with Medicare Plans? We're Just a Call Away!
              </h1>
              <p className="md:mt-6 text-xs md:text-lg font-light">
                Medicare can be confusing, but our licensed experts make it
                easy.
                <br className="hidden md:block" />
                Call now for help with enrolling today.
              </p>
              <button
                onClick={handleContactUsClick}
                className="max-w-max hidden md:flex mt-8 items-center bg-primary px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 rounded-3xl"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact us for Medcicare Help!
              </button>
            </div>
          </div>
          
        </div>
       

        {/* Blog Carousel */}
        <div className="my-4 bg-gradient-to-r from-gray-100 to-blue-50 border border-blue-300 rounded-lg py-4 px-4 md:py-3 md:px-8 shadow-lg md:shadow-2xl animate-fade-in w-full mx-auto relative mb-1">
          <h2 className="flex items-center justify-center font-bold text-lg md:text-2xl mb-4 md:mb-6 text-blue-900 tracking-wide">
            <Lightbulb className="text-blue-900 h-5 w-5 md:h-6 md:w-6 mr-2" />
            Latest Medicare Insights
          </h2>
          <div className="px-4 py-3 bg-white rounded-md md:rounded-lg shadow-md md:hover:shadow-xl transition-shadow duration-300 relative">
            <a href={blogPosts[currentBlogIndex].link} className="block hover:underline">
              <h3 className="text-blue-900 font-bold text-lg md:text-xl mt-2 mb-1 hover:text-blue-700 text-center text-shadow-lg">
                {blogPosts[currentBlogIndex].title}
              </h3>
              <p className="text-gray-600 text-sm md:text-md italic text-center mb-3">
                Explore key topics and insights to help you make informed decisions about Medicare.
              </p>
            </a>
            {/* Pagination Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {blogPosts.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${currentBlogIndex === index ? 'bg-blue-700' : 'bg-gray-300'}`}
                ></div>
              ))}
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
         @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in-out;
        } 
          scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .text-shadow-lg {
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}
