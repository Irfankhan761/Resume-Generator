import { Button, Typography } from "antd";
import React from "react";

export const ImageSection: React.FC = () => {
  const { Title, Paragraph } = Typography;
  return (
    <>
      {/* Image and Text Sections */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-12">
        <img
          src="https://picsum.photos/300"
          alt="CV Builder"
          className="rounded-lg shadow-lg w-full h-72"
        />
        <div>
          <Title level={2} className="text-3xl mb-4 text-gray-800">
            Elevate Your Professional Brand
          </Title>
          <Paragraph className="text-lg text-gray-600 mb-6">
            Our CV builder combines cutting-edge AI technology with professional
            design principles to help you create a resume that truly reflects
            your potential.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Try Now
          </Button>
        </div>
      </div>
      {/* Reverse Layout Section */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-12">
        <div className="md:order-2">
          <img
            src="https://picsum.photos/300"
            alt="Professional Resume"
            className="rounded-lg shadow-lg w-full  h-72"
          />
        </div>
        <div className="md:order-1">
          <Title level={2} className="text-3xl mb-4 text-gray-800">
            Stand Out from the Crowd
          </Title>
          <Paragraph className="text-lg text-gray-600 mb-6">
            With our intuitive platform, you'll create a resume that catches
            recruiters' attention and showcases your unique professional
            journey.
          </Paragraph>
          <Button
            type="default"
            size="large"
            className="border-blue-600 text-blue-600 hover:border-blue-700"
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
};
