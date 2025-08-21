import React from 'react';
import { Button, Row, Col, Form, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Project } from '@routes/cv-builder/types/types';

const { Text } = Typography;

interface ProjectListItemProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectListItemComponent: React.FC<ProjectListItemProps> = ({
  project,
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
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item label={<Text strong>Project Title</Text>}>
            <Text>{project.title}</Text>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label={<Text strong>Project Link</Text>}>
            <Text>{project.link || 'N/A'}</Text>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export const ProjectListItem = React.memo(ProjectListItemComponent);
