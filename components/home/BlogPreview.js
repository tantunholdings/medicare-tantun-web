"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import titleShape from "../../public/assets/title-shape.svg";
import Link from "next/link";

const BlogPreview = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const fetchBlogs = async (page) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/blogs?page=${page}&page_size=5`
      );
      const data = await response.json();
      setBlogPosts(data.posts);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  return (
    <section className="container mx-auto py-12 px-4" id="blog-section">
      <h2 className="text-center text-3xl font-bold">Our Blog</h2>
      <div className="flex justify-center mt-5">
        <Image src={titleShape} alt="Title Shape" />
      </div>
      <div className="mt-12">
        {/* Featured Blog */}
        {blogPosts[0] && (
          <Link href={`/blog/${blogPosts[0]?.id}`} passHref>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={
                  blogPosts[0]?.image_url ||
                  "https://fakeimg.pl/600x400?text=TantunAI"
                }
                alt={blogPosts[0]?.title}
                className="object-cover w-full h-64 rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold">{blogPosts[0]?.title}</h3>
                <p className="text-gray-600 mt-2">
                  {blogPosts[0]?.excerpt ||
                    blogPosts[0]?.subtitle ||
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quasi."}
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* Blog List */}
        <div className="mt-8 space-y-4">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              passHref
              className="flex gap-4 items-center"
            >
              <img
                src={
                  post?.image_url ||
                  "https://fakeimg.pl/150x100?text=Placeholder"
                }
                alt={post.title}
                className="object-cover rounded-lg w-24 h-16 flex-shrink-0"
              />
              <div>
                <h4 className="font-semibold text-base">{post.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {post.subtitle || "Short description not available."}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href="/blog"
            className="block text-center rounded-3xl border border-primary px-4 py-2 text-primary hover:bg-blue-50 font-bold mt-4"
          >
            View More →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
