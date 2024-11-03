import { Button, Typography } from "antd";
import { FileAddOutlined, FileTextOutlined } from "@ant-design/icons";

const HeroSection: React.FC = () => {
  const { Paragraph } = Typography;
  return (
    <div className="container mx-auto px-4 pt-16 text-center">
      <div
        className="text-4xl md:text-6xl font-bold mb-4 text-gray-900
      bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
      >
        <h1>Create Your Perfect CV in Minutes</h1>
      </div>
      <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Transform your professional story with our AI-powered CV builder. Craft
        compelling resumes that stand out and land your dream job.
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
  );
};

export default HeroSection;
