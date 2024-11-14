import { Card, Typography } from "antd";
import { Project } from "../types";

interface ProjectPreviewProps {
  data: Project[];
}

const { Title, Text, Link } = Typography;

export const ProjectPreview = ({ data }: ProjectPreviewProps) => {
  return (
    <Card className="mb-8">
      <Title level={3}>Projects</Title>
      <div className="space-y-4">
        {data.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <Text strong className="text-lg">
                {project.title}
              </Text>
              <Text type="secondary">
                {new Date(project.startDate).getFullYear()} -{" "}
                {project.endDate
                  ? new Date(project.endDate).getFullYear()
                  : "Present"}
              </Text>
            </div>
            <Text className="text-gray-800">{project.description}</Text>
            {project.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, index) => (
                  <Text
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded-md"
                  >
                    {tech}
                  </Text>
                ))}
              </div>
            )}
            {project.link && (
              <div className="mt-2">
                <Link href={project.link} target="_blank">
                  View Project
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
