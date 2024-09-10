"use client"; // Ensure this is a client-side component

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faMicrophone,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ChatPopup = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, message]); // Add the new message to the chatMessages array
      setMessage(""); // Clear input field after sending the message
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {" "}
      {/* Ensure full width */}
      <div className="flex-grow p-4 overflow-y-auto">
        {/* Display chat messages */}
        {chatMessages.map((msg, index) => (
          <div key={index} className="mb-2 bg-line p-2 rounded-lg">
            {msg}
          </div>
        ))}
      </div>
      {/* Input Area */}
      <div className="flex items-center border border-line-400 rounded-full p-2 w-full mx-auto mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
          <FontAwesomeIcon icon={faPaperclip} className="text-primary" />
        </div>
        <input
          type="text"
          placeholder="Ask a question or make a request"
          className="flex-grow mx-4 text-gray-500 focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
          <FontAwesomeIcon icon={faMicrophone} className="text-primary" />
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full ml-2"
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon icon={faPlay} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
