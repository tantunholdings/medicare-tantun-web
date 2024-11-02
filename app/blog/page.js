import React from "react";
import BlogCard from "../../components/BlogCard";
import BlogSkeleton from "../../components/skeleton/BlogSkeleton";

// Main Server-Side Component
export default async function BlogPage({ searchParams }) {
  const currentPage = searchParams?.page ? Number(searchParams.page) : 1;
  const selectedTag = searchParams?.tag || "All";
  const perPage = 6;

  let blogs = [];
  let totalPages = 1;
  let tags = ["All", "Latest"];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FASTAPI_URL}/blogs?page=${currentPage}&page_size=${perPage}&tag=${selectedTag}`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    blogs = data.posts || [];
    totalPages = data.total_pages || 1;

    // Extract unique tags from blog posts
    const allTags = blogs.flatMap((post) => post.tags || []);
    tags = ["All", "Latest", ...new Set(allTags)];
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <div className="container mx-auto my-8 px-6 min-h-screen">

      <div className="relative">
        {/* Scrollable container for swipeable tags */}
        <div className="flex space-x-2 overflow-x-auto mt-auto custom-scrollbar large py-2">
          {tags.map((tag, index) => (
            <a
              key={index}
              href={`/blog?page=1&tag=${tag}`}
              className={`px-5 py-2 text-xs rounded-full whitespace-nowrap flex-shrink-0 border ${
                selectedTag === tag
                  ? "bg-third text-gray-500 border-primary"
                  : "bg-white text-gray-500 border-gray-300"
              } hover:border-primary hover:text-primary`}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

      {/* Blog Cards */}
      {blogs.length === 0 ? (
        <BlogSkeleton perPage={6} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="h-full">
              <BlogCard
                image_url={blog.image_url}
                title={blog.title}
                date={blog.date}
                subtitle={blog.subtitle}
                author={blog.author}
                tags={blog.tags}
                id={blog.id}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <a
              key={index}
              href={`/blog?page=${index + 1}&tag=${selectedTag}`}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {index + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
