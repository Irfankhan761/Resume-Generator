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
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  CodeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Project } from '../../types/types';
import { BriefcaseBusinessIcon } from 'lucide-react';
import { projectService } from 'core/services/project-services'; // Adjust path if needed
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface ProjectFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
  onSave?: () => void;
}

// Re-defining styles for clarity and encapsulation
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

const deleteButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  minWidth: '40px',
  width: '40px',
  padding: '0',
};

export const ProjectForm: React.FC<ProjectFormProps> = ({
  data,
  onChange,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { data: savedData, error } = await projectService.loadProjects();

      if (error) {
        console.error('Error loading projects:', error);
        if (error.code !== 'PGRST116') {
          // Ignore "no rows found" error
          message.error('Failed to load project details.');
        }
      } else if (savedData && savedData.length > 0) {
        const formattedForForm = savedData.map((proj) => ({
          ...proj,
          startDate: proj.startDate ? dayjs(proj.startDate) : null,
          endDate: proj.endDate ? dayjs(proj.endDate) : null,
        }));
        form.setFieldsValue({ projects: formattedForForm });
        onChange(savedData);
      } else {
        form.setFieldsValue({ projects: data });
      }
      setLoading(false);
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await form.validateFields();
      const values = form.getFieldsValue();
      const projectData = values.projects || [];

      // Convert date objects back to strings for the database
      const formattedForDb = projectData.map((proj: any) => ({
        ...proj,
        startDate: proj.startDate
          ? dayjs(proj.startDate).format('YYYY-MM-DD')
          : null,
        endDate: proj.endDate ? dayjs(proj.endDate).format('YYYY-MM-DD') : null,
      }));

      const { error, data: savedData } = await projectService.saveProjects(
        formattedForDb
      );

      if (error) {
        throw error;
      }

      message.success('Project details saved successfully!');

      if (savedData) {
        onChange(savedData);
      }

      if (onSave) {
        onSave();
      }
    } catch (errorInfo) {
      console.error('Validation or save error:', errorInfo);
      message.error('Please fix the form errors before saving.');
    } finally {
      setSaving(false);
    }
  };

  const handleValuesChange = (_: any, allValues: { projects: Project[] }) => {
    if (onChange) {
      onChange(allValues.projects);
    }
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
    <Card
      className="mb-8"
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: 'none',
        overflow: 'hidden',
      }}
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title
            level={4}
            style={{ color: '#1a3353', margin: 0, fontWeight: 600 }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM12 15V17H18V15H12ZM8.414 12L5.586 14.828L7 16.243L11.243 12L7 7.757L5.586 9.172L8.414 12Z"
                  fill="#1a3353"
                />
              </svg>
              Projects
            </span>
          </Title>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSave}
            style={{
              borderRadius: '6px',
              background: '#1a73e8',
              borderColor: '#1a73e8',
            }}
          >
            Save Projects
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        initialValues={{ projects: data }}
        style={{ width: '100%' }}
      >
        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    background: '#f9fbfd',
                    borderRadius: '10px',
                    padding: '20px',
                    border: '1px solid #e6f0ff',
                    position: 'relative',
                  }}
                >
                  <Button
                    type="text"
                    danger
                    onClick={() => remove(name)}
                    icon={<DeleteOutlined />}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      color: '#ff4d4f',
                      zIndex: 1,
                      ...deleteButtonStyle,
                    }}
                  />

                  <Form.Item
                    {...restField}
                    name={[name, 'title']}
                    label={
                      <Text strong style={{ color: '#1a3353' }}>
                        Project Title
                      </Text>
                    }
                    rules={[
                      { required: true, message: 'Project title is required' },
                    ]}
                  >
                    <Input
                      placeholder="e.g., E-commerce Platform"
                      style={inputStyle}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'link']}
                    label={
                      <Text strong style={{ color: '#1a3353' }}>
                        Project Link
                      </Text>
                    }
                  >
                    <Input
                      placeholder="https://github.com/user/project"
                      style={inputStyle}
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'startDate']}
                        label={
                          <Text strong style={{ color: '#1a3353' }}>
                            Start Date
                          </Text>
                        }
                        rules={[
                          { required: true, message: 'Start date is required' },
                        ]}
                      >
                        <DatePicker
                          picker="month"
                          style={{ ...inputStyle, width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'endDate']}
                        label={
                          <Text strong style={{ color: '#1a3353' }}>
                            End Date (Optional)
                          </Text>
                        }
                      >
                        <DatePicker
                          picker="month"
                          style={{ ...inputStyle, width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider
                    orientation="left"
                    plain
                    style={{ color: '#4a6ea9' }}
                  >
                    <span
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <BriefcaseBusinessIcon size={16} /> Project Description
                    </span>
                  </Divider>

                  <Form.Item
                    {...restField}
                    name={[name, 'description']}
                    rules={[
                      { required: true, message: 'Description is required' },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Describe your project, your role, and key achievements"
                      style={textareaStyle}
                    />
                  </Form.Item>

                  <Divider
                    orientation="left"
                    plain
                    style={{ color: '#4a6ea9' }}
                  >
                    <span
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <CodeOutlined /> Technologies Used
                    </span>
                  </Divider>

                  <Form.List name={[name, 'technologies']}>
                    {(techFields, { add: addTech, remove: removeTech }) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                        }}
                      >
                        {techFields.map(
                          ({
                            key: techKey,
                            name: techName,
                            ...restTechField
                          }) => (
                            <Row key={techKey} gutter={8} align="middle">
                              <Col flex="auto">
                                <Form.Item
                                  {...restTechField}
                                  name={techName}
                                  style={{ marginBottom: 0 }}
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
                                  onClick={() => removeTech(techName)}
                                />
                              </Col>
                            </Row>
                          )
                        )}
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
                </div>
              ))}

              <Button
                type="dashed"
                onClick={() =>
                  add({
                    id: `temp-${Date.now()}`,
                    title: '',
                    description: '',
                    technologies: [''],
                    startDate: null,
                    endDate: null,
                    link: '',
                  })
                }
                icon={<PlusOutlined />}
                style={{
                  ...buttonStyle,
                  borderColor: '#13c2c2',
                  color: '#13c2c2',
                  fontSize: '15px',
                  width: '100%',
                }}
              >
                Add Another Project
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Card>
  );
};
