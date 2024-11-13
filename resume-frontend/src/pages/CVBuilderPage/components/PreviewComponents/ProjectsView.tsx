import { Card, Typography } from "antd";
import { Project } from "../types";

interface ProjectPreviewProps {
  data: Project[];
}

const { Title, Text, Link } = Typography;

export const ProjectPreview = ({ data }: ProjectPreviewProps) => {
  return (
    <Card className="mb-8">
      <div className="flex items-center mb-4">
        <Title level={3} className="mr-2">
          Projects
        </Title>
      </div>
      <div className="space-y-4">
        {data.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <Text strong className="text-lg">
                {project.title}
              </Text>
              <Text type="secondary">
                {new Date(project.startDate).getFullYear()} -{" "}
                {new Date(project.endDate).getFullYear()}
              </Text>
            </div>
            <div>
              <Text className="text-gray-800 font-medium">
                {project.description}
              </Text>
              <div className="mt-2">
                {/* <Text type="secondary">
                  Technologies: {project.technologies.join(", ")}
                </Text> */}
                <Text type="secondary">
                  Technologies:
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(", ")
                    : ""}
                </Text>
              </div>
              {project.link && (
                <div className="mt-2">
                  <Link href={project.link} target="_blank">
                    Project Link
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
