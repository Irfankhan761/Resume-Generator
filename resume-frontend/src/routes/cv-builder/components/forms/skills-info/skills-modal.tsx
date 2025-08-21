import React from 'react';
import {
  Modal,
  Form,
  Input,
  Divider,
  Row,
  Col,
  Button,
  Typography,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

const { Title, Text } = Typography;
const inputStyle: React.CSSProperties = {
  borderRadius: '8px',
  height: '40px',
  border: '1px solid #d0d7e0',
  fontSize: '14px',
};

interface SkillModalProps {
  form: FormInstance;
  isOpen: boolean;
  isSaving: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
  onSaveAndContinue: () => void;
  onDelete: () => void;
}

const SkillModalComponent: React.FC<SkillModalProps> = ({
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
          {isEditing ? 'Edit Skill Category' : 'Add New Category'}
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
            Save and Add Another
          </Button>
        ),
      ]}
    >
      <Form form={form} layout="vertical" name="skill_modal">
        <Form.Item
          name="category"
          label={<Text strong>Skill Category</Text>}
          rules={[{ required: true }]}
        >
          <Input
            placeholder="e.g., Frontend, Backend, Database"
            style={inputStyle}
          />
        </Form.Item>
        <Divider orientation="left" plain>
          Skills in this Category
        </Divider>
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {fields.map(({ key, name, ...rest }) => (
                <Row key={key} gutter={16} align="middle">
                  <Col flex="auto">
                    <Form.Item
                      {...rest}
                      name={[name, 'name']}
                      noStyle
                      rules={[{ required: true }]}
                    >
                      <Input
                        placeholder="e.g., React, Node.js"
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
                onClick={() => add({ name: '' })}
                icon={<PlusOutlined />}
                style={{ borderRadius: '8px' }}
              >
                Add Skill
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export const SkillModal = React.memo(SkillModalComponent);
