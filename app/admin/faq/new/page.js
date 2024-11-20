"use client";
import React, { useEffect, useState, Suspense } from "react";
import AdminSideBar from "../../../../components/AdminSideBar";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

const FAQEditorPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [faqID, setFaqID] = useState("");
  const [faqTitle, setFaqTitle] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("router.query", id);
    if (id) {
      setFaqID(id);
      fetchFaqDetails(id); // Fetch FAQ details when ID is available
    }
  }, [id]);

  const fetchFaqDetails = async (id) => {
    setLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/faq/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFaqTitle(data.faq.title);
        setFaqAnswer(data.faq.answer);
        setStatusMessage("FAQ details loaded successfully.");
      } else {
        const errorData = await response.json();
        setStatusMessage(`Failed to load FAQ details: ${errorData.detail}`);
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => setFaqTitle(e.target.value);
  const handleAnswerChange = (e) => setFaqAnswer(e.target.value);

  const saveFaq = async (isDraft) => {
    setLoading(true);
    setStatusMessage("");

    if (!faqTitle || !faqAnswer) {
      setStatusMessage("Please enter FAQ title and answer");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", faqTitle);
    formData.append("answer", faqAnswer);
    formData.append("draft", isDraft);
    formData.append("id", faqID);

    if (!faqID) {
      let newfaqID = uuidv4();
      setFaqID(newfaqID);
      formData.append("id", newfaqID);
    }

    try {
      const token = Cookies.get("authToken");
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/add-faq`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatusMessage("FAQ saved successfully!");
      } else {
        const errorData = await response.json();
        setStatusMessage(`Failed to save FAQ: ${errorData.detail}`);
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    } finally {
      setFaqTitle("");
      setFaqAnswer("");
      setFaqID("");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="flex-1 p-10">
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Write New FAQ</h2>
          <div className="space-y-4">
            <div className="mb-4">
              <label htmlFor="faqTitle" className="block text-gray-700 mb-1">
                FAQ Title
              </label>
              <input
                id="faqTitle"
                type="text"
                value={faqTitle}
                onChange={handleTitleChange}
                placeholder="Enter FAQ title"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="faqAnswer" className="block text-gray-700 mb-1">
                FAQ Answer
              </label>
              <textarea
                id="faqAnswer"
                value={faqAnswer}
                onChange={handleAnswerChange}
                placeholder="Enter FAQ answer"
                rows="5"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => saveFaq(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Post FAQ"}
            </button>
            <button
              onClick={() => saveFaq(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save as Draft"}
            </button>
          </div>

          {statusMessage && (
            <div
              className={`mt-4 text-${
                statusMessage.includes("Error") ? "red" : "green"
              }-600`}
            >
              {statusMessage}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const FAQEditorPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <FAQEditorPage />
  </Suspense>
);

export default FAQEditorPageWithSuspense;
