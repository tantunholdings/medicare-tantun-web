import PropTypes from "prop-types";
import BlogCard from "./BlogCard";
import BlogPageSkeleton from "./skeleton/BlogPageSkeleton";
import CTAButtons from "@/components/CTAButtons";


export default function BlogPage({ blogData, recentPosts }) {
  if (!blogData) return <BlogPageSkeleton />;

  const { title, subtitle, author, tags, content, date, image_url } = blogData;

  return (
    <div className="bg-white p-6">
      <div className="w-full lg:max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row gap-8 px-3 md:px-8 lg:px-16 py-6">
        <div className="w-full lg:w-2/3 p-4 md:p-6">
          <div className="relative">
             
             {/* ✅ Call to Action Section at the Top */}
             <CTAButtons position="top" />

            <div className="bg-white relative left-0 right-0 top-[90%] px-6 pb-4 mx-auto rounded-3xl ">
              <h1 className="text-4xl font-bold mb-2 text-primaryBlack">{title}</h1>
              <h2 className="text-2xl font-light  mb-2 text-primaryBlack leading-none">{subtitle}</h2>
              <img
              src={
                image_url ||
                "https://static.toiimg.com/thumb/width-600,height-400,msid-45454098.cms"
              }
              alt={title}
              className="w-full h-[250px] md:h-[350px] lg:h-96 object-cover my-5"
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
                className="text-primaryBlack text-base md:text-lg leading-relaxed text-justify mb-4"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
              <div className="text-textGray mb-2">Written by {author}</div>
            </div>
            {/* ✅ CTA at the Bottom */}
            <h2 className="text-3xl font-semibold text-gray-900 mt-10 mb-6 text-center">How Can We Help?</h2>
            <CTAButtons position="bottom" />
          </div>
        </div>
        
        


        <div className="w-full lg:w-1/3 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-primaryBlack">Recent Posts</h2>
          {recentPosts.length > 0 ? (
            <div className="flex flex-col space-y-4">
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
