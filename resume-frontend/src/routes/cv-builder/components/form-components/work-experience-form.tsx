import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Switch,
  Divider,
  Typography,
  Row,
  Col,
  Spin,
  message,
  Modal,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { WorkExperience } from '../../types/types';
import { BriefcaseBusinessIcon } from 'lucide-react';
import dayjs from 'dayjs';
import { workExperienceService } from 'core/services/work-experience';

const { Title, Text } = Typography;
const { confirm } = Modal;

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  onChange,
}) => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    const { data: savedData, error } =
      await workExperienceService.loadWorkExperience();
    if (error && error.code !== 'PGRST116') {
      // PGRST116: No rows found
      message.error('Failed to load work experience.');
    }
    const experienceList = savedData || [];
    onChange(experienceList);
    form.setFieldsValue({ workExperience: experienceList });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAddModal = () => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({
      currentlyWorking: false,
      description: [''],
      technologies: [''],
    });
    setIsModalVisible(true);
  };

  const showEditModal = (index: number) => {
    setEditingIndex(index);
    const recordToEdit = (form.getFieldValue('workExperience') || [])[index];
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
      const experienceList = form.getFieldValue('workExperience') || [];
      const currentId =
        editingIndex !== null
          ? experienceList[editingIndex].id
          : `temp-${Date.now()}`;

      const itemToSave: WorkExperience = {
        ...modalValues,
        id: currentId,
        startDate: modalValues.startDate?.format('YYYY-MM-DD') || null,
        endDate:
          !modalValues.currentlyWorking && modalValues.endDate
            ? modalValues.endDate.format('YYYY-MM-DD')
            : null,
        currentlyWorking: modalValues.currentlyWorking || false,
        description: (modalValues.description || []).filter(
          (d: string) => d && d.trim() !== ''
        ),
        technologies: (modalValues.technologies || []).filter(
          (t: string) => t && t.trim() !== ''
        ),
      };

      const { error } = await workExperienceService.saveWorkExperience(
        itemToSave
      );
      if (error) throw error;

      message.success(
        `Work experience ${
          editingIndex !== null ? 'updated' : 'added'
        } successfully!`
      );
      await loadData();

      if (continueAdding) {
        setEditingIndex(null);
        modalForm.resetFields();
        modalForm.setFieldsValue({
          currentlyWorking: false,
          description: [''],
          technologies: [''],
        });
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
    const itemToDelete = (form.getFieldValue('workExperience') || [])[
      indexToDelete
    ];
    if (!itemToDelete || itemToDelete.id.startsWith('temp-')) return;

    confirm({
      title: 'Are you sure you want to delete this experience?',
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          setIsSaving(true);
          const { error } = await workExperienceService.deleteWorkExperience(
            itemToDelete.id
          );
          if (error) throw error;
          message.success('Work experience deleted successfully!');
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
        title={
          <Title level={4} style={{ margin: 0 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BriefcaseBusinessIcon size={20} />
              Work Experience
            </span>
          </Title>
        }
        extra={
          <Button onClick={showAddModal} type="primary" icon={<PlusOutlined />}>
            Add Experience
          </Button>
        }
      >
        <Form form={form} layout="vertical">
          <Form.List name="workExperience">
            {(fields) =>
              fields.length === 0 ? (
                <Text type="secondary">
                  No work experience added. Click "Add Experience" to start.
                </Text>
              ) : (
                fields.map(({ key, name }, index) => (
                  <Card key={key} style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <Text strong>
                          {form.getFieldValue([
                            'workExperience',
                            name,
                            'position',
                          ])}
                        </Text>
                        <br />
                        <Text>
                          {form.getFieldValue([
                            'workExperience',
                            name,
                            'company',
                          ])}
                        </Text>
                      </div>
                      <div>
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
                    </div>
                  </Card>
                ))
              )
            }
          </Form.List>
        </Form>
      </Card>

      <Modal
        title={
          <Title level={5} style={{ margin: 0 }}>
            {editingIndex !== null ? 'Edit Work History' : 'Add Work History'}
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
              loading={isSaving}
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
        <Form
          form={modalForm}
          layout="vertical"
          name="work_experience_modal"
          initialValues={{ currentlyWorking: false }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="position"
                label="Job Title"
                rules={[{ required: true, message: 'Job Title is required' }]}
              >
                <Input placeholder="e.g. Software Engineer" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="company"
                label="Company"
                rules={[{ required: true, message: 'Company is required' }]}
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
                rules={[{ required: true, message: 'Start date is required' }]}
              >
                <DatePicker picker="month" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                shouldUpdate={(prev, curr) =>
                  prev.currentlyWorking !== curr.currentlyWorking
                }
                noStyle
              >
                {({ getFieldValue }) => (
                  <Form.Item
                    name="endDate"
                    label="End Date"
                    rules={[
                      {
                        required: !getFieldValue('currentlyWorking'),
                        message: 'End date is required.',
                      },
                    ]}
                  >
                    <DatePicker
                      picker="month"
                      style={{ width: '100%' }}
                      disabled={getFieldValue('currentlyWorking')}
                      placeholder={
                        getFieldValue('currentlyWorking') ? 'Present' : ''
                      }
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
                  onChange={() => modalForm.validateFields(['endDate'])}
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
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} align="middle" gutter={8}>
                    <Col flex="auto">
                      <Form.Item
                        {...restField}
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

          <Form.List name="technologies">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              ></div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};
