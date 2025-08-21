import { Typography } from 'antd';
import { WorkExperience } from '../../types/types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface WorkExperiencePreviewProps {
  data: WorkExperience[];
}

const formatDate = (date: string | null) => {
  if (!date) return 'N/A';
  return dayjs(date).format('MMM YYYY');
};

export const WorkExperiencePreview = ({ data }: WorkExperiencePreviewProps) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md">
      <div className="flex items-center mb-6">
        <Title
          level={3}
          className="!mb-0 !text-xl md:!text-2xl !text-slate-800 !font-medium border-l-4 border-blue-500 pl-3"
        >
          WORK EXPERIENCE
        </Title>
      </div>

      <div className="space-y-5">
        {data.map((exp) => {
          const startDate = formatDate(exp.startDate);
          const endDate = exp.currentlyWorking
            ? 'Present'
            : formatDate(exp.endDate);

          return (
            <div
              key={exp.id}
              className="bg-white rounded-lg p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <Text strong className="!text-lg md:!text-xl !text-slate-800">
                  {exp.position}
                </Text>
                <div className="mt-1 md:mt-0">
                  <Text className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                    {startDate} - {endDate}
                  </Text>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Text className="!text-base !text-blue-600 !font-medium">
                  {exp.company}
                </Text>
                {exp.location && (
                  <Text className="flex items-center text-slate-600 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {exp.location}
                  </Text>
                )}
              </div>

              {exp.description?.length > 0 && (
                <ul className="mt-3 border-t border-gray-100 pt-3 pl-5 space-y-2">
                  {exp.description.map((desc, index) => (
                    <li
                      key={index}
                      className="text-slate-700 relative before:content-['•'] before:absolute before:-left-5 before:text-blue-500 before:text-xl"
                    >
                      {desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
