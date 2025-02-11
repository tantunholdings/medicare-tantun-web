'use client';

import { PHONE_NUMBER } from '@/utils/constants';
import { useState, useEffect } from 'react';
import DetailsPopup from '@/components/DetailsPopup';
import CTAButtons from '@/components/CTAButtons';

export default function MedicareAdvantageProvidersPage() {
  const [showExitPopup, setShowExitPopup] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('exit-popup-shown')) return;
    const handleExitIntent = (event) => {
      if (!event.relatedTarget && event.clientY < 50) {
        setShowExitPopup(true);
        sessionStorage.setItem('exit-popup-shown', 'true');
      }
    };
    window.addEventListener('mouseout', handleExitIntent);
    return () => {
      window.removeEventListener('mouseout', handleExitIntent);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50 relative">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-10 mt-14 mb-14">
        
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          What Insurance Companies Offer Medicare Advantage Plans?
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Medicare Advantage plans are provided by private insurance companies approved by Medicare. Here are the top providers.
        </p>

        {/* ✅ CTA Section (Top) */}
        <CTAButtons position="top" />

        {/* ✅ Top Medicare Advantage Providers */}
        <section className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 bg-blue-50 mb-4">
            Top Medicare Advantage Insurance Companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {[
               { name: "Healthfirst", color: "bg-[#009933] text-white" },
               { name: "UnitedHealthcare", color: "bg-[#0056A4] text-white" },
               { name: "Humana", color: "bg-[#6BBE44] text-white" },
               { name: "Fidelis Care", color: "bg-[#00A99D] text-white" },
               { name: "EmblemHealth", color: "bg-[#61269E] text-white" },
               { name: "ElderPlan", color: "bg-[#0033A0] text-white" },
               { name: "Cigna", color: "bg-[#F6821F] text-black" },
               { name: "Aetna", color: "bg-[#D20962] text-white" },
               { name: "Blue Cross Blue Shield", color: "bg-[#004A93] text-white" },
               { name: "WellCare", color: "bg-[#00A4A0] text-white" },
               { name: "VillageCare", color: "bg-[#ED1C24] text-white" },
               { name: "VNS Health", color: "bg-[#0072CE] text-white" },
            ].map((provider, index) => (
              <span key={index} className={`flex items-center justify-center h-16 px-4 rounded-md text-lg font-bold text-center border border-gray-300 shadow-sm whitespace-normal ${provider.color}`}>
                {provider.name}
              </span>
            ))}
          </div>
        </section>

        {/* ✅ How to Choose a Medicare Advantage Plan */}
        <section className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 bg-blue-50 mb-4">
            How to Choose the Right Medicare Advantage Plan?
          </h3>
          <ul className="list-disc list-inside text-gray-800 text-lg leading-relaxed">
            <li>✔ **Check provider networks** – Ensure your preferred doctors and hospitals are covered.</li>
            <li>✔ **Compare costs** – Look at premiums, deductibles, and out-of-pocket maximums.</li>
            <li>✔ **Review drug coverage** – Make sure your prescriptions are covered.</li>
            <li>✔ **Consider extra benefits** – Some plans offer dental, vision, and hearing benefits.</li>
          </ul>
        </section>


        {/* ✅ Read More About Medicare Advantage Plans */}
        <section className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 bg-blue-50 mb-4">
            Read More About Medicare Advantage Plans
          </h3>
          <p className="text-gray-800 text-lg leading-relaxed">
            Learn more about Medicare Advantage plans and what each provider offers in our detailed blog post.
          </p>
          <div className="mt-4 text-center">
            <a 
              href="https://www.tantunai.com/blog/0ae80587-d7e0-45e2-87fc-3aa500349787" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md"
            >
              Read the Blog Post
            </a>
          </div>
        </section>

        <div className="mt-8">
        {/* ✅ CTA Section (Bottom) */}
        <CTAButtons position="bottom"/>
        </div>

        {/* ✅ Exit-Intent Popup */}
        {showExitPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Wait! Don’t leave yet...</h2>
              <p className="text-gray-600 mb-6">Find out which Medicare Advantage plan is best for you.</p>
              <a href={`tel:${PHONE_NUMBER}`} className="block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md w-full">
                Call {PHONE_NUMBER} Now
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
