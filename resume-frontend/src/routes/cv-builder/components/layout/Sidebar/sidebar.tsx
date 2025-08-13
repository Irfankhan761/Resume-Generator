import React, { useState } from 'react';
import { Layout, Input, Button, Modal } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  FileTextOutlined,
  ProjectOutlined,
  SearchOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { CVSection } from '../../../types/types';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { confirm } = Modal;

interface SidebarProps {
  activeSection: CVSection;
  onSectionChange: (section: CVSection) => void;
  collapsed: boolean;
  className?: string;
}

export const Sidebar = ({
  activeSection,
  onSectionChange,
  collapsed,
  className = '',
}: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const navigate = useNavigate();

  const sections: { key: CVSection; label: string; icon: React.ReactNode }[] = [
    { key: 'Personal Info', label: 'Personal Info', icon: <UserOutlined /> },
    { key: 'Education', label: 'Education', icon: <BookOutlined /> },
    {
      key: 'Work Experience',
      label: 'Work Experience',
      icon: <TeamOutlined />,
    },
    { key: 'Projects', label: 'Projects', icon: <ProjectOutlined /> },
    { key: 'Skills', label: 'Skills', icon: <FileTextOutlined /> },
  ];

  const filteredSections = sections.filter((section) =>
    section.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showLogoutConfirm = () => {
    confirm({
      title: 'Are you sure you want to logout?',
      icon: <ExclamationCircleOutlined />,
      content: 'Any unsaved changes might be lost.',
      okText: 'Yes, logout',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
      onOk() {
        navigate('/');
      },
      onCancel() {
        console.log('Logout cancelled');
      },
    });
  };

  return (
    <Sider
      width={280}
      collapsedWidth={80}
      collapsed={collapsed}
      trigger={null}
      collapsible
      className={className}
      style={{
        position: 'fixed',
        left: 0,
        background: '#0E2433',
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 40,
        transition: 'all 0.3s ease',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {!collapsed && (
        <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)]">
          <Input
            placeholder="Search sections..."
            prefix={<SearchOutlined className="text-[#4DBCE9]" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] text-[#EAF4F4)]"
          />
        </div>
      )}

      <div className="flex-1 overflow-auto py-2 px-1">
        {filteredSections.map((section) => (
          <div
            key={section.key}
            onClick={() => onSectionChange(section.key)}
            onMouseEnter={() => setHoverKey(section.key)}
            onMouseLeave={() => setHoverKey(null)}
            className={`
              flex items-center ${
                collapsed ? 'justify-center' : 'justify-start'
              } 
              h-12 ${
                collapsed ? 'px-0' : 'px-3'
              } mb-1 rounded cursor-pointer transition-all
              ${
                activeSection === section.key
                  ? 'bg-[rgba(77,188,233,0.15)] border border-[rgba(77,188,233,0.3)]'
                  : hoverKey === section.key
                  ? 'bg-[rgba(255,255,255,0.05)]'
                  : 'bg-transparent border-transparent'
              }
            `}
          >
            <div
              className={`
              w-8 h-8 rounded flex items-center justify-center transition-all
              ${
                activeSection === section.key
                  ? 'bg-[rgba(77,188,233,0.2)]'
                  : hoverKey === section.key
                  ? 'bg-[rgba(255,255,255,0.1)]'
                  : 'bg-[rgba(255,255,255,0.05)]'
              }
              ${collapsed ? 'mr-0' : 'mr-3'}
            `}
            >
              {React.cloneElement(section.icon as React.ReactElement, {
                className: `text-base ${
                  activeSection === section.key
                    ? 'text-[#4DBCE9]'
                    : 'text-[#98B4C1]'
                }`,
              })}
            </div>
            {!collapsed && (
              <span
                className={`
                text-sm transition-all
                ${
                  activeSection === section.key
                    ? 'font-semibold text-[#EAF4F4]'
                    : 'font-normal text-[#98B4C1]'
                }
              `}
              >
                {section.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.1)]">
        <Button
          onClick={showLogoutConfirm}
          icon={<LogoutOutlined />}
          type="text"
          block
          className={`flex items-center justify-center ${
            collapsed ? 'px-0' : 'px-3'
          } text-[#98B4C1] hover:text-[#EAF4F4]`}
        >
          {!collapsed && 'Logout'}
        </Button>
        <div className="text-[rgba(152,180,193,0.6)] text-xs mt-2">
          {collapsed ? '©' : '© 2024 CV Builder'}
        </div>
      </div>
    </Sider>
  );
};
