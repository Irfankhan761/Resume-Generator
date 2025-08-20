import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Divider,
  Typography,
  Row,
  Col,
  Spin,
  message,
  Modal,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined, // Replaced SaveOutlined
  CodeOutlined,
} from '@ant-design/icons';
import type { Project } from '../../types/types';
import { BriefcaseBusinessIcon } from 'lucide-react';
import { projectService } from 'core/services/project-services';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { confirm } = Modal;

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
const buttonStyle: React.CSSProperties = {
  borderRadius: '8px',
  height: '40px',
  fontWeight: 500,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

interface ProjectFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onChange }) => {
  const [listForm] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    const { data: savedData, error } = await projectService.loadProjects();
    if (error && error.code !== 'PGRST116') {
      message.error('Failed to load project details.');
    }
    const projectList = savedData || [];
    onChange(projectList);
    listForm.setFieldsValue({ projects: projectList });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAddModal = () => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({ technologies: [''] });
    setIsModalVisible(true);
  };

  const showEditModal = (index: number) => {
    setEditingIndex(index);
    const recordToEdit = (listForm.getFieldValue('projects') || [])[index];
    modalForm.setFieldsValue({
      ...recordToEdit,
      startDate: recordToEdit.startDate ? dayjs(recordToEdit.startDate) : null,
      endDate: recordToEdit.endDate ? dayjs(recordToEdit.endDate) : null,
    });
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
      const projectList = listForm.getFieldValue('projects') || [];
      const currentId =
        editingIndex !== null
          ? projectList[editingIndex].id
          : `temp-${Date.now()}`;

      const itemToSave: Project = {
        ...modalValues,
        id: currentId,
        startDate: modalValues.startDate
          ? dayjs(modalValues.startDate).format('YYYY-MM-DD')
          : undefined,
        endDate: modalValues.endDate
          ? dayjs(modalValues.endDate).format('YYYY-MM-DD')
          : undefined,
        technologies: modalValues.technologies?.filter(Boolean) || [],
      };

      const { error } = await projectService.saveProject(itemToSave);
      if (error) throw error;

      message.success(
        `Project ${editingIndex !== null ? 'updated' : 'saved'} successfully!`
      );
      await loadData();

      if (continueAdding) {
        setEditingIndex(null);
        modalForm.resetFields();
        modalForm.setFieldsValue({ technologies: [''] });
      } else {
        setIsModalVisible(false);
        setEditingIndex(null);
      }
    } catch (error) {
      message.error('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (indexToDelete: number) => {
    const itemToDelete = (listForm.getFieldValue('projects') || [])[
      indexToDelete
    ];
    if (!itemToDelete || itemToDelete.id.startsWith('temp-')) return;

    confirm({
      title: 'Are you sure you want to delete this project?',
      content: `This will permanently remove "${itemToDelete.title}".`,
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          setIsSaving(true);
          const { error } = await projectService.deleteProject(itemToDelete.id);
          if (error) throw error;
          message.success('Project deleted successfully!');
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
            Projects
          </Title>
        }
        extra={
          <Button onClick={showAddModal} type="primary" icon={<PlusOutlined />}>
            Add Project
          </Button>
        }
      >
        <Form form={listForm} layout="vertical" autoComplete="off">
          <Form.List name="projects">
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
                    No projects added. Click "Add Project" to start.
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
                      <Row gutter={24}>
                        <Col xs={24} md={12}>
                          <Form.Item label={<Text strong>Project Title</Text>}>
                            <Text>
                              {listForm.getFieldValue([
                                'projects',
                                name,
                                'title',
                              ])}
                            </Text>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label={<Text strong>Project Link</Text>}>
                            <Text>
                              {listForm.getFieldValue([
                                'projects',
                                name,
                                'link',
                              ]) || 'N/A'}
                            </Text>
                          </Form.Item>
                        </Col>
                      </Row>
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
            {editingIndex !== null ? 'Edit Project' : 'Add New Project'}
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
              Save and Continue
            </Button>
          ),
        ]}
      >
        <Form form={modalForm} layout="vertical" name="project_modal">
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
            {(techFields, { add: addTech, remove: removeTech }) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {techFields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={8} align="middle">
                    <Col flex="auto">
                      <Form.Item {...restField} name={name} noStyle>
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
                        onClick={() => removeTech(name)}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  type="dashed"
                  onClick={() => addTech('')}
                  icon={<PlusOutlined />}
                  style={{ ...buttonStyle, width: '100%' }}
                >
                  Add Technology
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};
