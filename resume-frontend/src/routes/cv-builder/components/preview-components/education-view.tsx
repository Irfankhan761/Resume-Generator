import { Typography } from 'antd';
import type { Education } from '../../types/types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface EducationPreviewProps {
  data: Education[];
}

export const EducationPreview = ({ data }: EducationPreviewProps) => {
  const formatYear = (dateString?: string) => {
    if (!dateString) return '';
    return dayjs(dateString).format('YYYY');
  };

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
        {!data || data.length === 0 ? (
          <Text className="text-slate-500">No education details provided.</Text>
        ) : (
          data.map((edu) => (
            <div
              key={edu.id}
              className="bg-white rounded-lg p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <Text strong className="!text-lg !text-slate-800 block">
                    {edu.degreeTitle}
                  </Text>
                  <Text className="!text-base !text-slate-600">
                    {edu.institute}
                  </Text>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <Text className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                    {formatYear(edu.startDate)} -{' '}
                    {edu.isCurrent ? 'Present' : formatYear(edu.endDate)}
                  </Text>
                  {edu.city && (
                    <Text className="block mt-1 text-slate-500">
                      {edu.city}
                    </Text>
                  )}
                </div>
              </div>

              <div className="flex items-center flex-wrap mt-2">
                {edu.majors && (
                  <Text className="!text-base !text-blue-600 !font-medium">
                    {edu.majors}
                  </Text>
                )}

                {edu.gpaValue && (
                  <Text className="ml-2 text-slate-700 bg-slate-100 py-1 px-2 rounded text-sm capitalize">
                    {edu.gpaType || 'Score'}: {edu.gpaValue}
                    {edu.gpaType === 'percentage' && '%'}
                  </Text>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
