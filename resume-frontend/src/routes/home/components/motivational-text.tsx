import { ArrowRightOutlined } from "@ant-design/icons";

export const MotivationalText: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50 py-12">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>

      {/* Main container */}
      <div className="container mx-auto px-4">
        <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row">
            {/* Text content */}
            <div className="lg:w-1/2 p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Land Your Dream Job
                </span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Create a professional CV that gets you noticed. Our tools help
                you showcase your skills and stand out from the competition.
              </p>

              <button
                className="h-12 px-8 font-medium bg-gradient-to-r from-blue-600 to-blue-500 
                border-none shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]
                flex items-center justify-center gap-2 text-white rounded-lg text-base"
              >
                <span>Build Your CV Now</span>
                <ArrowRightOutlined className="text-sm" />
              </button>

              {/* Trust indicators */}
              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((item) => (
                    <img
                      key={item}
                      src={`https://randomuser.me/api/portraits/${
                        item % 2 === 0 ? "women" : "men"
                      }/${item}0.jpg`}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User"
                    />
                  ))}
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs ml-1 text-gray-500">4.9 (2k)</span>
                </div>
              </div>
            </div>

            {/* Image section with face clearly visible */}
            <div className="lg:w-1/2 md:h-80 relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&facepad=3"
                alt="Professional woman with documents"
                className="w-full h-full object-cover object-left-top"
                style={{ objectPosition: "left 25%" }}
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm text-sm">
                <div className="flex items-center gap-1">
                  <div className="bg-green-100 p-1 rounded-full">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">85% Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
