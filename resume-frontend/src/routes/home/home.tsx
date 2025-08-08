import Navbar from "./components/layout/Navbar/navbar";
import {
  ScrollingBanner,
  HeroSection,
  FeatureSection,
  FaqSection,
  CallToAction,
  MotivationalText,
  ImageSection,
} from "./components";
import Footer from "./components/layout/footer/footer";

export const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <ScrollingBanner />
      <div className="flex justify-center text-2xl">
        <span className=" text-red-800 font-extrabold">Note :</span>Under
        Development
      </div>
      <HeroSection />
      <FeatureSection />
      <ImageSection />
      <FaqSection />
      <CallToAction />
      <MotivationalText />
      <Footer />
    </div>
  );
};
