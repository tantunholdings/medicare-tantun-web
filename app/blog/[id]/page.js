"use client"; // Ensure this is a client-side component

import Navbar from "../../../components/Navbar";
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import BlogPage from "../../../components/BlogPage";

export default function BlogDetails() {
  const { id } = useParams(); // Get the blog ID from the URL

  // Render the blog page using the fetched blog data
  return (
    <>
      <Navbar />
      <div>
        <BlogPage blogId={id} />
      </div>
    </>
  );
}
