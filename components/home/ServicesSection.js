import React from "react";
import { Phone, FileText, UserCheck } from "lucide-react";
import Image from "next/image";
import titleShape from "../../public/assets/title-shape.svg";

const ServicesSection = () => {
  // Update the tiles array with proper icons
  const tiles = [
    ["Speak to an Advisor", UserCheck], // "UserCheck" gives a solid, confident advisor look
    ["Find Medicare Plan", FileText], // "FileText" for a clearer document icon
    ["Free about Medicare Plans", UserCheck], // Reusing "UserCheck" for consistent advising theme
  ];

  return (
    <section className="container mx-auto py-12 px-4 max-w-7xl">
      <h2 className="md:text-center md:text-3xl font-bold  mx-auto">
        Need Medical Guidance? Call Us for Personalized Support
      </h2>
      <div className="flex justify-center mb-8 my-5"><Image src={titleShape} alt="Title Shape" /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiles.map(([title, Icon], index) => (
          <div
            key={index}
            className="group flex flex-row md:flex-col items-center justify-center md:items-center md:justify-center text-left md:text-center rounded-lg border p-1 md:p-6 shadow-sm transition-colors duration-300 hover:bg-blue-600 hover:text-white border-blue-600"
          >
            <div className="flex-shrink-0 mr-4 md:mr-0 mb-0 md:mb-4 rounded-full p-3 transition-colors duration-100 text-blue-600 group-hover:text-white">
              <Icon className="md:h-10 md:w-10" />
            </div>
            <h3 className="font-semibold transition-colors duration-100">
              {title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
