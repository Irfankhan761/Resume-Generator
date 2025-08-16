import { useState, useCallback, useRef } from 'react';
import type { CVData } from './types/types';
import { Sidebar } from './components/layout/sidebar/sidebar';
import { CVForms } from './components/cv-form';
import { CVPreviews } from './components/cv-preview';
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
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e6f7ff]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16 backdrop-blur-sm bg-opacity-95 border-b border-gray-100">
        <div className="max-w-[99vw] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="mr-4 text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
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
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">CV</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
                CV Builder Pro
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportAsPDF}
              disabled={isSaving}
              className="group inline-flex items-center justify-center leading-none no-underline border-none cursor-pointer rounded-full font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 py-2.5 px-4 gap-3 bg-blue-600 hover:bg-blue-800 active:scale-[0.98] shadow-md hover:shadow-lg"
              style={{ paddingLeft: '20px' }}
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <span>Export PDF</span>
                  <span className="flex-shrink-0 w-6 h-6 relative grid place-items-center overflow-hidden rounded-full bg-white text-[#4DBCE9] group-hover:text-black">
                    <ArrowDownToLine
                      className="absolute transform transition-transform duration-300 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
                      size={14}
                    />
                    <ArrowDownToLine
                      className="absolute transform transition-transform duration-300 delay-100 translate-x-[-150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0"
                      size={14}
                    />
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

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
          className="bg-transparent"
        >
          <Content className="p-4 md:p-8 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        {activeSection.charAt(0)}
                      </span>
                      {activeSection}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 ml-11">
                      Fill in your {activeSection.toLowerCase()} details
                    </p>
                  </div>
                  <CVForms
                    data={cvData}
                    onChange={handleDataChange}
                    activeSection={activeSection}
                  />
                </div>
              </div>

              <div className="sticky top-16" id="cv-preview">
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      CV Preview
                    </h2>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Real-time
                    </span>
                  </div>
                  <div
                    ref={previewRef}
                    className="transition-transform duration-300 hover:shadow-lg"
                  >
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
