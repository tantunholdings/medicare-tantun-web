"use client"; // Ensure this is a client-side component

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ChatPopup from "./ChatPopup"; // Assuming ChatPopup is correctly imported

const DetailsPopup = ({ closePopup }) => {
  const [isChatMode, setIsChatMode] = useState(false);

  const toggleToDetailsMode = () => {
    setIsChatMode(false);
  };

  const toggleToChatMode = () => {
    setIsChatMode(true);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl h-[500px] flex flex-col relative">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center bg-gray-200 rounded-full p-1">
          <button
            onClick={toggleToDetailsMode}
            className={`toggle-button ${
              !isChatMode ? "bg-white" : "text-gray-800"
            } font-semibold py-2 px-4 rounded-full focus:outline-none`}
          >
            Leave Your Details
          </button>
          <button
            onClick={toggleToChatMode}
            className={`toggle-button ${
              isChatMode ? "bg-white" : "text-gray-800"
            } font-semibold py-2 px-4 rounded-full focus:outline-none`}
          >
            Chat With Us
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={closePopup} // Trigger the passed close function
          className="ml-4 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full focus:outline-none"
        >
          <span className="text-gray-500 text-xl">&times;</span>
        </button>
      </div>

      {/* Container for details or chat form */}
      <div className="p-4 flex-grow overflow-y-auto">
        {!isChatMode ? (
          <div
            id="detailsForm"
            className="flex flex-col justify-between h-full"
          >
            <form className="flex flex-col justify-between flex-grow space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Type here"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Message
                </label>
                <textarea
                  placeholder="Type here"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="max-w-sm w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Send Message
                </button>
              </div>
              <div></div>
            </form>
          </div>
        ) : (
          <ChatPopup />
        )}
      </div>
    </div>
  );
};

export default DetailsPopup;
