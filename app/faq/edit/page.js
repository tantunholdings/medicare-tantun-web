"use client";
import React, { useState, useEffect } from "react";
import AdminSideBar from "../../../components/AdminSideBar";
import { useRouter } from 'next/navigation'

const FAQListPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 2; // Number of FAQs to fetch per page
  const router = useRouter();

  
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_URL}/faqs?page=${currentPage}&page_size=${pageSize}`
        );
        if (response.ok) {
          const data = await response.json();
          setFaqs(data.faqs);
          setTotalPages(data.total_pages); 
        } else {
          setError("Failed to fetch FAQs");
        }
      } catch (err) {
        setError("An error occurred while fetching FAQs");
      }
      setLoading(false);
    };

    fetchFaqs();
  }, [currentPage]); 

  const handleEdit = (faqId, faqTitle, faqAnswer) => {
        console.log(`Edit FAQ with ID: ${faqId}`);

    router.push(`/faq/new?id=${faqId}`)
  };

  const handleDelete = async (faqId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );
    
    if (confirmed) {
      try {
        // Make the actual DELETE API call to FastAPI
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/faq/${faqId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log(`FAQ with ID: ${faqId} deleted successfully.`);
          setFaqs(faqs.filter((faq) => faq.id !== faqId)); // Remove the deleted FAQ from the list
        } else {
          const errorData = await response.json();
          console.error(`Failed to delete FAQ: ${errorData.detail}`);
          alert(`Failed to delete FAQ: ${errorData.detail}`);
        }
      } catch (err) {
        console.error("Failed to delete FAQ:", err);
        alert("An error occurred while deleting the FAQ.");
      }
    }
  };
  

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="p-8 w-full">
        <h1 className="text-2xl font-semibold mb-6">FAQs List</h1>

        {loading && <p>Loading FAQs...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && faqs.length === 0 && <p>No FAQs available.</p>}

        {!loading && !error && faqs.length > 0 && (
          <>
            <table className="min-w-full bg-white w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Created Date</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq) => (
                  <tr key={faq.id}>
                    <td className="py-2 px-4 border-b">{faq.answer}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(faq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {faq.draft ? "Draft" : "Published"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(faq.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`bg-gray-300 text-gray-800 px-3 py-1 rounded ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400"
                }`}
              >
                Previous
              </button>

              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`bg-gray-300 text-gray-800 px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FAQListPage;
