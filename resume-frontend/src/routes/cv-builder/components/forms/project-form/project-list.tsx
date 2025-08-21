import React from 'react';
import { Typography } from 'antd';
import type { Project } from '@routes/cv-builder/types/types';
import { ProjectListItem } from './project-list-item';

const { Text } = Typography;

interface ProjectListProps {
  projectItems: Project[];
  onEditItem: (index: number) => void;
  onDeleteItem: (index: number) => void;
}

const ProjectListComponent: React.FC<ProjectListProps> = ({
  projectItems,
  onEditItem,
  onDeleteItem,
}) => {
  if (projectItems.length === 0) {
    return (
      <Text type="secondary">
        No projects added. Click "Add Project" to start.
      </Text>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {projectItems.map((proj, index) => (
        <ProjectListItem
          key={proj.id || index}
          project={proj}
          onEdit={() => onEditItem(index)}
          onDelete={() => onDeleteItem(index)}
        />
      ))}
    </div>
  );
};

export const ProjectList = React.memo(ProjectListComponent);
