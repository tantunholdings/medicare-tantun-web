'use client';

import { PHONE_NUMBER } from '@/utils/constants';
import DetailsPopup from '@/components/DetailsPopup';
import { useState, useEffect } from 'react';



export default function MedicareAdvantagePage() {
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
        <h1 className='text-3xl font-bold text-center text-primary mb-6'>
            Medicare Advantage: Comprehensive Coverage for Your Health Needs
        </h1>
        <p className='text-center text-gray-800 text-2xl mb-6 leading-relaxed'>
            Explore the benefits of Medicare Advantage plans, understand your options, and enroll with confidence.
        </p>

        {/* ✅ Call to Action Section (Mobile & Desktop Optimized) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8">

            {/* 📱 Mobile Only: Click-to-Call Button */}
            <div className="md:hidden w-full max-w-xs">
                <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="block text-center bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-2xl hover:bg-blue-700 shadow-md w-full max-w-xs md:hidden">
                    Talk to a licensed Medicare agent – Call {PHONE_NUMBER}
                </a>
            </div>

            {/* 💻 Desktop View: Call Text & Request Button Aligned */}
            <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl">

                {/* Call Text with Icon (Desktop Only) */}
                <div className="hidden md:flex items-center space-x-3 text-lg font-semibold text-gray-700">
                    <span className="text-red-500 text-2xl flex items-center">📞</span>
                    <div className="text-blue-600 leading-tight text-2xl">
                        Have Questions? Call <br />
                        <span className="font-bold animate-pulse">{PHONE_NUMBER}</span>
                    </div>
                </div>

                {/* 📝 Request a Call Button (Visible on Both Mobile & Desktop) */}
                <div className="w-full max-w-xs">
                    <button
                        onClick={() => setShowDetailsPopup(true)}
                        className="block text-center bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 shadow-md w-full text-2xl">
                        Request a Call Back
                    </button>
                </div>
            </div>
        </div>


         {/* How to Enroll - Step-by-Step Approach */}
         <section className="mt-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-semibold text-gray-900 bg-blue-50 mb-6">
                How to Enroll in Medicare Advantage?
            </h3>
            <div className="space-y-8 md:space-y-6">
                {/* Step 1 */}
                <div className="flex flex-col items-center md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full text-xl md:text-lg">
                        1
                    </div>
                    <div className="text-center md:text-left">
                        <h4 className="text-2xl md:text-2xl font-semibold text-gray-900">
                            Compare Medicare Advantage Plans. 
                        </h4>
                        <p className="text-gray-800 text-xl leading-relaxed">
                            Review different plans and benefits to find one that fits your healthcare needs. Learn more about Medicare Advantage Plans <a href="https://www.tantunai.com/blog/0ae80587-d7e0-45e2-87fc-3aa500349787" className="text-blue-600 underline">here</a>.
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
                            Check Provider Networks & Drug Coverage
                        </h4>
                        <p className="text-gray-800 text-xl leading-relaxed">
                            Ensure your doctors, hospitals, and prescriptions are covered under the plan.
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
                            Enroll Online or with a Licensed Medicare Agent
                        </h4>
                        <p className="text-gray-800 text-xl leading-relaxed">
                            Sign up through the official website or speak to a licensed agent for assistance.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Why Choose Medicare Advantage */}
        <section className="mt-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-semibold text-gray-900 bg-blue-50 mb-4">Why Choose Medicare Advantage?</h3>
            <ul className="list-disc list-inside text-gray-800 text-lg leading-relaxed">
                <li>✔ Prescription drug coverage</li>
                <li>✔ Dental, vision, and hearing care</li>
                <li>✔ Wellness programs and fitness memberships</li>
                <li>✔ Out-of-pocket cost limits for better financial protection</li>
            </ul>
        </section>

        {/* Medicare Advantage Enrollment Periods */}
        <section className="mt-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-semibold text-gray-900 bg-blue-50 mb-4">
                Medicare Advantage Enrollment Periods
            </h3>
            <div className="space-y-4">
                {/* AEP */}
                <div>
                    <p className="flex items-center text-lg font-bold text-gray-900">
                        <span className="mr-1 text-lg">📅</span>
                        Annual Enrollment Period (AEP) – Oct 15 to Dec 7
                    </p>
                    <p className="text-gray-800 text-lg ml-6 leading-relaxed">
                        Enroll in or switch to a Medicare Advantage plan during this time.
                    </p>
                </div>

                {/* Medicare Advantage Open Enrollment */}
                <div>
                    <p className="flex items-center text-lg font-bold text-gray-900">
                        <span className="mr-1 text-lg">📅</span>
                        Medicare Advantage Open Enrollment – Jan 1 to Mar 31
                    </p>
                    <p className="text-gray-800 text-lg ml-6 leading-relaxed">
                        Already in Medicare Advantage? You can switch to another plan or return to Original Medicare.
                    </p>
                </div>
            </div>
        </section>


        {/* Special Enrollment Periods */}
        <section className="mt-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-semibold text-gray-900 bg-blue-50 mb-3">
                Special Enrollment Periods (SEPs) – Can You Enroll?
            </h3>
            <ul className="list-disc list-inside text-gray-800 text-lg leading-relaxed space-y-2">
                <li><strong>Moving to a New Location</strong> – If you relocate, you can choose a new plan in your area.</li>
                <li><strong>Losing Employer or Medicaid Coverage</strong> – You may be eligible to enroll in a Medicare Advantage plan.</li>
                <li><strong>Enrolling in a 5-Star Medicare Plan</strong> – Switch once per year to a top-rated plan.</li>
            </ul>
        </section>

        {/* Medicare Advantage Providers */}
        <section className="mt-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-semibold text-gray-900 bg-blue-50 mb-4">Medicare Advantage Providers</h3>
            <p className="text-gray-700 mt-2">
                Many trusted insurance carriers offer Medicare Advantage plans, giving you access to quality coverage and healthcare services.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
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
                    <span key={index} className={`flex items-center justify-center h-16 px-4 rounded-md text-lg font-bold  text-center border border-gray-300 shadow-sm whitespace-normal ${provider.color}`}>
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
                      <h3 className='text-lg font-bold'>📞 Sign Up for Medicare Today</h3>
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

        {/* ✅ Exit-Intent Popup */}
        {showExitPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Wait! Don’t leave yet...</h2>
              <p className="text-gray-600 mb-6">Find the best Medicare plan for your needs today.</p>
              <a href={`tel:${PHONE_NUMBER}`} className="block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md w-full">
                Call {PHONE_NUMBER} Now
              </a>
              <button onClick={() => setShowExitPopup(false)} className="mt-4 text-gray-600 hover:text-gray-800 font-medium">
                No Thanks, I’ll Decide Later
              </button>
            </div>
          </div>
        )}

        {/* ✅ Request a Call Popup */}
        {showDetailsPopup && <DetailsPopup closePopup={() => setShowDetailsPopup(false)} />}
      </div>
    </div>
  );
}
