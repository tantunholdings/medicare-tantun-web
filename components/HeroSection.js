"use client"; // Ensure this is a client-side component

import { useState, useEffect } from "react";
import DetailsPopup from "./DetailsPopup"; // Assuming DetailsPopup is correctly imported

export default function HeroSection() {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [carouselView, setCarouselView] = useState(0); // 0 for topic & image, 1 for text section

  const handleContactUsClick = () => {
    setShowDetailsPopup(true); // Show the popup when Contact Us is clicked
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false); // Close the popup
  };

  // Carousel Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselView((prev) => (prev === 0 ? 1 : 0)); // Toggle between 0 and 1
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <section
        className="bg-primaryBlack text-white rounded-lg p-4 w-full max-w-6xl mx-auto"
        style={{
          backgroundImage: 'url("/assets/Vector.svg")', // Correct vector path
          backgroundSize: "cover", // Adjust size based on your requirements
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat", // Ensure it doesn't repeat
        }}
      >
        <div className="flex flex-col items-center md:flex-row">
          {/* Mobile Carousel Section */}
          <div className="md:hidden w-full flex items-center justify-center">
            {/* Carousel container with a larger fixed height and transition */}
            <div
              className="relative w-full flex flex-col justify-center items-center transition-all duration-500 ease-in-out"
              style={{
                minHeight: "280px",
                height: "280px",
                overflow: "hidden",
              }} // Increased height to fit both text and image
            >
              {/* Show Topic & Image on first view */}
              {carouselView === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 opacity-100 text-center">
                  <img
                    alt="Placeholder image representing insurance information"
                    className="rounded-lg h-40 w-60 mb-2"
                    src="/assets/placeholder-image.jpg" // Correct placeholder image path
                    width="100"
                    height="100"
                  />
                  <h1 className="text-lg sm:text-xl font-bold leading-tight text-center px-4">
                    Welcome to Insurance Advisor, where understanding insurance
                    is simple and easy.
                  </h1>
                </div>
              )}
              {/* Show Text Section on second view */}
              {carouselView === 1 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 opacity-100">
                  <p className="text-sm text-center px-4">
                    Discover a wealth of information tailored to guide you
                    through the complexities of insurance, ensuring you make
                    informed decisions with confidence. Our comprehensive
                    resources break down various insurance types.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Text Section for larger screens */}
          <div className="hidden md:block md:w-2/3 text-left">
            <h1 className="md:block text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight px-2">
              Welcome to Insurance Advisor, where understanding insurance is
              simple and easy.
            </h1>
            <p className="text-sm md:text-base mb-6 px-2">
              Discover a wealth of information tailored to guide you through the
              complexities of insurance, ensuring you make informed decisions
              with confidence. Our comprehensive resources break down various
              insurance types.
            </p>
            <div className="flex space-x-4 px-2">
              <button
                className="bg-primary hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-32"
                onClick={handleContactUsClick}
              >
                Contact us
              </button>
              <button className="bg-secondary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-32">
                Call us
              </button>
            </div>
          </div>

          {/* Image Section for larger screens */}
          <div className="hidden md:block md:w-1/3 mt-6 md:mt-0 px-2">
            <img
              alt="Placeholder image representing insurance information"
              className="rounded-lg h-40 md:h-48 w-full"
              src="/assets/placeholder-image.jpg" // Correct placeholder image path
              width="400"
              height="200"
            />
          </div>
        </div>
      </section>

      {/* Render DetailsPopup as a modal if showDetailsPopup is true */}
      {showDetailsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DetailsPopup closePopup={closeDetailsPopup} />
        </div>
      )}
    </>
  );
}
