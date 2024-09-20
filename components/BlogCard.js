"use client"; // Ensure this is a client-side component

import React from "react";
import Link from "next/link";

export default function BlogCard({
  image_url,
  title,
  date,
  subtitle,
  author,
  tags,
  id, // Use `id` for dynamic routing
}) {
  return (
    <Link href={`/blog/${id}`} passHref>
      <div className="cursor-pointer bg-white p-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:bg-gray-50">
        <div className="mb-4">
          <img
            src={
              image_url
                ? image_url
                : "https://via.placeholder.com/600x400?text=No+Image" // Fallback if no image is provided
            }
            alt={title}
            className="object-cover rounded-lg w-full h-[240px]" // Sets a fixed height and width
          />
        </div>
        <p className="text-gray-500 mb-1 text-sm">{date}</p>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{subtitle}</p>
        <p className="text-gray-500 text-sm mb-2">{author}</p>
        <div className="flex space-x-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
