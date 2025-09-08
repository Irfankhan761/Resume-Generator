// src/pages/cv-builder/components/layout/dashboard-layout/dashboard-layout.tsx
import { useState } from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ProfileDropdown from '../../../components/layout/profile/profile-dropdown';
// Import DesktopSidebar and BottomNavBar directly
import { DesktopSidebar } from '../sidebar/desktop-sidebar';
import { BottomNavBar } from '../sidebar/bottom-bar'; // Assuming this path is correct
import type { CVSection } from '@routes/cv-builder/types/types';

const { Content, Sider } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
  rightNavContent?: React.ReactNode;
  sidebarConfig?: {
    activeSection: CVSection;
    onSectionChange: (section: CVSection) => void;
  };
}

export const DashboardLayout = ({
  children,
  rightNavContent,
  sidebarConfig,
}: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e6f7ff]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16 backdrop-blur-sm bg-opacity-95 border-b border-gray-100">
        <div className="max-w-[99vw] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center">
            {sidebarConfig && (
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:block mr-4 text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
                aria-label={
                  sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                }
              >
                {sidebarCollapsed ? (
                  <MenuUnfoldOutlined className="text-lg" />
                ) : (
                  <MenuFoldOutlined className="text-lg" />
                )}
              </button>
            )}
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">CV</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
                CV Builder Pro
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {rightNavContent}
            <ProfileDropdown />
          </div>
        </div>
      </nav>

      <Layout className="pt-16 h-screen">
        {sidebarConfig && (
          // Ant Design Sider for desktop only, hidden on small screens
          <Sider
            trigger={null}
            collapsible
            collapsed={sidebarCollapsed}
            width={280}
            collapsedWidth={80}
            className="!fixed !top-16 !left-0 !h-[calc(100vh-64px)] !overflow-auto !bg-white !border-r !border-gray-100 shadow-sm z-40 transition-all duration-200 ease-in-out hidden md:block" // Add 'hidden md:block' here
          >
            <DesktopSidebar
              activeSection={sidebarConfig.activeSection}
              onSectionChange={sidebarConfig.onSectionChange}
              collapsed={sidebarCollapsed}
            />
          </Sider>
        )}

        <Layout
          className={`bg-transparent pb-20 md:pb-0 transition-all duration-200 ease-in-out ${
            sidebarCollapsed && sidebarConfig
              ? 'md:ml-[80px]'
              : sidebarConfig
              ? 'md:ml-[280px]'
              : 'md:ml-0'
          }`}
          style={!sidebarConfig ? { marginLeft: 0 } : {}}
        >
          <Content className="p-4 md:p-8 overflow-auto">{children}</Content>
        </Layout>
      </Layout>

      {/* Render BottomNavBar outside Sider, visible only on small screens */}
      {sidebarConfig && (
        <BottomNavBar
          activeSection={sidebarConfig.activeSection}
          onSectionChange={sidebarConfig.onSectionChange}
        />
      )}
    </div>
  );
};
