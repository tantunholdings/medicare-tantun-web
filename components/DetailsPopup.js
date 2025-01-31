"use client"; // Ensure this is a client-side component

import { useState } from "react";

const DetailsPopup = ({ closePopup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Renamed state for clarity but kept API key same
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    if (!verification) {
      setError("You must verify your contact information to proceed.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);

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
            message: phone, // Keeping the same key name for API compatibility
          }),
        }
      );

      if (response.ok) {
        setSuccess(true); // Display success message
        setName("");
        setEmail("");
        setPhone("");
        setVerification(false);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-3xl shadow-lg w-full max-w-lg p-4 flex flex-col relative mx-4"
        style={{
          height: "auto", // Let the height adjust dynamically
          maxHeight: "85vh", // Prevent overflow on smaller screens
        }}
      >
        <div className="flex justify-between items-center p-4">
          <div className="text-gray-800 font-semibold">Leave Your Details</div>

          {/* Close Button */}
          <button
            onClick={closePopup}
            className="ml-4 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full"
          >
            <span className="text-gray-500 text-xl">&times;</span>
          </button>
        </div>

        {/* Form Section */}
        <div className="p-4 flex-grow overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Type here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Verification Checkbox */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="verification"
                checked={verification}
                onChange={(e) => setVerification(e.target.checked)}
                className="mt-1"
                required
              />
              <label htmlFor="verification" className="text-gray-700">
                I verify that the contact information entered is correct and is
                my personal information and that I am over 18 years of age.
              </label>
            </div>

            {/* Privacy Notice */}
            <div className="text-gray-600 text-xs mt-2">
              By providing your name and contact information, you are consenting
              to receive calls, text messages, and/or emails from a licensed
              insurance agent about Medicare Plans at the number provided, and
              you agree such calls and/or text messages may use an auto-dialer
              or robocall, even if you are on a government do-not-call registry.
              This agreement is not a condition of enrollment.
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="max-w-sm w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && (
              <p className="text-green-500 text-center">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopup;
