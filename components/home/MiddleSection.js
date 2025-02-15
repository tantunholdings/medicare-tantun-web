"use client";
import React, { useState } from "react";
import DetailsPopup from "../DetailsPopup";
import titleShape from "../../public/assets/title-shape.svg";
import Image from "next/image";
const MiddleSection = () => {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  const handleContactUsClick = () => {
    setShowDetailsPopup(true); // Show the popup when Contact Us is clicked
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false); // Close the popup when requested
  };

  return (
    <>
      <section className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-3xl font-bold">
          Medicare Plans Enrollment Help
          <br />- Quick & Easy
        </h2>

        <div className="flex justify-center mt-5"><Image src={titleShape} alt="Title Shape" /></div>
        <p className="mt-4 text-gray-600">
          Contact now for Medicare Plans assistance & guidance from our licensed experts.
        </p>
        <button className="mt-8 rounded-3xl bg-primary px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700" onClick={handleContactUsClick}>
          Request a Call Back
        </button>
      </section>
      {showDetailsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DetailsPopup closePopup={closeDetailsPopup} />
        </div>
      )}
    </>
  );
};

export default MiddleSection;
