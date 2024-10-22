import Navbar from "@/components/Navbar";
import BlogPage from "@/components/BlogPage";
import Disclaimer from "@/components/Disclaimer";

// This component is an async server component
export default async function BlogDetails({ params }) {
  const { id } = params; // Extract the blog ID from the URL

  // Fetch the blog data and recent posts
  const blogData = await getBlogData(id);
  const recentPosts = await getRecentPosts(id);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <BlogPage blogData={blogData} recentPosts={recentPosts} />
      </div>
      <Disclaimer />
    </>
  );
}

// Helper to fetch blog data
async function getBlogData(blogId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FASTAPI_URL}/blog/${blogId}`
      , { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    if (data && data.blog) {
      return {
        ...data.blog,
        content: reformatBlogContent(data.blog.content),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

// Helper to fetch recent posts
async function getRecentPosts(currentBlogId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FASTAPI_URL}/blogs?page=1&page_size=3`,
      { cache: "no-store" }
    );
    const data = await response.json();
    if (data && data.posts) {
      return data.posts.filter((post) => post.id !== currentBlogId).slice(0, 2);
    }
    return [];
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

// Helper to reformat blog content
function reformatBlogContent(content) {
  let formattedContent = content.replace(/\r\n/g, ""); // Remove new lines
  formattedContent = formattedContent.replace(
    /<h([1-6])>/g,
    '<h$1 style="margin-top: 1.5em;">'
  );
  formattedContent = formattedContent.replace(
    /<li>/g,
    '<li style="padding-left: 20px;">'
  );
  return formattedContent.replace(/<p>/g, "");
}
