"use client";

import { useState } from "react";
import { PHONE_NUMBER } from '@/utils/constants';
import CardsSection from "../../components/home/CardsSection";
import ChatPopup from "../../components/home/ChatPopup";
import DetailsPopup from '@/components/DetailsPopup';

export default function AssistancePage() {
  const [trigger, setTrigger] = useState("");
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  return (
    <div className='flex flex-col min-h-screen items-center bg-gray-50 relative'>
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-md p-10 mt-14 mb-14'>
        {/* Assistant Section */}
        <main className="flex-grow flex justify-start flex-col pt-8">
          <section
            className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-auto p-6"
            id="chat-section"
          >
            <h2 className="text-2xl font-bold mb-6 text-center underline decoration-blue-500">
              Ask Our Medicare AI Assistant about Medicare
            </h2>
            <CardsSection setTrigger={setTrigger} />
            <ChatPopup setTrigger={setTrigger} trigger={trigger} />
          </section>
        </main>
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
        {/* ✅ Request a Call Popup */}
        {showDetailsPopup && <DetailsPopup closePopup={() => setShowDetailsPopup(false)} />}
      </div>
    </div>
  );
}
