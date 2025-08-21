import React from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Divider,
  Row,
  Col,
  Button,
  Typography,
} from 'antd';
import { PlusOutlined, DeleteOutlined, CodeOutlined } from '@ant-design/icons';
import { BriefcaseBusinessIcon } from 'lucide-react';
import type { FormInstance } from 'antd/es/form';

const { Title } = Typography;

const inputStyle: React.CSSProperties = {
  borderRadius: '8px',
  height: '40px',
  border: '1px solid #d0d7e0',
  fontSize: '14px',
};
const textareaStyle: React.CSSProperties = {
  borderRadius: '8px',
  border: '1px solid #d0d7e0',
  fontSize: '14px',
  resize: 'vertical',
};

interface ProjectModalProps {
  form: FormInstance;
  isOpen: boolean;
  isSaving: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
  onSaveAndContinue: () => void;
  onDelete: () => void;
}

const ProjectModalComponent: React.FC<ProjectModalProps> = ({
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
          {isEditing ? 'Edit Project' : 'Add New Project'}
        </Title>
      }
      open={isOpen}
      onCancel={onCancel}
      destroyOnClose
      width={700}
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
      <Form form={form} layout="vertical" name="project_modal">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Project Title"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="e.g., E-commerce Platform"
                style={inputStyle}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="link" label="Project Link">
              <Input
                placeholder="https://github.com/user/project"
                style={inputStyle}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true }]}
            >
              <DatePicker
                picker="month"
                style={{ ...inputStyle, width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="endDate" label="End Date (Optional)">
              <DatePicker
                picker="month"
                style={{ ...inputStyle, width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left" plain>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BriefcaseBusinessIcon size={16} /> Project Description
          </span>
        </Divider>
        <Form.Item name="description" rules={[{ required: true }]}>
          <Input.TextArea
            rows={4}
            placeholder="Describe your project, your role, and key achievements"
            style={textareaStyle}
          />
        </Form.Item>
        <Divider orientation="left" plain>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CodeOutlined /> Technologies Used
          </span>
        </Divider>
        <Form.List name="technologies">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {fields.map(({ key, name, ...rest }) => (
                <Row key={key} gutter={8} align="middle">
                  <Col flex="auto">
                    <Form.Item {...rest} name={name} noStyle>
                      <Input
                        placeholder="e.g., React, Node.js, PostgreSQL"
                        style={inputStyle}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                    />
                  </Col>
                </Row>
              ))}
              <Button
                type="dashed"
                onClick={() => add('')}
                icon={<PlusOutlined />}
                style={{ borderRadius: '8px' }}
              >
                Add Technology
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export const ProjectModal = React.memo(ProjectModalComponent);
