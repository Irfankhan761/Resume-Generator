import { useState, useCallback, useRef } from "react";
import type { CVData } from "./types";
import { Sidebar } from "./sidebar";
import { CVForms } from "./CVForm";
import { CVPreviews } from "./CVPreview";
import { ArrowDownToLine } from "lucide-react";
import { Layout } from "antd";
import html2pdf from "html2pdf.js";

const { Content } = Layout;

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
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDataChange = useCallback((newData: CVData) => {
    setCVData(newData);
    localStorage.setItem("cv-data", JSON.stringify(newData));
  }, []);

  const handleExportAsPDF = useCallback(async () => {
    if (!previewRef.current) return;

    setIsSaving(true);
    try {
      const element = previewRef.current;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${cvData.personalInfo.fullName.replace(/\s+/g, "_")}_CV.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
        pagebreak: { mode: "avoid-all" },
        enableLinks: true,
      };

      const clonedElement = element.cloneNode(true) as HTMLElement;

      clonedElement.querySelectorAll("a").forEach((link) => {
        if (link.href.startsWith("/")) {
          link.href = window.location.origin + link.href;
        }
      });

      clonedElement.querySelectorAll(".anticon").forEach((icon) => {
        icon.classList.add("pdf-visible");
      });

      await html2pdf()
        .set(opt as any)
        .from(clonedElement)
        .save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsSaving(false);
    }
  }, [cvData.personalInfo.fullName]);

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
                <div ref={previewRef}>
                  <CVPreviews data={cvData} />
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
