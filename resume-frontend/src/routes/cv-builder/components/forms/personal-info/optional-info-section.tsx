import React from 'react';
import { Button } from 'antd';

interface OptionalInfoSectionProps {
  title: string;
  icon: React.ReactNode;
  onRemove: () => void;
  children: React.ReactNode;
}

export const OptionalInfoSection: React.FC<OptionalInfoSectionProps> = ({
  title,
  icon,
  onRemove,
  children,
}) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h3 style={{ color: '#1890ff', margin: 0, fontSize: '16px' }}>
          {icon}
          {title}
        </h3>
        <Button
          type="text"
          size="small"
          style={{ color: '#ff4d4f' }}
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
      {children}
    </div>
  );
};
