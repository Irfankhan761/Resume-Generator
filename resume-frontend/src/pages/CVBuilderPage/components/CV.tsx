// components/CV.tsx
import { useState, useCallback } from "react";
import type { CVData } from "./types";
import { Sidebar } from "./sidebar";
import { CVForms } from "./CVForm";
import { CVPreviews } from "./CVPreview";
import { ArrowDownToLine, Eye, EyeOff } from "lucide-react";
import { Layout } from "antd";
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
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    github: "",
    summary: "",
  },
  education: [],
  workExperience: [],
  projects: [],
  skills: [],
};

export const CV = () => {
  // State management
  const [activeSection, setActiveSection] =
    useState<CVSection>("Personal Info");
  const [cvData, setCVData] = useState<CVData>(initialData);
  const [showPreview, setShowPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Handle data updates
  const handleDataChange = useCallback((newData: CVData) => {
    setCVData(newData);
    // Optionally save to localStorage
    localStorage.setItem("cv-data", JSON.stringify(newData));
  }, []);

  // Export CV data
  const handleExport = useCallback(async () => {
    try {
      setIsSaving(true);
      const dataStr = JSON.stringify(cvData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cv-data-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CV:", error);
      // You might want to show an error toast here
    } finally {
      setIsSaving(false);
    }
  }, [cvData]);

  // Import CV data
  const handleImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setCVData(importedData);
          localStorage.setItem("cv-data", JSON.stringify(importedData));
        } catch (error) {
          console.error("Error importing CV:", error);
          // You might want to show an error toast here
        }
      };
      reader.readAsText(file);
    },
    []
  );

  const togglePreview = useCallback(() => {
    setShowPreview((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* <h1 className="text-xl font-bold text-gray-900">CV Builder</h1> */}
          <h1 className="text-xl font-bold text-gray-900"> </h1>

          <div className="flex items-center space-x-4">
            {/* Import button */}
            <label className="btn btn-outline btn-sm">
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                // className="hidden"
              />
            </label>

            {/* Export button */}
            <button
              onClick={handleExport}
              disabled={isSaving}
              className="btn btn-primary btn-sm flex items-center space-x-2"
            >
              <ArrowDownToLine size={16} />
              <span>{isSaving ? "Exporting..." : "Export"}</span>
            </button>

            {/* Preview toggle */}
            <button
              onClick={togglePreview}
              className="btn btn-ghost btn-sm flex items-center space-x-2"
            >
              {showPreview ? (
                <>
                  <EyeOff size={16} />
                  <span>Hide Preview</span>
                </>
              ) : (
                <>
                  <Eye size={16} />
                  <span>Show Preview</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>
      <>
        <Layout>
          {/* Sidebar */}
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Main content */}
          <Layout style={{ marginLeft: 260, transition: "margin-left 0.3s" }}>
            <Content className="p-8">
              <div className="grid grid-cols-2 gap-8">
                {/* Forms Section */}
                <div className="space-y-6">
                  <CVForms
                    data={cvData}
                    onChange={handleDataChange}
                    activeSection={activeSection}
                  />
                </div>

                {/* Preview Section */}
                <div className="sticky top-0">
                  <CVPreviews data={cvData} />
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </>

      {/* Footer */}
    </div>
  );
};
