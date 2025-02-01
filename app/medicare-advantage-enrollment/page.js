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
      <h1 className='text-3xl font-bold text-center text-primary mb-6'>Thinking of Switching Your Medicare Plan? Here’s When & How!</h1>
      <p className='text-center text-gray-600 mb-4'>Find out when you can change your Medicare Advantage plan and how to enroll easily.</p>

      <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
        <a href={`tel:${PHONE_NUMBER}`} className="block text-center bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 shadow-md w-full max-w-xs">
        Talk to a licensed Medicare agent – Call {PHONE_NUMBER}
        </a>
      </div>

      {/* ✅ Section 1: Understanding Enrollment Periods */}
      <h2 className='text-xl font-semibold text-gray-700 mt-12 mb-6'>Medicare Advantage Enrollment Periods</h2>
      <div className='space-y-6'>
        <div className='border-l-4 border-primary pl-4'>
          <h3 className='text-lg font-bold'>Annual Enrollment Period (AEP) – Oct 15 to Dec 7</h3>
          <p className='text-gray-600'>This is the primary time when anyone can enroll in or switch Medicare Advantage plans.</p>
        </div>
        <div className='border-l-4 border-primary pl-4'>
          <h3 className='text-lg font-bold'>Medicare Advantage Open Enrollment – Jan 1 to Mar 31</h3>
          <p className='text-gray-600'>If you're already in a Medicare Advantage plan, you can switch to a different plan or return to Original Medicare.</p>
        </div>
      </div>

      {/* ✅ Section 2: Special Enrollment Periods (SEPs) */}
      <h2 className='text-xl font-semibold text-gray-700 mt-12 mb-6'>Special Enrollment Periods (SEPs) – Can You Qualify?</h2>
      <p className='text-gray-600 mb-4'>You may be eligible to change your Medicare Advantage plan outside of the standard enrollment periods if you experience certain life events.</p>

      <div className='space-y-6'>
        <div className='border-l-4 border-primary pl-4'>
          <h3 className='text-lg font-bold'>📍 Moving to a New Location</h3>
          <p className='text-gray-600'>If you move to a different county or state where your current plan isn’t available, you can switch to a new plan.</p>
        </div>
        <div className='border-l-4 border-primary pl-4'>
          <h3 className='text-lg font-bold'>🏥 Losing Employer or Medicaid Coverage</h3>
          <p className='text-gray-600'>If you lose your job-based or Medicaid coverage, you qualify for a SEP to enroll in a Medicare Advantage plan.</p>
        </div>
        <div className='border-l-4 border-primary pl-4'>
          <h3 className='text-lg font-bold'>⭐ Enrolling in a 5-Star Medicare Plan</h3>
          <p className='text-gray-600'>You can switch to a top-rated 5-star Medicare Advantage or Part D plan once per year.</p>
        </div>
      </div>

      {/* ✅ Section 3: Step-by-Step Guide */}
      <h2 className='text-xl font-semibold text-gray-700 mt-12 mb-6'>Step-by-Step Guide to Changing Your Medicare Plan</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li><strong>Step 1:</strong> Compare available Medicare Advantage plans.</li>
        <li><strong>Step 2:</strong> Check coverage for your doctors and prescriptions.</li>
        <li><strong>Step 3:</strong> Enroll online or by phone with a licensed Medicare agent.</li>
      </ul>


        {/* ✅ 4 CTA Buttons - Placed After Content */}
        <h2 className='text-xl font-semibold text-gray-700 mt-14 mb-6'>How Can We Help?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-stretch h-full'>
              <div className='border rounded-lg p-8 shadow-md flex flex-col justify-between h-full'>
                <h3 className='text-lg font-bold'>📞 Sign Up for Medicare Today</h3>
                <p className='text-gray-600'>Talk to a licensed Medicare agent now.</p>
                <a href={`tel:${PHONE_NUMBER}`} className='block mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md'>
                  Call {PHONE_NUMBER}
                </a>
              </div>
              <div className='border rounded-lg p-8 shadow-md flex flex-col justify-between h-full'>
                <h3 className='text-lg font-bold'>📝 Request a Call</h3>
                <p className='text-gray-600'>Let us call you at your convenience.</p>
                <button onClick={() => setShowDetailsPopup(true)} className='block mt-4 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 shadow-md'>
                  Request a Call
                </button>
              </div>
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
