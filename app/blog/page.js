"use client"; // Ensure this is a client-side component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use useRouter from next/navigation
import Navbar from "../../components/Navbar";
import BlogCard from "../../components/BlogCard";
import PaginationComponent from "../../components/Pagination";
import BlogSkeleton from "../../components/skeleton/BlogSkeleton"; // Import the skeleton loader
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TawkMessengerReact from "@/components/TawkMessengerReact";
import "../../components/main.css";
import Disclaimer from "@/components/Disclaimer";

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Loading state to handle fetch status
  const [tags, setTags] = useState(["All", "Latest"]); // Initialize with "All"

  const router = useRouter(); // Use the router from next/navigation
  const perPage = 6; // Number of blogs per page

  // Function to extract unique tags from blog posts
  const extractTags = (posts) => {
    if (!posts || !Array.isArray(posts)) return ["All", "Latest"]; // Ensure posts is an array
    const allTags = posts.flatMap((post) => post.tags || []); // Safely access tags
    const uniqueTags = ["All", "Latest", ...new Set(allTags)]; // Always include "All" and "Latest"
    return uniqueTags;
  };

  // Fetch blogs from your API
  const fetchBlogs = async (page) => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/blogs?page=${page}&page_size=${perPage}`
      );
      const data = await response.json();
      setBlogs(data.posts);
      setTotalPages(data.total_pages);
      setCurrentPage(data.current_page);

      // Extract tags from the fetched posts and set the tags state
      const uniqueTags = extractTags(data.posts);
      setTags(uniqueTags);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  // Fetch blogs on initial render and when the page changes
  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  // Function to filter blogs by tags
  const filteredBlogs = blogs
    ? blogs.filter((blog) => {
        if (selectedTag === "All") return true;
        return blog.tags.includes(selectedTag);
      })
    : [];

  // Function to handle the click on a blog card
  const handleBlogClick = (blog) => {
    router.push(`/blog/${blog.id}`); // Navigate to the blog page by ID
  };

  return (
    <>
      <Navbar />
      <TawkMessengerReact />
      <div className="container mx-auto my-8 px-6  min-h-screen">
        {/* Search Box */}
        <div className="relative mt-6 md:mt-0 w-full md:w-1/3 lg:w-1/4 md:ml-auto">
          <input
            className="w-full px-8 py-2 pl-12 bg-white border border-gray-300 rounded-full focus:outline-none"
            placeholder="Search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-5 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="relative">
          {/* Scrollable container for swipeable tags */}
          <div className="flex space-x-2 overflow-x-auto mt-auto custom-scrollbar large py-2">
            <span className="py-2 rounded-full whitespace-nowrap flex-shrink-0" />
            {tags.map((tag, index) => (
              <button
                key={index}
                className={`px-5 py-2 bg-gray-200 text-gray-600 text-xs rounded-full whitespace-nowrap flex-shrink-0 border ${
                  selectedTag === tag
                    ? "bg-green-100 text-gray-500 border-primary"
                    : "bg-white text-gray-500 border-gray-300"
                } hover:border-primary hover:text-primary`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
            <span className="py-2 rounded-full whitespace-nowrap flex-shrink-0" />
          </div>

          <div className="absolute top-0 left-0 h-full w-8 pointer-events-none bg-gradient-to-r from-white"></div>
          <div className="absolute top-0 right-0 h-full w-8 pointer-events-none bg-gradient-to-l from-white"></div>
        </div>

        {/* Blog Cards */}
        {loading ? (
          <BlogSkeleton perPage={perPage} /> // Show the skeleton loader while loading
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <div
                key={index}
                className="h-full" // Make sure each grid item stretches to full height
                onClick={() => handleBlogClick(blog)}
              >
                <BlogCard
                  image_url={blog.image_url}
                  title={blog.title}
                  date={blog.date}
                  subtitle={blog.subtitle}
                  author={blog.author}
                  tags={blog.tags}
                  id={blog.id} // Pass the blog ID
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10">
            <PaginationComponent
              totalPages={totalPages}
              activePage={currentPage}
              setActivePage={setCurrentPage}
            />
          </div>
        )}
      </div>
      <Disclaimer />
    </>
  );
}
