import React, { useEffect, useRef } from "react";
import { Button, Card, Collapse, Typography } from "antd";
import {
  FileAddOutlined,
  FileTextOutlined,
  SmileOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  StarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Navbar from "../Navbar/Navbar";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const AnimatedFeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
}> = ({
  icon,
  title,
  description,
  gradient = "from-blue-500 to-purple-600",
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      ></div>
      <Card
        className="h-full flex flex-col items-center text-center p-6 bg-white border-none shadow-lg"
        hoverable
      >
        <div
          className={`text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </Card>
    </div>
  );
};

const ScrollingBanner: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gray-100 py-4">
      <div className="animate-scrolling-banner whitespace-nowrap">
        <div className="inline-block space-x-8 text-xl font-semibold text-gray-700">
          <span>🚀 Create Professional CVs</span>
          <span>✨ AI-Powered Suggestions</span>
          <span>📄 Multiple Templates</span>
          <span>🔒 Secure Storage</span>
          <span>🌟 Easy Sharing</span>
        </div>
        <div className="inline-block space-x-8 text-xl font-semibold text-gray-700">
          <span>🚀 Create Professional CVs</span>
          <span>✨ AI-Powered Suggestions</span>
          <span>📄 Multiple Templates</span>
          <span>🔒 Secure Storage</span>
          <span>🌟 Easy Sharing</span>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const featureData = [
    {
      icon: <SmileOutlined />,
      title: "User-Friendly Interface",
      description: "Intuitive design that makes CV creation a breeze.",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: <EditOutlined />,
      title: "Dynamic Customization",
      description: "Personalize every aspect of your professional profile.",
      gradient: "from-pink-500 to-red-600",
    },
    {
      icon: <FileTextOutlined />,
      title: "Multiple Export Options",
      description: "Download in PDF, DOCX, and more formats.",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: <QuestionCircleOutlined />,
      title: "24/7 Expert Support",
      description: "Get help anytime with our dedicated support team.",
      gradient: "from-orange-500 to-yellow-600",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Scrolling Banner */}
      <ScrollingBanner />

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 text-center">
        <Title
          level={1}
          className="text-4xl md:text-6xl font-bold mb-4 text-gray-900
          bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Create Your Perfect CV in Minutes
        </Title>
        <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Transform your professional story with our AI-powered CV builder.
          Craft compelling resumes that stand out and land your dream job.
        </Paragraph>
        <div className="flex justify-center space-x-4">
          <Button
            type="primary"
            size="large"
            icon={<FileAddOutlined />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Import Existing Resume
          </Button>
          <Button
            type="default"
            size="large"
            icon={<FileTextOutlined />}
            className="border-blue-600 text-blue-600 hover:border-blue-700"
          >
            Create New CV
          </Button>
        </div>
      </div>

      {/* Advanced Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {featureData.map((feature, index) => (
            <AnimatedFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>

      {/* Rest of the previous landing page content remains the same */}
      {/* ... (previous sections) ... */}
    </div>
  );
};

export default LandingPage;

// import React from "react";
// import { Button, Card, Collapse, Typography } from "antd";
// import {
//   FileAddOutlined,
//   FileTextOutlined,
//   StarOutlined,
//   RocketOutlined,
//   CheckCircleOutlined,
// } from "@ant-design/icons";
// import Navbar from "../Navbar/Navbar";

// const { Title, Paragraph } = Typography;
// const { Panel } = Collapse;

// const LandingPage: React.FC = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Navbar Component */}
//       <Navbar />

//       {/* Hero Section */}
//       <div className="container mx-auto px-4 pt-16 text-center">
//         <Title
//           level={1}
//           className="text-4xl md:text-6xl font-bold mb-4 text-gray-900
//           bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
//         >
//           Create Your Perfect CV in Minutes
//         </Title>
//         <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
//           Transform your professional story with our AI-powered CV builder.
//           Craft compelling resumes that stand out and land your dream job.
//         </Paragraph>
//         <div className="flex justify-center space-x-4">
//           <Button
//             type="primary"
//             size="large"
//             icon={<FileAddOutlined />}
//             className="bg-blue-600 hover:bg-blue-700"
//           >
//             Import Existing Resume
//           </Button>
//           <Button
//             type="default"
//             size="large"
//             icon={<FileTextOutlined />}
//             className="border-blue-600 text-blue-600 hover:border-blue-700"
//           >
//             Create New CV
//           </Button>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid md:grid-cols-3 gap-6">
//           {[
//             {
//               icon: <StarOutlined className="text-4xl text-blue-500" />,
//               title: "Professional Templates",
//               description:
//                 "Choose from expertly designed templates tailored for your industry.",
//             },
//             {
//               icon: <RocketOutlined className="text-4xl text-green-500" />,
//               title: "AI-Powered Suggestions",
//               description:
//                 "Get smart recommendations to enhance your resume's impact.",
//             },
//             {
//               icon: (
//                 <CheckCircleOutlined className="text-4xl text-purple-500" />
//               ),
//               title: "Instant Feedback",
//               description: "Receive real-time suggestions to improve your CV.",
//             },
//           ].map((feature, index) => (
//             <Card
//               key={index}
//               className="text-center hover:shadow-lg transition-shadow"
//               cover={
//                 <div className="pt-6 flex justify-center">{feature.icon}</div>
//               }
//             >
//               <Card.Meta
//                 title={
//                   <div className="text-xl font-semibold">{feature.title}</div>
//                 }
//                 description={feature.description}
//               />
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Image and Text Sections */}
//       <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-12">
//         <img
//           src="https://picsum.photos/600"
//           alt="CV Builder"
//           className="rounded-lg shadow-lg w-full"
//         />
//         <div>
//           <Title level={2} className="text-3xl mb-4 text-gray-800">
//             Elevate Your Professional Brand
//           </Title>
//           <Paragraph className="text-lg text-gray-600 mb-6">
//             Our CV builder combines cutting-edge AI technology with professional
//             design principles to help you create a resume that truly reflects
//             your potential.
//           </Paragraph>
//           <Button
//             type="primary"
//             size="large"
//             className="bg-gradient-to-r from-blue-500 to-purple-600"
//           >
//             Try Now
//           </Button>
//         </div>
//       </div>

//       {/* Reverse Layout Section */}
//       <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-12">
//         <div className="md:order-2">
//           <img
//             src="https://picsum.photos/601"
//             alt="Professional Resume"
//             className="rounded-lg shadow-lg w-full"
//           />
//         </div>
//         <div className="md:order-1">
//           <Title level={2} className="text-3xl mb-4 text-gray-800">
//             Stand Out from the Crowd
//           </Title>
//           <Paragraph className="text-lg text-gray-600 mb-6">
//             With our intuitive platform, you'll create a resume that catches
//             recruiters' attention and showcases your unique professional
//             journey.
//           </Paragraph>
//           <Button
//             type="default"
//             size="large"
//             className="border-blue-600 text-blue-600 hover:border-blue-700"
//           >
//             Get Started
//           </Button>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
//         <div>
//           <Title level={2} className="text-3xl mb-6 text-gray-800">
//             Frequently Asked Questions
//           </Title>
//           <Collapse accordion>
//             {[
//               {
//                 header: "How long does it take to create a CV?",
//                 content:
//                   "With our platform, you can create a professional CV in just 15-30 minutes.",
//               },
//               {
//                 header: "Is my information secure?",
//                 content:
//                   "We use top-tier encryption to protect your personal and professional data.",
//               },
//               {
//                 header: "Can I download my CV?",
//                 content:
//                   "Yes! You can download your CV in multiple formats including PDF and DOCX.",
//               },
//             ].map((faq, index) => (
//               <Panel key={index} header={faq.header} className="mb-2">
//                 <p>{faq.content}</p>
//               </Panel>
//             ))}
//           </Collapse>
//         </div>
//         <img
//           src="https://picsum.photos/602"
//           alt="FAQs"
//           className="rounded-lg shadow-lg w-full h-[500px] object-cover"
//         />
//       </div>

//       {/* Call to Action */}
//       <div
//         className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20
//         bg-cover bg-center"
//         style={{
//           backgroundImage: `url('https://picsum.photos/1200/600')`,
//           backgroundBlendMode: "overlay",
//         }}
//       >
//         <Title level={2} className="text-4xl mb-4 text-white">
//           Ready to Build Your Dream CV?
//         </Title>
//         <Paragraph className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
//           Start your journey to professional success today. Create a standout CV
//           that opens doors to new opportunities.
//         </Paragraph>
//         <Button
//           type="primary"
//           size="large"
//           className="bg-white text-blue-600 hover:text-blue-700"
//         >
//           Create Your CV Now
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

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
//         {/* Motivational Text */}
//         <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center bg-blue-100 rounded-lg">
//           <div className="md:w-1/2 pr-8">
//             {" "}
//             {/* Adjust width as needed */}
//             <h2 className="text-3xl font-bold text-indigo-600 mb-4">
//               Unleash Your Potential
//             </h2>
//             <p className="text-gray-700">
//               Your dream job is within reach. Create a powerful CV that
//               showcases your skills and experience, opening doors to exciting
//               opportunities.
//             </p>
//           </div>
//           <p className="text-5xl md:w-1/2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
//             Land Your Dream Job
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LandingPage;

// // chat
