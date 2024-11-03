import React from "react";
import Navbar from "../Navbar/Navbar";
import ScrollingBanner from "./components/ScrollingBanner";
import HeroSection from "./components/HeroSection";
import { FeatureSection } from "./components/FeatureSection";
import { ImageSection } from "./components/ImageSection";
import { FaqSection } from "./components/FaqSection";
import { CallToAction } from "./components/CallToAction";
import { MotivationalText } from "./components/MotivationalText";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar Component */}
      <Navbar />

      {/* Scrolling Banner */}
      <ScrollingBanner />

      <div className="flex justify-center text-2xl">
        <span className=" text-red-800 font-extrabold">Note :</span>Under
        Development
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Image Section */}
      <ImageSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Call to Action */}
      <CallToAction />

      {/* Motivational Text */}
      <MotivationalText />
    </div>
  );
};

export default LandingPage;
