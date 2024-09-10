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
      <section className="bg-teal-900 text-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Insurance Advisor, where understanding insurance is simple
          and easy.
        </h1>
        <p className="mb-6">
          Discover a wealth of information tailored to guide you through the
          complexities of insurance, ensuring you make informed decisions with
          confidence. Our comprehensive resources break down various insurance
          types.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleContactUsClick}
            className="bg-primary text-white px-6 py-3 rounded-md"
          >
            Contact us
          </button>
          <button className="bg-secondary text-white px-6 py-3 rounded-md">
            Call us
          </button>
        </div>
      </section>

      {/* Render DetailsPopup as a modal if showDetailsPopup is true */}
      {showDetailsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DetailsPopup closePopup={closeDetailsPopup} />{" "}
          {/* Pass the close function */}
        </div>
      )}
    </>
  );
}
