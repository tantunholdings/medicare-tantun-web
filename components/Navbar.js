"use client"; // Ensure this is a client-side component

import { useState } from "react";
import Link from "next/link"; // Import Link for routing
import DetailsPopup from "./DetailsPopup"; // Ensure DetailsPopup is correctly imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons"; // Import the phone icon

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
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex space-x-8">
            <Link href="/" className="text-green-500 font-semibold">
              Home
            </Link>
            <Link href="/blog" className="text-gray-500">
              Blog
            </Link>
            <Link href="/faq" className="text-gray-500">
              FAQ
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-secondary p-2 rounded">
                <FontAwesomeIcon icon={faPhone} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500">CALL US</div>
                <div className="text-lg font-semibold text-gray-800">
                  2334 5666 667
                </div>
              </div>
            </div>
            <button
              onClick={handleContactUsClick}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Contact us
            </button>
          </div>
        </div>
      </nav>

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
