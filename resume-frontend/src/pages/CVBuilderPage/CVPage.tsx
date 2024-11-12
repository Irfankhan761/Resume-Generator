import React, { useState } from "react";
import {
  CVData,
  CVSection,
  SkillCategory,
  WorkExperienceItem,
  EducationItem,
  ProjectItem,
} from "./types"; // Import your types
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CompassOutlined,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  BookOutlined,
  TeamOutlined,
  FileTextOutlined,
  ProjectOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Form,
  Input,
  Button,
  Card,
  Space,
  Typography,
  Tag,
  List,
  Menu,
  Row,
  Col,
  DatePicker,
  Switch,
  InputNumber,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;

const initialCVData: CVData = {
  id: uuidv4(),
  personalInfo: {
    id: uuidv4(),
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    profileSummary: "",
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
};

const CVBuilder = () => {
  const [form] = Form.useForm();
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [activeSection, setActiveSection] = useState<CVSection>("personalInfo");

  const handleFormChange = (changedValues: any, allValues: any) => {
    setCVData((prevData) => _.merge({}, prevData, allValues));
  };

  const addWorkExperience = () => {
    const newWorkExperience: WorkExperienceItem = {
      id: uuidv4(),
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
      technologies: [],
    };

    setCVData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newWorkExperience],
    }));
  };

  const addEducation = () => {
    const newEducation: EducationItem = {
      id: uuidv4(),
      degree: "",
      field: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      achievements: [],
    };

    setCVData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const addProject = () => {
    const newProject: ProjectItem = {
      id: uuidv4(),
      name: "",
      link: "",
      description: "",
      technologies: [],
    };

    setCVData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const addSkillCategory = () => {
    const newSkillCategory: SkillCategory = {
      id: uuidv4(),
      category: "",
      items: [],
    };
    setCVData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkillCategory],
    }));
  };

  const addSkill = (categoryId: string) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.map((category) =>
        category.id === categoryId
          ? { ...category, items: [...category.items, ""] }
          : category
      ),
    }));
  };

  const removeSkill = (categoryId: string, skillIndex: number) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.filter((_, j) => j !== skillIndex),
            }
          : category
      ),
    }));
  };

  const CVPreview = () => (
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
      {/*  */}

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
          {cvData.skills.map((skillCategory) => (
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
          ))}
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

  const renderFormFields = () => {
    switch (activeSection) {
      case "personalInfo":
        return (
          <Card title="Personal Information">
            <Form.Item
              name={["personalInfo", "fullName"]}
              label="Full Name"
              rules={[{ required: true }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item name={["personalInfo", "jobTitle"]} label="Job Title">
              <Input />
            </Form.Item>
            <Form.Item name={["personalInfo", "email"]} label="Email">
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item name={["personalInfo", "phone"]} label="Phone">
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>
            <Form.Item name={["personalInfo", "location"]} label="Location">
              <Input prefix={<CompassOutlined />} />
            </Form.Item>
            <Form.Item name={["personalInfo", "website"]} label="Website">
              <Input prefix={<GlobalOutlined />} />
            </Form.Item>
            <Form.Item name={["personalInfo", "linkedin"]} label="LinkedIn">
              <Input prefix={<LinkedinOutlined />} />
            </Form.Item>
            <Form.Item name={["personalInfo", "github"]} label="GitHub">
              <Input prefix={<GithubOutlined />} />
            </Form.Item>
            <Form.Item
              name={["personalInfo", "profileSummary"]}
              label="Profile Summary"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Card>
        );

      case "workExperience":
        return (
          <Card title="Work Experience">
            <Button
              type="dashed"
              onClick={addWorkExperience}
              block
              icon={<PlusOutlined />}
            >
              Add Work Experience
            </Button>

            {cvData.workExperience.map((work, index) => (
              <Card
                key={work.id}
                title={`${work.position} at ${work.company}`}
                style={{ marginTop: 16 }}
              >
                <Form.Item
                  name={["workExperience", work.id, "position"]}
                  label="Position"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["workExperience", work.id, "company"]}
                  label="Company"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["workExperience", work.id, "location"]}
                  label="Location"
                >
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name={["workExperience", work.id, "startDate"]}
                      label="Start Date"
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["workExperience", work.id, "endDate"]}
                      label="End Date"
                    >
                      <DatePicker disabled={work.current} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name={["workExperience", work.id, "current"]}
                  label="Currently working here"
                  valuePropName="checked"
                >
                  <Switch
                    onChange={(checked) => {
                      setCVData((prev) => ({
                        ...prev,
                        workExperience: prev.workExperience.map((w) =>
                          w.id === work.id ? { ...w, current: checked } : w
                        ),
                      }));
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name={["workExperience", work.id, "description"]}
                  label="Description"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.List name={["workExperience", work.id, "achievements"]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space key={field.key} align="baseline">
                          <Form.Item {...field} noStyle>
                            <Input
                              placeholder="Achievement"
                              style={{ width: "80%" }}
                            />
                          </Form.Item>
                          <Button danger onClick={() => remove(field.name)}>
                            X
                          </Button>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                          Add Achievement
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.List name={["workExperience", work.id, "technologies"]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space key={field.key} align="baseline">
                          <Form.Item {...field} noStyle>
                            <Input
                              placeholder="Technology"
                              style={{ width: "80%" }}
                            />
                          </Form.Item>
                          <Button danger onClick={() => remove(field.name)}>
                            X
                          </Button>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                          Add Technology
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            ))}
          </Card>
        );
      case "education":
        return (
          <Card title="Education">
            <Button
              type="dashed"
              onClick={addEducation}
              block
              icon={<PlusOutlined />}
            >
              Add Education
            </Button>
            {cvData.education.map((education) => (
              <Card
                key={education.id}
                title={`${education.degree} in ${education.field}`}
                style={{ marginTop: 16 }}
              >
                <Form.Item
                  name={["education", education.id, "degree"]}
                  label="Degree"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["education", education.id, "field"]}
                  label="Field of Study"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["education", education.id, "institution"]}
                  label="Institution"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["education", education.id, "location"]}
                  label="Location"
                >
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name={["education", education.id, "startDate"]}
                      label="Start Date"
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["education", education.id, "endDate"]}
                      label="End Date"
                    >
                      <DatePicker disabled={education.current} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name={["education", education.id, "current"]}
                  label="Currently studying here"
                  valuePropName="checked"
                >
                  <Switch
                    onChange={(checked) => {
                      setCVData((prev) => ({
                        ...prev,
                        education: prev.education.map((edu) =>
                          edu.id === education.id
                            ? { ...edu, current: checked }
                            : edu
                        ),
                      }));
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name={["education", education.id, "gpa"]}
                  label="GPA"
                >
                  <InputNumber />
                </Form.Item>
                {/* Achievements */}
                <Form.List name={["education", education.id, "achievements"]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space key={field.key} align="baseline">
                          <Form.Item {...field} noStyle>
                            <Input
                              placeholder="Achievement"
                              style={{ width: "80%" }}
                            />
                          </Form.Item>
                          <Button danger onClick={() => remove(field.name)}>
                            X
                          </Button>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                          Add Achievement
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            ))}
          </Card>
        );

      case "skills":
        return (
          <Card title="Skills">
            <Button
              type="dashed"
              onClick={addSkillCategory}
              block
              icon={<PlusOutlined />}
            >
              Add Skill Category
            </Button>
            {cvData.skills.map((skillCategory, categoryIndex) => (
              <Card
                key={skillCategory.id}
                title={skillCategory.category}
                style={{ marginTop: 16 }}
              >
                <Form.Item
                  name={["skills", skillCategory.id, "category"]}
                  label="Category"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.List name={["skills", skillCategory.id, "items"]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <Space key={field.key} align="baseline">
                          <Form.Item
                            {...field}
                            rules={[
                              { required: true, message: "Missing skill" },
                            ]}
                          >
                            <Input
                              placeholder="Skill"
                              style={{ width: "80%" }}
                            />
                          </Form.Item>
                          <Button
                            danger
                            onClick={() => {
                              remove(field.name);
                            }}
                          >
                            X
                          </Button>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                          Add Skill
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            ))}
          </Card>
        );

      case "projects":
        return (
          <Card title="Projects">
            <Button
              type="dashed"
              onClick={addProject}
              block
              icon={<PlusOutlined />}
            >
              Add Project
            </Button>

            {cvData.projects.map((project, index) => (
              <Card
                key={project.id}
                title={project.name}
                style={{ marginTop: 16 }}
              >
                <Form.Item
                  name={["projects", project.id, "name"]}
                  label="Project Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name={["projects", project.id, "link"]} label="Link">
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["projects", project.id, "description"]}
                  label="Description"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.List name={["projects", project.id, "technologies"]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space key={field.key} align="baseline">
                          <Form.Item {...field} noStyle>
                            <Input
                              placeholder="Technology"
                              style={{ width: "80%" }}
                            />
                          </Form.Item>
                          <Button danger onClick={() => remove(field.name)}>
                            X
                          </Button>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                          Add Technology
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            ))}
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header className="bg-white shadow-md">
        <div className="flex justify-between items-center h-full">
          <Title level={3} className="m-0">
            CV Builder
          </Title>
          <Space>
            <Button type="primary">Save</Button>
            <Button>Export PDF</Button>
          </Space>
        </div>
      </Header>
      <Layout>
        <Sider width={200} theme="light" className="p-4">
          <Menu
            mode="inline"
            selectedKeys={[activeSection]}
            onClick={({ key }) => setActiveSection(key as CVSection)}
            items={[
              {
                key: "personalInfo",
                icon: <UserOutlined />,
                label: "Personal Info",
              },
              {
                key: "workExperience",
                icon: <TeamOutlined />,
                label: "Experience",
              },
              { key: "education", icon: <BookOutlined />, label: "Education" },
              { key: "skills", icon: <FileTextOutlined />, label: "Skills" },
              { key: "projects", icon: <ProjectOutlined />, label: "Projects" },
            ]}
          />
        </Sider>
        <Content className="p-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <Form
                form={form}
                layout="vertical"
                onValuesChange={handleFormChange}
                initialValues={initialCVData}
              >
                {renderFormFields()}
              </Form>
            </div>

            <div className="sticky top-0">
              <CVPreview />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CVBuilder;
