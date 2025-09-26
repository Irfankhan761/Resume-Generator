import React from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopNavbar from './desktop-navbar';
import MobileNavbar from './mobile-navbar';
import {
  HomeOutlined,
  InfoCircleOutlined,
  CustomerServiceOutlined,
  ContactsOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateCVNavigation = () => {
    navigate('/create-cv');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Add the 'icon' property to each nav link object
  const navLinks = [
    { href: '#home', label: 'Home', icon: <HomeOutlined /> },
    { href: '#about', label: 'About', icon: <InfoCircleOutlined /> },
    { href: '#services', label: 'Services', icon: <CustomerServiceOutlined /> },
    { href: '#contacts', label: 'Contacts', icon: <ContactsOutlined /> },
    { href: '#language', label: 'Language', icon: <GlobalOutlined /> },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 rounded-b-lg">
        <div className="flex items-center justify-between">
          <DesktopNavbar
            navLinks={navLinks}
            handleLogin={handleLogin}
            handleCreateCVNavigation={handleCreateCVNavigation}
          />
          <MobileNavbar
            navLinks={navLinks}
            handleLogin={handleLogin}
            handleCreateCVNavigation={handleCreateCVNavigation}
          />
        </div>
      </header>

      <div className="pt-[80px]"></div>
    </>
  );
};

export default Navbar;
