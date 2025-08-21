import React from 'react';
import { Typography } from 'antd';
import type { Skill } from '@routes/cv-builder/types/types';
import { SkillListItem } from './skills-list-item';

const { Text } = Typography;

interface SkillListProps {
  skillItems: Skill[];
  onEditItem: (index: number) => void;
  onDeleteItem: (index: number) => void;
}

const SkillListComponent: React.FC<SkillListProps> = ({
  skillItems,
  onEditItem,
  onDeleteItem,
}) => {
  if (skillItems.length === 0) {
    return (
      <Text type="secondary">
        No skills added. Click "Add Skills" to start.
      </Text>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {skillItems.map((skillCat, index) => (
        <SkillListItem
          key={skillCat.id || index}
          skillCategory={skillCat}
          onEdit={() => onEditItem(index)}
          onDelete={() => onDeleteItem(index)}
        />
      ))}
    </div>
  );
};

export const SkillList = React.memo(SkillListComponent);
