import { Typography, Progress } from 'antd';
import type { Skill } from '../../types/types';
import { ToolOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface SkillPreviewProps {
  data: Skill[];
}

export const SkillPreview = ({ data }: SkillPreviewProps) => {
  const getSkillLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Beginner';
  };

  const hasSkillData = data && data.length > 0;

  return (
    <div className="relative print:break-inside-avoid mt-4">
      {/* Decorative background elements */}
      <div className="absolute top-4 -right-4 w-16 h-16 bg-indigo-100 rounded-full opacity-40 blur-lg print:hidden"></div>
      <div className="absolute bottom-0 -left-2 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl print:hidden"></div>

      <div className="relative bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-lg print:shadow-none print:border-gray-300">
        {/* Section Title */}
        <div className="flex items-center mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 print:bg-gray-400"></div>
          <Title
            level={4}
            className="!mb-0 !text-gray-800 !font-semibold !text-base md:!text-lg tracking-wide uppercase print:!text-black"
          >
            Skills
          </Title>
        </div>

        {/* Skills List */}
        <div className="space-y-6">
          {hasSkillData ? (
            data.map((skillCategory) => (
              <div
                key={skillCategory.id}
                className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 print:shadow-none print:border-gray-300"
              >
                <Title
                  level={5}
                  className="!text-lg !font-semibold !text-gray-800 !mb-4"
                >
                  {skillCategory.category || (
                    <span className="text-gray-400 italic">Skill Category</span>
                  )}
                </Title>

                <div className="space-y-4">
                  {(skillCategory.skills || []).map((skill, index) =>
                    skill && skill.name ? (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <Text className="font-medium text-gray-800">
                            {skill.name}
                          </Text>
                          <Text className="text-sm font-medium text-blue-700">
                            {getSkillLevelText(skill.level || 0)}
                          </Text>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress
                            percent={skill.level || 0}
                            showInfo={false}
                            status="active"
                            strokeColor={{
                              '0%': '#60a5fa', // blue-400
                              '100%': '#3b82f6', // blue-600
                            }}
                            trailColor="rgba(203, 213, 225, 0.5)" // slate-300 with opacity
                            className="flex-1"
                          />
                          <Text className="text-sm w-10 text-right font-medium text-gray-700">
                            {skill.level}%
                          </Text>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="text-center py-8 print:hidden">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <ToolOutlined className="text-2xl text-gray-400" />
              </div>
              <Text className="text-gray-500 italic">
                Add your skills to show what you can do
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
