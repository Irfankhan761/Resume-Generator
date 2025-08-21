import React from 'react';
import { Typography } from 'antd';
import type { Education } from '@routes/cv-builder/types/types';
import { EducationListItem } from './education-list-item';

const { Text } = Typography;

interface EducationListProps {
  educationItems: Education[];
  onEditItem: (index: number) => void;
  onDeleteItem: (index: number) => void;
}

const EducationListComponent: React.FC<EducationListProps> = ({
  educationItems,
  onEditItem,
  onDeleteItem,
}) => {
  if (educationItems.length === 0) {
    return (
      <Text type="secondary">
        No education details added. Click "Add Education" to start.
      </Text>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {educationItems.map((edu, index) => (
        <EducationListItem
          key={edu.id || index}
          education={edu}
          onEdit={() => onEditItem(index)}
          onDelete={() => onDeleteItem(index)}
        />
      ))}
    </div>
  );
};

// Wrap component in React.memo
export const EducationList = React.memo(EducationListComponent);
