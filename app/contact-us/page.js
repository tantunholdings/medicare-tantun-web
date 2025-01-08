"use client";

import { useState } from "react";
import { PHONE_NUMBER } from "@/utils/constants";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!name || !email || !selectedOption || !verification) {
      setError("Please fill out all required fields and verify your information.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name,
            email,
            selectedOption,
            message,
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setSelectedOption("");
        setMessage("");
        setVerification(false);
      } else {
        setError("Failed to send your message. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8 mt-10">
        {/* Display success message if the form is submitted */}
        {success ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-6">
              Your message has been successfully submitted. Our team will get back to you
              shortly.
            </p>
            <a
              href="/"
              className="text-blue-600 hover:underline font-medium"
            >
              Return to Home
            </a>
          </div>
        ) : (
          <>
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-primary mb-6">Contact Us</h1>
            <p className="text-center text-gray-600 mb-8">
              Let us help you enroll in Medicare, switch carriers or plans, or get answers to your questions.
            </p>

            {/* Highlighted Options */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="block text-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md"
              >
                Call Us: {PHONE_NUMBER}
              </a>
              <button
                onClick={() => window.Tawk_API.maximize()}
                className="block text-center bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 shadow-md"
              >
                Start Live Chat
              </button>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Leave Your Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Name*</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      required
                    />
                  </div>
                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email*</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>
                {/* Select an Option */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">How can we help you?*</label>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="enroll">Enroll in Medicare</option>
                    <option value="switch-carrier">Switch Medciare Insurance Carrier</option>
                    <option value="switch-plan">Switch Medicare Plan</option>
                    <option value="information">Request Information or Help</option>
                  </select>
                </div>
                {/* Message Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    placeholder="Provide additional details here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    rows="5"
                  ></textarea>
                </div>

                {/* Verification Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="verification"
                    checked={verification}
                    onChange={(e) => setVerification(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="verification" className="text-gray-600 text-sm">
                    I verify that the contact information entered is correct and is my personal
                    information, and that I am over 18 years of age.
                  </label>
                </div>

                {/* Privacy Notice */}
                <p className="text-gray-500 text-sm">
                  By providing your name and contact information, you consent to receive calls,
                  text messages, and/or emails from a licensed insurance agent about Medicare
                  Plans. This agreement is not a condition of enrollment.
                </p>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full max-w-sm bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
