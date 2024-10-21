// In FaqSkeleton.js (or .jsx)
const FaqSkeleton = ({perPage}) => {
  return (
    <div className="space-y-6 mx-auto animate-pulse">
      {[...Array(perPage)].map((_, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
        </div>
      ))}
    </div>
  );
};

export default FaqSkeleton; // Make sure you're exporting it as default
