import BlogPage from "@/components/BlogPage";
import CTAButtons from "@/components/CTAButtons";
import { notFound } from "next/navigation";

// ✅ Generate metadata dynamically for each blog post
export async function generateMetadata({ params }) {
  const blogData = await getBlogData(params.id);

  if (!blogData) return notFound();

  return {
    title: blogData.title,
    description: blogData.meta_description || blogData.excerpt || "Read the latest Medicare insights.",
    openGraph: {
      title: blogData.title,
      description: blogData.meta_description || blogData.excerpt || "Read the latest Medicare insights.",
      url: `https://tantunai.com/blog/${params.id}`,
      siteName: "Medicare Blog",
      images: [
        {
          url: blogData.featured_image || "https://tantunai.com/assets/Logo.png",
          width: 1200,
          height: 630,
          alt: blogData.title,
        },
      ],
      type: "article",
      publishedTime: blogData.published_at || new Date().toISOString(),
      
    },
    twitter: {
      card: "summary_large_image",
      title: blogData.title,
      description: blogData.subtitle || blogData.excerpt || "Read the latest Medicare insights.",
      images: [blogData.image_url || "https://tantunai.com/assets/Logo.png"],
    },
  };
}

// ✅ Main Blog Post Component
export default async function BlogDetails({ params }) {
  const { id } = params;

  // Fetch the blog data and recent posts
  const blogData = await getBlogData(id);
  const recentPosts = await getRecentPosts(id);

  if (!blogData) return notFound();

  return (
    <div className="min-h-screen">
        <BlogPage blogData={blogData} recentPosts={recentPosts} />
    </div>
  );
}

// ✅ Fetch blog data from API
async function getBlogData(blogId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/blog/${blogId}`, {
      next: { revalidate: 3600 },
    });
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

// ✅ Fetch recent posts (excluding the current one)
async function getRecentPosts(currentBlogId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/blogs?page=1&page_size=3`, {
      next: { revalidate: 3600 },
    });
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

// ✅ Helper function to reformat blog content
function reformatBlogContent(content) {
  let formattedContent = content.replace(/\r\n/g, ""); // Remove new lines
  formattedContent = formattedContent.replace(/<h([1-6])>/g, '<h$1 style="margin-top: 1.5em;">');
  formattedContent = formattedContent.replace(/<li>/g, '<li style="padding-left: 20px;">');
  return formattedContent.replace(/<p>/g, "");
}
