"use client";
import React, { useState, useEffect } from "react";
import AdminSideBar from "../../../components/AdminSideBar";
import DataTable from "../../../components/DataTable";
import { useRouter } from 'next/navigation';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_URL}/blogs?page=${currentPage}&page_size=${pageSize}&includeDrafts=true`
        );
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.posts);
          setTotalPages(data.total_pages); 
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        setError("An error occurred while fetching blogs");
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [currentPage]);

  const handleEdit = (blogId) => {
    router.push(`/blog/new?id=${blogId}`);
  };

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    
    if (confirmed) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/blog/${blogId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setBlogs(blogs.filter((blog) => blog.id !== blogId));
        } else {
          alert("Failed to delete blog");
        }
      } catch (err) {
        alert("An error occurred while deleting the blog.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="p-8 w-full">
        <h1 className="text-2xl font-semibold mb-6">Blogs List</h1>

        {loading && <p>Loading blogs...</p>}

        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && blogs?.length === 0 && <p>No blogs available.</p>}

        {!loading && !error && blogs?.length > 0 && (
          <>
            <DataTable data={blogs} onEdit={handleEdit} onDelete={handleDelete} />
            {/* Pagination controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
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
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
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

export default BlogListPage;
