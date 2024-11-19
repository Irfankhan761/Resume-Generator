import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCreateCVNavigation = () => {
    navigate("/create-cv"); // Navigate to the CV builder route
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contacts", label: "Contacts" },
    { href: "#language", label: "Language" },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600 px-4">
            <span className="font-extrabold">CV</span> Pro
          </div>

          <nav className="hidden md:flex gap-6 items-center p-3 rounded-xl shadow-lg bg-white border-2 border-blue-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-blue-600 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              className="px-5 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-100 transition-all font-medium"
              aria-label="Login"
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
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out"></span>
            </Button>
          </div>

          <div className="md:hidden">
            <MenuOutlined
              className="text-2xl text-gray-700 hover:text-blue-600 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </header>

      {/* Content (add padding-top to prevent overlap) */}
      <div className="pt-[100px]"></div>

      <Drawer
        title="CV Pro"
        placement="right"
        onClose={toggleMobileMenu}
        visible={mobileMenuOpen}
        className="text-center"
        width={200}
      >
        <div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg text-gray-700 hover:text-blue-600
                    transition-colors py-2 block w-full text-start
                    font-medium"
              onClick={toggleMobileMenu}
            >
              {link.label}
            </a>
          ))}

          <div className=" flex flex-col items-start">
            <Button
              className="px-5 py-2 text-blue-600 border border-blue-600  hover:bg-blue-100 transition-all font-medium mb-2 w-24"
              aria-label="Login"
            >
              Login
            </Button>
            <Button
              type="primary"
              className="px-5 py-2 bg-blue-600 text-white  hover:bg-blue-700 transition-all font-medium w-24"
              aria-label="Create CV"
              onClick={handleCreateCVNavigation}
            >
              Create CV
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
