import React from 'react';
import { Typography } from 'antd';
import type { WorkExperience } from '@routes/cv-builder/types/types';
import { WorkExperienceListItem } from './work-experience-list-item';

const { Text } = Typography;

interface WorkExperienceListProps {
  experienceItems: WorkExperience[];
  onEditItem: (index: number) => void;
  onDeleteItem: (index: number) => void;
}

const WorkExperienceListComponent: React.FC<WorkExperienceListProps> = ({
  experienceItems,
  onEditItem,
  onDeleteItem,
}) => {
  if (experienceItems.length === 0) {
    return (
      <Text type="secondary">
        No work experience added. Click "Add Experience" to start.
      </Text>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {experienceItems.map((exp, index) => (
        <WorkExperienceListItem
          key={exp.id || index}
          experience={exp}
          onEdit={() => onEditItem(index)}
          onDelete={() => onDeleteItem(index)}
        />
      ))}
    </div>
  );
};

export const WorkExperienceList = React.memo(WorkExperienceListComponent);
