import { Card } from 'antd';

const CvPreferencesCard = () => {
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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Enabled
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <div>
            <h3 className="font-medium text-gray-800">Real-time Preview</h3>
            <p className="text-sm text-gray-500">
              Show live preview while editing
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Enabled
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CvPreferencesCard;
