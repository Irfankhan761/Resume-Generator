import React from 'react';
import { Button, Form, Typography, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Skill } from '@routes/cv-builder/types/types';

const { Title, Text } = Typography;

interface SkillListItemProps {
  skillCategory: Skill;
  onEdit: () => void;
  onDelete: () => void;
}

const SkillListItemComponent: React.FC<SkillListItemProps> = ({
  skillCategory,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      style={{
        background: '#f9fbfd',
        borderRadius: '10px',
        padding: '24px',
        border: '1px solid #e6f0ff',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 1,
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button type="text" onClick={onEdit} icon={<EditOutlined />} />
        <Button
          type="text"
          danger
          onClick={onDelete}
          icon={<DeleteOutlined />}
        />
      </div>
      <Form.Item
        label={<Text strong>Category</Text>}
        style={{ marginBottom: '8px' }}
      >
        <Title level={5} style={{ margin: 0 }}>
          {skillCategory.category}
        </Title>
      </Form.Item>
      <div>
        {skillCategory.skills?.map((skill, i) => (
          <Tag key={i} style={{ margin: '4px' }}>
            {skill.name}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export const SkillListItem = React.memo(SkillListItemComponent);
