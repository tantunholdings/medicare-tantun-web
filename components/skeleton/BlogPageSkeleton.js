const BlogPageSkeleton = () => {
  return (
    <div className="bg-white p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Main Blog Content Skeleton */}
        <div className="w-full lg:w-2/3 p-6">
          <div className="relative">
            <div className="w-full h-96 bg-gray-200 rounded-3xl animate-pulse"></div>
            {/* Overlapping div skeleton */}
            <div className="bg-white relative left-0 right-0 top-[90%] px-6 py-4 mx-auto rounded-3xl shadow-lg animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded mb-2 w-1/2"></div>
              <div className="flex justify-between items-center pb-4">
                <div className="flex space-x-2 mt-auto">
                  <div className="px-4 py-2 bg-gray-300 text-gray-600 text-xs rounded-full whitespace-nowrap"></div>
                  <div className="px-4 py-2 bg-gray-300 text-gray-600 text-xs rounded-full whitespace-nowrap"></div>
                </div>
                <span className="h-4 bg-gray-300 w-20"></span>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            </div>
          </div>
        </div>

        {/* Recent Posts Skeleton */}
        <div className="w-full lg:w-1/3 p-6">
          <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
          <div className="space-y-4">
            {[...Array(2)].map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-200 p-4 rounded-lg shadow-md animate-pulse"
              >
                <div className="h-24 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageSkeleton;
