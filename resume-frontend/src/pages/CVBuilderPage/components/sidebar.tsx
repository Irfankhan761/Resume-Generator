import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  FileTextOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { CVSection } from "./types";

const { Sider } = Layout;

interface SidebarProps {
  activeSection: CVSection;
  onSectionChange: (section: CVSection) => void;
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const sections: { key: CVSection; label: string; icon: React.ReactNode }[] = [
    { key: "Personal Info", label: "Personal Info", icon: <UserOutlined /> },
    { key: "Education", label: "Education", icon: <BookOutlined /> },
    {
      key: "Work Experience",
      label: "Work Experience",
      icon: <TeamOutlined />,
    },
    { key: "Projects", label: "Projects", icon: <ProjectOutlined /> },
    { key: "Skills", label: "Skills", icon: <FileTextOutlined /> },
  ];

  return (
    <Sider width={200} theme="light" className="p-4">
      <Menu
        mode="inline"
        selectedKeys={[activeSection]}
        onClick={({ key }) => onSectionChange(key as CVSection)}
        items={sections.map((section) => ({
          key: section.key,
          icon: section.icon,
          label: section.label,
        }))}
      />
    </Sider>
  );
};
