import React from 'react';
import { Button, Row, Col, Form, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Education } from '@routes/cv-builder/types/types';

const { Text } = Typography;

interface EducationListItemProps {
  education: Education;
  onEdit: () => void;
  onDelete: () => void;
}

const EducationListItemComponent: React.FC<EducationListItemProps> = ({
  education,
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
          <Form.Item label={<Text strong>Degree Title</Text>}>
            <Text>{education.degreeTitle}</Text>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label={<Text strong>Institute</Text>}>
            <Text>{education.institute}</Text>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

// Wrap component in React.memo to prevent re-renders if props are unchanged
export const EducationListItem = React.memo(EducationListItemComponent);
