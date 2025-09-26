import { Typography } from 'antd';
import type { Project } from '../../types/types';
import { GlobalOutlined, CodeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Link } = Typography;

interface ProjectPreviewProps {
  data: Project[];
}

export const ProjectPreview = ({ data }: ProjectPreviewProps) => {
  const formatYear = (dateString?: string) => {
    if (!dateString) return 'Present';
    return dayjs(dateString).format('YYYY');
  };

  const hasProjectData = data && data.length > 0;

  return (
    <div className="relative print:break-inside-avoid mt-4">
      {/* Decorative background elements */}
      <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl print:hidden"></div>
      <div className="absolute bottom-4 -right-4 w-16 h-16 bg-indigo-100 rounded-full opacity-40 blur-lg print:hidden"></div>

      <div className="relative bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-lg print:shadow-none print:border-gray-300">
        {/* Section Title */}
        <div className="flex items-center mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 print:bg-gray-400"></div>
          <Title
            level={4}
            className="!mb-0 !text-gray-800 !font-semibold !text-base md:!text-lg tracking-wide uppercase print:!text-black"
          >
            Projects
          </Title>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {hasProjectData ? (
            data.map((project) => (
              <div
                key={project.id}
                className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 print:shadow-none print:border-gray-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-semibold text-gray-800 block">
                    {project.title || (
                      <span className="text-gray-400 italic">
                        Project Title
                      </span>
                    )}
                  </Text>
                  <div className="flex-shrink-0 mt-1 md:mt-0">
                    <Text className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                      {formatYear(project.startDate)} -{' '}
                      {formatYear(project.endDate)}
                    </Text>
                  </div>
                </div>

                {project.description && (
                  <Text className="text-gray-700 leading-relaxed text-sm md:text-base block">
                    {project.description}
                  </Text>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.link && (
                  <div className="mt-4">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                    >
                      <GlobalOutlined className="group-hover:scale-110 transition-transform" />
                      <span>View Project</span>
                    </Link>
                  </div>
                )}
              </div>
            ))
          ) : (
            // Empty State
            <div className="text-center py-8 print:hidden">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CodeOutlined className="text-2xl text-gray-400" />
              </div>
              <Text className="text-gray-500 italic">
                Add your projects to showcase your work
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
