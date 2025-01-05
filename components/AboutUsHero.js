import React from "react";

const AboutUsHero = () => {
  return (
    <div className="bg-white flex items-center justify-center">
      <div className="mx-auto px-6 sm:px-20 bg-white rounded-lg flex flex-col sm:flex-row items-center m-4">
        {/* Image Section */}
        <div className="w-full sm:w-1/2 flex justify-center mb-4 sm:mb-0">
          <img
            src="/assets/hero-image.png"
            alt="Illustration of people comparing healthcare plans under an umbrella with a heart and shield symbol"
            className="object-contain w-4/5 h-4/5" // Scaled down to 80% size
          />
        </div>

        {/* Text Section */}
        <div className="w-full sm:w-1/2 text-justify sm:text-left">
          <h1 className="text-4xl font-bold text-primaryBlack mb-4">
            Who is Tantun?
          </h1>
          <p className="text-base text-primaryBlack">
            Tantun Holdings LLC is a licensed insurance agency that simplifies
            comparing and enrolling in top healthcare plans. Its user-friendly
            platform offers access to national and regional insurers, allowing
            users to filter plans based on their doctors, specialists, and
            prescriptions. Customers can compare plans online or receive
            personalized, unbiased recommendations over the phone from licensed
            agents. The service is at no cost with no obligation to enroll.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHero;
