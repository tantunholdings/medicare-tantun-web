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

  const tags = ["All", "Latest", "AI", "Insurance", "Doctor"]; // Removed duplicate 'All'

  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <div className="container mx-auto mt-8 px-6">
        {/* Search Bar and Tags in Desktop View */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          {/* Tags with vertical and horizontal spacing */}
          <div className="flex flex-wrap justify-center space-x-4 space-y-0.5 ">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-5 py-2 rounded-full border text-sm font-medium ${
                  selectedTag === tag
                    ? "bg-green-100 text-gray-500 border-primary"
                    : "bg-white text-gray-500 border-gray-300"
                } hover:border-primary hover:text-primary`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Bar aligned to the right in Desktop view */}
          <div className="relative mt-4 md:mt-0 w-full md:w-1/3 lg:w-1/4">
            <input
              className="w-full px-8 py-2 pl-12 bg-white border border-gray-300 rounded-full focus:outline-none"
              placeholder="Search"
              type="text"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-5 -translate-y-1/2 text-gray-400"
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
