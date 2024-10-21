import React from "react";

const sections = [
  {
    title: "Personalized Recommendations",
    description:
      "Get plans tailored to your budget and needs. Our tools help you filter doctors, specialists, and prescriptions, ensuring you find the right coverage. Compare plans side-by-side to select one that fits every aspect of your healthcare.",
    imageSrc: "/assets/1.png", // Image from public/assets folder
    reverse: true,
  },
  {
    title: "Independent & Unbiased",
    description:
      "Our licensed agents provide impartial advice across multiple insurers, focusing on your needs and budget. You'll receive unbiased support with personalized recommendations, ensuring you make informed choices without pressure or favoritism.",
    imageSrc: "/assets/2.png", // Image from public/assets folder
    reverse: false,
  },
  {
    title: "Free Service, No Obligation",
    description:
      "Enroll online or by phone at no extra cost. Our service is free, with no obligation to enroll. Advisors receive equal compensation regardless of the plan you choose, so you'll get honest, unbiased advice every time.",
    imageSrc: "/assets/3.png", // Image from public/assets folder
    reverse: true,
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-white text-primaryBlack min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-5xl mx-auto py-6 px-6">
          <h1 className="text-4xl font-bold mb-6">Why Choose Tantun?</h1>
          <div className="space-y-5">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  section.reverse ? "md:flex-row-reverse" : "md:flex-row"
                } items-center md:items-start gap-8`}
              >
                {/* Vector Art Section */}
                <div
                  className={`w-full md:w-1/2 flex ${
                    section.reverse ? "justify-start" : "justify-end"
                  }`}
                >
                  <img
                    src={section.imageSrc}
                    alt={`Illustration of ${section.title.toLowerCase()}`}
                    className="object-contain w-2/3 h-2/3"
                  />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <p className="text-base text-gray-600 text-justify">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
