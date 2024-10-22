"use client"; // Ensure this is a client-side component

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function QuestionCard({ question, answer, initiallyVisible }) {
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      onClick={handleToggle} // Handle toggle on click
      className={`p-4 rounded-lg border border-line w-full transition-all duration-100 ${
        isVisible ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold text-primaryBlack">{question}</h1>
        <button className="text-gray-800">
          <FontAwesomeIcon
            icon={isVisible ? faMinus : faPlus} // Toggle icon based on visibility
          />
        </button>
      </div>
      {isVisible && (
        <div id="content">
          <hr className="border-t-2 border-primary mb-4" />
          <p className="text-textGray leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

// PropTypes validation
QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  initiallyVisible: PropTypes.bool.isRequired,
};
