import React, { useEffect, useState, useRef, useCallback } from "react";
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
import { Button } from "antd";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

interface ProgressDotsProps {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FEATURES: Feature[] = [
  {
    icon: <StarOutlined style={{ fontSize: "40px" }} />,
    title: "Professional Templates",
    description:
      "Choose from expertly designed templates tailored for your industry.",
  },
  {
    icon: <RocketOutlined style={{ fontSize: "40px" }} />,
    title: "AI-Powered Suggestions",
    description: "Get smart recommendations to enhance your resume's impact.",
  },
  {
    icon: <CheckCircleOutlined style={{ fontSize: "40px" }} />,
    title: "Instant Feedback",
    description: "Receive real-time suggestions to improve your CV.",
  },
  {
    icon: <EditOutlined style={{ fontSize: "40px" }} />,
    title: "Easy Editing",
    description: "Update your CV anytime, anywhere.",
  },
  {
    icon: <StarOutlined style={{ fontSize: "40px" }} />,
    title: "Modern Designs",
    description: "Impress recruiters with stylish templates.",
  },
  {
    icon: <RocketOutlined style={{ fontSize: "40px" }} />,
    title: "Quick Sharing",
    description: "Share your CV instantly with potential employers.",
  },
  {
    icon: <FileTextOutlined style={{ fontSize: "40px" }} />,
    title: "Export Options",
    description: "Export your CV in multiple formats.",
  },
  {
    icon: <QuestionCircleOutlined style={{ fontSize: "40px" }} />,
    title: "Support",
    description: "Get help whenever you need it.",
  },
];

const COLORS = [
  "#6366f1", // indigo-500
  "#10b981", // emerald-500
  "#3b82f6", // blue-500
  "#f59e0b", // amber-500
  "#ec4899", // pink-500
  "#8b5cf6", // violet-500
  "#14b8a6", // teal-500
  "#f97316", // orange-500
];

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const color = COLORS[index % COLORS.length];

  return (
    <div className="relative rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border  overflow-hidden h-full flex flex-col feature-card transform hover:scale-[1.02]">
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
          href="!"
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

const CarouselControls: React.FC<CarouselControlsProps> = ({
  onPrev,
  onNext,
  canScrollLeft,
  canScrollRight,
}) => (
  <>
    <Button
      onClick={onPrev}
      disabled={!canScrollLeft}
      className={`absolute left-2 top-1/2 transform -translate-y-1/2 -translate-x-10 z-10 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110 ${
        !canScrollLeft ? "opacity-30 cursor-not-allowed" : ""
      }`}
      style={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#3b82f6",
      }}
      aria-label="Previous features"
    >
      <LeftOutlined style={{ fontSize: "18px" }} />
    </Button>
    <Button
      onClick={onNext}
      disabled={!canScrollRight}
      className={`absolute right-2 top-1/2 transform -translate-y-1/2 translate-x-10 z-10 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110 ${
        !canScrollRight ? "opacity-30 cursor-not-allowed" : ""
      }`}
      style={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#3b82f6",
      }}
      aria-label="Next features"
    >
      <RightOutlined style={{ fontSize: "18px" }} />
    </Button>
  </>
);

const ProgressDots: React.FC<ProgressDotsProps> = ({
  count,
  activeIndex,
  onDotClick,
}) => (
  <div className="mt-6 flex justify-center gap-2">
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={`h-2 rounded-full transition-all duration-300 ${
          index === activeIndex
            ? "w-8 bg-blue-500"
            : "w-3 bg-gray-200 hover:bg-gray-300"
        }`}
        aria-label={`Go to feature ${index + 1}`}
      />
    ))}
  </div>
);

export const FeatureSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollIntervalRef = useRef<NodeJS.Timeout>();
  const scrollRequestRef = useRef<number>();

  const updateScrollState = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollPosition(scrollLeft);
      setMaxScroll(scrollWidth - clientWidth);
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      const cardWidth = 288;
      const newIndex = Math.round(scrollLeft / cardWidth) % FEATURES.length;
      setActiveIndex(newIndex);
    }
  }, []);

  const smoothScroll = useCallback(() => {
    if (isHovered || !scrollRef.current) return;

    const { scrollLeft, scrollWidth } = scrollRef.current;
    const targetPos = scrollLeft >= scrollWidth / 2 ? 0 : scrollLeft + 1;

    scrollRef.current.scrollLeft = targetPos;
    scrollRequestRef.current = requestAnimationFrame(smoothScroll);
  }, [isHovered]);

  const startAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    if (scrollRequestRef.current)
      cancelAnimationFrame(scrollRequestRef.current);

    scrollRequestRef.current = requestAnimationFrame(smoothScroll);

    scrollIntervalRef.current = setInterval(() => {
      if (!isHovered && scrollRef.current) {
        const { scrollLeft, scrollWidth } = scrollRef.current;
        const targetPos = scrollLeft >= scrollWidth / 2 ? 0 : scrollLeft + 1;
        scrollRef.current.scrollLeft = targetPos;
      }
    }, 30);
  }, [isHovered, smoothScroll]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", updateScrollState);
      setTimeout(updateScrollState, 100);
      startAutoScroll();

      return () => {
        scrollElement.removeEventListener("scroll", updateScrollState);
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        if (scrollRequestRef.current)
          cancelAnimationFrame(scrollRequestRef.current);
      };
    }
  }, [startAutoScroll, updateScrollState]);

  useEffect(() => {
    if (!isHovered) {
      startAutoScroll();
    }
  }, [isHovered, startAutoScroll]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 288;
      const visibleCards = Math.floor(
        scrollRef.current.clientWidth / cardWidth
      );
      const scrollAmount = cardWidth * Math.max(1, visibleCards);

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

  const handleDotClick = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 288;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b  py-16">
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
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CarouselControls
            onPrev={() => handleScroll("left")}
            onNext={() => handleScroll("right")}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
          />

          <div className="overflow-hidden px-8">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-8 scroll-smooth scrolling-container"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {[...FEATURES, ...FEATURES].map((feature, index) => (
                <div key={index} className="flex-shrink-0 w-[272px]">
                  <FeatureCard
                    feature={feature}
                    index={index % FEATURES.length}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 w-16 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16  to-transparent pointer-events-none" />
        </div>

        <ProgressDots
          count={FEATURES.length}
          activeIndex={activeIndex}
          onDotClick={handleDotClick}
        />
      </div>
    </div>
  );
};

export default FeatureSection;
