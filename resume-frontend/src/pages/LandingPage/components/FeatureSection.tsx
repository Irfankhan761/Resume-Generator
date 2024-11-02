import {
  StarOutlined,
  RocketOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Card } from "antd";

export const FeatureSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <StarOutlined className="text-4xl text-blue-500" />,
            title: "Professional Templates",
            description:
              "Choose from expertly designed templates tailored for your industry.",
          },
          {
            icon: <RocketOutlined className="text-4xl text-green-500" />,
            title: "AI-Powered Suggestions",
            description:
              "Get smart recommendations to enhance your resume's impact.",
          },
          {
            icon: <CheckCircleOutlined className="text-4xl text-purple-500" />,
            title: "Instant Feedback",
            description: "Receive real-time suggestions to improve your CV.",
          },
        ].map((feature, index) => (
          <Card
            key={index}
            className="text-center hover:shadow-lg transition-shadow"
            cover={
              <div className="pt-6 flex justify-center">{feature.icon}</div>
            }
          >
            <Card.Meta
              title={
                <div className="text-xl font-semibold">{feature.title}</div>
              }
              description={feature.description}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};
