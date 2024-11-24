import { useState, useCallback } from "react";
import type { CVData } from "./types";
import { Sidebar } from "./sidebar";
import { CVForms } from "./CVForm";
import { CVPreviews } from "./CVPreview";
import { ArrowDownToLine } from "lucide-react";
import { Layout } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const { Content } = Layout;

// Define sections for type safety
export type CVSection =
  | "Personal Info"
  | "Education"
  | "Work Experience"
  | "Projects"
  | "Skills";

const initialData: CVData = {
  personalInfo: {
    fullName: "Irfan Khan",
    jobTitle: "Software Engr.",
    email: "irfandk1994@gmail.com",
    phone: "03159046761",
    location: "Saleem Khan Swabi KPK",
    linkedin: "https://www.linkedin.com/in/irfankhan761/",
    website: "https://irfankhan761.github.io/MyPortfolio/",
    github: "https://github.com/Irfankhan761",
    summary:
      "I am a dedicated full-stack developer with expertise in React, TypeScript, and AdonisJS, specializing in building scalable and efficient web applications. I have a strong command of PostgreSQL, Ant Design, and Tailwind CSS, with proven skills in crafting intuitive front-end designs and robust back-end solutions. Passionate about problem-solving, I focus on writing clean, maintainable code and delivering high-quality software solutions. My goal is to continually grow as a versatile developer and contribute to impactful projects.",
  },
  education: [],
  workExperience: [],
  projects: [],
  skills: [],
};

export const CV = () => {
  const [activeSection, setActiveSection] =
    useState<CVSection>("Personal Info");
  const [cvData, setCVData] = useState<CVData>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleDataChange = useCallback((newData: CVData) => {
    setCVData(newData);
    localStorage.setItem("cv-data", JSON.stringify(newData));
  }, []);

  const handleExportAsPDF = useCallback(async () => {
    try {
      setIsSaving(true);

      const element = document.getElementById("cv-preview");
      if (!element) throw new Error("Preview section not found");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let yOffset = 0;
      while (yOffset < imgHeight) {
        pdf.addImage(imgData, "PNG", 0, -yOffset, imgWidth, imgHeight);

        yOffset += pdfHeight;
        if (yOffset < imgHeight) pdf.addPage();
      }

      pdf.save(`cv-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Error exporting CV as PDF:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">CV Builder</h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportAsPDF}
              disabled={isSaving}
              className="btn btn-primary btn-sm flex items-center space-x-2"
            >
              <ArrowDownToLine size={16} />
              <span>{isSaving ? "Exporting..." : "Export PDF"}</span>
            </button>
          </div>
        </div>
      </header>

      <Layout>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <Layout style={{ marginLeft: 260, transition: "margin-left 0.3s" }}>
          <Content className="p-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <CVForms
                  data={cvData}
                  onChange={handleDataChange}
                  activeSection={activeSection}
                />
              </div>
              <div className="sticky top-0" id="cv-preview">
                <CVPreviews data={cvData} />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
