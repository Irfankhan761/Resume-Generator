import { Button } from "antd";
import React from "react";
import { ArrowRightOutlined, RocketOutlined } from "@ant-design/icons";

export const ImageSection: React.FC = () => {
  return (
    <div className="max-w-7xl -mt-14 mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white mb-16">
        <div className="relative w-full md:w-1/2 h-80 md:h-[32rem]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
              backgroundPosition: "center 30%",
            }}
            role="img"
            aria-label="Professional CV example on desk"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10" />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Stand out
            </span>{" "}
            from the competition and secure your dream job
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            <span className="font-semibold text-gray-800">
              Our professional CV builder creates eye-catching resumes designed
              to get noticed.
            </span>{" "}
            Professionally formatted CVs make a strong impression and
            effectively showcase your qualifications.
          </p>
          <Button
            type="primary"
            size="large"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 h-14 rounded-xl font-medium self-start flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
            icon={<RocketOutlined />}
          >
            Get Started Now
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
        <div className="relative w-full md:w-1/2 h-80 md:h-[32rem]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
              backgroundPosition: "center 30%",
            }}
            role="img"
            aria-label="Person using laptop to create CV"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10" />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Create
            </span>{" "}
            your perfect CV in minutes with our easy-to-use builder
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            <span className="font-semibold text-gray-800">
              No design skills needed.
            </span>{" "}
            Just fill in your details, choose a template, and download your
            professional CV ready to impress.
          </p>
          <Button
            type="default"
            size="large"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 px-8 h-14 rounded-xl font-medium self-start flex items-center justify-center gap-2 transition-all duration-300"
            icon={<ArrowRightOutlined />}
          >
            Try It Free
          </Button>
        </div>
      </div>
    </div>
  );
};
