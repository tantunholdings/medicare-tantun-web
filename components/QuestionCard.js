"use client"; // Ensure this is a client-side component

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"; // Import the icons

export default function QuestionCard({
  question,
  answer,
  isVisible,
  onToggle,
}) {
  return (
    <div
      onClick={() => {
        console.log("Toggling visibility for:", question);
        onToggle();
      }}
      className={`p-4 rounded-lg border border-line w-full transition-all duration-100 ${
        isVisible ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold text-primaryBlack">{question}</h1>
        <button className="text-gray-800">
          <FontAwesomeIcon
            id="toggleIcon"
            icon={isVisible ? faMinus : faPlus} // Dynamically change icon based on visibility
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
