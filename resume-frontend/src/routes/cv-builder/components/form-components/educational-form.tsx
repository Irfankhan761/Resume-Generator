import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Typography,
  Row,
  Col,
  message,
  Spin,
  Modal,
  Radio,
  InputNumber,
  Switch,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { Education } from '../../types/types';
import { educationService } from 'core/services/education-services';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { confirm } = Modal;

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ onChange }) => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    const { data: savedData, error } = await educationService.loadEducation();
    if (error && error.code !== 'PGRST116') {
      message.error('Failed to load education details.');
    }
    const educationList = savedData || [];
    onChange(educationList);
    form.setFieldsValue({ education: educationList });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAddModal = () => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({ gpaType: 'gpa', isCurrent: false });
    setIsModalVisible(true);
  };

  const showEditModal = (index: number) => {
    setEditingIndex(index);
    const recordToEdit = (form.getFieldValue('education') || [])[index];
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
      const educationList = form.getFieldValue('education') || [];
      const currentId =
        editingIndex !== null
          ? educationList[editingIndex].id
          : `temp-${Date.now()}`;

      const itemToSave: Education = {
        ...modalValues,
        id: currentId,
        startDate: modalValues.startDate
          ? dayjs(modalValues.startDate).format('YYYY-MM-DD')
          : undefined,
        endDate: modalValues.endDate
          ? dayjs(modalValues.endDate).format('YYYY-MM-DD')
          : undefined,
        isCurrent: modalValues.isCurrent || false,
      };

      const { error } = await educationService.saveEducation(itemToSave);
      if (error) throw error;

      message.success(
        `Education ${editingIndex !== null ? 'updated' : 'saved'} successfully!`
      );
      await loadData();

      if (continueAdding) {
        setEditingIndex(null);
        modalForm.resetFields();
        modalForm.setFieldsValue({ gpaType: 'gpa', isCurrent: false });
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
    const itemToDelete = (form.getFieldValue('education') || [])[indexToDelete];
    if (itemToDelete.id.startsWith('temp-')) return;

    confirm({
      title: 'Are you sure you want to delete this entry?',
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          setIsSaving(true);
          const { error } = await educationService.deleteEducation(
            itemToDelete.id
          );
          if (error) throw error;
          message.success('Education entry deleted successfully!');
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
            Education
          </Title>
        }
        extra={
          <Button onClick={showAddModal} type="primary" icon={<PlusOutlined />}>
            Add Education
          </Button>
        }
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.List name="education">
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
                    No education details added. Click "Add Education" to start.
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
                          <Form.Item label={<Text strong>Degree Title</Text>}>
                            <Text>
                              {form.getFieldValue([
                                'education',
                                name,
                                'degreeTitle',
                              ])}
                            </Text>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label={<Text strong>Institute</Text>}>
                            <Text>
                              {form.getFieldValue([
                                'education',
                                name,
                                'institute',
                              ])}
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
            {editingIndex !== null ? 'Edit Education' : 'Add New Education'}
          </Title>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose
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
        <Form
          form={modalForm}
          layout="vertical"
          name="education_modal"
          initialValues={{ isCurrent: false }}
        >
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
                shouldUpdate={(prev, curr) => prev.isCurrent !== curr.isCurrent}
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
    </>
  );
};
