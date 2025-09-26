import React from 'react';
import { Button, Row, Col, Typography, Divider, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Education } from '@routes/cv-builder/types/types';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

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
  const {
    degreeTitle,
    institute,
    majors,
    city,
    startDate,
    endDate,
    isCurrent,
    gpaValue,
    gpaType,
  } = education;

  const formattedStartDate = startDate
    ? dayjs(startDate).format('MMM YYYY')
    : 'N/A';
  const formattedEndDate = isCurrent
    ? 'Present'
    : endDate
    ? dayjs(endDate).format('MMM YYYY')
    : 'N/A';

  return (
    <div
      style={{
        background: '#f9fbfd',
        borderRadius: '10px',
        padding: '24px',
        marginBottom: '16px',
        border: '1px solid #e6f0ff',
      }}
    >
      {/* Main Header Row - Using Flexbox for alignment */}
      <Row justify="space-between" align="top" wrap={false} gutter={16}>
        {/* Title and Institute (takes up remaining space) */}
        <Col flex="1 1 auto">
          <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
            {degreeTitle}
          </Title>
          <Text type="secondary">
            {institute}, {city}
          </Text>
        </Col>

        {/* Action Buttons (fixed width) */}
        <Col flex="0 0 auto">
          <Space>
            <Button type="text" onClick={onEdit} icon={<EditOutlined />} />
            <Button
              type="text"
              danger
              onClick={onDelete}
              icon={<DeleteOutlined />}
            />
          </Space>
        </Col>
      </Row>

      {/* Dates - displayed below the header */}
      <Row style={{ marginTop: '8px' }}>
        <Col>
          <Text strong>
            {formattedStartDate} - {formattedEndDate}
          </Text>
        </Col>
      </Row>

      <Divider style={{ margin: '16px 0' }} />

      {/* Additional Details Section */}
      <Row gutter={[24, 16]}>
        {/* Majors */}
        <Col xs={24} sm={12}>
          <div>
            <Text strong>Majors</Text>
          </div>
          <Text>{majors}</Text>
        </Col>

        {/* GPA */}
        {gpaValue && (
          <Col xs={24} sm={12}>
            <div>
              <Text strong>
                {gpaType === 'percentage' ? 'Percentage' : 'GPA'}
              </Text>
            </div>
            <Text>{gpaValue}</Text>
          </Col>
        )}
      </Row>
    </div>
  );
};

export const EducationListItem = React.memo(EducationListItemComponent);
