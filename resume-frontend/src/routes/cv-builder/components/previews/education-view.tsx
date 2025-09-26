import { Typography } from 'antd';
import type { Education } from '../../types/types';
import dayjs from 'dayjs';
import { ReadOutlined } from '@ant-design/icons'; // Using an icon for the title

const { Title, Text } = Typography;

interface EducationPreviewProps {
  data: Education[];
}

export const EducationPreview = ({ data }: EducationPreviewProps) => {
  const formatYear = (dateString?: string) => {
    if (!dateString) return '';
    return dayjs(dateString).format('YYYY');
  };

  const hasEducationData = data && data.length > 0;

  return (
    <div className="relative print:break-inside-avoid mt-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 -right-2 w-16 h-16 bg-blue-100 rounded-full opacity-40 blur-lg print:hidden"></div>
      <div className="absolute bottom-0 -left-2 w-20 h-20 bg-indigo-100 rounded-full opacity-50 blur-xl print:hidden"></div>

      <div className="relative bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-lg print:shadow-none print:border-gray-300">
        {/* Section Title */}
        <div className="flex items-center mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 print:bg-gray-400"></div>
          <Title
            level={4}
            className="!mb-0 !text-gray-800 !font-semibold !text-base md:!text-lg tracking-wide uppercase print:!text-black"
          >
            Education
          </Title>
        </div>

        {/* Education List */}
        <div className="space-y-6">
          {hasEducationData ? (
            data.map((edu) => (
              <div
                key={edu.id}
                className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 print:shadow-none print:border-gray-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start">
                  <div className="flex-grow mb-2 md:mb-0">
                    <Text className="text-lg font-semibold text-gray-800 block">
                      {edu.degreeTitle || (
                        <span className="text-gray-400 italic">
                          Degree Title
                        </span>
                      )}
                    </Text>
                    <Text className="text-base text-blue-700">
                      {edu.institute || (
                        <span className="text-gray-400 italic">Institute</span>
                      )}
                    </Text>
                  </div>
                  <div className="flex-shrink-0 text-left md:text-right">
                    <Text className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium transition-all">
                      {formatYear(edu.startDate)} -{' '}
                      {edu.isCurrent ? 'Present' : formatYear(edu.endDate)}
                    </Text>
                    {edu.city && (
                      <Text className="block mt-1.5 text-slate-500 text-sm">
                        {edu.city}
                      </Text>
                    )}
                  </div>
                </div>
                {(edu.majors || edu.gpaValue) && (
                  <div className="border-t border-gray-100 mt-4 pt-3 flex items-center flex-wrap gap-x-4 gap-y-2">
                    {edu.majors && (
                      <Text className="text-sm text-gray-700">
                        <span className="font-semibold">Major:</span>{' '}
                        {edu.majors}
                      </Text>
                    )}
                    {edu.gpaValue && (
                      <Text className="text-sm text-gray-700">
                        <span className="font-semibold capitalize">
                          {edu.gpaType || 'Score'}:
                        </span>{' '}
                        {edu.gpaValue}
                        {edu.gpaType === 'percentage' && '%'}
                      </Text>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            // Empty State
            <div className="text-center py-8 print:hidden">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <ReadOutlined className="text-2xl text-gray-400" />
              </div>
              <Text className="text-gray-500 italic">
                Add your education details to see them here
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
