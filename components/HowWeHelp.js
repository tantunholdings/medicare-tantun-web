import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faEye,
  faUsers,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    title: "Step 1: Provide Basic Information",
    description:
      "Begin by answering a few simple questions to help us assess your coverage needs: Who are your current doctors? What prescriptions do you take? Are there any specific benefits you’re looking for?",
    icon: (
      <FontAwesomeIcon icon={faClipboard} className="w-8 h-8 text-primary" />
    ),
  },
  {
    title: "Step 2: Review Plan Options",
    description:
      "Check out the various plans available in your area. Viewing the features and benefits side-by-side makes it easy to choose a plan that fits your needs.",
    icon: <FontAwesomeIcon icon={faEye} className="w-8 h-8 text-primary" />,
  },
  {
    title: "Step 3: Tailor Your Search",
    description:
      "Ensure that the plan you choose covers everything that matters to you. Look into options for doctor visits, medications, and other health-related expenses to find the right coverage.",
    icon: <FontAwesomeIcon icon={faUsers} className="w-8 h-8 text-primary" />,
  },
  {
    title: "Step 4: Enroll for Free",
    description:
      "Once you’ve chosen a plan, enroll online or by phone at the same price as the insurer offers. *Our services are free of charge*, and advisors offer unbiased guidance with the same compensation for any plan you select.",
    icon: <FontAwesomeIcon icon={faPhone} className="w-8 h-8 text-primary" />,
  },
];

const HowWeHelp = () => {
  return (
    <div className="bg-blue-50 flex items-center justify-center">
      <div className="mx-auto py-10 px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-primaryBlack mb-6">
          How Do We Help in Tantun?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                {step.icon}
                <h3 className="text-xl font-bold text-primaryBlack uppercase">
                  {step.title}
                </h3>
              </div>
              <p className="text-base text-gray-600 text-justify">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowWeHelp;
