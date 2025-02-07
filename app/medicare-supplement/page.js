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
      <h1 className='text-3xl font-bold text-center text-primary mb-6'>Thinking of Changing Your Medicare Supplement (Medigap) Plan?</h1>
      <p className='text-center text-gray-600 mb-4'>Learn when and how to switch to a better Medicare Supplement (Medigap) plan for lower costs or better coverage.</p>

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
                        Request a Call
                    </button>
                </div>
            </div>
        </div>

      {/* ✅ Section 1: Understanding Medigap Plan Changes */}
      <h2 className='text-xl font-semibold text-gray-700 mt-12 mb-6'>Can You Change Your Medicare Supplement Plan?</h2>
      <p className='text-gray-600 mb-4'>Unlike Medicare Advantage, Medicare Supplement (Medigap) plans do not have set annual enrollment periods. Instead, your ability to switch plans depends on certain rules.</p>

      <div className='space-y-6'>
        <div className='border-l-4 border-primary pl-4'>
          <h3 className='text-lg font-bold'>✅ Medigap Open Enrollment Period</h3>
          <p className='text-gray-600'>If you're within **6 months** of enrolling in Medicare Part B, you can buy any Medigap plan **without medical underwriting** (no health screening).</p>
        </div>
        <div className='border-l-4 border-primary pl-4'>
          <h3 className='text-lg font-bold'>🔄 Switching Anytime (But With Underwriting)</h3>
          <p className='text-gray-600'>Outside your open enrollment period, you can apply to switch Medigap plans, but insurance companies can **deny coverage or charge higher rates** based on health history.</p>
        </div>
        <div className='border-l-4 border-primary pl-4'>
          <h3 className='text-lg font-bold'>⚠️ State-Specific Rules</h3>
          <p className='text-gray-600'>Some states, like New York and California, have **guaranteed issue rights** allowing you to switch Medigap plans at certain times without health questions.</p>
        </div>
      </div>

      {/* ✅ Section 2: Comparing Medigap Plans */}
      <h2 className='text-xl font-semibold text-gray-700 mt-12 mb-6'>Comparison of Medigap Plan Change Rules</h2>
      <table className="w-full text-left border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Medigap Plan Change Type</th>
            <th className="border p-3">Guaranteed Issue?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-3">During Medigap Open Enrollment</td>
            <td className="border p-3 text-green-600">✅ Yes, No Health Questions</td>
          </tr>
          <tr>
            <td className="border p-3">Outside Open Enrollment</td>
            <td className="border p-3 text-red-600">⚠️ No, Subject to Underwriting</td>
          </tr>
          <tr>
            <td className="border p-3">Live in a Guaranteed Issue State</td>
            <td className="border p-3 text-green-600">✅ Yes, No Health Questions</td>
          </tr>
        </tbody>
      </table>

      {/* ✅ Section 3: Step-by-Step Guide */}
      <h2 className='text-xl font-semibold text-gray-700 mt-12 mb-6'>Step-by-Step Guide to Switching Medigap Plans</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li><strong>Step 1:</strong> Check if your current Medigap plan still meets your needs.</li>
        <li><strong>Step 2:</strong> Compare available Medigap plans in your state.</li>
        <li><strong>Step 3:</strong> Apply for a new plan (may require medical underwriting).</li>
        <li><strong>Step 4:</strong> Once approved, cancel your old Medigap plan.</li>
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
              <p className="text-gray-600 mb-6">Find out if you can save on your Medigap plan today.</p>
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
