import React from "react";
import {
  PhoneOutlined,
  MailOutlined,
  CompassOutlined,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  BookOutlined,
  TeamOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Typography, Tag, List } from "antd";
import { WorkExperienceItem, EducationItem, ProjectItem } from "../types"; // Import your types

const { Title, Text, Paragraph } = Typography;

interface CVPreviewProps {
  cvData: any;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => (
  <div className="bg-white p-8 shadow-lg rounded-lg">
    <div className="text-center mb-8 border-b pb-6">
      <Title level={2} className="mb-2">
        {cvData.personalInfo.fullName}
      </Title>
      <Title level={4} className="text-gray-600 mb-4">
        {cvData.personalInfo.jobTitle}
      </Title>
      <div className="flex justify-center space-x-4 flex-wrap">
        {cvData.personalInfo.email && (
          <Text className="flex items-center gap-2">
            <MailOutlined /> {cvData.personalInfo.email}
          </Text>
        )}
        {cvData.personalInfo.phone && (
          <Text className="flex items-center gap-2">
            <PhoneOutlined /> {cvData.personalInfo.phone}
          </Text>
        )}
        {cvData.personalInfo.location && (
          <Text className="flex items-center gap-2">
            <CompassOutlined /> {cvData.personalInfo.location}
          </Text>
        )}
      </div>
      <div className="flex justify-center space-x-4 mt-2">
        {cvData.personalInfo.linkedin && (
          <a
            href={cvData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined className="text-xl" />
          </a>
        )}
        {cvData.personalInfo.github && (
          <a
            href={cvData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined className="text-xl" />
          </a>
        )}
        {cvData.personalInfo.website && (
          <a
            href={cvData.personalInfo.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlobalOutlined className="text-xl" />
          </a>
        )}
      </div>
    </div>

    {cvData.personalInfo.profileSummary && (
      <div className="mb-8">
        <Title level={3} className="mb-4">
          Profile Summary
        </Title>
        <Paragraph>{cvData.personalInfo.profileSummary}</Paragraph>
      </div>
    )}

    {cvData.workExperience.length > 0 && (
      <div className="mb-8">
        <Title level={3} className="mb-4 flex items-center gap-2">
          <TeamOutlined /> Work Experience
        </Title>
        <List
          itemLayout="vertical"
          dataSource={cvData.workExperience}
          renderItem={(item: WorkExperienceItem) => (
            <List.Item key={item.id}>
              {" "}
              {/* Use item.id as key */}
              <div className="mb-2">
                <Text strong className="text-lg">
                  {item.position}
                </Text>
                <br />
                <Text className="text-gray-600">
                  {item.company} • {item.location}
                </Text>
                <br />
                <Text type="secondary">
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </Text>
              </div>
              <Paragraph>{item.description}</Paragraph>
              {item.achievements && item.achievements.length > 0 && (
                <ul className="list-disc ml-4">
                  {item.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
              <div>
                {item.technologies &&
                  item.technologies.map((tech, index) => (
                    <Tag color="blue" key={index}>
                      {tech}
                    </Tag>
                  ))}
              </div>
            </List.Item>
          )}
        />
      </div>
    )}

    {cvData.education.length > 0 && (
      <div className="mb-8">
        <Title level={3} className="mb-4 flex items-center gap-2">
          <BookOutlined /> Education
        </Title>
        <List
          itemLayout="vertical"
          dataSource={cvData.education}
          renderItem={(item: EducationItem) => (
            <List.Item key={item.id}>
              <div className="mb-2">
                <Text strong className="text-lg">
                  {item.degree} in {item.field}
                </Text>
                <br />
                <Text className="text-gray-600">
                  {item.institution} • {item.location}
                </Text>
                <br />
                <Text type="secondary">
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </Text>
                {item.gpa && <Text className="ml-4">GPA: {item.gpa}</Text>}
              </div>
              <ul className="list-disc ml-4">
                {item.achievements &&
                  item.achievements.map((el, i) => <li key={i}>{el}</li>)}
              </ul>
            </List.Item>
          )}
        />
      </div>
    )}

    {/* Skills Section */}
    {cvData.skills.length > 0 && (
      <div className="mb-8">
        <Title level={3} className="mb-4">
          Skills
        </Title>
        {cvData.skills.map(
          (skillCategory: {
            id: React.Key | null | undefined;
            category:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            items: any[];
          }) => (
            <div key={skillCategory.id} className="mb-4">
              <Text strong className="text-lg">
                {skillCategory.category}
              </Text>
              <div className="mt-2">
                {skillCategory.items.map((skill, skillIndex) => (
                  <Tag key={skillIndex} color="blue" className="mr-2 mb-2">
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    )}

    {cvData.projects.length > 0 && (
      <div className="mb-8">
        <Title level={3} className="mb-4 flex items-center gap-2">
          <ProjectOutlined /> Projects
        </Title>
        <List
          itemLayout="vertical"
          dataSource={cvData.projects}
          renderItem={(item: ProjectItem) => (
            <List.Item key={item.id}>
              <div className="mb-2">
                <Text strong className="text-lg">
                  {item.name}
                </Text>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2"
                  >
                    <GlobalOutlined />
                  </a>
                )}
              </div>
              <Paragraph>{item.description}</Paragraph>
              <div>
                {item.technologies &&
                  item.technologies.map((tech, index) => (
                    <Tag color="blue" key={index}>
                      {tech}
                    </Tag>
                  ))}
              </div>
            </List.Item>
          )}
        />
      </div>
    )}
  </div>
);
