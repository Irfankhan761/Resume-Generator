import { Typography } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  CompassOutlined,
  LinkedinOutlined,
  GithubOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import type { PersonalInfo } from '../../types/types';

const { Title, Text } = Typography;

interface PersonalInfoPreviewProps {
  data: PersonalInfo;
}

export const PersonalInfoPreview = ({ data }: PersonalInfoPreviewProps) => {
  return (
    <div className="text-center mb-8 pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md">
      {/* Name & Title Section */}
      <div className="mb-6">
        <Title
          level={1}
          className="!mb-1 !text-3xl md:!text-4xl font-bold !text-slate-800"
        >
          {data.fullName || 'Full Name'}
        </Title>
        <div className="h-1 w-16 bg-blue-500 mx-auto my-3 rounded-full"></div>
        <Title
          level={3}
          className="!mt-2 !text-lg md:!text-xl font-medium !text-blue-600"
        >
          {data.jobTitle || 'Job Title'}
        </Title>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-5">
        {data.email && (
          <Text className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors">
            <MailOutlined className="text-blue-500" />
            <span>{data.email}</span>
          </Text>
        )}
        {data.phone && (
          <Text className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors">
            <PhoneOutlined className="text-blue-500" />
            <span>{data.phone}</span>
          </Text>
        )}
        {data.location && (
          <Text className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors">
            <CompassOutlined className="text-blue-500" />
            <span>{data.location}</span>
          </Text>
        )}
      </div>

      <div className="flex justify-center gap-5 mb-6">
        {data.linkedin && (
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:shadow-md transition-all hover:scale-110 text-blue-600"
          >
            <LinkedinOutlined className="text-xl" />
          </a>
        )}
        {data.github && (
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:shadow-md transition-all hover:scale-110 text-slate-800"
          >
            <GithubOutlined className="text-xl" />
          </a>
        )}
        {data.website && (
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:shadow-md transition-all hover:scale-110 text-teal-500"
          >
            <GlobalOutlined className="text-xl" />
          </a>
        )}
      </div>

      {data.summary && (
        <div className="mt-6 text-left bg-white p-5 rounded-lg shadow-sm">
          <Title
            level={4}
            className="!mb-3 !text-slate-800 !font-medium border-l-4 border-blue-500 pl-3 !text-base md:!text-lg"
          >
            ABOUT ME
          </Title>
          <Text className="text-slate-600 leading-relaxed">{data.summary}</Text>
        </div>
      )}
    </div>
  );
};
