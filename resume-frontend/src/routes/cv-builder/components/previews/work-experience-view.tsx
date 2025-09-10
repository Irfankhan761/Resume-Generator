import { Typography } from 'antd';
import type { WorkExperience } from '../../types/types';
import dayjs from 'dayjs';
import { CompassOutlined, CarryOutOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface WorkExperiencePreviewProps {
  data: WorkExperience[];
}

export const WorkExperiencePreview = ({ data }: WorkExperiencePreviewProps) => {
  const formatDate = (date: string | null | undefined) => {
    if (!date) return '';
    return dayjs(date).format('MMM YYYY');
  };

  const hasExperienceData = data && data.length > 0;

  return (
    <div className="relative print:break-inside-avoid mt-4">
      {/* Decorative background elements */}
      <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl print:hidden"></div>
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-indigo-100 rounded-full opacity-40 blur-lg print:hidden"></div>

      <div className="relative bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-lg print:shadow-none print:border-gray-300">
        {/* Section Title */}
        <div className="flex items-center mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 print:bg-gray-400"></div>
          <Title
            level={4}
            className="!mb-0 !text-gray-800 !font-semibold !text-base md:!text-lg tracking-wide uppercase print:!text-black"
          >
            Work Experience
          </Title>
        </div>

        {/* Experience List */}
        <div className="space-y-6">
          {hasExperienceData ? (
            data.map((exp) => {
              const startDate = formatDate(exp.startDate);
              const endDate = exp.currentlyWorking
                ? 'Present'
                : formatDate(exp.endDate);

              return (
                <div
                  key={exp.id}
                  className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 print:shadow-none print:border-gray-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                    <div className="flex-grow">
                      <Text className="text-lg font-semibold text-gray-800 block">
                        {exp.position || (
                          <span className="text-gray-400 italic">Position</span>
                        )}
                      </Text>
                      <div className="flex items-center gap-x-3 gap-y-1 flex-wrap mt-1">
                        <Text className="text-base text-blue-700 font-medium">
                          {exp.company || (
                            <span className="text-gray-400 italic">
                              Company
                            </span>
                          )}
                        </Text>
                        {exp.location && (
                          <div className="flex items-center text-gray-500">
                            <CompassOutlined className="mr-1.5" />
                            <Text className="text-sm text-gray-600">
                              {exp.location}
                            </Text>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-2 md:mt-0">
                      <Text className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                        {startDate} - {endDate}
                      </Text>
                    </div>
                  </div>

                  {exp.description && exp.description.length > 0 && (
                    <ul className="mt-4 border-t border-gray-200/80 pt-4 pl-5 space-y-2">
                      {exp.description.map((desc, index) =>
                        desc ? (
                          <li
                            key={index}
                            className="text-gray-700 text-sm md:text-base leading-relaxed relative before:content-['•'] before:absolute before:-left-5 before:text-blue-500 before:text-xl"
                          >
                            {desc}
                          </li>
                        ) : null
                      )}
                    </ul>
                  )}
                </div>
              );
            })
          ) : (
            // Empty State
            <div className="text-center py-8 print:hidden">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CarryOutOutlined className="text-2xl text-gray-400" />
              </div>
              <Text className="text-gray-500 italic">
                Add your work experience to build your timeline
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
