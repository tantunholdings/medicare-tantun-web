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
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-center text-3xl font-bold">Our Blog</h2>
      <div className="flex justify-center mt-5">
        <Image src={titleShape} alt="Title Shape" />
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
      <Link href={`/blog/${blogPosts[0]?.id}`} passHref>
  <div className="relative aspect-square overflow-hidden rounded-lg">
    <img
      src={
        blogPosts[0]?.image_url
          ? blogPosts[0]?.image_url
          : "https://fakeimg.pl/600x400?text=TantunAI"
      }
      alt={blogPosts[0]?.title}
      className="object-cover rounded-lg"
    />
    <h3 className="text-2xl font-bold mt-4">
      {blogPosts[0]?.title || "Lorem ipsum dolor sit amet"}
    </h3>
    <p className="text-gray-600">
      {blogPosts[0]?.excerpt ||
        blogPosts[0]?.subtitle ||
        "Lorem ipsum dolor sit amet consectetur. Tincidunt nisi a est tellus id ultrices viverra quis justo. Ut leo tellus tortor non ipsum quis imperdiet senectus urna. Nulla ac neque aliquet amet. Pharetra neque ut est cras morbi."}
    </p>
  </div>
</Link>

        <div className="space-y-6">
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex gap-4">
                <Link href={`/blog/${post.id}`} passHref className="flex gap-4">
                  <img
                    src={
                      post?.image_url
                    }
                    alt={post.title}
                    className="object-cover rounded-lg w-36 h-24"
                  />
                  <div>
                    <h4 className="font-semibold">{post.title}</h4>
                    <p className="text-sm text-gray-600">{post.subtitle}</p>
                  </div>
                </Link>
              </div>
            ))}
            <Link
              href="/blog"
              className="flex rounded-3xl border border-primary px-4 py-2 text-primary hover:bg-blue-50 font-bold max-w-max"
            >
              View More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
