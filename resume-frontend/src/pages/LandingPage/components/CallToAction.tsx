import { Button, Typography } from "antd";

export const CallToAction: React.FC = () => {
  const { Title, Paragraph } = Typography;
  return (
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20
    bg-cover bg-center"
      style={{
        backgroundImage: `url('https://picsum.photos/1200/600')`,
        backgroundBlendMode: "overlay",
      }}
    >
      <Title level={2} className="text-4xl mb-4 text-white">
        Ready to Build Your Dream CV?
      </Title>
      <Paragraph className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
        Start your journey to professional success today. Create a standout CV
        that opens doors to new opportunities.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        className="bg-white text-blue-600 hover:text-blue-700"
      >
        Create Your CV Now
      </Button>
    </div>
  );
};
