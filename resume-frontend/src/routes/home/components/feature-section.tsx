import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  StarOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

// CONSTANTS
const FEATURES: Feature[] = [
  {
    icon: <StarOutlined style={{ fontSize: '40px' }} />,
    title: 'Professional Templates',
    description:
      'Choose from expertly designed templates tailored for your industry.',
  },
  {
    icon: <RocketOutlined style={{ fontSize: '40px' }} />,
    title: 'AI-Powered Suggestions',
    description: "Get smart recommendations to enhance your resume's impact.",
  },
  {
    icon: <CheckCircleOutlined style={{ fontSize: '40px' }} />,
    title: 'Instant Feedback',
    description: 'Receive real-time suggestions to improve your CV.',
  },
  {
    icon: <EditOutlined style={{ fontSize: '40px' }} />,
    title: 'Easy Editing',
    description: 'Update your CV anytime, anywhere.',
  },
  {
    icon: <StarOutlined style={{ fontSize: '40px' }} />,
    title: 'Modern Designs',
    description: 'Impress recruiters with stylish templates.',
  },
  {
    icon: <RocketOutlined style={{ fontSize: '40px' }} />,
    title: 'Quick Sharing',
    description: 'Share your CV instantly with potential employers.',
  },
  {
    icon: <FileTextOutlined style={{ fontSize: '40px' }} />,
    title: 'Export Options',
    description: 'Export your CV in multiple formats.',
  },
  {
    icon: <QuestionCircleOutlined style={{ fontSize: '40px' }} />,
    title: 'Support',
    description: 'Get help whenever you need it.',
  },
];

const COLORS = [
  '#6366f1', // indigo-500
  '#10b981', // emerald-500
  '#3b82f6', // blue-500
  '#f59e0b', // amber-500
  '#ec4899', // pink-500
  '#8b5cf6', // violet-500
  '#14b8a6', // teal-500
  '#f97316', // orange-500
];

// FEATURE CARD COMPONENT
const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const color = COLORS[index % COLORS.length];

  return (
    <div className="relative rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border overflow-hidden h-full flex flex-col feature-card transform hover:scale-[1.02]">
      <div
        className="absolute top-0 left-0 w-full h-1.5"
        style={{ backgroundColor: color }}
      />
      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex flex-col items-center text-center h-full mt-2">
        <div
          className="mb-4 flex items-center justify-center h-20 w-20 rounded-full bg-opacity-10"
          style={{ backgroundColor: `${color}20` }}
        >
          {React.cloneElement(feature.icon as React.ReactElement, {
            style: {
              ...(feature.icon as React.ReactElement).props.style,
              color,
            },
          })}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-600 flex-grow text-sm leading-relaxed">
          {feature.description}
        </p>
        <a
          href="#!"
          className="mt-4 text-sm font-medium inline-flex items-center"
          style={{ color }}
          onClick={(e) => e.preventDefault()}
        >
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export const FeatureSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const duplicatedFeatures = [...FEATURES, ...FEATURES];

  const autoScroll = useCallback(() => {
    if (scrollRef.current) {
      if (isHovered) {
        animationFrameRef.current = requestAnimationFrame(autoScroll);
        return;
      }

      const { scrollLeft, scrollWidth } = scrollRef.current;
      if (scrollLeft >= scrollWidth / 2) {
        scrollRef.current.scrollLeft = 0;
      } else {
        scrollRef.current.scrollLeft += 1;
      }
    }
    animationFrameRef.current = requestAnimationFrame(autoScroll);
  }, [isHovered]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoScroll]);

  return (
    <div className="bg-gradient-to-b py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create a standout resume that gets noticed
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8"
            style={{
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For Internet Explorer and Edge
            }}
          >
            {duplicatedFeatures.map((feature, index) => (
              <div
                key={index}
                // Responsive card widths
                className="flex-shrink-0 w-[calc(90%-1.5rem)] sm:w-[calc(50%-1.5rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[272px]"
              >
                <FeatureCard
                  feature={feature}
                  index={index % FEATURES.length}
                />
              </div>
            ))}
          </div>
          {/* Fading edges for a cleaner look */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
