import React, { useEffect, useState, useRef } from "react";
import { Card, Button } from "antd";
import {
  StarOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

export const FeatureSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Combined feature data
  const features = [
    {
      icon: <StarOutlined style={{ fontSize: "40px", color: "#1890ff" }} />,
      title: "Professional Templates",
      description:
        "Choose from expertly designed templates tailored for your industry.",
    },
    {
      icon: <RocketOutlined style={{ fontSize: "40px", color: "#52c41a" }} />,
      title: "AI-Powered Suggestions",
      description: "Get smart recommendations to enhance your resume's impact.",
    },
    {
      icon: (
        <CheckCircleOutlined style={{ fontSize: "40px", color: "#722ed1" }} />
      ),
      title: "Instant Feedback",
      description: "Receive real-time suggestions to improve your CV.",
    },
    {
      icon: <EditOutlined style={{ fontSize: "40px", color: "#eb2f96" }} />,
      title: "Easy Editing",
      description: "Update your CV anytime, anywhere.",
    },
    {
      icon: <StarOutlined style={{ fontSize: "40px", color: "#faad14" }} />,
      title: "Modern Designs",
      description: "Impress recruiters with stylish templates.",
    },
    {
      icon: <RocketOutlined style={{ fontSize: "40px", color: "#f5222d" }} />,
      title: "Quick Sharing",
      description: "Share your CV instantly with potential employers.",
    },
    {
      icon: <FileTextOutlined style={{ fontSize: "40px", color: "#2f54eb" }} />,
      title: "Export Options",
      description: "Export your CV in multiple formats.",
    },
    {
      icon: (
        <QuestionCircleOutlined
          style={{ fontSize: "40px", color: "#13c2c2" }}
        />
      ),
      title: "Support",
      description: "Get help whenever you need it.",
    },
  ];

  const doubledFeatures = [...features, ...features];

  useEffect(() => {
    const updateScrollState = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setScrollPosition(scrollLeft);
        setMaxScroll(scrollWidth - clientWidth);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", updateScrollState);
      // Initial update
      updateScrollState();
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", updateScrollState);
      }
    };
  }, []);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current && !isHovered) {
        const { scrollLeft, scrollWidth } = scrollRef.current;

        if (scrollLeft >= scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 1;
        }
      }
    };

    const scrollInterval = setInterval(scroll, 30);
    return () => clearInterval(scrollInterval);
  }, [isHovered]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 288; // Card width (272) + gap (16)
      const visibleCards = Math.floor(
        scrollRef.current.clientWidth / cardWidth
      );
      const scrollAmount = cardWidth * visibleCards;

      const newScrollPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(maxScroll, scrollPosition + scrollAmount);

      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-12">
          Our Features
        </h2>

        <div className="relative group">
          {/* Left Navigation Button */}
          <Button
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => handleScroll("left")}
            style={{
              visibility: scrollPosition <= 0 ? "hidden" : "visible",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          />

          {/* Right Navigation Button */}
          <Button
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            type="primary"
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => handleScroll("right")}
            style={{
              visibility: scrollPosition >= maxScroll ? "hidden" : "visible",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          />

          {/* Carousel Container */}
          <div
            className="overflow-hidden mx-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-8 scroll-smooth hide-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {doubledFeatures.map((feature, index) => (
                <Card key={index} className="flex-shrink-0 w-[272px]" hoverable>
                  <div className="flex flex-col items-center">
                    <div className="mb-4 flex items-center justify-center h-20">
                      {feature.icon}
                    </div>
                    <Card.Meta
                      title={
                        <div className="text-lg font-semibold text-center mb-2">
                          {feature.title}
                        </div>
                      }
                      description={
                        <div className="text-center text-gray-600">
                          {feature.description}
                        </div>
                      }
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          <div className="h-1 w-16 bg-blue-500 rounded animate-pulse" />
          <div className="h-1 w-4 bg-gray-200 rounded" />
          <div className="h-1 w-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
