import React from 'react';
import { Card, Button, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { WorkExperience } from '@routes/cv-builder/types/types';

const { Text } = Typography;

interface WorkExperienceListItemProps {
  experience: WorkExperience;
  onEdit: () => void;
  onDelete: () => void;
}

const WorkExperienceListItemComponent: React.FC<
  WorkExperienceListItemProps
> = ({ experience, onEdit, onDelete }) => {
  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <Text strong>{experience.position}</Text>
          <br />
          <Text>{experience.company}</Text>
        </div>
        <div>
          <Button type="text" onClick={onEdit} icon={<EditOutlined />} />
          <Button
            type="text"
            danger
            onClick={onDelete}
            icon={<DeleteOutlined />}
          />
        </div>
      </div>
    </Card>
  );
};

export const WorkExperienceListItem = React.memo(
  WorkExperienceListItemComponent
);
