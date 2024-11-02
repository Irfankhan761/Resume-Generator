export const MotivationalText: React.FC = () => {
  return (
    <>
      {/* Motivational Text */}
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center bg-blue-100 rounded-lg">
        <div className="md:w-1/2 pr-8">
          {" "}
          {/* Adjust width as needed */}
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            Unleash Your Potential
          </h2>
          <p className="text-gray-700">
            Your dream job is within reach. Create a powerful CV that showcases
            your skills and experience, opening doors to exciting opportunities.
          </p>
        </div>
        <p className="text-5xl md:w-1/2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Land Your Dream Job
        </p>
      </div>
    </>
  );
};
