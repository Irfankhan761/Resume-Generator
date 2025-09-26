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
import { signOut } from 'core/services/auth-services';

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
      maskClosable: true,
      async onOk() {
        try {
          const { error } = await signOut();
          if (error) throw error;
          navigate('/');
        } catch (error) {
          console.error('Logout error:', error);
        }
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
      className={`${className} shadow-lg`}
      style={{
        position: 'fixed',
        left: 0,
        background: 'white',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 40,
        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      {!collapsed && (
        <div className="px-4 py-3 border-b border-gray-100 bg-white">
          <Input
            placeholder="Search sections..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-50 border-gray-200 hover:border-blue-300 focus:border-blue-400"
            allowClear
          />
        </div>
      )}

      <div className="flex-1 overflow-auto py-4 px-1">
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
              } mb-1 rounded-lg mx-2 cursor-pointer transition-all duration-200
              ${
                activeSection === section.key
                  ? 'bg-blue-50 border-l-4 border-blue-500'
                  : hoverKey === section.key
                  ? 'bg-blue-50'
                  : 'bg-transparent'
              }
            `}
          >
            <div
              className={`
              w-9 h-9 rounded-lg flex items-center justify-center transition-all
              ${
                activeSection === section.key
                  ? 'bg-blue-500 text-white'
                  : hoverKey === section.key
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-500'
              }
              ${collapsed ? 'mr-0' : 'mr-3'}
            `}
            >
              {React.cloneElement(section.icon as React.ReactElement, {
                className: `text-base`,
              })}
            </div>
            {!collapsed && (
              <span
                className={`
                text-sm transition-all
                ${
                  activeSection === section.key
                    ? 'font-semibold text-gray-800'
                    : 'font-normal text-gray-600'
                }
              `}
              >
                {section.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-gray-100 bg-white">
        <Button
          onClick={showLogoutConfirm}
          icon={<LogoutOutlined />}
          type="text"
          block
          className={`flex items-center justify-center ${
            collapsed ? 'px-0' : 'px-3'
          } text-gray-500 hover:text-gray-800 group`}
        >
          {!collapsed && (
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              Logout
            </span>
          )}
        </Button>
        <div className="text-gray-400 text-xs text-center mt-2">
          {collapsed ? '©' : '© 2024 CV Builder Pro'}
        </div>
      </div>
    </Sider>
  );
};
