import { Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export const CallToAction: React.FC = () => {
  const { Title, Paragraph } = Typography;

  // Ultra HD professional background (fixed URL)
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

  return (
    <section
      className="relative h-[600px] overflow-hidden group"
      style={{
        perspective: "1px", // Enables proper parallax effect
        transformStyle: "preserve-3d",
      }}
    >
      {/* Parallax Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 parallax-background"
        style={{
          backgroundImage: `linear-gradient(
            to right,
            rgba(41, 98, 255, 0.85),
            rgba(124, 58, 237, 0.85)
          ), url('${backgroundImageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "translateZ(-1px) scale(2)",
          willChange: "transform",
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 animate-pulse">
            <span className="text-white font-medium">
              New Feature Available
            </span>
          </div>

          <Title
            level={1}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight"
            style={{
              textShadow: "0 4px 12px rgba(0,0,0,0.25)",
              background: "linear-gradient(to right, #fff, #e0e0e0)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Craft Your{" "}
            <span className="bg-clip-text text-blue-400">Professional</span> CV
          </Title>

          <Paragraph
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            Join{" "}
            <span className="font-semibold text-white">
              10,000+ professionals
            </span>{" "}
            who landed dream jobs with our AI-powered CV builder. Get noticed by
            recruiters.
          </Paragraph>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              type="primary"
              size="large"
              className="h-14 px-10 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 
              border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]
              flex items-center justify-center gap-2"
              icon={<ArrowRightOutlined />}
            >
              Create CV Now
            </Button>

            <Button
              size="large"
              className="h-14 px-10 text-lg font-bold bg-white/10 backdrop-blur-md
              border-white/30 text-white hover:bg-white/20 hover:text-white
              transition-all duration-300 hover:scale-[1.02]"
            >
              See Examples
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 items-center opacity-90">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-white/90 text-sm">5k+ Active Users</span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/30"></div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white/90 text-sm">
                4.9/5 (2,483 Reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
