"use client"; // Ensure this is a client-side component

import { useState } from "react";
import DetailsPopup from "./DetailsPopup"; // Assuming DetailsPopup is correctly imported

export default function HeroSection() {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  const handleContactUsClick = () => {
    setShowDetailsPopup(true); // Show the popup when Contact Us is clicked
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false); // Close the popup
  };

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
          {/* For mobile, the image appears at the top */}
          <div className="md:hidden mb-4 flex items-center">
            <img
              alt="Placeholder image representing insurance information"
              className="rounded-lg h-24 w-24 mr-4" // Added margin-right (mr-4) for space between the image and text
              src="/assets/placeholder-image.jpg" // Correct placeholder image path
            />
            <div className="text-left">
              <h1 className="text-sm sm:text-xl font-bold mb-4 leading-tight">
                {" "}
                {/* Adjusted text size for small screens */}
                Medicare Insurance Assistance - Find the Best Medicare Plan
              </h1>
            </div>
          </div>

          {/* Text Section */}
          <div className="md:w-2/3 text-left">
            <h2 className="hidden md:block text-base md:text-2xl lg:text-3xl font-bold mb-4 leading-tight px-2">
              Welcome to Medicare Advisor, where understanding Medicare plans is
              simple and easy.
            </h2>

            <p className="text-xs md:text-base mb-6 px-2">
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
              <a href="tel:2334-5666-667">
              <button className="bg-secondary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-32 md:hidden">
                Call us
              </button></a>
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