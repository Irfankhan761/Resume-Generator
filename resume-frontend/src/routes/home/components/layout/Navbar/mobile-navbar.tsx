import React, { useState } from 'react';
import { Button, Drawer, Space, Typography } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Define the types for the props
interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface MobileNavbarProps {
  navLinks: NavLink[];
  handleLogin: () => void;
  handleCreateCVNavigation: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  navLinks, // Use the destructured navLinks prop
  handleLogin,
  handleCreateCVNavigation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between w-full p-4 bg-white">
        <div className="text-2xl font-bold text-blue-600">
          <span className="font-extrabold">CV</span> Pro
        </div>
        <MenuOutlined
          className="text-2xl text-gray-700 hover:text-blue-600 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
          onClick={toggleMobileMenu}
        />
      </div>

      <Drawer
        title={
          <div className="flex items-center">
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              <span className="font-extrabold">CV</span> Pro
            </Title>
          </div>
        }
        placement="right"
        onClose={toggleMobileMenu}
        open={mobileMenuOpen}
        closeIcon={<CloseOutlined className="hover:text-blue-600" />}
        className="text-start"
        width={250}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors py-2  w-full font-medium flex items-center"
              onClick={toggleMobileMenu}
            >
              <span className="mr-3 text-xl">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </Space>

        <div className="absolute bottom-5 left-5 right-5">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              className="w-full"
              aria-label="Login"
              onClick={() => {
                handleLogin();
                toggleMobileMenu();
              }}
            >
              Login
            </Button>
            <Button
              type="primary"
              className="w-full"
              aria-label="Create CV"
              onClick={() => {
                handleCreateCVNavigation();
                toggleMobileMenu();
              }}
            >
              Create CV
            </Button>
          </Space>
        </div>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
