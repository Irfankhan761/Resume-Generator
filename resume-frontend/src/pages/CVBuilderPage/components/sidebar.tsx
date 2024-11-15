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
    <Sider
      width={260}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#0E2433", // Darker blue for a sleek design
        height: "100vh", // Full height
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.15)", // Soft shadow for depth
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Branding Section */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Subtle divider
        }}
      >
        <h2 style={{ color: "#EAF4F4", fontWeight: "bold", fontSize: "20px" }}>
          My CV
        </h2>
        <p style={{ color: "#98B4C1", fontSize: "14px", margin: 0 }}>
          Navigate your journey
        </p>
      </div>

      {/* Menu Section */}
      <Menu
        style={{
          backgroundColor: "transparent",
          borderRight: "none",
          padding: "10px 0",
          flex: "1", // Fills remaining height
        }}
        mode="inline"
        selectedKeys={[activeSection]}
        onClick={({ key }) => onSectionChange(key as CVSection)}
        items={sections.map((section) => ({
          key: section.key,
          icon: (
            <span style={{ fontSize: "18px", color: "#4DBCE9" }}>
              {section.icon}
            </span>
          ),
          label: (
            <span
              style={{
                fontSize: "16px",
                fontWeight: activeSection === section.key ? "600" : "400",
                color: activeSection === section.key ? "#0E2433" : "#98B4C1",
              }}
            >
              {section.label}
            </span>
          ),
        }))}
      />

      {/* Footer Section */}
      <div
        style={{
          textAlign: "center",
          padding: "10px 20px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)", // Subtle divider
          color: "#98B4C1",
          fontSize: "12px",
        }}
      >
        © 2024 Developed By Irfan Khan
      </div>
    </Sider>
  );
};
