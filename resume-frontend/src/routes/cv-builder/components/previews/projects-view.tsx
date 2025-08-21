import { Typography } from 'antd';
import { Project } from '../../types/types';
import { GlobalOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

interface ProjectPreviewProps {
  data: Project[];
}

export const ProjectPreview = ({ data }: ProjectPreviewProps) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md">
      <div className="flex items-center mb-6">
        <Title
          level={3}
          className="!mb-0 !text-xl md:!text-2xl !text-slate-800 !font-medium border-l-4 border-blue-500 pl-3"
        >
          PROJECTS
        </Title>
      </div>

      <div className="space-y-5">
        {data.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
              <Text strong className="!text-lg md:!text-xl !text-slate-800">
                {project.title}
              </Text>
              <div className="mt-1 md:mt-0">
                <Text className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                  {new Date(project.startDate).getFullYear()} -{' '}
                  {project.endDate
                    ? new Date(project.endDate).getFullYear()
                    : 'Present'}
                </Text>
              </div>
            </div>

            <Text className="!text-slate-700 leading-relaxed mb-3">
              {project.description}
            </Text>

            {project.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.technologies.map((tech, index) => (
                  <Text
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </Text>
                ))}
              </div>
            )}

            {project.link && (
              <div className="mt-4">
                <Link
                  href={project.link}
                  target="_blank"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <GlobalOutlined />
                  <span className="font-medium">View Project</span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
