// pages/blog/page.tsx
"use client"; // Ensure this is a client-side component

import React, { useState } from "react";
import Navbar from "../../components/Navbar"; // Import Navbar component
import BlogCard from "../../components/BlogCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  const blogs = [
    {
      image:
        "https://static.toiimg.com/thumb/width-600,height-400,msid-45454098.cms",
      title: "How to collaborate makes us better designers",
      date: "18 Jan 2024",
      content:
        "Collaboration can make our teams stronger and our individual designs better.",
      author: "Brooklyn Simmons",
      tags: ["AI", "Doctor"],
    },
    {
      image:
        "https://static.toiimg.com/thumb/width-600,height-400,msid-45454098.cms",
      title: "AI is changing the insurance landscape",
      date: "22 Jan 2024",
      content:
        "Artificial intelligence is transforming how insurance companies operate.",
      author: "Dianne Russell",
      tags: ["Insurance", "AI"],
    },
    {
      image:
        "https://static.toiimg.com/thumb/width-600,height-400,msid-45454098.cms",
      title: "Understanding the basics of health insurance",
      date: "25 Jan 2024",
      content: "Health insurance helps cover the cost of medical expenses.",
      author: "Robert Fox",
      tags: ["Insurance", "Doctor"],
    },
    // Add more blogs here...
  ];

  // Function to filter blogs by tags
  const filteredBlogs = blogs.filter((blog) => {
    if (selectedTag === "All") return true;
    return blog.tags.includes(selectedTag);
  });

  const tags = ["All", "Latest", "AI", "Insurance", "Doctor"];

  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <div className="container mx-auto mt-8 px-6">
        {/* Filter buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full border ${
                  selectedTag === tag
                    ? "bg-primary text-white border-green-500"
                    : "bg-white text-gray-500 border-gray-300"
                }`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              className="px-4 py-2 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Search"
              type="text"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <BlogCard
              key={index}
              image={blog.image}
              title={blog.title}
              date={blog.date}
              content={blog.content}
              author={blog.author}
              tags={blog.tags}
            />
          ))}
        </div>
      </div>
    </>
  );
}
