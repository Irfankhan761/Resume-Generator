import { Image, Typography } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  CompassOutlined,
  LinkedinOutlined,
  GithubOutlined,
  GlobalOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { PersonalInfo } from '../../types/types';

const { Title, Text } = Typography;

interface PersonalInfoPreviewProps {
  data: PersonalInfo & { profileImage?: string };
}

export const PersonalInfoPreview = ({ data }: PersonalInfoPreviewProps) => {
  const hasContactInfo = data.email || data.phone || data.location;
  const hasSocialLinks = data.linkedin || data.github || data.website;

  const ContactItem = ({
    icon,
    text,
    href,
  }: {
    icon: React.ReactNode;
    text: string;
    href?: string;
  }) => {
    const content = (
      <div className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-default">
        <span className="text-blue-500 group-hover:text-blue-600 transition-colors text-sm">
          {icon}
        </span>
        <Text className="text-slate-700 text-sm font-medium group-hover:text-slate-800 transition-colors">
          {text}
        </Text>
      </div>
    );

    return href ? (
      <a
        href={href}
        className="no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    ) : (
      content
    );
  };

  const SocialLink = ({
    href,
    icon,
    label,
    bgColor = 'bg-white',
    hoverColor = 'hover:bg-gray-50',
    textColor = 'text-gray-700',
  }: {
    href: string;
    icon: React.ReactNode;
    label: string;
    bgColor?: string;
    hoverColor?: string;
    textColor?: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center justify-center w-11 h-11 ${bgColor} ${hoverColor} ${textColor} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 hover:-translate-y-0.5`}
      aria-label={label}
    >
      <span className="text-lg group-hover:scale-110 transition-transform duration-200">
        {icon}
      </span>
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </a>
  );

  return (
    <div className="relative print:break-inside-avoid">
      {/* Decorative background elements */}
      <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl print:hidden"></div>
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-indigo-100 rounded-full opacity-40 blur-lg print:hidden"></div>

      <div className="relative bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-lg print:shadow-none print:border-gray-300">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            {data.profileImage ? (
              // FIX: Wrapped Image in a div to enforce size and applied styling to the wrapper.
              // The Image component now fills its parent, and its preview feature is disabled.
              <div
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden
                           border-4 border-white shadow-lg ring-2 ring-blue-100"
              >
                <Image
                  src={data.profileImage}
                  alt={`${data.fullName || 'Profile'} photo`}
                  className="w-full h-full object-cover" // Make the image fill its container
                  preview={false} // Disable Ant Design's default image preview
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-blue-100">
                {data.fullName ? (
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {data.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                ) : (
                  <UserOutlined className="text-2xl md:text-3xl text-white" />
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
            )}
          </div>

          {/* Name */}
          <Title
            level={1}
            className="!mb-2 !text-3xl md:!text-4xl font-bold !text-gray-900 tracking-tight print:!text-black"
          >
            {data.fullName || (
              <span className="text-gray-400 italic">Enter your full name</span>
            )}
          </Title>

          {/* Animated underline */}
          <div className="relative mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 print:bg-gray-400">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full animate-pulse print:hidden"></div>
          </div>

          {/* Job Title */}
          {data.jobTitle && (
            <Title
              level={3}
              className="!mt-0 !mb-6 !text-lg md:!text-xl font-semibold !text-blue-700 tracking-wide print:!text-gray-700"
            >
              {data.jobTitle}
            </Title>
          )}
        </div>

        {/* Contact Information */}
        {hasContactInfo && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {data.email && (
                <ContactItem
                  icon={<MailOutlined />}
                  text={data.email}
                  href={`mailto:${data.email}`}
                />
              )}
              {data.phone && (
                <ContactItem
                  icon={<PhoneOutlined />}
                  text={data.phone}
                  href={`tel:${data.phone}`}
                />
              )}
              {data.location && (
                <ContactItem icon={<CompassOutlined />} text={data.location} />
              )}
            </div>
          </div>
        )}

        {/* Social Links */}
        {hasSocialLinks && (
          <div className="mb-8">
            <div className="flex justify-center gap-4 pb-4">
              {data.linkedin && (
                <SocialLink
                  href={data.linkedin}
                  icon={<LinkedinOutlined />}
                  label="LinkedIn"
                  bgColor="bg-blue-50"
                  hoverColor="hover:bg-blue-100"
                  textColor="text-blue-600"
                />
              )}
              {data.github && (
                <SocialLink
                  href={data.github}
                  icon={<GithubOutlined />}
                  label="GitHub"
                  bgColor="bg-gray-50"
                  hoverColor="hover:bg-gray-100"
                  textColor="text-gray-700"
                />
              )}
              {data.website && (
                <SocialLink
                  href={data.website}
                  icon={<GlobalOutlined />}
                  label="Website"
                  bgColor="bg-teal-50"
                  hoverColor="hover:bg-teal-100"
                  textColor="text-teal-600"
                />
              )}
            </div>
          </div>
        )}

        {/* Professional Summary */}
        {data.summary && (
          <div className="relative print:break-inside-avoid">
            <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 print:shadow-none print:border-gray-300">
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 print:bg-gray-400"></div>
                <Title
                  level={4}
                  className="!mb-0 !text-gray-800 !font-semibold !text-base md:!text-lg tracking-wide uppercase print:!text-black"
                >
                  Professional Summary
                </Title>
              </div>
              <Text className="text-gray-700 leading-relaxed text-sm md:text-base block print:text-black">
                {data.summary}
              </Text>
            </div>
          </div>
        )}

        {/* Empty state when no data */}
        {!data.fullName &&
          !data.jobTitle &&
          !hasContactInfo &&
          !hasSocialLinks &&
          !data.summary && (
            <div className="text-center py-8 print:hidden">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserOutlined className="text-2xl text-gray-400" />
              </div>
              <Text className="text-gray-500 italic">
                Start filling in your personal information to see the preview
              </Text>
            </div>
          )}
      </div>
    </div>
  );
};
