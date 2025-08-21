import { Typography, Progress } from 'antd';
import type { Skill } from '../../types/types';

const { Title, Text } = Typography;

interface SkillPreviewProps {
  data: Skill[];
}

export const SkillPreview = ({ data }: SkillPreviewProps) => {
  const getSkillLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 30) return 'Basic';
    return 'Beginner';
  };

  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md">
      <div className="flex items-center mb-6">
        <Title
          level={3}
          className="!mb-0 !text-xl md:!text-2xl !text-slate-800 !font-medium border-l-4 border-blue-500 pl-3"
        >
          SKILLS
        </Title>
      </div>

      <div className="space-y-5">
        {data.map((skillCategory) => (
          <div
            key={skillCategory.id}
            className="bg-white rounded-lg p-5 shadow-sm transition-all hover:shadow-md"
          >
            <Text
              strong
              className="!text-lg md:!text-xl !text-slate-800 mb-4 block"
            >
              {skillCategory.category}
            </Text>

            <div className="space-y-4">
              {(skillCategory.skills || []).map(
                (skill, index) =>
                  skill && (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between mb-1">
                        <Text className="font-medium text-slate-700">
                          {skill.name || 'Unnamed Skill'}
                        </Text>
                        <Text className="text-sm font-medium text-blue-600">
                          {getSkillLevelText(skill.level || 0)}
                        </Text>
                      </div>

                      <div className="flex items-center gap-3">
                        <Progress
                          percent={skill.level || 0}
                          showInfo={false}
                          status="active"
                          strokeColor="#3b82f6"
                          trailColor="#e2e8f0"
                          className="flex-1"
                          strokeLinecap="round"
                        />
                        <Text className="text-sm w-10 text-right font-medium text-slate-600">
                          {skill.level}%
                        </Text>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
