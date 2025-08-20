import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Divider,
  Typography,
  Row,
  Col,
  Spin,
  message,
  Modal,
  Tag,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Skill } from '../../types/types';
import { skillService } from 'core/services/skill-services';

const { Title, Text } = Typography;
const { confirm } = Modal;

const inputStyle: React.CSSProperties = {
  borderRadius: '8px',
  height: '40px',
  border: '1px solid #d0d7e0',
  fontSize: '14px',
};
const buttonStyle: React.CSSProperties = {
  borderRadius: '8px',
  height: '40px',
  fontWeight: 500,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

interface SkillFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillForm: React.FC<SkillFormProps> = ({ onChange }) => {
  const [listForm] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    const { data: savedData, error } = await skillService.loadSkills();
    if (error && error.code !== 'PGRST116') {
      message.error('Failed to load skill details.');
    }
    const skillList = savedData || [];
    onChange(skillList);
    listForm.setFieldsValue({ skills: skillList });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAddModal = () => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({ skills: [{ name: '', level: 50 }] });
    setIsModalVisible(true);
  };

  const showEditModal = (index: number) => {
    setEditingIndex(index);
    const recordToEdit = (listForm.getFieldValue('skills') || [])[index];
    modalForm.setFieldsValue(recordToEdit);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingIndex(null);
  };

  const handleModalSave = async (continueAdding = false) => {
    try {
      const modalValues = await modalForm.validateFields();
      setIsSaving(true);
      const skillList = listForm.getFieldValue('skills') || [];
      const currentId =
        editingIndex !== null
          ? skillList[editingIndex].id
          : `temp-${Date.now()}`;

      const itemToSave: Skill = {
        ...modalValues,
        id: currentId,
        skills:
          modalValues.skills?.filter((skill: { name: string }) => skill.name) ||
          [],
      };

      const { error } = await skillService.saveSkill(itemToSave);
      if (error) throw error;

      message.success(
        `Skills ${editingIndex !== null ? 'updated' : 'saved'} successfully!`
      );
      await loadData();

      if (continueAdding) {
        setEditingIndex(null);
        modalForm.resetFields();
        modalForm.setFieldsValue({ skills: [{ name: '', level: 50 }] });
      } else {
        setIsModalVisible(false);
        setEditingIndex(null);
      }
    } catch (error) {
      message.error('Please complete all required fields.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (indexToDelete: number) => {
    const itemToDelete = (listForm.getFieldValue('skills') || [])[
      indexToDelete
    ];
    if (!itemToDelete || itemToDelete.id.startsWith('temp-')) return;

    confirm({
      title: 'Are you sure you want to delete this skill category?',
      content: `This will permanently remove "${itemToDelete.category}".`,
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          setIsSaving(true);
          const { error } = await skillService.deleteSkill(itemToDelete.id);
          if (error) throw error;
          message.success('Skill category deleted successfully!');
          await loadData();
        } catch (err) {
          message.error('An error occurred while deleting.');
        } finally {
          setIsSaving(false);
          setIsModalVisible(false);
          setEditingIndex(null);
        }
      },
    });
  };

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Card
        className="mb-8"
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: 'none',
        }}
        title={
          <Title
            level={4}
            style={{ color: '#1a3353', margin: 0, fontWeight: 600 }}
          >
            Skills
          </Title>
        }
        extra={
          <Button onClick={showAddModal} type="primary" icon={<PlusOutlined />}>
            Add Skills
          </Button>
        }
      >
        <Form form={listForm} layout="vertical" autoComplete="off">
          <Form.List name="skills">
            {(fields) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                {fields.length === 0 ? (
                  <Text type="secondary">
                    No skills added. Click "Add Skills" to start.
                  </Text>
                ) : (
                  fields.map(({ key, name }, index) => (
                    <div
                      key={key}
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
                        <Button
                          type="text"
                          onClick={() => showEditModal(index)}
                          icon={<EditOutlined />}
                        />
                        <Button
                          type="text"
                          danger
                          onClick={() => handleDelete(index)}
                          icon={<DeleteOutlined />}
                        />
                      </div>
                      <Form.Item
                        label={<Text strong>Category</Text>}
                        style={{ marginBottom: '8px' }}
                      >
                        <Title level={5} style={{ margin: 0 }}>
                          {listForm.getFieldValue(['skills', name, 'category'])}
                        </Title>
                      </Form.Item>
                      <div>
                        {listForm
                          .getFieldValue(['skills', name, 'skills'])
                          ?.map((skill: { name: string }, i: number) => (
                            <Tag key={i} style={{ margin: '4px' }}>
                              {skill.name}
                            </Tag>
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </Form.List>
        </Form>
      </Card>

      <Modal
        title={
          <Title level={5} style={{ margin: 0 }}>
            {editingIndex !== null ? 'Edit Skill Category' : 'Add New Category'}
          </Title>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose
        width={700}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          editingIndex !== null && (
            <Button
              key="delete"
              type="primary"
              danger
              onClick={() => handleDelete(editingIndex)}
            >
              Delete
            </Button>
          ),
          <Button
            key="save"
            type="primary"
            loading={isSaving}
            onClick={() => handleModalSave(false)}
          >
            Save
          </Button>,
          editingIndex === null && (
            <Button
              key="save_continue"
              type="primary"
              loading={isSaving}
              onClick={() => handleModalSave(true)}
            >
              Save and Add Another
            </Button>
          ),
        ]}
      >
        <Form form={modalForm} layout="vertical" name="skill_modal">
          <Form.Item
            name="category"
            label={<Text strong>Skill Category</Text>}
            rules={[{ required: true, message: 'Category is required' }]}
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
            {(skillFields, { add: addSkill, remove: removeSkill }) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {skillFields.map(
                  ({ key: skillKey, name: skillName, ...restField }) => (
                    <Row key={skillKey} gutter={16} align="middle">
                      <Col flex="auto">
                        <Form.Item
                          {...restField}
                          name={[skillName, 'name']}
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: 'Skill name is required',
                            },
                          ]}
                        >
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
                          onClick={() => removeSkill(skillName)}
                        />
                      </Col>
                    </Row>
                  )
                )}
                <Button
                  type="dashed"
                  onClick={() => addSkill({ name: '', level: 50 })}
                  icon={<PlusOutlined />}
                  style={{ ...buttonStyle, width: '100%' }}
                >
                  Add Skill
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};
