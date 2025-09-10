import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { CVData } from './types/types';
import { CVForms } from './components/cv-form';
import { CVPreviews } from './components/cv-preview';
import {
  ArrowDownToLine,
  Loader2,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';
import { message, FloatButton, Tooltip } from 'antd';
import html2pdf from 'html2pdf.js';
import { DashboardLayout } from './components/layout/dashboard-layout/dashboard-layout';

export type CVSection =
  | 'Personal Info'
  | 'Education'
  | 'Work Experience'
  | 'Projects'
  | 'Skills';

const AUTO_SAVE_KEY = 'cv_autoSaveEnabled';
const REAL_TIME_PREVIEW_KEY = 'cv_realTimePreviewEnabled';

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

const formatLastSaved = (date: Date | null) => {
  if (!date) return 'Never';
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  return date.toLocaleDateString();
};

export const CV = () => {
  const [activeSection, setActiveSection] =
    useState<CVSection>('Personal Info');
  const [cvData, setCVData] = useState<CVData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [autoSaveEnabled, setAutoSaveEnabled] = useState(() => {
    return localStorage.getItem(AUTO_SAVE_KEY) !== 'false';
  });
  const [realTimePreviewEnabled, setRealTimePreviewEnabled] = useState(() => {
    return localStorage.getItem(REAL_TIME_PREVIEW_KEY) !== 'false';
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const autoSaveTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const savedData = localStorage.getItem('cv-data');
    const savedTimestamp = localStorage.getItem('cv-last-saved');
    if (savedData) {
      try {
        setCVData(JSON.parse(savedData));
        if (savedTimestamp) setLastSaved(new Date(savedTimestamp));
      } catch (error) {
        console.error('Failed to parse saved CV data:', error);
        message.error('Failed to load saved data');
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === AUTO_SAVE_KEY) {
        setAutoSaveEnabled(event.newValue !== 'false');
      }
      if (event.key === REAL_TIME_PREVIEW_KEY) {
        setRealTimePreviewEnabled(event.newValue !== 'false');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const autoSave = useCallback(
    (data: CVData) => {
      if (!autoSaveEnabled) return;
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
      autoSaveTimer.current = setTimeout(() => {
        setIsAutoSaving(true);
        try {
          localStorage.setItem('cv-data', JSON.stringify(data));
          const now = new Date();
          localStorage.setItem('cv-last-saved', now.toISOString());
          setLastSaved(now);
          setUnsavedChanges(false);
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsAutoSaving(false);
        }
      }, 2000);
    },
    [autoSaveEnabled]
  );

  const handleDataChange = useCallback(
    (newData: CVData) => {
      setCVData(newData);
      setUnsavedChanges(true);
      autoSave(newData);
    },
    [autoSave]
  );

  const handleManualSave = useCallback(async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('cv-data', JSON.stringify(cvData));
      const now = new Date();
      localStorage.setItem('cv-last-saved', now.toISOString());
      setLastSaved(now);
      setUnsavedChanges(false);
      message.success('CV saved successfully!');
    } catch (error) {
      console.error('Manual save failed:', error);
      message.error('Failed to save CV');
    } finally {
      setIsSaving(false);
    }
  }, [cvData]);

  const handleExportAsPDF = useCallback(async () => {
    if (!previewRef.current) {
      message.error('Preview not available for PDF export');
      return;
    }
    setIsSaving(true);
    try {
      const element = previewRef.current;
      const fileName = `${cvData.personalInfo.fullName.replace(
        /\s+/g,
        '_'
      )}_CV.pdf`;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait' as 'portrait' | 'landscape',
        },
      };
      await html2pdf().set(opt).from(element).save();
      message.success(`PDF "${fileName}" downloaded successfully!`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      message.error('Failed to export PDF. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [cvData.personalInfo.fullName]);

  const togglePreviewMode = useCallback(() => setPreviewMode((p) => !p), []);

  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, []);

  const rightNavContent = useMemo(
    () => (
      <div className="flex items-center gap-3">
        {autoSaveEnabled && (
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            {isAutoSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <div
                  className={`w-2 h-2 rounded-full ${
                    unsavedChanges ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                />
                <span>
                  {unsavedChanges
                    ? 'Unsaved changes'
                    : `Saved ${formatLastSaved(lastSaved)}`}
                </span>
              </>
            )}
          </div>
        )}

        {realTimePreviewEnabled && (
          <Tooltip title={previewMode ? 'Show editor' : 'Preview only'}>
            <button
              onClick={togglePreviewMode}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              {previewMode ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </Tooltip>
        )}

        <Tooltip title="Save manually">
          <button
            onClick={handleManualSave}
            disabled={isSaving || isAutoSaving}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
          </button>
        </Tooltip>

        <button
          onClick={handleExportAsPDF}
          disabled={isSaving}
          className="group inline-flex items-center justify-center leading-none no-underline border-none cursor-pointer rounded-xl font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 py-3 px-6 gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              {/* ICON ADDED HERE */}
              <ArrowDownToLine className="h-4 w-4" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">PDF</span>
            </>
          )}
        </button>
      </div>
    ),
    [
      autoSaveEnabled,
      isAutoSaving,
      unsavedChanges,
      lastSaved,
      realTimePreviewEnabled,
      previewMode,
      togglePreviewMode,
      handleManualSave,
      isSaving,
      handleExportAsPDF,
    ]
  );

  return (
    <DashboardLayout
      rightNavContent={rightNavContent}
      sidebarConfig={{
        activeSection,
        onSectionChange: setActiveSection,
      }}
    >
      <div
        className={`transition-all duration-300 ${
          !previewMode && realTimePreviewEnabled
            ? 'grid grid-cols-1 lg:grid-cols-2'
            : 'block'
        } gap-6 md:gap-8`}
      >
        {!previewMode && (
          <div
            className={`space-y-6 ${
              !realTimePreviewEnabled && 'max-w-4xl mx-auto w-full'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-md">
                      {activeSection.charAt(0)}
                    </span>
                    {activeSection}
                  </h2>
                </div>
                <p className="text-gray-500 text-sm ml-13">
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
        )}

        {realTimePreviewEnabled && (
          <div
            className={`${
              previewMode ? 'max-w-4xl mx-auto' : 'lg:sticky h-fit top-8'
            }`}
            id="cv-preview-mobile"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">CV Preview</h2>
              </div>
              <div ref={previewRef} className="p-4">
                <CVPreviews data={cvData} />
              </div>
            </div>
          </div>
        )}
      </div>

      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24, bottom: 24 }}
        icon={<Save />}
      >
        <Tooltip title="Export as PDF" placement="left">
          <FloatButton
            icon={<ArrowDownToLine size={16} />}
            onClick={handleExportAsPDF}
          />
        </Tooltip>
        <Tooltip title="Manual Save" placement="left">
          <FloatButton icon={<Save size={16} />} onClick={handleManualSave} />
        </Tooltip>

        {realTimePreviewEnabled && (
          <Tooltip
            title={previewMode ? 'Show Editor' : 'Preview Only'}
            placement="left"
          >
            <FloatButton
              className="lg:hidden"
              icon={previewMode ? <Eye size={16} /> : <EyeOff size={16} />}
              onClick={togglePreviewMode}
            />
          </Tooltip>
        )}
      </FloatButton.Group>
    </DashboardLayout>
  );
};
