import { PHONE_NUMBER } from "@/utils/constants";
import { Phone, ChevronDown, ChevronUp, PhoneCall, Lightbulb  } from "lucide-react"; // Import both arrow icons

export default function HeroSectionSSR({ bg, currentBlogIndex, handleContactUsClick, handleScroll, arrowDirection }) {
  // Server-side generated blogPosts
  const blogPosts = [
    { title: "Understanding Medicare Advantage Plans", link: "/blog/6e41fa94-cda2-42ef-8aea-7be749f80513" },
    { title: "Key Factors to Consider When Choosing a Medicare Plan", link: "/blog/0c518cea-abb2-40a4-803c-9df224858516" },
    { title: "Navigating Enrollment and Making the Best Choice", link: "/blog/ab2c8360-11d8-4250-b3c7-fbd6107481f2" },
  ];

  return (
    <>
    <section id="top" className="relative bg-gray-100 mx-5 md:mx-0 px-0 text-white">
      {/* Hero content */}
      <div className="relative z-0 w-full md:px-20 rounded-lg md:rounded-none h-48 md:h-auto"
           style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
        <div className="flex flex-col justify-end h-full">
          <div className="backdrop-blur-md bg-black/20 md:bg-transparent md:backdrop-blur-none px-2 py-2 md:px-5 md:py-20 rounded-md">
            <h1 className="text-sm font-bold tracking-tight md:text-5xl md:max-w-xl">
              Need Help with Medicare Plans? We're Just a Call Away!
            </h1>
            <p className="md:mt-6 text-xs md:text-lg font-light">
              Medicare Plans can be confusing, but our licensed experts make it easy.
              <br className="hidden md:block" />
              Call now for help with enrolling today.
            </p>
            <button 
                onClick={handleContactUsClick}
                className="max-w-max hidden md:flex mt-8 items-center bg-primary px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 rounded-3xl"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact us for Medicare Plans Help!
            </button>
          </div>
        </div>
      </div>

        {/* Blog Carousel */}
        <div className="my-1 bg-gradient-to-r from-gray-100 to-blue-50 border border-blue-300 rounded-lg py-2 px-4 md:py-2 md:px-8 shadow-lg md:shadow-2xl animate-fade-in w-full mx-auto relative mb-0">
            <h2 className="flex items-center justify-center font-bold text-lg md:text-2xl mb-2 md:mb-2 text-blue-900 tracking-wide">
                <Lightbulb className="text-blue-900 h-5 w-5 md:h-6 md:w-6 mr-2" />
                Latest Medicare Plans Insights
            </h2>
            <div className="px-4 py-3 bg-white rounded-md md:rounded-lg shadow-md md:hover:shadow-xl transition-shadow duration-300 relative">
                <a href={blogPosts[currentBlogIndex].link} className="block hover:underline">
                    <h3 className="flex items-center justify-center text-blue-900 font-bold text-lg md:text-xl mt-2 mb-1 hover:text-blue-700 text-center text-shadow-lg">
                        {blogPosts[currentBlogIndex].title}
                        {/* Clickable icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 ml-2 text-blue-700"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </h3>
                    <p className="text-gray-600 text-sm md:text-md italic text-center mb-3">
                        Explore key topics and insights to help you make informed decisions about Medicare Plans.
                    </p>
                </a>
            </div>
        </div>

      
      {/* Blinking and Centered Button */}
      <button
          onClick={handleScroll}
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-full shadow-lg animate-blink z-50"
        >
          {arrowDirection === "down" ? (
            <ChevronDown className="h-6 w-6" />
          ) : (
            <ChevronUp className="h-6 w-6" />
          )}
        </button>
    </section>
    <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1.5s infinite;
        }
         @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in-out;
        } 
          scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .text-shadow-lg {
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }
      `}</style>
</>
  );
}
