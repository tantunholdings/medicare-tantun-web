"use client"; // Ensure this is a client-side component

import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import QuestionCard from "../../components/QuestionCard";
import PaginationComponent from "../../components/Pagination";

export default function FAQ() {
  // State to track which questions are expanded and the current FAQ data
  const pageSize = 5; // Fixed page size of 10
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]); // Track multiple expanded questions
  const [faqs, setFaqs] = useState([]); // State to hold FAQ data
  const [totalPages, setTotalPages] = useState(1); // State to track the total number of pages
  const [activePage, setActivePage] = useState(1); // State for active page

  // Fetch FAQ data from the API based on the active page
  const fetchFaqs = async (page: number) => {
    try {
      const response = await fetch(
        `http://192.168.43.84:8000/faqs?page=${page}&page_size=${pageSize}`
      );
      const data = await response.json();

      if (data && data.faqs) {
        setFaqs(data.faqs);
        setTotalPages(data.total_pages);

        // Automatically expand the first question (index 0) if FAQs are present
        if (data.faqs.length > 0) {
          setExpandedIndices([0]); // Set the first question as expanded by default
        }
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  // Effect to fetch data when the active page changes
  useEffect(() => {
    fetchFaqs(activePage);
  }, [activePage]);

  // Toggle the expansion state for a specific FAQ item
  const handleToggle = (index: number) => {
    if (expandedIndices.includes(index)) {
      // Remove from expanded indices (collapse it)
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      // Add to expanded indices (expand it)
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FAQ - Insurance Advisor</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'Nunito', sans-serif;
          }
        `}</style>
      </Head>
      <Navbar /> {/* Include Navbar */}
      <main className="container mx-auto mt-8 px-6">
        <h1 className="text-3xl font-bold text-primaryBlack mb-10">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6 mx-auto">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <QuestionCard
                key={faq.id} // Use the unique id from the FAQ data
                question={faq.title}
                answer={faq.answer}
                isVisible={expandedIndices.includes(index)} // Check if this index is expanded
                onToggle={() => handleToggle(index)} // Pass the toggle handler
              />
            ))
          ) : (
            <p>No FAQs available at the moment.</p>
          )}
        </div>

        {/* Pagination Component */}
        {totalPages > 1 && (
          <div className="mt-10">
            <PaginationComponent
              totalPages={totalPages}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </div>
        )}
      </main>
    </>
  );
}
