"use client"; // Ensure this is a client-side component

import { useState } from "react";
import DetailsPopup from "./DetailsPopup"; // Make sure DetailsPopup is correctly imported

export default function Navbar() {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  const handleContactUsClick = () => {
    setShowDetailsPopup(true); // Show the popup when Contact Us is clicked
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false); // Close the popup when requested
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <nav className="flex space-x-4">
            <a href="#" className="text-green-500 font-semibold">
              Home
            </a>
            <a href="#" className="text-gray-600">
              Blog
            </a>
            <a href="#" className="text-gray-600">
              FAQ
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-phone-alt text-white bg-blue-500 p-2 rounded-full"></i>
              <div>
                <span className="text-gray-500 text-sm">CALL US</span>
                <span className="text-gray-800 font-semibold">
                  2334 5666 667
                </span>
              </div>
            </div>
            <button
              onClick={handleContactUsClick}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Contact us
            </button>
          </div>
        </div>
      </header>

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
