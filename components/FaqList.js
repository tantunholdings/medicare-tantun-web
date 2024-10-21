import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import PaginationComponent from "./Pagination";
import FaqSkeleton from "../components/skeleton/FaqSkeleton"; // Import the skeleton component

const pageSize = 5; // Fixed page size of 5

export default function FaqList({ activePage, setActivePage }) {
  const [faqs, setFaqs] = useState([]);
  const [expandedIndices, setExpandedIndices] = useState([]); // Track multiple expanded questions
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state to handle fetch status

  const fetchFaqs = async (page) => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/faqs?page=${page}&page_size=${pageSize}`
      );
      const data = await response.json();

      setFaqs(data.faqs || []);
      setTotalPages(data.total_pages || 1);
      setExpandedIndices([0]); // Automatically expand the first question
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    fetchFaqs(activePage);
  }, [activePage]);

  const handleToggle = (index) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  return (
    <>
      {loading ? (
        <FaqSkeleton perPage={pageSize} /> // Show the skeleton loader while loading
      ) : (
        <div className="space-y-6 mx-auto">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <QuestionCard
                key={faq.id}
                question={faq.title}
                answer={faq.answer}
                isVisible={expandedIndices.includes(index)}
                onToggle={() => handleToggle(index)}
              />
            ))
          ) : (
            <p>No FAQs available at the moment.</p>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-10">
          <PaginationComponent
            totalPages={totalPages}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      )}
    </>
  );
}
