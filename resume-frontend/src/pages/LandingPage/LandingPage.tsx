import React from "react";
import Navbar from "../Navbar/Navbar";
import ScrollingBanner from "./components/ScrollingBanner";
import HeroSection from "./components/HeroSection";
import { FeatureSection } from "./components/FeatureSection";
import { ImageSection } from "./components/ImageSection";
import { FaqSection } from "./components/FaqSection";
import { CallToAction } from "./components/CallToAction";
import { MotivationalText } from "./components/MotivationalText";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar Component */}
      <Navbar />

      {/* Scrolling Banner */}
      <ScrollingBanner />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Image Section */}
      <ImageSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Call to Action */}
      <CallToAction />

      {/* Motivational Text */}
      <MotivationalText />
    </div>
  );
};

export default LandingPage;

// mmm

// import React from "react";
// import { Card } from "antd";
// import {
//   SmileOutlined,
//   FileTextOutlined,
//   EditOutlined,
//   QuestionCircleOutlined,
// } from "@ant-design/icons";

// const LandingPage: React.FC = () => {
//   const featureCardData = [
//     {
//       icon: "📝",
//       title: "Easy Editing",
//       description: "Update your CV anytime, anywhere.",
//     },
//     {
//       icon: "✨",
//       title: "Modern Designs",
//       description: "Impress recruiters with stylish templates.",
//     },
//     {
//       icon: "🚀",
//       title: "Quick Sharing",
//       description: "Share your CV instantly with potential employers.",
//     },
//     {
//       icon: "🔒",
//       title: "Secure Storage",
//       description:
//         "Your CV is safely stored and accessible whenever you need it.",
//     },
//   ];

//   return (
//     <>
//       <div className="bg-gray-100">
//         <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-16">
//           {[
//             { title: "Easy to Use", icon: <SmileOutlined /> },
//             { title: "Customizable Templates", icon: <EditOutlined /> },
//             { title: "Export Options", icon: <FileTextOutlined /> },
//             { title: "Support", icon: <QuestionCircleOutlined /> },
//           ].map((feature, idx) => (
//             <Card
//               key={idx}
//               className="flex flex-col items-center text-center p-6"
//             >
//               <div className="text-4xl text-blue-500 mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-bold">{feature.title}</h3>
//               <p className="text-gray-600">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               </p>
//             </Card>
//           ))}
//         </div>
//         ;{/* Four Feature Cards */}
//         <div className="container mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {featureCardData.map((card) => (
//             <Card key={card.title} className="text-center">
//               <p className="text-4xl mb-4">{card.icon}</p>
//               <Card.Meta title={card.title} description={card.description} />
//             </Card>
//           ))}
//         </div>
//   {/* Motivational Text */}
//   <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center bg-blue-100 rounded-lg">
//     <div className="md:w-1/2 pr-8">
//       {" "}
//       {/* Adjust width as needed */}
//       <h2 className="text-3xl font-bold text-indigo-600 mb-4">
//         Unleash Your Potential
//       </h2>
//       <p className="text-gray-700">
//         Your dream job is within reach. Create a powerful CV that
//         showcases your skills and experience, opening doors to exciting
//         opportunities.
//       </p>
//     </div>
//     <p className="text-5xl md:w-1/2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
//       Land Your Dream Job
//     </p>
//   </div>
// </div>
//     </>
//   );
// };

// export default LandingPage;

// // chat
