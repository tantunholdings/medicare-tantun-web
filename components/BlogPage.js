"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BlogCard from "./BlogCard";
import BlogPageSkeleton from "./skeleton/BlogPageSkeleton"; // Import the skeleton

export default function BlogPage({ blogId }) {
  const [blogData, setBlogData] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  function reformatBlogContent(content) {
    // Step 1: Remove new lines
    let formattedContent = content.replace(/\r\n/g, ""); // Remove \r\n new lines

    // Step 2: Add top margin to heading tags (h1, h2, h3, h4, h5, h6)
    formattedContent = formattedContent.replace(
      /<h([1-6])>/g,
      '<h$1 style="margin-top: 1.5em;">'
    );

    // Step 3: Indent list items (li)
    formattedContent = formattedContent.replace(
      /<li>/g,
      '<li style="padding-left: 20px;">'
    );

    // Step 4: Add small margin before and after paragraphs (p)
    formattedContent = formattedContent.replace(/<p>/g, "");

    return formattedContent;
  }

  // Fetch blog data by ID
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_URL}/blog/${blogId}`
        );
        const data = await response.json();
        if (data && data.blog) {
          // Reformat the content
          const formattedContent = reformatBlogContent(data.blog.content);

          // Set the blog data with the formatted content
          setBlogData({ ...data.blog, content: formattedContent });
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogData();
  }, [blogId]);

  // Fetch recent posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_URL}/blogs?page=1&page_size=3`
        );
        const data = await response.json();
        if (data && data.posts) {
          // Set the first two posts from the fetched data
          setRecentPosts(
            data.posts.filter((blog) => blog.id !== blogId).slice(0, 2)
          );
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchRecentPosts();
  }, []);

  // Show skeleton if loading
  if (loading) {
    return <BlogPageSkeleton />; // Show skeleton loader while data is loading
  }

  const { title, subtitle, author, tags, content, date, image_url } = blogData;

  return (
    <div className="bg-white p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Main Blog Content */}
        <div className="w-full lg:w-2/3 p-6 relative">
          <div className="relative">
            <img
              src={
                image_url
                  ? image_url
                  : "https://static.toiimg.com/thumb/width-600,height-400,msid-45454098.cms" // Fallback if no image is provided
              }
              alt={title}
              className="w-full h-96 object-cover rounded-3xl"
            />
            {/* Overlapping div */}
            <div className="bg-white relative left-0 right-0 top-[90%] px-6 py-4 mx-auto rounded-3xl shadow-lg">
              <h1 className="text-3xl font-bold mb-2 text-primaryBlack">
                {title}
              </h1>
              <h2 className="text-xl font-semibold mb-2 text-primaryBlack">
                {subtitle}
              </h2>
              <div className="flex justify-between items-center pb-4">
                <div className="flex space-x-2 overflow-x-auto mt-auto">
                  {" "}
                  {/* Ensure tags are at the bottom */}
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-textGray">{date}</span>
              </div>
              {/* Render content as HTML */}
              <div
                className="text-primaryBlack mb-4"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
              <div className="text-textGray mb-2">Written by {author}</div>
            </div>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="w-full lg:w-1/3 p-6">
          <h2 className="text-xl font-bold mb-4 text-primaryBlack">
            Recent Posts
          </h2>
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {recentPosts.map((post, idx) => (
                <div key={idx} className="mb-4">
                  <BlogCard
                    image_url={post.image_url}
                    title={post.title}
                    date={post.date}
                    subtitle={post.subtitle}
                    author={post.author}
                    tags={post.tags}
                    id={post.id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>Loading recent posts...</p>
          )}
        </div>
      </div>
    </div>
  );
}

// PropTypes validation for BlogPage
BlogPage.propTypes = {
  blogId: PropTypes.string.isRequired,
};
