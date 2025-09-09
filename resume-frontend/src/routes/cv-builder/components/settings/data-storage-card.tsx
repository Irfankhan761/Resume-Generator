import { Card } from 'antd';

const DataStorageCard = () => {
  return (
    <Card
      title="Data & Storage"
      className="shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">CV</span>
            </div>
            <div>
              <h3 className="font-medium text-blue-800">
                Your CV data is secure
              </h3>
              <p className="text-sm text-blue-600">
                All information is encrypted and stored securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DataStorageCard;
