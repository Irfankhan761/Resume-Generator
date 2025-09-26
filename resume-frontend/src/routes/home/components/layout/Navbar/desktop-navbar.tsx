import React from 'react';
import { Button } from 'antd';

interface NavLink {
  href: string;
  label: string;
}

interface DesktopNavbarProps {
  navLinks: NavLink[];
  handleLogin: () => void;
  handleCreateCVNavigation: () => void;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  navLinks,
  handleLogin,
  handleCreateCVNavigation,
}) => {
  return (
    <nav className="hidden md:flex items-center justify-between w-full">
      <div className="text-2xl font-bold text-blue-600 px-4">
        <span className="font-extrabold">CV</span> Pro
      </div>

      <div className="flex gap-6 items-center ml-20 p-3 rounded-xl shadow-lg bg-white border-2 border-blue-200">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-blue-600 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button
          className="px-5 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-100 transition-all font-medium"
          aria-label="Login"
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          type="primary"
          className={`px-5 py-2 bg-blue-600 text-white rounded-full
                    hover:bg-blue-700 transition-all font-medium
                    group relative overflow-hidden`}
          aria-label="Create CV"
          onClick={handleCreateCVNavigation}
        >
          <span className="z-10">Create CV</span>
          <span className="absolute inset-0 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out"></span>
        </Button>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
