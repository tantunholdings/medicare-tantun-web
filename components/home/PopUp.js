import React, { useState } from "react";
import DetailsPopup from "../DetailsPopup"; // Import the DetailsPopup component
import { PHONE_NUMBER } from "@/utils/constants";

const PopUp = ({ onClose }) => {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  if (showDetailsPopup) {
    // Render DetailsPopup if it's activated
    return <DetailsPopup closePopup={() => setShowDetailsPopup(false)} />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Contact Us</h2>
        <p className="mb-4">Choose how you'd like to get in touch:</p>
        <div className="flex flex-col gap-4">
          {/* Call Us */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Call Us: {PHONE_NUMBER}
          </a>
          {/* Open Tawk Chat */}
          <button
            onClick={() => {
              onClose(); // Close the popup before opening the chat
              window.Tawk_API.maximize(); // Assuming Tawk is set up globally
            }}
            className="block text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Start Live Chat
          </button>
          {/* Open DetailsPopup */}
          <button
            onClick={() => setShowDetailsPopup(true)}
            className="block text-center bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Contact Form
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 block text-center text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
