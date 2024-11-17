"use client"; // Ensure this is a client-side component

import { useState } from "react";

const DetailsPopup = ({ closePopup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
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
            message,
          }),
        }
      );

      if (response.ok) {
        setSuccess(true); // Display success message
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await response.json();
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
    <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl h-[500px] flex flex-col relative mx-4">
      <div className="flex justify-between items-center p-4">
        <div className="text-gray-800 font-semibold">
          Leave Your Details
        </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Your Message
            </label>
            <textarea
              placeholder="Type here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows="4"
              required
            ></textarea>
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
