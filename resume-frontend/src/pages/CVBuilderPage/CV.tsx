import React, { useState } from "react";
import { CVData, CVSection } from "./types";

import { Layout, Form, Button, Typography, Menu, Space } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  FileTextOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import PersonalInfoForm from "./components/FormComponents/PersonalInfoForm";
import { CVPreview } from "./components/CVPreview";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const CVTest = () => {
  const [form] = Form.useForm();
  const [cvData, setCVData] = useState<CVData>({
    id: "",
    personalInfo: {
      id: "",
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
  });
  const [activeSection, setActiveSection] = useState<CVSection>("personalInfo");

  const handleFormChange = (changedValues: any, allValues: any) => {
    setCVData((prevData) => ({ ...prevData, ...allValues }));
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
                initialValues={cvData}
              >
                {activeSection === "personalInfo" && (
                  <PersonalInfoForm cvData={cvData} />
                )}
                {/* {activeSection === "workExperience" && (
                  <WorkExperienceForm cvData={cvData} setCVData={setCVData} />
                )}
                {activeSection === "education" && (
                  <EducationForm cvData={cvData} setCVData={setCVData} />
                )}
                {activeSection === "skills" && (
                  <SkillsForm cvData={cvData} setCVData={setCVData} />
                )}
                {activeSection === "projects" && (
                  <ProjectsForm cvData={cvData} setCVData={setCVData} />
                )} */}
              </Form>
            </div>

            <div className="sticky top-0">
              <CVPreview cvData={cvData} />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CVTest;
