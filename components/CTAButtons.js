'use client';

import { PHONE_NUMBER } from '@/utils/constants';
import { useState } from 'react';
import DetailsPopup from '@/components/DetailsPopup';

export default function CTAButtons({ position = 'top' }) {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  return (
    <>
      {/* Conditional Wrapper for CTA Placement */}
      {position === 'top' ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8">
          {/* Mobile Click-to-Call */}
          <div className="md:hidden w-full max-w-xs">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="block text-center bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 shadow-md w-full max-w-xs md:hidden">
              Talk to a licensed Medicare agent – Call {PHONE_NUMBER}
            </a>
          </div>

          {/* Desktop Call & Request Callback */}
          <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl">
            {/* Call Text for Desktop */}
            <div className="hidden md:flex items-center text-lg font-semibold text-gray-700">
              <span className="text-red-500 text-xl mr-2">📞</span>
              <span className="text-lg font-semibold text-blue-600">
                Have Questions? Call {PHONE_NUMBER}
              </span>
            </div>

            {/* Request a Call Button */}
            <div className="w-full max-w-xs">
              <button
                onClick={() => setShowDetailsPopup(true)}
                className="block text-center bg-green-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-green-700 shadow-md w-full md:w-auto max-w-xs">
                Request a Call Back
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-stretch h-full'>
          <div className='border rounded-lg p-8 shadow-md flex flex-col justify-between h-full'>
            <h3 className='text-lg font-bold'>📞 Sign Up for Medicare Today</h3>
            <p className='text-gray-600'>Talk to a licensed Medicare agent now.</p>

            {/* ✅ Show only phone number text on desktop */}
            <div className="hidden md:flex justify-center items-center text-lg font-semibold text-blue-600 whitespace-nowrap gap-2">
               <span className="text-red-500 text-xl">📞</span>
              <span> Call {PHONE_NUMBER}</span>
            </div>

            {/* Show button only on mobile */}
            <a href={`tel:${PHONE_NUMBER}`} className="block mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md md:hidden">
             Call {PHONE_NUMBER}
            </a>

          </div>
          <div className='border rounded-lg p-8 shadow-md flex flex-col justify-between h-full'>
            <h3 className='text-lg font-bold'>📝 Request a Call Back</h3>
            <p className='text-gray-600'>Let us call you at your convenience.</p>
            <button onClick={() => setShowDetailsPopup(true)} className='block mt-4 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 shadow-md'>
              Request a Call Back
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
      )}

      {/* Show Popup */}
      {showDetailsPopup && <DetailsPopup closePopup={() => setShowDetailsPopup(false)} />}
    </>
  );
}
