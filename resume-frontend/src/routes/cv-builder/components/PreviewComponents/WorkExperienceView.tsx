import { Card, Typography } from "antd";
import { WorkExperience } from "../../types/types";

interface WorkExperiencePreviewProps {
  data: WorkExperience[];
}

const { Title, Text } = Typography;

export const WorkExperiencePreview = ({ data }: WorkExperiencePreviewProps) => {
  return (
    <Card className="mb-8">
      <div className="flex items-center mb-4">
        <Title level={3} className="mr-2">
          Work Experience
        </Title>
      </div>
      <div className="space-y-4">
        {data.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <Text strong className="text-lg">
                {exp.position}
              </Text>
              <Text type="secondary">
                {new Date(exp.startDate).getFullYear()} -{" "}
                {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
              </Text>
            </div>
            <div>
              <Text className="text-gray-800 font-medium">{exp.company}</Text>
              <Text className="text-gray-600 ml-4">{exp.location}</Text>
            </div>
            <ul className="list-disc pl-4 space-y-1">
              {exp.description.map((desc, index) => (
                <li key={index} className="text-gray-700">
                  {desc}
                </li>
              ))}
            </ul>
            {exp.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, index) => (
                  <Text
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded-md"
                  >
                    {tech}
                  </Text>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
