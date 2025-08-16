import { Typography } from 'antd';
import type { Education } from '../../types/types';

const { Title, Text } = Typography;

interface EducationPreviewProps {
  data: Education[];
}

export const EducationPreview = ({ data }: EducationPreviewProps) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md">
      <div className="flex items-center mb-6">
        <Title
          level={3}
          className="!mb-0 !text-xl md:!text-2xl !text-slate-800 !font-medium border-l-4 border-blue-500 pl-3"
        >
          EDUCATION
        </Title>
      </div>

      <div className="space-y-5">
        {data.map((edu) => (
          <div
            key={edu.id}
            className="bg-white rounded-lg p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
              <Text strong className="!text-lg md:!text-xl !text-slate-800">
                {edu.institution}
              </Text>
              <div className="mt-1 md:mt-0">
                <Text className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                  {new Date(edu.startDate).getFullYear()} -{' '}
                  {edu.current
                    ? 'Present'
                    : new Date(edu.endDate).getFullYear()}
                </Text>
              </div>
            </div>

            <div className="mb-2">
              <Text className="!text-base md:!text-lg !text-blue-600 !font-medium">
                {edu.degree} in {edu.field}
              </Text>
              {edu.gpa && (
                <Text className="ml-2 text-slate-700 bg-slate-100 py-1 px-2 rounded text-sm">
                  GPA: {edu.gpa}
                </Text>
              )}
            </div>

            {edu.achievements.length > 0 && (
              <ul className="mt-3 border-t border-gray-100 pt-3 list-disc pl-5 space-y-1.5">
                {edu.achievements.map((achievement, index) => (
                  <li key={index} className="text-slate-700">
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
