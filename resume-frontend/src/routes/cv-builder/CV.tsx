import { useState, useCallback, useRef } from 'react';
import type { CVData } from './types/types';
import { Sidebar } from './components/layout/Sidebar/sidebar';
import { CVForms } from './components/CVForm';
import { CVPreviews } from './components/CVPreview';
import { ArrowDownToLine, Loader2 } from 'lucide-react';
import { Layout, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import html2pdf from 'html2pdf.js';

const { Content } = Layout;

export type CVSection =
  | 'Personal Info'
  | 'Education'
  | 'Work Experience'
  | 'Projects'
  | 'Skills';

const initialData: CVData = {
  personalInfo: {
    fullName: 'Irfan Khan',
    jobTitle: 'Software Engr.',
    email: 'irfandk1994@gmail.com',
    phone: '03159046761',
    location: 'Saleem Khan Swabi KPK',
    linkedin: 'https://www.linkedin.com/in/irfankhan761/',
    website: 'https://irfankhan761.github.io/MyPortfolio/',
    github: 'https://github.com/Irfankhan761',
    summary:
      'I am a dedicated full-stack developer with expertise in React, TypeScript, and AdonisJS, specializing in building scalable and efficient web applications. I have a strong command of PostgreSQL, Ant Design, and Tailwind CSS, with proven skills in crafting intuitive front-end designs and robust back-end solutions. Passionate about problem-solving, I focus on writing clean, maintainable code and delivering high-quality software solutions. My goal is to continually grow as a versatile developer and contribute to impactful projects.',
  },
  education: [],
  workExperience: [],
  projects: [],
  skills: [],
};

export const CV = () => {
  const [activeSection, setActiveSection] =
    useState<CVSection>('Personal Info');
  const [cvData, setCVData] = useState<CVData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDataChange = useCallback((newData: CVData) => {
    setCVData(newData);
    localStorage.setItem('cv-data', JSON.stringify(newData));
  }, []);

  const handleExportAsPDF = useCallback(async () => {
    if (!previewRef.current) return;

    setIsSaving(true);
    try {
      const element = previewRef.current;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true,
        },
        pagebreak: { mode: 'avoid-all' },
        enableLinks: true,
      };

      const clonedElement = element.cloneNode(true) as HTMLElement;

      clonedElement.querySelectorAll('a').forEach((link) => {
        if (link.href.startsWith('/')) {
          link.href = window.location.origin + link.href;
        }
      });

      clonedElement.querySelectorAll('.anticon').forEach((icon) => {
        icon.classList.add('pdf-visible');
      });

      await html2pdf()
        .set(opt as any)
        .from(clonedElement)
        .save();

      message.success('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      message.error('Failed to export PDF. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [cvData.personalInfo.fullName]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E2433] shadow-sm border-b border-[rgba(255,255,255,0.1)] h-16 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-[99vw] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="mr-4 text-[#98B4C1] hover:text-[#EAF4F4] transition-colors duration-200 p-2 rounded-md hover:bg-[#1a3447]"
              aria-label={
                sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
              }
            >
              {sidebarCollapsed ? (
                <MenuUnfoldOutlined className="text-lg" />
              ) : (
                <MenuFoldOutlined className="text-lg" />
              )}
            </button>
            <h1 className="text-xl font-bold text-[#EAF4F4] hidden sm:block">
              CV Builder Pro
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportAsPDF}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-[#4DBCE9] hover:bg-[#3CA8D5] text-white font-medium py-2 px-4 rounded-md text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              {isSaving ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <ArrowDownToLine size={16} className="text-[#EAF4F4]" />
              )}
              <span>{isSaving ? 'Exporting...' : 'Export PDF'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <Layout hasSider className="pt-16 h-[calc(100vh-64px)]">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
          className="top-16 h-[calc(100vh-64px)] bg-white shadow-sm"
        />

        <Layout
          style={{
            marginLeft: sidebarCollapsed ? 80 : 280,
            transition: 'margin-left 0.2s cubic-bezier(0.2, 0, 0, 1)',
            minHeight: 'calc(100vh - 64px)',
          }}
          className="bg-[#f8fafc]"
        >
          <Content className="p-4 md:p-8 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Form Section */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <CVForms
                    data={cvData}
                    onChange={handleDataChange}
                    activeSection={activeSection}
                  />
                </div>
              </div>

              {/* Preview Section */}
              <div className="sticky top-16" id="cv-preview">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    CV Preview
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (Real-time updates)
                    </span>
                  </h2>
                  <div ref={previewRef}>
                    <CVPreviews data={cvData} />
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
