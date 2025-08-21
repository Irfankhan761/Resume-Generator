import React from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Switch,
  Divider,
  Row,
  Col,
  Button,
  Typography,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { BriefcaseBusinessIcon } from 'lucide-react';
import type { FormInstance } from 'antd/es/form';

const { Title } = Typography;

interface WorkExperienceModalProps {
  form: FormInstance;
  isOpen: boolean;
  isSaving: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
  onSaveAndContinue: () => void;
  onDelete: () => void;
}

const WorkExperienceModalComponent: React.FC<WorkExperienceModalProps> = ({
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
          {isEditing ? 'Edit Work History' : 'Add Work History'}
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
          <Button
            key="delete"
            type="primary"
            danger
            loading={isSaving}
            onClick={onDelete}
          >
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
      <Form form={form} layout="vertical" name="work_experience_modal">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="position"
              label="Job Title"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. Software Engineer" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="company"
              label="Company"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. Google" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="location" label="Location">
              <Input placeholder="e.g. London, UK" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true }]}
            >
              <DatePicker picker="month" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              shouldUpdate={(p, c) => p.currentlyWorking !== c.currentlyWorking}
              noStyle
            >
              {({ getFieldValue }) => (
                <Form.Item
                  name="endDate"
                  label="End Date"
                  rules={[{ required: !getFieldValue('currentlyWorking') }]}
                >
                  <DatePicker
                    picker="month"
                    style={{ width: '100%' }}
                    disabled={getFieldValue('currentlyWorking')}
                  />
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="currentlyWorking"
              label=" "
              valuePropName="checked"
            >
              <Switch
                checkedChildren="I currently work here"
                unCheckedChildren="I no longer work here"
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left" plain>
          <BriefcaseBusinessIcon size={16} /> Description
        </Divider>
        <Form.List name="description">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {fields.map(({ key, name, ...rest }) => (
                <Row key={key} align="middle" gutter={8}>
                  <Col flex="auto">
                    <Form.Item
                      {...rest}
                      name={name}
                      style={{ marginBottom: 0 }}
                    >
                      <Input.TextArea
                        autoSize
                        placeholder="Responsibility or achievement"
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
              >
                Add Point
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export const WorkExperienceModal = React.memo(WorkExperienceModalComponent);
