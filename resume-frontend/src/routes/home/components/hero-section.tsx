import { Button, Typography } from "antd";
import { FileAddOutlined, RocketOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";

export const HeroSection = () => {
  const { Title, Paragraph, Text } = Typography;
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const [currentPhase, setCurrentPhase] = useState<
    "typing" | "waiting" | "deleting"
  >("typing");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const trustSectionRef = useRef<HTMLDivElement>(null);

  const [counts, setCounts] = useState({
    cvs: 0,
    satisfaction: 0,
    interviews: 0,
    templates: 0,
  });

  const lines = useMemo(
    () => [
      "Create Your Perfect CV in Minutes",
      "AI-Powered Resume Builder",
      "Land Your Dream Job Faster",
    ],
    []
  );

  const finalValues = useMemo(
    () => ({
      cvs: 10000,
      satisfaction: 95,
      interviews: 3,
      templates: 50,
    }),
    []
  );

  const easeOutQuad = useMemo(() => (t: number) => t * (2 - t), []);

  const handleCreateCV = (type: "new" | "import") => {
    navigate("/create-cv", { state: { type } });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const currentLine = lines[currentLineIndex];
    const baseTypingSpeed = 80;
    const baseDeletingSpeed = 40;
    const waitingTime = 1500;

    const typingSpeed = Math.max(
      baseTypingSpeed - currentLine.length * 0.5,
      30
    );
    const deletingSpeed = Math.max(
      baseDeletingSpeed - currentLine.length * 0.3,
      20
    );

    const executePhase = () => {
      switch (currentPhase) {
        case "typing":
          if (displayedText.length < currentLine.length) {
            setDisplayedText(
              currentLine.substring(0, displayedText.length + 1)
            );
          } else {
            setCurrentPhase("waiting");
          }
          break;
        case "waiting":
          setCurrentPhase("deleting");
          break;
        case "deleting":
          if (displayedText.length > 0) {
            setDisplayedText(
              displayedText.substring(0, displayedText.length - 1)
            );
          } else {
            setCurrentLineIndex((prevIndex) => (prevIndex + 1) % lines.length);
            setCurrentPhase("typing");
          }
          break;
      }
    };

    if (
      currentPhase === "typing" &&
      displayedText.length < currentLine.length
    ) {
      timeoutId = setTimeout(executePhase, typingSpeed);
    } else if (
      currentPhase === "typing" &&
      displayedText.length === currentLine.length
    ) {
      timeoutId = setTimeout(executePhase, waitingTime);
    } else if (currentPhase === "waiting") {
      timeoutId = setTimeout(executePhase, 0);
    } else if (currentPhase === "deleting" && displayedText.length > 0) {
      timeoutId = setTimeout(executePhase, deletingSpeed);
    } else if (currentPhase === "deleting" && displayedText.length === 0) {
      timeoutId = setTimeout(executePhase, 300);
    }

    return () => clearTimeout(timeoutId);
  }, [currentPhase, currentLineIndex, displayedText, lines]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 1000;
            const startTime = performance.now();

            const animateCount = (timestamp: number) => {
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easeOutQuad(progress);

              setCounts({
                cvs: Math.floor(easedProgress * finalValues.cvs),
                satisfaction: Math.floor(
                  easedProgress * finalValues.satisfaction
                ),
                interviews: Math.floor(
                  easedProgress * finalValues.interviews * 0.8
                ),
                templates: Math.floor(
                  easedProgress * finalValues.templates * 0.6
                ),
              });

              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                setCounts({
                  cvs: finalValues.cvs,
                  satisfaction: finalValues.satisfaction,
                  interviews: finalValues.interviews,
                  templates: finalValues.templates,
                });
              }
            };

            requestAnimationFrame(animateCount);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );

    if (trustSectionRef.current) {
      observer.observe(trustSectionRef.current);
    }

    return () => observer.disconnect();
  }, [finalValues, easeOutQuad]);

  return (
    <div className="container mx-auto px-4 pt-16 pb-24 text-center">
      <div className="mb-16">
        <Title className="text-5xl md:text-7xl font-bold mb-8 min-h-[96px]">
          <span
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent
            animate-gradient-x"
          >
            {displayedText}
            <span
              className={`${
                currentPhase === "typing" ? "animate-pulse" : "opacity-0"
              }`}
            >
              |
            </span>
          </span>
        </Title>

        <Paragraph className="text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
          Transform your professional story with our AI-powered CV builder.
          Craft compelling resumes that stand out and land your dream job.
        </Paragraph>

        <div className="flex flex-wrap justify-center gap-8 mb-20">
          <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            className="bg-blue-600 hover:bg-blue-700 h-16 px-10 rounded-lg transition-all hover:scale-[1.02] text-xl shadow-lg hover:shadow-xl"
            onClick={() => handleCreateCV("new")}
          >
            Create New CV
          </Button>
          <Button
            type="default"
            size="large"
            icon={<FileAddOutlined />}
            className="border-blue-600 text-blue-600 hover:border-blue-700 h-16 px-10 rounded-lg transition-all hover:scale-[1.02] text-xl shadow hover:shadow-md"
            onClick={() => handleCreateCV("import")}
          >
            Import Resume
          </Button>
        </div>
      </div>

      <div ref={trustSectionRef} className="mt-24 px-4">
        <Text
          type="secondary"
          className="mb-12 block text-2xl font-medium tracking-wider"
        >
          TRUSTED BY PROFESSIONALS WORLDWIDE
        </Text>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="text-center min-w-[160px] transition-all hover:scale-105">
            <Text
              strong
              className="text-5xl md:text-6xl block font-bold text-blue-600"
            >
              <span className="count-up">{counts.cvs.toLocaleString()}</span>+
            </Text>
            <Text type="secondary" className="text-xl mt-2">
              CVs Created
            </Text>
          </div>
          <div className="text-center min-w-[160px] transition-all hover:scale-105">
            <Text
              strong
              className="text-5xl md:text-6xl block font-bold text-purple-600"
            >
              <span className="count-up">{counts.satisfaction}</span>%
            </Text>
            <Text type="secondary" className="text-xl mt-2">
              Satisfaction Rate
            </Text>
          </div>
          <div className="text-center min-w-[160px] transition-all hover:scale-105">
            <Text
              strong
              className="text-5xl md:text-6xl block font-bold text-green-600"
            >
              <span className="count-up">{counts.interviews}</span>x
            </Text>
            <Text type="secondary" className="text-xl mt-2">
              More Interviews
            </Text>
          </div>
          <div className="text-center min-w-[160px] transition-all hover:scale-105">
            <Text
              strong
              className="text-5xl md:text-6xl block font-bold text-orange-600"
            >
              <span className="count-up">{counts.templates}</span>+
            </Text>
            <Text type="secondary" className="text-xl mt-2">
              Templates
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
