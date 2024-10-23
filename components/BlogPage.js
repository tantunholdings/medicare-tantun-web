import PropTypes from "prop-types";
import BlogCard from "./BlogCard";
import BlogPageSkeleton from "./skeleton/BlogPageSkeleton";

export default function BlogPage({ blogData, recentPosts }) {
  if (!blogData) return <BlogPageSkeleton />;

  const { title, subtitle, author, tags, content, date, image_url } = blogData;

  return (
    <div className="bg-white p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 p-6 relative">
          <div className="relative">
            
            <div className="bg-white relative left-0 right-0 top-[90%] px-6 pb-4 mx-auto rounded-3xl ">
              <h1 className="text-3xl font-bold mb-2 text-primaryBlack">{title}</h1>
              <h2 className="text-xl  mb-2 text-primaryBlack leading-none">{subtitle}</h2>
              <img
              src={
                image_url ||
                "https://static.toiimg.com/thumb/width-600,height-400,msid-45454098.cms"
              }
              alt={title}
              className="w-full h-96 object-cover my-5 mt-8"
            />
              <div className="flex justify-between items-center pb-4">
                <div className="flex space-x-2 overflow-x-auto mt-auto">
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
              <div
                className="text-primaryBlack mb-4"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
              <div className="text-textGray mb-2">Written by {author}</div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 p-6">
          <h2 className="text-xl font-bold mb-4 text-primaryBlack">Recent Posts</h2>
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {recentPosts.map((post, idx) => (
                <div key={idx} className="mb-4">
                  <BlogCard {...post} />
                </div>
              ))}
            </div>
          ) : (
            <p>No recent posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

BlogPage.propTypes = {
  blogData: PropTypes.object,
  recentPosts: PropTypes.arrayOf(PropTypes.object),
};
