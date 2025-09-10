import { Card, Switch } from 'antd';
import { useState, useEffect } from 'react';

// Define the keys for localStorage to avoid typos
const AUTO_SAVE_KEY = 'cv_autoSaveEnabled';
const REAL_TIME_PREVIEW_KEY = 'cv_realTimePreviewEnabled';

const CvPreferencesCard = () => {
  // Initialize state by reading from localStorage, defaulting to true
  const [autoSave, setAutoSave] = useState(() => {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    return saved === 'false' ? false : true;
  });

  const [realTimePreview, setRealTimePreview] = useState(() => {
    const saved = localStorage.getItem(REAL_TIME_PREVIEW_KEY);
    return saved === 'false' ? false : true;
  });

  // Use useEffect to save changes to localStorage whenever a switch is toggled
  useEffect(() => {
    localStorage.setItem(AUTO_SAVE_KEY, String(autoSave));
  }, [autoSave]);

  useEffect(() => {
    localStorage.setItem(REAL_TIME_PREVIEW_KEY, String(realTimePreview));
  }, [realTimePreview]);

  return (
    <Card
      title="CV Builder Preferences"
      className="shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <div>
            <h3 className="font-medium text-gray-800">Auto-save</h3>
            <p className="text-sm text-gray-500">
              Automatically save CV changes
            </p>
          </div>
          <Switch checked={autoSave} onChange={setAutoSave} />
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <div>
            <h3 className="font-medium text-gray-800">Real-time Preview</h3>
            <p className="text-sm text-gray-500">
              Show live preview while editing
            </p>
          </div>
          <Switch checked={realTimePreview} onChange={setRealTimePreview} />
        </div>
      </div>
    </Card>
  );
};

export default CvPreferencesCard;
