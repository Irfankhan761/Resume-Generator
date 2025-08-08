// components/preview/PersonalInfoPreview.tsx

import { Typography } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  CompassOutlined,
  LinkedinOutlined,
  GithubOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import type { PersonalInfo } from "../../types/types";

const { Title, Text } = Typography;

interface PersonalInfoPreviewProps {
  data: PersonalInfo;
}

export const PersonalInfoPreview = ({ data }: PersonalInfoPreviewProps) => {
  return (
    <div className="text-center mb-8 border-b pb-6">
      <Title level={2} className="mb-2">
        {data.fullName || "Full Name"}
      </Title>
      <Title level={4} className="text-gray-600 mb-4">
        {data.jobTitle || "Job Title"}
      </Title>

      <div className="flex justify-center space-x-4 flex-wrap">
        {data.email && (
          <Text className="flex items-center gap-2">
            <MailOutlined /> {data.email}
          </Text>
        )}
        {data.phone && (
          <Text className="flex items-center gap-2">
            <PhoneOutlined /> {data.phone}
          </Text>
        )}
        {data.location && (
          <Text className="flex items-center gap-2">
            <CompassOutlined /> {data.location}
          </Text>
        )}
      </div>

      <div className="flex justify-center space-x-4 mt-2">
        {data.linkedin && (
          <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinOutlined className="text-xl" />
          </a>
        )}
        {data.github && (
          <a href={data.github} target="_blank" rel="noopener noreferrer">
            <GithubOutlined className="text-xl" />
          </a>
        )}
        {data.website && (
          <a href={data.website} target="_blank" rel="noopener noreferrer">
            <GlobalOutlined className="text-xl" />
          </a>
        )}
      </div>

      {data.summary && (
        <div className="mt-4">
          <Title level={3} className="mb-2 flex justify-start">
            About Me
          </Title>
          <div className="text-start">
            <Text>{data.summary}</Text>
          </div>
        </div>
      )}
    </div>
  );
};
