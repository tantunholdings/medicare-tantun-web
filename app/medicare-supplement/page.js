'use client';

import { PHONE_NUMBER } from '@/utils/constants';
import DetailsPopup from '@/components/DetailsPopup';
import { useState, useEffect } from 'react';



export default function MedicareSupplementPage() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

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
    <div className='flex flex-col min-h-screen items-center bg-gray-50 relative'>
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-md p-10 mt-14 mb-14'>

        {/* ✅ Hero Section */}
      <h1 className='text-3xl font-bold text-center text-primary mb-6'>Find the Best Medicare Supplement (Medigap) Plan for You!</h1>
      <p className='text-center text-gray-600 mb-4'>Get coverage for out-of-pocket expenses that Original Medicare doesn’t pay for.</p>

        {/* ✅ Call to Action Section (Mobile & Desktop Optimized) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8">

            {/* 📱 Mobile Only: Click-to-Call Button */}
            <div className="md:hidden w-full max-w-xs">
                <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="block text-center bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 shadow-md w-full max-w-xs md:hidden">
                    Talk to a licensed Medicare agent – Call {PHONE_NUMBER}
                </a>
            </div>

            {/* 💻 Desktop View: Call Text & Request Button Aligned */}
            <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl">

                {/* Call Text with Icon (Desktop Only) */}
                <div className="hidden md:flex items-center text-lg font-semibold text-gray-700">
                    <span className="text-red-500 text-xl mr-2">📞</span>
                    <span className="text-lg font-semibold text-blue-600">
                        Have Questions? Call {PHONE_NUMBER}
                    </span>
                </div>

                {/* 📝 Request a Call Button (Visible on Both Mobile & Desktop) */}
                <div className="w-full max-w-xs">
                    <button
                        onClick={() => setShowDetailsPopup(true)}
                        className="block text-center bg-green-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-green-700 shadow-md w-full">
                        Request a Call Back
                    </button>
                </div>
            </div>
        </div>

     {/* ✅ How to Enroll - Step-by-Step Approach */}
     <section className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-3xl font-semibold text-gray-900 bg-blue-50 mb-6">
            How to Enroll in a Medicare Supplement (Medigap) Plan?
          </h3>
          <div className="space-y-8 md:space-y-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full text-xl md:text-lg">
                    1
                </div>
                <div className="text-center md:text-left">
                    <h4 className="text-2xl font-semibold text-gray-900">
                        Compare Medigap Plans
                    </h4>
                    <p className="text-gray-800 text-xl leading-relaxed">
                        Review available Medigap plans (A-N) and select the best one for your healthcare needs. Learn more <a href="https://www.tantunai.com/blog/25e4751c-959f-46d5-ae39-3798a6623355" className="text-blue-600 underline">here</a>.
                    </p>
                </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full text-xl md:text-lg">
                2
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-semibold text-gray-900">
                  Confirm Your Eligibility & Enrollment Period
                </h4>
                <p className="text-gray-800 text-xl leading-relaxed">
                  The best time to enroll is during your **Medigap Open Enrollment Period** to avoid underwriting.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full text-xl md:text-lg">
                3
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-semibold text-gray-900">
                  Enroll with a Licensed Medicare Agent
                </h4>
                <p className="text-gray-800 text-xl leading-relaxed">
                  Speak with a licensed agent to enroll in a Medigap plan and secure additional coverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Why Choose Medigap? */}
        <section className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-3xl font-semibold text-gray-900 bg-blue-50 mb-4">
            Why Choose Medicare Supplement (Medigap)?
          </h3>
          <ul className="list-disc list-inside text-gray-800 text-lg leading-relaxed">
            <li>✔ Covers out-of-pocket costs like **copayments, coinsurance, and deductibles**.</li>
            <li>✔ **No network restrictions** – Visit any doctor that accepts Medicare.</li>
            <li>✔ **Guaranteed renewable** – Your plan cannot be canceled if you pay premiums.</li>
            <li>✔ **Foreign travel emergency coverage** (available in some plans).</li>
          </ul>
        </section>

        {/* ✅ Medigap Enrollment Periods */}
        <section className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-3xl font-semibold text-gray-900 bg-blue-50 mb-4">
            Medicare Supplement Enrollment Periods
          </h3>
          <p className="text-gray-800 text-lg leading-relaxed">
            The best time to enroll is during your **Medigap Open Enrollment Period** (OEP), which starts **the month you turn 65 and enroll in Part B**.
          </p>
        </section>

              {/* ✅ Medicare Supplement Providers */}
              <section className="mt-6 max-w-2xl mx-auto">
                  <h3 className="text-3xl font-semibold text-gray-900 bg-blue-50 mb-4">
                      Medicare Supplement Providers
                  </h3>
                  <p className="text-gray-700 mt-2">
                      Medigap plans are offered by trusted private insurance companies. Here are some of the leading providers:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                      {[
                          { name: "UnitedHealthcare", color: "bg-[#0056A4] text-white" },
                          { name: "Humana", color: "bg-[#6BBE44] text-white" },
                          { name: "Cigna", color: "bg-[#F6821F] text-black" },
                          { name: "Aetna", color: "bg-[#D20962] text-white" },
                          { name: "Blue Cross Blue Shield", color: "bg-[#004A93] text-white" }
                      ].map((provider, index) => (
                          <span key={index} className={`flex items-center justify-center h-16 px-4 rounded-md text-lg font-bold text-center border border-gray-300 shadow-sm whitespace-normal ${provider.color}`}>
                              {provider.name}
                          </span>
                      ))}
                  </div>
              </section>

       {/* ✅ 4 CTA Buttons - Placed After Content */}
       <h2 className='text-3xl font-semibold text-gray-900 mt-14 mb-6'>How Can We Help?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-stretch h-full'>
                
                  {/* Call Option (Mobile & Desktop) */}
                  <div className='border rounded-lg p-8 shadow-md flex flex-col justify-between h-full'>
                      <h3 className='text-lg font-bold'>📞 Call Us For Medicare Help</h3>
                      <p className='text-gray-600'>Talk to a licensed Medicare agent now.</p>

                      {/* 📱 Mobile: Show Click-to-Call Button */}
                      <a
                          href={`tel:${PHONE_NUMBER}`}
                          className='block mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md md:hidden'>
                          Call {PHONE_NUMBER}
                      </a>

                      {/* 💻 Desktop: Show Phone Number as Text */}
                      <p className="hidden md:block text-lg font-semibold text-blue-600 mt-4">
                          📞 {PHONE_NUMBER}
                      </p>
                  </div>
               
                {/* Request a Call */}
                <div className='border rounded-lg p-8 shadow-md flex flex-col justify-between h-full'>
                    <h3 className='text-lg font-bold'>📝 Request a Call Back</h3>
                    <p className='text-gray-600'>Let us call you at your convenience.</p>
                    <button onClick={() => setShowDetailsPopup(true)} className='block mt-4 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 shadow-md'>
                    Request a Call Back
                    </button>
                </div>
               
                {/* Live Chat */}
                <div className='border rounded-lg p-8 shadow-md flex flex-col justify-between h-full'>
                    <h3 className='text-lg font-bold'>💬 Start Live Chat</h3>
                    <p className='text-gray-600'>Get instant help from our Medicare experts.</p>
                    <button onClick={() => window.Tawk_API.maximize()} className='block mt-4 bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 shadow-md'>
                    Start Live Chat
                    </button>
                </div>
            </div>
       
        {/* ✅ Request a Call Popup */}
        {showDetailsPopup && <DetailsPopup closePopup={() => setShowDetailsPopup(false)} />}
      </div>
    </div>
  );
}
