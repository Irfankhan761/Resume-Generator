import React from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Radio,
  InputNumber,
  Switch,
  Typography,
} from 'antd';
import type { FormInstance } from 'antd/es/form';

const { Title } = Typography;

interface EducationModalProps {
  form: FormInstance;
  isOpen: boolean;
  isSaving: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
  onSaveAndContinue: () => void;
  onDelete: () => void;
}

const EducationModalComponent: React.FC<EducationModalProps> = ({
  form,
  isOpen,
  isSaving,
  isEditing,
  onCancel,
  onSave,
  onSaveAndContinue,
  onDelete,
}) => {
  return (
    <Modal
      title={
        <Title level={5} style={{ margin: 0 }}>
          {isEditing ? 'Edit Education' : 'Add New Education'}
        </Title>
      }
      open={isOpen}
      onCancel={onCancel}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        isEditing && (
          <Button key="delete" type="primary" danger onClick={onDelete}>
            Delete
          </Button>
        ),
        <Button key="save" type="primary" loading={isSaving} onClick={onSave}>
          Save
        </Button>,
        !isEditing && (
          <Button
            key="save_continue"
            type="primary"
            loading={isSaving}
            onClick={onSaveAndContinue}
          >
            Save and Continue
          </Button>
        ),
      ]}
    >
      <Form form={form} layout="vertical" name="education_modal">
        {/* Form content remains the same */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="degreeTitle"
              label="Degree Title"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g., Bachelor of Science" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="majors" label="Majors">
              <Input placeholder="e.g., Computer Science" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="institute" label="Institute">
              <Input placeholder="e.g., University of Technology" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="city" label="City">
              <Input placeholder="e.g., San Francisco" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true }]}
            >
              <DatePicker picker="month" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              shouldUpdate={(p, c) => p.isCurrent !== c.isCurrent}
              noStyle
            >
              {({ getFieldValue }) => (
                <Form.Item
                  name="endDate"
                  label="End Date"
                  rules={[{ required: !getFieldValue('isCurrent') }]}
                >
                  <DatePicker
                    picker="month"
                    style={{ width: '100%' }}
                    disabled={getFieldValue('isCurrent')}
                  />
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="isCurrent"
              label="I currently study here"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="GPA / Percentage">
              <Input.Group compact>
                <Form.Item name="gpaValue" noStyle>
                  <InputNumber placeholder="e.g., 3.8" />
                </Form.Item>
                <Form.Item name="gpaType" noStyle>
                  <Radio.Group style={{ marginLeft: '10px' }}>
                    <Radio value="gpa">GPA</Radio>
                    <Radio value="percentage">Percentage</Radio>
                  </Radio.Group>
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

// Wrap component in React.memo
export const EducationModal = React.memo(EducationModalComponent);
