import { Collapse } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import React from "react";

export const FaqSection: React.FC = () => {
  const { Panel } = Collapse;

  const faqData = [
    {
      header: "How long does it take to create a CV?",
      content:
        "With our platform, you can create a professional CV in just 15-30 minutes. Our intuitive interface guides you through each step, making the process quick and effortless.",
    },
    {
      header: "Is my information secure?",
      content:
        "We use industry-standard 256-bit SSL encryption to protect your personal and professional data. Your information is never shared with third parties without your consent.",
    },
    {
      header: "Can I download my CV?",
      content:
        "Yes! You can download your CV in multiple formats including PDF, DOCX, and plain text. Premium users also get access to additional template options.",
    },
    {
      header: "Do you offer resume review services?",
      content:
        "We offer optional professional resume review services where our career experts provide personalized feedback to help optimize your resume for your target industry.",
    },
    {
      header: "Can I create multiple versions of my CV?",
      content:
        "Absolutely! You can save multiple versions of your CV tailored for different job applications or career paths, all from your dashboard.",
    },
  ];

  return (
    <div className="max-w-7xl -mt-28 mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Can't find what you're looking for?{" "}
          <a href="#contact" className="text-blue-600 hover:underline">
            Contact our support team
          </a>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <Collapse
            accordion
            bordered={false}
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined className="text-blue-600" />
              ) : (
                <PlusOutlined className="text-blue-600" />
              )
            }
            expandIconPosition="end"
            className="faq-accordion"
          >
            {faqData.map((faq, index) => (
              <Panel
                key={index}
                header={
                  <span className="text-lg font-medium text-gray-800">
                    {faq.header}
                  </span>
                }
                className="mb-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden"
              >
                <div className="p-4 text-gray-600">{faq.content}</div>
              </Panel>
            ))}
          </Collapse>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300" />
          <img
            src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Woman reviewing documents"
            className="relative rounded-2xl shadow-xl w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200 hidden md:block">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Still have questions?
                </h4>
                <p className="text-sm text-gray-600">We're here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
