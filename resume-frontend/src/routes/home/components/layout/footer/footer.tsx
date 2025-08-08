import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Space } from "antd";
import { useState } from "react";

const MicrosoftIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h11v11H0z" fill="#f25022" />
    <path d="M12 0h11v11H12z" fill="#7fba00" />
    <path d="M0 12h11v11H0z" fill="#00a4ef" />
    <path d="M12 12h11v11H12z" fill="#ffb900" />
  </svg>
);

const GoogleIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AmazonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="40"
    height="40"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFB300"
      d="M39.6,39c-4.2,3.1-10.5,5-15.6,5c-7.3,0-13.8-2.9-18.8-7.4c-0.4-0.4,0-0.8,0.4-0.6c5.4,3.1,11.5,4.9,18.3,4.9c4.6,0,10.4-1,15.1-3C39.7,37.7,40.3,38.5,39.6,39z M41.1,36.9c-0.5-0.7-3.5-0.3-4.8-0.2c-0.4,0-0.5-0.3-0.1-0.6c2.3-1.7,6.2-1.2,6.6-0.6c0.4,0.6-0.1,4.5-2.3,6.3c-0.3,0.3-0.7,0.1-0.5-0.2C40.5,40.4,41.6,37.6,41.1,36.9z"
    ></path>
    <path
      fill="#37474F"
      d="M36.9,29.8c-1-1.3-2-2.4-2-4.9v-8.3c0-3.5,0-6.6-2.5-9c-2-1.9-5.3-2.6-7.9-2.6C19,5,14.2,7.2,13,13.4c-0.1,0.7,0.4,1,0.8,1.1l5.1,0.6c0.5,0,0.8-0.5,0.9-1c0.4-2.1,2.1-3.1,4.1-3.1c1.1,0,3.2,0.6,3.2,3v3c-3.2,0-6.6,0-9.4,1.2c-3.3,1.4-5.6,4.3-5.6,8.6c0,5.5,3.4,8.2,7.8,8.2c3.7,0,5.9-0.9,8.8-3.8c0.9,1.4,1.3,2.2,3,3.7c0.4,0.2,0.9,0.2,1.2-0.1l0,0c1-0.9,2.9-2.6,4-3.5C37.4,30.9,37.3,30.3,36.9,29.8z M27,22.1L27,22.1c0,2-0.1,6.9-5,6.9c-3,0-3-3-3-3c0-4.5,4.2-5,8-5V22.1z"
    ></path>
  </svg>
);

const AppleIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      fill="#000000"
    />
  </svg>
);

const NetflixIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
  >
    <path
      fill="#f55376"
      d="M5,18c0.7,0,1.3,0,2,0c0,4.1,0,8.1,0,12.2c-0.8,0.1-1.6,0.2-2.3,0.3C3.7,28,2,23.7,2,23.7 s0,4.3,0,7.1c0.4,0-0.2,0-2,0.3c0-4.3,0-8.7,0-13c0.8,0,2,0,2,0l3,7.3C5,25.4,5,20.8,5,18z M14.7,20c0-0.6,0-1.4,0-2 c-1.9,0-3.8,0-5.7,0c0,4,0,8,0,12c1.9-0.2,3.8-0.4,5.7-0.6c0-0.6,0-1.4,0-2c-1.2,0.1-2.4,0.1-3.7,0.4c0-1.1,0-1.7,0-2.8 c0.9,0,2.1,0,3,0c0-0.6,0-1.4,0-2c-0.9,0-2.1,0-3,0c0-1.1,0-1.9,0-3C11.6,20.1,14.2,20.1,14.7,20z M16,20c0.1,0,1.9,0,2,0 c0,3.2,0,6,0,9.2c0.7,0,1.3,0,2-0.1c0-3.2,0-5.9,0-9.1c0.7,0,1.3,0,2,0c0-0.6,0-1.4,0-2c-2.1,0-3.9,0-6,0C16,18.6,16,19.4,16,20z M28.6,18c-1.9,0-3.7,0-5.6,0c0,3.8,0,7.2,0,11c0.2,0,0.4,0,0.6,0c0.4,0,0.9,0,1.4,0c0-1.6,0-2.4,0-4c0.1,0,2.4,0,2.7,0 c0-0.6,0-1.4,0-2c-0.3,0-2.6,0-2.7,0c0-1,0-2,0-3c0.2,0,3.1,0,3.6,0C28.6,19.5,28.6,18.6,28.6,18z M32,27.5c0-3.3,0-6.2,0-9.5 c-0.7,0-1.3,0-2,0c0,3.8,0,7.4,0,11.2c1.8,0.1,3.6,0.2,5.4,0.4c0-0.6,0-1.3,0-1.9C34.3,27.6,33.1,27.5,32,27.5z M37,29.7 c0.7,0.1,1.3,0.1,2,0.2c0-4,0-7.9,0-11.9c-0.7,0-1.3,0-2,0C37,22,37,25.8,37,29.7z M45.4,24.2c0.9-2,1.7-4,2.6-6.1 c-0.7,0-1.5,0-2.2,0c-0.5,1.3-0.9,2.2-1.4,3.4c-0.5-1.3-0.8-2.2-1.3-3.4c-0.7,0-1.5,0-2.2,0c0.8,2,1.5,4,2.4,6.1 c-0.9,2-1.7,4-2.6,6c0.7,0.1,1.4,0.2,2.1,0.3c0.5-1.3,1-2.2,1.5-3.5c0.5,1.4,1,2.4,1.5,3.8c0.7,0.1,1.6,0.2,2.3,0.3 C47.1,28.7,46.2,26.3,45.4,24.2z"
    ></path>
  </svg>
);

const TeslaIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0l12 4.8v2.4l-12-2.4L0 7.2V4.8L12 0z" fill="#CC0000" />
    <path
      d="M3.6 9.6v12h2.4V9.6H3.6zm14.4 0v12h2.4V9.6H18zm-7.2 0v12h2.4V9.6h-2.4z"
      fill="#CC0000"
    />
    <path
      d="M12 24c-2.4 0-4.32-.96-4.32-2.16V19.2c0-1.2 1.92-2.16 4.32-2.16s4.32.96 4.32 2.16v2.64c0 1.2-1.92 2.16-4.32 2.16z"
      fill="#CC0000"
    />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Press"],
    },
    {
      title: "Product",
      links: ["Features", "Pricing", "Templates", "Examples"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Tutorials", "CV Tips", "FAQ"],
    },
  ];

  const companyLogos = [
    { name: "Microsoft", icon: MicrosoftIcon },
    { name: "Google", icon: GoogleIcon },
    { name: "Amazon", icon: AmazonIcon },
    { name: "Apple", icon: AppleIcon },
    { name: "Netflix", icon: NetflixIcon },
    { name: "Tesla", icon: TeslaIcon },
  ];

  const handleSubscribe = async () => {
    if (!email.trim()) {
      message.error("Please enter a valid email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error("Please enter a valid email format");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubscribed(true);
      message.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      message.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-gray-900">
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl text-black mt-10 font-semibold mb-6">
            Trusted by professionals at top companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {companyLogos.map((company) => {
              const IconComponent = company.icon;
              return (
                <div
                  key={company.name}
                  className="flex items-center space-x-3 opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <IconComponent />
                  <span className="font-semibold text-gray-800 text-base">
                    {company.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold mr-2">
                CV
              </div>
              <span className="text-xl font-semibold text-gray-900">Pro</span>
            </div>

            <p className="text-gray-600 mb-6">
              Design professional CVs that create more opportunities in your
              career.
            </p>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <MailOutlined className="text-blue-600" />
                  <a
                    href="mailto:support@cvpro.com"
                    className="hover:text-blue-600 hover:underline"
                  >
                    support@cvpro.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneOutlined className="text-blue-600" />
                  <a
                    href="tel:+15551234567"
                    className="hover:text-blue-600 hover:underline"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <EnvironmentOutlined className="text-blue-600" />
                  <a
                    href="https://maps.google.com?q=123+CV+Street,+San+Francisco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 hover:underline"
                  >
                    123 CV Street, San Francisco
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="font-semibold text-gray-900 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-600 hover:text-blue-600 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-3">Newsletter</h3>
            {subscribed ? (
              <div className="bg-green-50 text-green-800 p-3 rounded border-l-4 border-green-500 text-xs">
                <p className="font-semibold">Thank you for subscribing!</p>
                <p>You'll receive our next newsletter soon.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  Subscribe to get weekly career tips.
                </p>
                <Space.Compact className="w-full">
                  <Input
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onPressEnter={handleSubscribe}
                    disabled={loading}
                    className="text-gray-900"
                  />
                  <Button
                    type="primary"
                    onClick={handleSubscribe}
                    disabled={loading}
                    icon={loading ? <LoadingOutlined /> : null}
                    className="h-auto"
                  >
                    {loading ? "Sending" : "Go"}
                  </Button>
                </Space.Compact>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CV Pro. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="##"
              aria-label="Twitter"
              className="text-gray-500 hover:text-blue-600 text-lg"
            >
              <TwitterOutlined />
            </a>
            <a
              href="##"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-blue-600 text-lg"
            >
              <LinkedinOutlined />
            </a>
            <a
              href="##"
              aria-label="Facebook"
              className="text-gray-500 hover:text-blue-600 text-lg"
            >
              <FacebookOutlined />
            </a>
            <a
              href="##"
              aria-label="Instagram"
              className="text-gray-500 hover:text-blue-600 text-lg"
            >
              <InstagramOutlined />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
