import { Card, Typography } from "antd";
import { Education } from "../types";

interface EducationPreviewProps {
  data: Education[];
}

const { Title, Text } = Typography;

export const EducationPreview = ({ data }: EducationPreviewProps) => {
  return (
    <Card className="mb-8">
      <div className="flex items-center mb-4">
        <Title level={3} className="mr-2">
          Education
        </Title>
      </div>
      <div className="space-y-4">
        {data.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <Text strong className="text-lg">
                {edu.institution}
              </Text>
              <Text type="secondary">
                {new Date(edu.startDate).getFullYear()} -{" "}
                {edu.current ? "Present" : new Date(edu.endDate).getFullYear()}
              </Text>
            </div>
            <div>
              <Text className="text-gray-800 font-medium">
                {edu.degree} in {edu.field}
              </Text>
              {edu.gpa && (
                <Text className="text-gray-600 ml-4">GPA: {edu.gpa}</Text>
              )}
            </div>
            {edu.achievements.length > 0 && (
              <ul className="list-disc pl-4 space-y-1">
                {edu.achievements.map((achievement, index) => (
                  <li key={index} className="text-gray-700">
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
