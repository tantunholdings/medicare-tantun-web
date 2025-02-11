'use client';

import { PHONE_NUMBER } from '@/utils/constants';
import { useState, useEffect } from 'react';
import DetailsPopup from '@/components/DetailsPopup';
import CTAButtons from '@/components/CTAButtons';

export default function HMOPPOPage() {
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
          Medicare HMO vs. PPO: Which Plan Is Right for You?
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Understand the differences between Medicare <strong>HMO (Health Maintenance Organization)</strong> and <strong>PPO (Preferred Provider Organization)</strong> plans to make the best choice for your healthcare needs.
        </p>

        {/* ✅ CTA Section (Top) */}
        <CTAButtons position="top" />

        {/* ✅ HMO vs. PPO: Key Differences */}
        <section className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 bg-blue-50 mb-4">
            What Is the Difference Between HMO and PPO Plans?
          </h3>
          <p className="text-gray-800 text-lg leading-relaxed">
            Medicare Advantage plans come in different types, with <strong>HMO and PPO plans</strong> being the most common. Here’s how they compare:
          </p>
          <div className="mt-4">
            <table className="w-full border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-blue-50 text-gray-900">
                  <th className="p-3 border">Feature</th>
                  <th className="p-3 border">HMO Plan</th>
                  <th className="p-3 border">PPO Plan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-semibold">Doctor Network</td>
                  <td className="p-3 border">Must use in-network doctors</td>
                  <td className="p-3 border">Can see out-of-network doctors (higher cost)</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">Referrals Needed?</td>
                  <td className="p-3 border">Yes, for specialists</td>
                  <td className="p-3 border">No referrals needed</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">Monthly Premiums</td>
                  <td className="p-3 border">Typically lower</td>
                  <td className="p-3 border">Usually higher</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">Flexibility</td>
                  <td className="p-3 border">Limited to network</td>
                  <td className="p-3 border">More flexibility</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ✅ How to Choose the Right Plan? */}
        <section className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 bg-blue-50 mb-4">
            Step-by-Step: How to Choose Between HMO and PPO
          </h3>
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full text-xl text-center leading-none">
                1
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-semibold text-gray-900">
                  Consider Your Doctor Preferences
                </h4>
                <p className="text-gray-800 text-lg leading-relaxed">
                  If you want <strong>lower costs and don’t mind a limited network</strong>, an <strong>HMO plan</strong> is a good choice. If you prefer <strong>hoosing any doctor</strong>, a <strong>PPO plan</strong> is better.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full text-xl text-center leading-none">
                2
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-semibold text-gray-900">
                  Check Your Medication Costs
                </h4>
                <p className="text-gray-800 text-lg leading-relaxed">
                  Some <strong>HMO plans have lower prescription costs</strong>, while <strong>PPO plans may offer more flexibility</strong> in choosing pharmacies.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full text-xl text-center leading-none">
                3
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-semibold text-gray-900">
                  Compare Plan Costs & Benefits
                </h4>
                <p className="text-gray-800 text-lg leading-relaxed">
                  PPO plans usually have <strong>higher premiums but more flexibility</strong>, while <strong>HMO plans have lower costs but network restrictions</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ CTA Section (Bottom) */}
        <div className="mt-8">
          <CTAButtons position="bottom" />
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
        
      </div>
    </div>
  );
}
