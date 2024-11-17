"use client";
import React, { useState, useEffect } from "react";
import AdminSideBar from "../../../../components/AdminSideBar";
import DataTable from "../../../../components/DataTable";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
const FAQListPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const router = useRouter();

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_URL}/faqs?page=${currentPage}&page_size=${pageSize}&includeDrafts=true`
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

  const handleEdit = (faqId) => {
    router.push(`/admin/faq/new?id=${faqId}`);
  };

  const handleDelete = async (faqId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );
    
    if (confirmed) {
      try {
        const token = Cookies.get('authToken');
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/faq/${faqId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          setFaqs(faqs.filter((faq) => faq.id !== faqId));
        } else {
          alert("Failed to delete FAQ");
        }
      } catch (err) {
        alert("An error occurred while deleting the FAQ.");
      }
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
            <DataTable data={faqs} onEdit={handleEdit} onDelete={handleDelete} />
            {/* Add pagination logic here */}
          </>
        )}
      </div>
    </div>
  );
};

export default FAQListPage;
