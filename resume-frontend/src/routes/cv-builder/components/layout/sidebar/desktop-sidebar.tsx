import React from 'react';
import { Input, Button } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  FileTextOutlined,
  ProjectOutlined,
  SearchOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { CVSection } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { showLogoutConfirm } from '../../popup/logout';

interface DesktopSidebarProps {
  activeSection: CVSection;
  onSectionChange: (section: CVSection) => void;
  collapsed: boolean;
  className?: string;
}

const sections: { key: CVSection; label: string; icon: React.ReactNode }[] = [
  { key: 'Personal Info', label: 'Personal Info', icon: <UserOutlined /> },
  { key: 'Education', label: 'Education', icon: <BookOutlined /> },
  { key: 'Work Experience', label: 'Work Experience', icon: <TeamOutlined /> },
  { key: 'Projects', label: 'Projects', icon: <ProjectOutlined /> },
  { key: 'Skills', label: 'Skills', icon: <FileTextOutlined /> },
];

export const DesktopSidebar = ({
  activeSection,
  onSectionChange,
  collapsed,
  className = '',
}: DesktopSidebarProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [hoverKey, setHoverKey] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const filteredSections = sections.filter((section) =>
    section.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Search input */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-gray-100">
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

      {/* Main navigation */}
      <div className="flex-1 overflow-auto py-4 px-1">
        {filteredSections.map((section) => (
          <div
            key={section.key}
            onClick={() => onSectionChange(section.key)}
            onMouseEnter={() => setHoverKey(section.key)}
            onMouseLeave={() => setHoverKey(null)}
            className={`
              flex items-center h-12 mb-1 rounded-lg mx-2 cursor-pointer transition-all duration-200
              ${collapsed ? 'justify-center px-0' : 'justify-start px-3'}
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
                className={`text-sm transition-all ${
                  activeSection === section.key
                    ? 'font-semibold text-gray-800'
                    : 'font-normal text-gray-600'
                }`}
              >
                {section.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer (logout + copyright) */}
      <div className="mt-auto px-4 py-3 border-t border-gray-100">
        <Button
          onClick={() => showLogoutConfirm(navigate)}
          icon={<LogoutOutlined />}
          type="text"
          block
          className={`flex items-center justify-center text-gray-500 hover:text-gray-800 group ${
            collapsed ? 'px-0' : 'px-3'
          }`}
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
    </div>
  );
};
