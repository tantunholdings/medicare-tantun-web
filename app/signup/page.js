'use client';

import { useState, useEffect } from 'react';
import { PHONE_NUMBER } from '@/utils/constants';
import DetailsPopup from '@/components/DetailsPopup';




export default function SignUpForMedicarePage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      setError('Please fill out all required fields.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name, phone, message }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setPhone('');
        setMessage('');
      } else {
        setError('Failed to send your request. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col min-h-screen items-center bg-gray-50 relative'>
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-md p-10 mt-14 mb-14'>
        {success ? (
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-primary mb-4'>Thank You!</h1>
            <p className='text-gray-600 mb-6'>Your request has been submitted. Our team will contact you shortly.</p>
            <a href='/' className='text-blue-600 hover:underline font-medium'>Return to Home</a>
          </div>
        ) : (
          <>
            <h1 className='text-3xl font-bold text-center text-primary mb-6'>Sign Up for Medicare – Fast & Easy Enrollment Assistance</h1>
            <p className='text-center text-gray-600 mb-4'>Need to Sign Up for Medicare? We’ll Help You Enroll Quickly & Find the Right Plan.</p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="block text-center bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md text-[clamp(14px,4vw,18px)] leading-tight"
              >
                Sign Up for Medicare Now – Call {PHONE_NUMBER}
              </a>
            </div>


            <h2 className='text-xl font-semibold text-gray-700 mt-12 mb-6'>How to Sign Up for Medicare?</h2>
            <div className='space-y-6'>
              <div className='border-l-4 border-primary pl-4'>
                <h3 className='text-lg font-bold'>Step 1: Medicare Eligibility</h3>
                <p className='text-gray-600'>You qualify if you meet one of these:</p>
                <ul className='list-disc pl-5 text-gray-600'>
                  <li>Age 65+ (U.S. citizen or legal resident for 5+ years).</li>
                  <li>Under 65 with a disability (receiving SSDI for 24+ months).</li>
                  <li>Any age with ESRD or ALS (automatic eligibility).</li>
                </ul>
                <p className='text-red-600 font-bold mt-2'>⚠️ Avoid Late Penalties! Sign up for Medicare before your deadline to prevent gaps in coverage.</p>
              </div>
              <div className='border-l-4 border-primary pl-6 py-4'>
                <h3 className='text-lg font-bold'>Step 2: Compare Medicare Plans</h3>
                <p className='text-gray-600'>Medicare offers different types of coverage to fit your unique needs. Here’s how to decide:</p>
                <ul className='list-disc pl-6 text-gray-600'>
                  <li><strong>Original Medicare (Parts A & B):</strong> Covers hospital stays (Part A) and doctor visits (Part B). You can add <strong>Medicare Part D</strong> for prescription drug coverage.</li>
                  <li><strong>Medicare Advantage (Part C):</strong> A bundled alternative to Original Medicare that often includes additional benefits like vision, dental, and hearing coverage.</li>
                  <li><strong>Medicare Supplement (Medigap):</strong> Helps cover out-of-pocket costs like deductibles and copays, working alongside Original Medicare.</li>
                </ul>
              </div>
              <div className='border-l-4 border-primary pl-6 py-4'>
                <h3 className='text-lg font-bold'>Step 3: Sign Up for Medicare!</h3>
                <p className='text-gray-600'>Once you’ve determined the right Medicare plan, the next step is enrollment.</p>
                <ul className='list-disc pl-6 text-gray-600'>
                  <li><strong>Online:</strong> Sign up through the official Medicare website.</li>
                  <li><strong>By Phone:</strong> Speak directly with a licensed agent who will walk you through the enrollment process.</li>
                </ul>
              </div>
            </div>
            {/* ✅ Exit-Intent Popup (Appears Before Leaving) */}
            {showExitPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                  <h2 className="text-2xl font-bold text-primary mb-4">Wait! Don’t leave yet...</h2>
                  <p className="text-gray-600 mb-6">
                    Get expert Medicare assistance before you go. We can help you enroll quickly!
                  </p>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md w-full"
                  >
                    Call {PHONE_NUMBER} Now
                  </a>
                  <button
                    onClick={() => setShowExitPopup(false)}
                    className="mt-4 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    No Thanks, I’ll Sign Up Later
                  </button>
                </div>
              </div>
            )}
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
            {showDetailsPopup && <DetailsPopup closePopup={() => setShowDetailsPopup(false)} />}
          </>
        )}
      </div>
    </div>
  );
}
