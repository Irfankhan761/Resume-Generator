import { Card, Typography, Tag, Progress } from "antd";
import { Skill } from "../../types/types";

interface SkillPreviewProps {
  data: Skill[];
}

const { Title, Text } = Typography;

export const SkillPreview = ({ data }: SkillPreviewProps) => {
  return (
    <Card className="mb-8">
      <Title level={3}>Skills</Title>
      <div className="space-y-4">
        {data.map((skillCategory) => (
          <div
            key={skillCategory.id}
            className="border rounded-lg p-4 space-y-2"
          >
            <Text strong className="text-lg">
              {skillCategory.category}
            </Text>
            <div className="flex flex-wrap gap-4 mt-2">
              {(skillCategory.skills || []).map(
                (skill, index) =>
                  skill && (
                    <div key={index} className="flex items-center gap-2">
                      <Tag color="blue">{skill.name || "Unnamed Skill"}</Tag>
                      <Progress
                        percent={skill.level || 0}
                        showInfo={false}
                        status="active"
                        className="w-24"
                      />
                      <Text type="secondary">
                        {skill.level === 100
                          ? "Expert"
                          : skill.level === 80
                          ? "High"
                          : skill.level === 50
                          ? "Medium"
                          : "Low"}
                      </Text>
                    </div>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
