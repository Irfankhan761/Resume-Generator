import React from 'react';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  FileTextOutlined,
  ProjectOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { CVSection } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { showLogoutConfirm } from '../../popup/logout';

interface BottomNavBarProps {
  activeSection: CVSection;
  onSectionChange: (section: CVSection) => void;
}

const sections: { key: CVSection; label: string; icon: React.ReactNode }[] = [
  { key: 'Personal Info', label: 'Personal Info', icon: <UserOutlined /> },
  { key: 'Education', label: 'Education', icon: <BookOutlined /> },
  { key: 'Work Experience', label: 'Work Experience', icon: <TeamOutlined /> },
  { key: 'Projects', label: 'Projects', icon: <ProjectOutlined /> },
  { key: 'Skills', label: 'Skills', icon: <FileTextOutlined /> },
];

export const BottomNavBar = ({
  activeSection,
  onSectionChange,
}: BottomNavBarProps) => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40">
      <div className="flex justify-around items-center h-full">
        {sections.map((section) => (
          <div
            key={section.key}
            onClick={() => onSectionChange(section.key)}
            className={`flex flex-col items-center justify-center w-16 h-16 cursor-pointer transition-colors duration-200 ${
              activeSection === section.key ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <div
              className={`
              w-10 h-10 rounded-lg flex items-center justify-center transition-all text-xl
              ${activeSection === section.key ? 'text-blue-600' : ''}
            `}
            >
              {section.icon}
            </div>
          </div>
        ))}
        <div
          onClick={() => showLogoutConfirm(navigate)}
          className="flex flex-col items-center justify-center w-16 h-16 cursor-pointer transition-colors duration-200 text-gray-500"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all text-xl">
            <LogoutOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
